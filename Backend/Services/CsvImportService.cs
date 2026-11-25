using System.Globalization;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using HVBA.Backend.Data;
using HVBA.Backend.Models;

namespace HVBA.Backend.Services;

public record CsvImportResult(int TotalProcessed, int Created, int Updated, List<string> Errors);

public class CsvImportService
{
    private readonly CaseDataStore _store;

    public CsvImportService(CaseDataStore store)
    {
        _store = store;
    }

    public async Task<CsvImportResult> ImportCsvAsync(Stream csvStream, CancellationToken ct = default)
    {
        var errors = new List<string>();
        var importedCases = new List<CaseDto>();

        using var memoryStream = new MemoryStream();
        await csvStream.CopyToAsync(memoryStream, ct);
        var bytes = memoryStream.ToArray();

        if (bytes.Length == 0)
        {
            errors.Add("Het CSV-bestand is leeg.");
            return new CsvImportResult(0, 0, 0, errors);
        }

        string content = DecodeCsvBytes(bytes);
        var firstLine = content.Split(new[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();

        if (string.IsNullOrWhiteSpace(firstLine))
        {
            errors.Add("Het CSV-bestand bevat geen geldige regels.");
            return new CsvImportResult(0, 0, 0, errors);
        }

        string delimiter = firstLine.Contains(';') ? ";" : ",";
        bool hasHeader = IsHeaderRow(firstLine, delimiter);

        var config = new CsvConfiguration(new CultureInfo("nl-BE"))
        {
            Delimiter = delimiter,
            HasHeaderRecord = hasHeader,
            MissingFieldFound = null,
            HeaderValidated = null,
            BadDataFound = null,
            TrimOptions = TrimOptions.Trim
        };

        using var reader = new StringReader(content);
        using var csv = new CsvReader(reader, config);

        int rowIndex = 0;
        if (hasHeader)
        {
            if (!await csv.ReadAsync())
            {
                errors.Add("De CSV-header kon niet worden gelezen.");
                return new CsvImportResult(0, 0, 0, errors);
            }
            csv.ReadHeader();
            rowIndex = 1;
        }

        int nextId = 1;
        while (await csv.ReadAsync())
        {
            ct.ThrowIfCancellationRequested();
            rowIndex++;

            string chamber;
            string rawDate;
            string hour;
            string determinationCode;
            string caseNumber;
            string status;

            if (hasHeader)
            {
                chamber = GetFieldByAliases(csv, "Chamber", "Kamer");
                rawDate = GetFieldByAliases(csv, "Date", "Datum");
                hour = GetFieldByAliases(csv, "Hour", "Uur", "Tijd");
                determinationCode = GetFieldByAliases(csv, "DeterminationCode", "Bepalingscode", "Code");
                caseNumber = GetFieldByAliases(csv, "CaseNumber", "Rolnummer", "Zaaknummer");
                status = GetFieldByAliases(csv, "Status");
            }
            else
            {
                chamber = GetFieldSafe(csv, 0);
                rawDate = GetFieldSafe(csv, 1);
                hour = GetFieldSafe(csv, 2);
                determinationCode = GetFieldSafe(csv, 3);
                caseNumber = GetFieldSafe(csv, 4);
                status = GetFieldSafe(csv, 5);
            }

            if (string.IsNullOrWhiteSpace(caseNumber))
            {
                errors.Add($"Rij {rowIndex}: Rolnummer (CaseNumber) ontbreekt.");
                continue;
            }

            if (!DateOnly.TryParseExact(rawDate, new[] { "yyyy-MM-dd", "dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy" },
                CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDate))
            {
                errors.Add($"Rij {rowIndex} ({caseNumber}): Ongeldige datum '{rawDate}'.");
                continue;
            }

            importedCases.Add(new CaseDto
            {
                Id = nextId++,
                Date = parsedDate.ToString("yyyy-MM-dd"),
                Hour = hour,
                Chamber = chamber,
                CaseNumber = caseNumber,
                DeterminationCode = determinationCode,
                Status = string.IsNullOrWhiteSpace(status) ? "Gepland" : status
            });
        }

        // Alleen vervangen als er minstens één geldige zaak in de CSV stond
        if (importedCases.Count > 0)
        {
            lock (_store.Cases)
            {
                _store.Cases.Clear();
                _store.Cases.AddRange(importedCases);
            }
        }

        return new CsvImportResult(importedCases.Count, importedCases.Count, 0, errors);
    }

    private static string DecodeCsvBytes(byte[] bytes)
    {
        try
        {
            var strictUtf8 = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false, throwOnInvalidBytes: true);
            return strictUtf8.GetString(bytes);
        }
        catch (DecoderFallbackException)
        {
            return Encoding.Latin1.GetString(bytes);
        }
    }

    private static bool IsHeaderRow(string firstLine, string delimiter)
    {
        var knownHeaders = new[] { "casenumber", "rolnummer", "zaaknummer", "date", "datum", "chamber", "kamer" };
        var cols = firstLine.Split(delimiter);
        return cols.Any(c => knownHeaders.Contains(c.Trim().TrimStart('\uFEFF').ToLowerInvariant()));
    }

    private static string GetFieldSafe(CsvReader csv, int index)
    {
        return csv.TryGetField<string>(index, out var value) ? (value ?? string.Empty).Trim() : string.Empty;
    }

    private static string GetFieldByAliases(CsvReader csv, params string[] aliases)
    {
        var headers = csv.HeaderRecord;
        if (headers is null)
            return string.Empty;

        for (int i = 0; i < headers.Length; i++)
        {
            var cleanHeader = headers[i].Trim().TrimStart('\uFEFF');
            if (aliases.Any(a => string.Equals(cleanHeader, a, StringComparison.OrdinalIgnoreCase)))
            {
                return GetFieldSafe(csv, i);
            }
        }
        return string.Empty;
    }
}
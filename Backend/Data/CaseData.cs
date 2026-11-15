using Backend.Models;

namespace Backend.Data;

// Testdata in het geheugen (later vervangen door een database)
public class CaseData
{
    public List<CaseDto> Cases { get; } = new()
    {
        new CaseDto { Id = 1, Date = "2026-11-16", Hour = "09:00", Chamber = "B4E3", CaseNumber = "2024/AR/1835", DeterminationCode = "747§2 al.3 Ger.W.", Status = "Bezig" },
        new CaseDto { Id = 2, Date = "2026-11-16", Hour = "11:30", Chamber = "B4E3", CaseNumber = "2024/AR/1836", DeterminationCode = "612§1 Ger.W.", Status = "Start binnenkort" },
        new CaseDto { Id = 3, Date = "2026-11-16", Hour = "13:30", Chamber = "B4E3", CaseNumber = "2024/AR/1839", DeterminationCode = "1675/12 Ger.W.", Status = "Gepland" },
        new CaseDto { Id = 4, Date = "2026-11-16", Hour = "14:00", Chamber = "A2D1", CaseNumber = "2024/AR/1837", DeterminationCode = "420 BW", Status = "Gepland" },
        new CaseDto { Id = 5, Date = "2026-11-16", Hour = "16:30", Chamber = "A2D1", CaseNumber = "2024/AR/1838", DeterminationCode = "310§1 Sw.", Status = "Gepland" },
        new CaseDto { Id = 6, Date = "2026-11-16", Hour = "08:30", Chamber = "A2D1", CaseNumber = "2024/AR/1834", DeterminationCode = "747§2 al.3 Ger.W.", Status = "Afgehandeld" }
    };
}
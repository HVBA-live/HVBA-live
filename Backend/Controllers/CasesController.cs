using HVBA.Backend.Data;
using HVBA.Backend.Models;
using HVBA.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using HVBA.Backend.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace HVBA.Backend.Controllers
{
    [ApiController]
    [Route("api/cases")]
    //[Authorize] later terug aanzetten//
    public class CasesController : ControllerBase
    {
        private readonly CaseDataStore _dataStore;
        private readonly CsvImportService _csvImportService;
        private readonly ILogger<CasesController> _logger;
        private readonly IHubContext<CasesHub> _hubContext;

        public CasesController(
            CaseDataStore dataStore,
            CsvImportService csvImportService,
            ILogger<CasesController> logger,
            IHubContext<CasesHub> hubContext)
        {
            _dataStore = dataStore;
            _csvImportService = csvImportService;
            _logger = logger;
            _hubContext = hubContext;
        }

        //alle zaken, gesorteerd op uur (filteren gebeurt in de frontend)
        [HttpGet]
        public ActionResult<IEnumerable<CaseDto>> GetCases()
        {
            _logger.LogInformation("Alle zaken werden opgevraagd");
            return Ok(_dataStore.Cases.OrderBy(c => c.Hour));
        }

        [HttpPost("import")]
        //[Authorize(Roles = "admin")] later terug aanzetten//
        public async Task<ActionResult<CsvImportResult>> ImportCsv(IFormFile file, CancellationToken ct)
        {
            if (file is null || file.Length == 0)
            {
                return BadRequest(new { message = "Selecteer een geldig CSV-bestand." });
            }

            if (!file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { message = "Alleen .csv-bestanden worden ondersteund." });
            }

            await using var stream = file.OpenReadStream();
            var result = await _csvImportService.ImportCsvAsync(stream, ct);

            _logger.LogInformation(
                "CSV-import voltooid: {Total} verwerkt ({Created} nieuw, {Updated} bijgewerkt)",
                result.TotalProcessed, result.Created, result.Updated);

            // Alle verbonden portalen (judge, politie, lawyer) meteen verwittigen (real time)
            var updatedCases = _dataStore.Cases.OrderBy(c => c.Hour).ToList();
            await _hubContext.Clients.All.SendAsync("CasesUpdated", updatedCases, ct);

            return Ok(result);
        }

        [HttpPatch("{caseId:int}/status")]
        //[Authorize(Roles = "justitie,admin")] later terug aanzetten//
        public async Task<IActionResult> UpdateCaseStatus(int caseId, CasesStatusForUpdateDto statusForUpdate)
        {
            var caseFromStore = _dataStore.Cases.FirstOrDefault(c => c.Id == caseId);

            if (caseFromStore is null)
            {
                _logger.LogWarning("Zaak {CaseId} werd niet gevonden", caseId);
                return NotFound();
            }

            caseFromStore.Status = statusForUpdate.Status;
            _logger.LogInformation("Status van zaak {CaseId} gewijzigd naar {Status}", caseId, statusForUpdate.Status);

            //alle verbonden portalen (judge,politie,laywer) meteen verwittigen (real time)
            await _hubContext.Clients.All.SendAsync("CaseStatusChanged", caseId, statusForUpdate.Status);

            return NoContent();
        }
    }
}
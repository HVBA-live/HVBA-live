using System.Security.Claims;
using HVBA.Backend.Data;
using HVBA.Backend.Models;
using HVBA.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using HVBA.Backend.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace HVBA.Backend.Controllers
{
    public record SubscriptionRequestDto(string? UserId);

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

        private string? ResolveUserId(string? fallbackUserId)
        {
            // Werkt automatisch zodra [Authorize] aanstaat, en valt nu terug op de meegegeven Keycloak sub
            return User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub")
                ?? fallbackUserId;
        }

        // Alle zaken, gesorteerd op uur + persoonlijke abonneerstatus
        [HttpGet]
        public ActionResult<IEnumerable<CaseDto>> GetCases([FromQuery] string? userId = null)
        {
            var currentUserId = ResolveUserId(userId);
            _logger.LogInformation("Alle zaken werden opgevraagd voor gebruiker {UserId}", currentUserId ?? "anoniem");

            var cases = _dataStore.Cases
                .OrderBy(c => c.Hour)
                .Select(c => new CaseDto
                {
                    Id = c.Id,
                    Date = c.Date,
                    Hour = c.Hour,
                    Chamber = c.Chamber,
                    CaseNumber = c.CaseNumber,
                    DeterminationCode = c.DeterminationCode,
                    Status = c.Status,
                    SubscriberIds = c.SubscriberIds,
                    IsSubscribed = !string.IsNullOrEmpty(currentUserId) && c.SubscriberIds.Contains(currentUserId)
                });

            return Ok(cases);
        }

        [HttpPost("{caseId:int}/subscribe")]
        public async Task<IActionResult> ToggleSubscription(int caseId, [FromBody] SubscriptionRequestDto? request)
        {
            var currentUserId = ResolveUserId(request?.UserId);

            if (string.IsNullOrWhiteSpace(currentUserId))
            {
                return BadRequest(new { message = "Gebruikers-ID (Keycloak sub) ontbreekt." });
            }

            var caseFromStore = _dataStore.Cases.FirstOrDefault(c => c.Id == caseId);
            if (caseFromStore is null)
            {
                return NotFound();
            }

            bool isSubscribed;
            if (caseFromStore.SubscriberIds.Contains(currentUserId))
            {
                caseFromStore.SubscriberIds.Remove(currentUserId);
                isSubscribed = false;
            }
            else
            {
                caseFromStore.SubscriberIds.Add(currentUserId);
                isSubscribed = true;
            }

            var subscriberCount = caseFromStore.SubscriberIds.Count;
            _logger.LogInformation(
                "Gebruiker {UserId} abonnement voor zaak {CaseId}: {IsSubscribed} (totaal: {Count})",
                currentUserId, caseId, isSubscribed, subscriberCount);

            // Real-time update sturen naar o.a. de Judge Portal zodat de teller direct verspringt
            await _hubContext.Clients.All.SendAsync("CaseSubscriptionChanged", caseId, subscriberCount);

            return Ok(new { isSubscribed, subscriberCount });
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

            await _hubContext.Clients.All.SendAsync("CaseStatusChanged", caseId, statusForUpdate.Status);

            return NoContent();
        }

        [HttpPost("{caseId:int}/police-confirm")]
        public async Task<IActionResult> TogglePoliceConfirmation(int caseId)
        {
            var caseFromStore = _dataStore.Cases.FirstOrDefault(c => c.Id == caseId);

            if (caseFromStore is null)
            {
                return NotFound();
            }

            caseFromStore.IsPoliceConfirmed = !caseFromStore.IsPoliceConfirmed;

            _logger.LogInformation(
                "Politiebevestiging voor zaak {CaseId} gewijzigd naar {IsConfirmed}",
                caseId, caseFromStore.IsPoliceConfirmed);

            // Real-time update naar Judge Portal en Police Portal
            await _hubContext.Clients.All.SendAsync(
                "CasePoliceConfirmed",
                caseId,
                caseFromStore.IsPoliceConfirmed);

            return Ok(new { isPoliceConfirmed = caseFromStore.IsPoliceConfirmed });
        }
    }
}
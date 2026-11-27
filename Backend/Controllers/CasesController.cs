using HVBA.Backend.Data;
using HVBA.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Cmp;
using HVBA.Backend.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using HVBA.Backend.Services;

namespace HVBA.Backend.Controllers
{
    [ApiController]
    [Route("api/cases")]
    //[Authorize] later terug aanzetten//
    public class CasesController : ControllerBase
    {
        private readonly CaseDataStore _dataStore;
        private readonly ILogger<CasesController> _logger;
        private readonly IHubContext<CasesHub> _hubContext;
        public CasesController(CaseDataStore dataStore, ILogger<CasesController> logger, IHubContext<CasesHub> hubContext)
        {
            _dataStore = dataStore;
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

           // TIJDELIJK: test of mails versturen werkt -> later verwijderen
        [HttpPost("test-mail")]
        public async Task<IActionResult> TestMail(string toEmail, [FromServices] IMailService mailService)
        {
            await mailService.SendAsync(toEmail, "Test HVBA Live", "Dit is een testmail van HVBA Live.");
            return Ok($"Testmail verstuurd naar {toEmail}");
        }
    }
}
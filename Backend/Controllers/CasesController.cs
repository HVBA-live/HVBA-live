using HVBA.Backend.Data;
using HVBA.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Cmp;
using HVBA.Backend.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace HVBA.Backend.Controllers
{
    [ApiController]
    [Route("api/cases")]
    [Authorize]
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
        [Authorize(Roles = "justitie,admin")]
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
using System.Threading.Tasks;
using JouwBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace JouwBackend.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class EmailTestController : ControllerBase
    {
        private readonly IKeycloakPasswordResetService _resetService;

        public EmailTestController(IKeycloakPasswordResetService resetService)
        {
            _resetService = resetService;
        }

        [HttpPost("trigger-password-reset")]
        public async Task<IActionResult> TriggerReset()
        {
            await _resetService.ResetUserPasswordAndSendEmailAsync();
            return Ok(new { Message = "Wachtwoord gewijzigd in Keycloak en gemaild naar Mailpit!" });
        }
    }
}
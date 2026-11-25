using System.Net;
using Microsoft.AspNetCore.Mvc;
using HVBA.Backend.Services;

namespace HVBA.Backend.Controllers
{
    [ApiController]
    [Route("wachtwoord")]
    public class PasswordRevealController : ControllerBase
    {
        private readonly IOneTimePasswordStore _store;

        public PasswordRevealController(IOneTimePasswordStore store)
        {
            _store = store;
        }

        [HttpGet("{token}")]
        public ContentResult Preview(string token)
        {
            if (!_store.Exists(token))
            {
                return Content(GetExpiredHtml(), "text/html; charset=utf-8");
            }

            var safeToken = WebUtility.HtmlEncode(token);
            return Content(GetConfirmHtml(safeToken), "text/html; charset=utf-8");
        }

        [HttpPost("{token}")]
        public IActionResult Reveal(string token)
        {
            var password = _store.ConsumePassword(token);

            if (string.IsNullOrEmpty(password))
            {
                return NotFound(new { message = "Link is al gebruikt of verlopen." });
            }

            return Ok(new { password });
        }

        private static string GetConfirmHtml(string safeToken) => $$"""
            <!DOCTYPE html>
            <html lang="nl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Eenmalig Wachtwoord - HVBA</title>
                <style>
                    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f6f8; margin: 0; }
                    .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 420px; text-align: center; }
                    .pw-box { font-family: monospace; font-size: 1.4rem; background: #eef2f6; padding: 1rem; border-radius: 8px; margin: 1.5rem 0; user-select: all; letter-spacing: 1px; word-break: break-all; }
                    button { background: #0056b3; color: white; border: none; padding: 0.8rem 1.4rem; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500; }
                    button:hover { background: #004494; }
                    button:disabled { background: #99badd; cursor: not-allowed; }
                    .timer { color: #d9534f; font-weight: bold; margin-top: 1rem; }
                </style>
            </head>
            <body>
                <div class="card" id="content">
                    <h2>Wachtwoord ophalen</h2>
                    <p>Klik op de knop hieronder om je nieuwe wachtwoord te bekijken. Na het klikken is deze link direct ongeldig en blijft het wachtwoord <strong>30 seconden</strong> zichtbaar.</p>
                    <button id="revealBtn" onclick="revealPassword()">Toon wachtwoord</button>
                </div>

                <script>
                    async function revealPassword() {
                        const btn = document.getElementById('revealBtn');
                        btn.disabled = true;
                        btn.textContent = 'Bezig met ophalen...';

                        try {
                            const response = await fetch('/wachtwoord/{{safeToken}}', {
                                method: 'POST'
                            });

                            if (!response.ok) {
                                document.getElementById('content').innerHTML =
                                    '<h2>Link niet meer geldig</h2><p>Dit wachtwoord is zojuist al bekeken of de link is verlopen.</p>';
                                return;
                            }

                            const data = await response.json();
                            showPasswordWithTimer(data.password);
                        } catch (err) {
                            btn.disabled = false;
                            btn.textContent = 'Toon wachtwoord';
                            alert('Er ging iets mis bij het ophalen van het wachtwoord.');
                        }
                    }

                    function showPasswordWithTimer(password) {
                        const card = document.getElementById('content');
                        card.innerHTML = `
                            <h2>Je nieuwe wachtwoord</h2>
                            <p>Deze link is nu ongeldig gemaakt. Kopieer je wachtwoord voordat de timer afloopt.</p>
                            <div class="pw-box" id="pw"></div>
                            <button id="copyBtn" onclick="copyPw()">Kopieer wachtwoord</button>
                            <p class="timer">Verdwijnt over <span id="sec">30</span> seconden...</p>
                        `;
                        document.getElementById('pw').textContent = password;

                        let seconds = 30;
                        const secEl = document.getElementById('sec');
                        const interval = setInterval(() => {
                            seconds--;
                            secEl.textContent = seconds;
                            if (seconds <= 0) {
                                clearInterval(interval);
                                card.innerHTML =
                                    '<h2>Tijd verstreken</h2><p>Het wachtwoord is om veiligheidsredenen gewist en deze link is niet meer geldig.</p>';
                            }
                        }, 1000);
                    }

                    function copyPw() {
                        const pw = document.getElementById('pw').textContent;
                        navigator.clipboard.writeText(pw);
                        const copyBtn = document.getElementById('copyBtn');
                        copyBtn.textContent = 'Gekopieerd!';
                        setTimeout(() => copyBtn.textContent = 'Kopieer wachtwoord', 2000);
                    }
                </script>
            </body>
            </html>
            """;

        private static string GetExpiredHtml() => """
            <!DOCTYPE html>
            <html lang="nl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Link Ongeldig - HVBA</title>
                <style>
                    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f6f8; margin: 0; }
                    .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 420px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Link niet meer geldig</h2>
                    <p>Dit wachtwoord is al bekeken of de link is verlopen.</p>
                </div>
            </body>
            </html>
            """;
    }
}
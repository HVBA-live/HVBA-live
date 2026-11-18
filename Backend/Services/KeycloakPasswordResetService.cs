using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MailKit.Net.Smtp;
using MimeKit;

namespace JouwBackend.Services
{
    public interface IKeycloakPasswordResetService
    {
        Task ResetUserPasswordAndSendEmailAsync();
    }

    // Door BackgroundService te erven draait deze klasse automatisch op de achtergrond van je .NET app
    public class KeycloakPasswordResetService : BackgroundService, IKeycloakPasswordResetService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly ILogger<KeycloakPasswordResetService> _logger;

        public KeycloakPasswordResetService(
            HttpClient httpClient, 
            IConfiguration config,
            ILogger<KeycloakPasswordResetService> logger)
        {
            _httpClient = httpClient;
            _config = config;
            _logger = logger;
        }

        // DEZE METHODE BEHEERT DE 7-DAGEN TIMER
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Wachtwoord Reset Background Service is gestart.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Automatische wekelijkse wachtwoord reset wordt uitgevoerd...");
                    await ResetUserPasswordAndSendEmailAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Fout opgetreden tijdens automatische wachtwoord reset.");
                }

                // Wacht exact 7 dagen tot de volgende uitvoering
                await Task.Delay(TimeSpan.FromDays(7), stoppingToken);
            }
        }

        public async Task ResetUserPasswordAndSendEmailAsync()
        {
            var keycloakUrl = _config["Keycloak:BaseUrl"];
            var realm = _config["Keycloak:Realm"];
            var clientId = _config["Keycloak:ClientId"];
            var clientSecret = _config["Keycloak:ClientSecret"];
            var targetUserId = _config["Keycloak:TargetUserId"];
            var targetUserEmail = _config["Keycloak:TargetUserEmail"];

            // 1. Access Token opvragen bij Keycloak (Admin API)
            var tokenParams = new Dictionary<string, string>
            {
                { "grant_type", "client_credentials" },
                { "client_id", clientId! },
                { "client_secret", clientSecret! }
            };

            var tokenResponse = await _httpClient.PostAsync(
                $"{keycloakUrl}/realms/{realm}/protocol/openid-connect/token",
                new FormUrlEncodedContent(tokenParams)
            );
            tokenResponse.EnsureSuccessStatusCode();

            var tokenResult = await tokenResponse.Content.ReadFromJsonAsync<KeycloakTokenResponse>();
            var accessToken = tokenResult?.AccessToken;

            // 2. Nieuw willekeurig wachtwoord van 16 karakters genereren
            var newPassword = GenerateRandomPassword(16);

            // 3. Wachtwoord van de specifieke gebruiker updaten in Keycloak
            var request = new HttpRequestMessage(
                HttpMethod.Put,
                $"{keycloakUrl}/admin/realms/{realm}/users/{targetUserId}/reset-password"
            );
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Content = JsonContent.Create(new
            {
                type = "password",
                value = newPassword,
                temporary = false
            });

            var resetResponse = await _httpClient.SendAsync(request);

            if (!resetResponse.IsSuccessStatusCode)
            {
                var errorBody = await resetResponse.Content.ReadAsStringAsync();
                throw new Exception($"Keycloak Reset API fout ({resetResponse.StatusCode}): {errorBody}");
            }

            // 4. E-mail verzenden
            await SendEmailAsync(targetUserEmail!, newPassword);
            _logger.LogInformation("Wachtwoord succesvol gewijzigd en gemaild.");
        }

        private async Task SendEmailAsync(string toEmail, string newPassword)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_config["Smtp:FromName"], _config["Smtp:FromEmail"]));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Je nieuwe automatische wachtwoord";

            message.Body = new TextPart("plain")
            {
                Text = $"Hallo,\n\nJe nieuwe wachtwoord voor de komende 7 dagen is: {newPassword}\n\nMet vriendelijke groet,\nHet HVBA Team"
            };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                _config["Smtp:Host"], 
                int.Parse(_config["Smtp:Port"]!), 
                MailKit.Security.SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(_config["Smtp:User"], _config["Smtp:Pass"]);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }

        private static string GenerateRandomPassword(int length)
        {
            byte[] randomBytes = new byte[length];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes)[..length];
        }

        private class KeycloakTokenResponse
        {
            [JsonPropertyName("access_token")]
            public string AccessToken { get; set; } = string.Empty;
        }
    }
}
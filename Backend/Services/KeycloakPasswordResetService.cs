using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;
using MimeKit;

namespace JouwBackend.Services
{
    public interface IKeycloakPasswordResetService
    {
        Task ResetUserPasswordAndSendEmailAsync();
    }

    public class KeycloakPasswordResetService : IKeycloakPasswordResetService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public KeycloakPasswordResetService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
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
            resetResponse.EnsureSuccessStatusCode();

            if (!resetResponse.IsSuccessStatusCode)
            {
                var errorBody = await resetResponse.Content.ReadAsStringAsync();
                throw new Exception($"Keycloak Reset API fout ({resetResponse.StatusCode}): {errorBody}");
            }

            // 4. E-mail verzenden naar Mailpit
            await SendEmailAsync(targetUserEmail!, newPassword);
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
            
            // Verbinding maken met Mailpit op localhost:1025 (zonder auth)
            await smtp.ConnectAsync(
                _config["Smtp:Host"], 
                int.Parse(_config["Smtp:Port"]!), 
                MailKit.Security.SecureSocketOptions.Auto
            );

            if (!string.IsNullOrEmpty(_config["Smtp:User"]))
            {
                await smtp.AuthenticateAsync(_config["Smtp:User"], _config["Smtp:Pass"]);
            }

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
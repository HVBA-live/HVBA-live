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

namespace HVBA.Backend.Services
{
    public interface IKeycloakPasswordResetService
    {
        Task ResetUserPasswordAndSendEmailAsync();
    }

    public class KeycloakPasswordResetService : BackgroundService, IKeycloakPasswordResetService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly ILogger<KeycloakPasswordResetService> _logger;
        private readonly IOneTimePasswordStore _passwordStore;

        public KeycloakPasswordResetService(
            HttpClient httpClient, 
            IConfiguration config,
            ILogger<KeycloakPasswordResetService> logger,
            IOneTimePasswordStore passwordStore)
        {
            _httpClient = httpClient;
            _config = config;
            _logger = logger;
            _passwordStore = passwordStore;
        }

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

            var newPassword = GenerateRandomPassword(16);

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

            var token = _passwordStore.StorePassword(newPassword, TimeSpan.FromHours(24));
            var baseUrl = _config["App:BaseUrl"]?.TrimEnd('/');
            var revealLink = $"{baseUrl}/wachtwoord/{token}";

            await SendEmailAsync(targetUserEmail!, revealLink);
            _logger.LogInformation("Wachtwoord succesvol gewijzigd en eenmalige link gemaild.");
        }

        private async Task SendEmailAsync(string toEmail, string revealLink)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_config["Smtp:FromName"], _config["Smtp:FromEmail"]));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Je nieuwe eenmalige wachtwoordlink";

            message.Body = new TextPart("plain")
            {
                Text = $"Hallo,\n\n" +
                       $"Klik op onderstaande link om je nieuwe wachtwoord voor de komende 7 dagen te bekijken.\n" +
                       $"Let op: de link werkt maar één keer en na het klikken blijft het wachtwoord slechts 30 seconden zichtbaar.\n\n" +
                       $"{revealLink}\n\n" +
                       $"Met vriendelijke groet,\nHet HVBA Team"
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
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace HVBA.Backend.Services
{
    public class SmtpMailService : IMailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<SmtpMailService> _logger;

        public SmtpMailService(IConfiguration configuration, ILogger<SmtpMailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendAsync(string toEmail, string subject, string message)
        {
            var host = _configuration["NotificationMail:Host"] ?? throw new InvalidOperationException("Verplichte instelling NotificationMail: Host ontbreekt.");
            var port =  Convert.ToInt32(_configuration["NotificationMail:Port"] ?? "587");

            var mail = new MimeMessage();
            mail.From.Add(new MailboxAddress(
                _configuration["NotificationMail:FromName"] ?? "HVBA Live",
                _configuration["NotificationMail:FromEmail"] ?? "noreply@hvba.local"
            ));
            mail.To.Add(new MailboxAddress("",toEmail));
            mail.Subject = subject;
            mail.Body = new TextPart("plain") {Text = message};

            using var Smtp = new SmtpClient();

            // mailpit
            var security = _configuration["NotificationMail:Security"] == "None" ? SecureSocketOptions.None : SecureSocketOptions.StartTls;

            await Smtp.ConnectAsync(host, port, security);

            // alleen inloggen als er een gebruiker ingesteld is
            var user = _configuration["NotificationMail:User"];
            if (!string.IsNullOrEmpty(user))
            {
                await Smtp.AuthenticateAsync(user, _configuration["NotificationMail:Pass"]);
            }

            await Smtp.SendAsync(mail);
            await Smtp.DisconnectAsync(true);

            _logger.LogInformation("Meldingsmail verstuurd naar {Email}: {Subject}", toEmail, subject);
        }
    }
}

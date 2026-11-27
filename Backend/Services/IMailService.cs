namespace HVBA.Backend.Services
{
    public interface IMailService
    {
        Task SendAsync(string toEmail, string subject, string message);
    }
}
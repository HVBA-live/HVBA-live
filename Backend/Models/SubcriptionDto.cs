namespace HVBA.Backend.Models
{
    public class SubscriptionDto
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public string Email { get; set; } = string.Empty;
    }
}
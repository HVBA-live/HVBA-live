namespace HVBA.Backend.Models
{
    public class CaseDto
    {
        public int Id { get; set; }
        public string Date { get; set; } = string.Empty;              // "2026-11-24"
        public string Hour { get; set; } = string.Empty;              // "09:00"
        public string Chamber { get; set; } = string.Empty;           // "B4E3"
        public string CaseNumber { get; set; } = string.Empty;        // rolnummer
        public string DeterminationCode { get; set; } = string.Empty; // code van vaststelling
        public string Status { get; set; } = "Gepland";               // "Gepland", "Start binnenkort", "Bezig", "Afgehandeld"
    }
}
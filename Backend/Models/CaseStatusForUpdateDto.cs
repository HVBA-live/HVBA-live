using System.ComponentModel.DataAnnotations;

namespace HVBA.Backend.Models
{
    public class CasesStatusForUpdateDto
    {
        [Required]
        [AllowedValues("Gepland", "Start binnenkort", "Bezig", "Afgehandeld",
            ErrorMessage = "Status moet Gepland, Start binnenkort, Bezig of Afgehandeld zijn.")]
        public string Status {get; set;} = string.Empty;
    }
}
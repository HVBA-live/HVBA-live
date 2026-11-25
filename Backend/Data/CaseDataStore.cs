using HVBA.Backend.Models;

namespace HVBA.Backend.Data
{
    public class CaseDataStore
    {
        public List<CaseDto> Cases { get; } =
        [
            new() { Id = 1, Date = "2026-11-24", Hour = "09:00", Chamber = "B4E3", CaseNumber = "2024/AR/1835", DeterminationCode = "747§2 al.3 Ger.W.", Status = "Bezig" },
            new() { Id = 2, Date = "2026-11-24", Hour = "11:30", Chamber = "B4E3", CaseNumber = "2024/AR/1836", DeterminationCode = "612§1 Ger.W.", Status = "Start binnenkort" },
            new() { Id = 3, Date = "2026-11-24", Hour = "13:30", Chamber = "B4E3", CaseNumber = "2024/AR/1839", DeterminationCode = "1675/12 Ger.W.", Status = "Gepland" },
            new() { Id = 4, Date = "2026-11-24", Hour = "14:00", Chamber = "A2D1", CaseNumber = "2024/AR/1837", DeterminationCode = "420 BW", Status = "Gepland" },
            new() { Id = 5, Date = "2026-11-24", Hour = "16:30", Chamber = "A2D1", CaseNumber = "2024/AR/1838", DeterminationCode = "310§1 Sw.", Status = "Gepland" },
            new() { Id = 6, Date = "2026-11-24", Hour = "08:30", Chamber = "A2D1", CaseNumber = "2024/AR/1834", DeterminationCode = "747§2 al.3 Ger.W.", Status = "Afgehandeld" },
            new() { Id = 7, Date = "2026-11-24", Hour = "10:00", Chamber = "C1F2", CaseNumber = "2024/AR/1840", DeterminationCode = "420 BW", Status = "Gepland" }
        ];
    }
}
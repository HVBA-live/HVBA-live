using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace HVBA.Backend.Hubs
{
    //     verbindingspunt voor real-time updates
    // clients luisteren alleen; de backend stuurt berichten via IHubContext
    //[Authorize] later terug aanzetten //
    public class CasesHub: Hub
    {
        
    }
}
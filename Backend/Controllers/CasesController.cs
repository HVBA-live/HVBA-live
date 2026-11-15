using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/cases")]
public class CasesController : ControllerBase
{
    private readonly CaseData _caseDat;

    public CasesController(CaseData caseDate)
    {
        _caseDat = caseDate;
    }

    public ActionResult<IEnumerable<CaseDto>> GetCases()
    {
        //alle zaken, gesorteerd op uur
        return Ok(_caseDat.Cases.OrderBy(c => c.Hour).ToList());
    }

    
}
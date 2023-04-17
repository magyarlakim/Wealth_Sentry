using Microsoft.AspNetCore.Mvc;
using System;
namespace Wealth_Sentry.Controllers;

[ApiController]
[Route("[controller]")]
public class SecurityDataController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Buy", "Sell", "Buy", "Sell","Buy", "Sell","Buy", "Sell","Buy", "Sell"
    };

    private readonly ILogger<SecurityDataController> _logger;

    public SecurityDataController(ILogger<SecurityDataController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<SecurityData> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new SecurityData
        {
            Date = DateTime.Now.AddDays(index).ToString("dd/MM/yyyy"),
            Price = Random.Shared.Next(10, 100),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}

namespace Wealth_Sentry;

public class SecurityData
{
    public string Date { get; set; }

    public int Price { get; set; }

    public int Price_Derived => 200 + (int)(Price / 0.5556);

    public string? Summary { get; set; }
}


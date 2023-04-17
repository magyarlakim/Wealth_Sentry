namespace Wealth_Sentry;

public class SecurityData
{
    public string Date { get; set; }

    public double Price { get; set; }

    public int Price_Derived => 5 + (int)(Price / 100);

    public string? Summary { get; set; }
}


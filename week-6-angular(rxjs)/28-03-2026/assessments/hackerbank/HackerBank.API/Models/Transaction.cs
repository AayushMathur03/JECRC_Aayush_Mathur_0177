namespace HackerBank.API.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Date { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    /// <summary>0 = Credit, 1 = Debit</summary>
    public int Type { get; set; }
    public double Amount { get; set; }
    public string Balance { get; set; } = string.Empty;
}
using System;
using System.Collections.Generic;
using System.Linq;

class Sale
{
    public string ProductId;
    public string Region;
    public int Amount;

    public Sale(string productId, string region, int amount)
    {
        ProductId = productId;
        Region = region;
        Amount = amount;
    }
}

class Program
{
    static void Main()
    {
        // Sample Input
        List<Sale> sales = new List<Sale>()
        {
            new Sale("P001", "North", 1500),
            new Sale("P001", "South", 2000),
            new Sale("P002", "North", 3000),
            new Sale("P001", "East", 2500),
            new Sale("P002", "South", 1800),
            new Sale("P003", "North", 1200),
            new Sale("P001", "West", 2200),
            new Sale("P002", "West", 2800),
            new Sale("P003", "South", 900),
            new Sale("P002", "East", 3200)
        };

        int threshold = 2000;

        Console.WriteLine("--- Sales Report by Product and Region ---\n");

        // ------------------------------------
        // Group Sales by Product
        // ------------------------------------

        var groupedProducts = sales
            .GroupBy(s => s.ProductId);

        Dictionary<string, double> productAverages =
            new Dictionary<string, double>();

        foreach (var productGroup in groupedProducts)
        {
            Console.WriteLine($"Product {productGroup.Key}:\n");

            foreach (var sale in productGroup)
            {
                Console.WriteLine(
                    $"  {sale.Region}: ${sale.Amount}");
            }

            int total = productGroup.Sum(x => x.Amount);

            double average = productGroup.Average(x => x.Amount);

            int min = productGroup.Min(x => x.Amount);

            int max = productGroup.Max(x => x.Amount);

            productAverages[productGroup.Key] = average;

            Console.WriteLine(
                $"  Total: ${total}, " +
                $"Average: ${average:F2}\n");
        }

        // ------------------------------------
        // Best Selling Product by Region
        // ------------------------------------

        Console.WriteLine("Best Selling Product by Region:\n");

        var groupedRegions = sales
            .GroupBy(s => s.Region);

        foreach (var regionGroup in groupedRegions)
        {
            var best = regionGroup
                .OrderByDescending(x => x.Amount)
                .First();

            Console.WriteLine(
                $"{regionGroup.Key}: " +
                $"{best.ProductId} (${best.Amount})");
        }

        // ------------------------------------
        // Underperforming Products
        // ------------------------------------

        Console.WriteLine(
            $"\nUnderperforming Products (< ${threshold} average):\n");

        foreach (var item in productAverages)
        {
            if (item.Value < threshold)
            {
                Console.WriteLine(
                    $"{item.Key} (${item.Value:F2})");
            }
        }
    }
}
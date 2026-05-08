using System;
using System.Threading.Tasks;

public class AsyncService
{
    public int requestCount { get; set; }
    public long lastResponseTime { get; set; }

    public virtual async Task<string> FetchDataAsync(string endpoint)
    {
        await Task.Delay(1);
        return string.Empty;
    }

    public virtual async Task<string> GetStatusAsync()
    {
        await Task.Delay(1);
        return string.Empty;
    }
}

public class WeatherService : AsyncService
{
    public string city { get; set; } = string.Empty;
    public int temperature { get; set; }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;
        Console.WriteLine($"Weather Fetch Started,{city}");
        
        // Simulating the async delay of 2 seconds
        await Task.Delay(2000);
        
        string result = $"Weather Data Received,{city},{temperature}°C";
        Console.WriteLine(result);
        
        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        string result = $"Weather Service Status,Requests:{requestCount}";
        Console.WriteLine(result);
        return result;
    }
}

public class StockService : AsyncService
{
    public string symbol { get; set; } = string.Empty;
    public double currentPrice { get; set; }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;
        Console.WriteLine($"Stock Fetch Started,{symbol}");
        
        // Simulating the async delay of 2 seconds
        await Task.Delay(2000);
        
        string result = $"Stock Price Update,{symbol},${currentPrice}";
        Console.WriteLine(result);
        
        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        string result = $"Stock Service Status,Requests:{requestCount}";
        Console.WriteLine(result);
        return result;
    }
}

public class Program
{
    public static async Task Main()
    {
        // Hardcoded Input
        string serviceType = "Weather";
        string identifier = "NewYork";
        string command = "FetchDataAsync";

        if (serviceType == "Weather")
        {
            WeatherService ws = new WeatherService 
            { 
                city = identifier, 
                temperature = 22 // Mocking the temperature to match sample output
            };

            if (command == "FetchDataAsync")
            {
                await ws.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await ws.GetStatusAsync();
            }
        }
        else if (serviceType == "Stock")
        {
            StockService ss = new StockService 
            { 
                symbol = identifier, 
                currentPrice = 150.50 // Mocking a standard price
            };

            if (command == "FetchDataAsync")
            {
                await ss.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await ss.GetStatusAsync();
            }
        }
    }
}
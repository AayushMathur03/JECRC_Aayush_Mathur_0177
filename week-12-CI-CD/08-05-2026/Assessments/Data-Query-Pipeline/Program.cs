using System;
using System.Collections.Generic;
using System.Linq;

public class Query
{
    // Initialized to an empty list to fix CS8618
    public List<int> dataSource { get; set; } = new List<int>(); 
    public bool isExecuted { get; set; }

    public virtual IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public virtual List<int> Execute()
    {
        isExecuted = true;
        return dataSource;
    }

    public virtual string GetQueryType()
    {
        return "BaseQuery";
    }
}

public class FilterQuery : Query
{
    // Initialized to string.Empty to fix CS8618
    public string predicate { get; set; } = string.Empty; 
    public int filteredCount { get; set; }

    public override IEnumerable<int> Apply()
    {
        if (predicate == "even")
            return dataSource.Where(x => x % 2 == 0);
        if (predicate == "odd")
            return dataSource.Where(x => x % 2 != 0);
        if (predicate.StartsWith(">"))
            return dataSource.Where(x => x > int.Parse(predicate.Substring(1)));
        if (predicate.StartsWith("<"))
            return dataSource.Where(x => x < int.Parse(predicate.Substring(1)));

        return dataSource;
    }

    public override List<int> Execute()
    {
        // Deferred execution happens here when ToList() is called
        List<int> resultList = Apply().ToList(); 
        
        filteredCount = resultList.Count;
        isExecuted = true;
        
        Console.WriteLine($"Filter Executed,Predicate:{predicate},Result Count:{filteredCount}");
        
        return resultList;
    }

    public override string GetQueryType()
    {
        return "Filter";
    }
}

public class AggregateQuery : Query
{
    // Initialized to string.Empty to fix CS8618
    public string operation { get; set; } = string.Empty; 
    public double result { get; set; }

    public override IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public override List<int> Execute()
    {
        // Null check is no longer strictly needed since we initialize it, but checking Count is good practice
        if (dataSource.Count > 0) 
        {
            if (operation == "Sum") result = dataSource.Sum();
            else if (operation == "Average") result = dataSource.Average();
            else if (operation == "Max") result = dataSource.Max();
            else if (operation == "Min") result = dataSource.Min();
        }

        isExecuted = true;
        
        Console.WriteLine($"Aggregation Executed,Operation:{operation},Result:{result}");
        
        // Fixes CS8603 because dataSource is guaranteed to be instantiated
        return dataSource; 
    }

    public override string GetQueryType()
    {
        return "Aggregate";
    }
}

public class Program
{
    public static void Main()
    {
        // Hardcoded Input
        string queryType = "Filter";
        List<int> data = new List<int> { 15, 3, 8, 12, 5, 20, 7 };
        string criteria = ">10";

        if (queryType == "Filter")
        {
            FilterQuery fq = new FilterQuery
            {
                dataSource = data,
                predicate = criteria
            };
            fq.Execute();
        }
        else if (queryType == "Aggregate")
        {
            AggregateQuery aq = new AggregateQuery
            {
                dataSource = data,
                operation = criteria
            };
            aq.Execute();
        }
    }
}
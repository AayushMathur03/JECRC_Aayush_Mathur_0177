using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Sample Input
        int[] accessLog = { 1, 3, 2, 3, 3, 4, 5, 3, 6, 7, 8, 9, 10, 3 };

        int K = 2;

        Console.WriteLine("--- Access Pattern Analysis ---\n");

        // -------------------------------
        // 1. Longest Consecutive Sequence
        // -------------------------------

        HashSet<int> set = new HashSet<int>(accessLog);

        List<int> longestSequence = new List<int>();

        foreach (int num in set)
        {
            // Start only if previous number does not exist
            if (!set.Contains(num - 1))
            {
                List<int> currentSequence = new List<int>();

                int current = num;

                while (set.Contains(current))
                {
                    currentSequence.Add(current);
                    current++;
                }

                if (currentSequence.Count > longestSequence.Count)
                {
                    longestSequence = currentSequence;
                }
            }
        }

        Console.WriteLine(
            $"Longest Consecutive Sequence: " +
            $"{string.Join(",", longestSequence)} " +
            $"(Length: {longestSequence.Count})\n");

        // -------------------------------
        // 2. Most Frequent Element
        // -------------------------------

        Dictionary<int, int> frequency =
            new Dictionary<int, int>();

        foreach (int num in accessLog)
        {
            if (frequency.ContainsKey(num))
                frequency[num]++;
            else
                frequency[num] = 1;
        }

        var mostFrequent =
            frequency.OrderByDescending(x => x.Value).First();

        Console.WriteLine(
            $"Most Frequent Element: " +
            $"{mostFrequent.Key} " +
            $"(appears {mostFrequent.Value} times)\n");

        // -------------------------------
        // 3. First Non-Repeating Element
        // -------------------------------

        int firstNonRepeating = -1;

        foreach (int num in accessLog)
        {
            if (frequency[num] == 1)
            {
                firstNonRepeating = num;
                break;
            }
        }

        Console.WriteLine(
            $"First Non-Repeating Element: " +
            $"{firstNonRepeating}\n");

        // -------------------------------
        // 4. Pairs with Difference K
        // -------------------------------

        Console.WriteLine($"Pairs with Difference {K}:\n");

        List<string> pairs = new List<string>();

        foreach (int num in set)
        {
            if (set.Contains(num + K))
            {
                pairs.Add($"({num}, {num + K})");
            }
        }

        Console.WriteLine(string.Join(", ", pairs));
        Console.WriteLine();

        // -------------------------------
        // 5. Majority Element
        // -------------------------------

        int n = accessLog.Length;

        int majorityNumber = mostFrequent.Key;
        int count = mostFrequent.Value;

        double percentage =
            ((double)count / n) * 100;

        bool isMajority = count > n / 2;

        Console.WriteLine(
            $"Majority Element: {majorityNumber} " +
            $"(appears {count} out of {n} times - " +
            $"{percentage:F1}% - " +
            $"{(isMajority ? "Majority" : "No majority")})");
    }
}
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Sample Input
        int[] prices = { 299, 499, 199, 399, 599, 159, 699, 259 };

        int targetSum = 698;

        Console.WriteLine("--- Product Price Analysis ---\n");

        // -----------------------------------
        // Original Prices
        // -----------------------------------

        Console.WriteLine(
            "Original Prices: " +
            string.Join(", ", prices));

        // -----------------------------------
        // Bubble Sort (Ascending)
        // -----------------------------------

        int[] sortedPrices = (int[])prices.Clone();

        for (int i = 0; i < sortedPrices.Length - 1; i++)
        {
            for (int j = 0; j < sortedPrices.Length - i - 1; j++)
            {
                if (sortedPrices[j] > sortedPrices[j + 1])
                {
                    int temp = sortedPrices[j];
                    sortedPrices[j] = sortedPrices[j + 1];
                    sortedPrices[j + 1] = temp;
                }
            }
        }

        Console.WriteLine(
            "\nSorted Prices (Ascending): " +
            string.Join(", ", sortedPrices));

        // -----------------------------------
        // Binary Search
        // -----------------------------------

        Console.WriteLine("\nBinary Search Results:\n");

        int search1 = 399;
        int index1 = BinarySearch(sortedPrices, search1);

        if (index1 != -1)
            Console.WriteLine(
                $"Price {search1} found at index {index1}");
        else
            Console.WriteLine(
                $"Price {search1} not found");

        int search2 = 500;
        int index2 = BinarySearch(sortedPrices, search2);

        if (index2 != -1)
            Console.WriteLine(
                $"Price {search2} found at index {index2}");
        else
            Console.WriteLine(
                $"Price {search2} not found");

        // -----------------------------------
        // Pairs with Target Sum
        // -----------------------------------

        Console.WriteLine(
            $"\nPairs that sum to {targetSum}:\n");

        HashSet<int> set = new HashSet<int>();

        foreach (int price in sortedPrices)
        {
            int complement = targetSum - price;

            if (set.Contains(complement))
            {
                Console.WriteLine(
                    $"({complement}, {price})");
            }

            set.Add(price);
        }

        // -----------------------------------
        // Longest Increasing Subsequence
        // -----------------------------------

        Console.WriteLine(
            "\nLongest Increasing Subsequence:\n");

        List<int> lis = LongestIncreasingSubsequence(sortedPrices);

        Console.WriteLine(
            $"{string.Join(", ", lis)} " +
            $"(Length: {lis.Count})");

        // -----------------------------------
        // Statistics
        // -----------------------------------

        Console.WriteLine("\nStatistics:\n");

        int lowest = sortedPrices.Min();

        int highest = sortedPrices.Max();

        double average = sortedPrices.Average();

        double median;

        int n = sortedPrices.Length;

        if (n % 2 == 0)
        {
            median =
                (sortedPrices[n / 2 - 1] +
                 sortedPrices[n / 2]) / 2.0;
        }
        else
        {
            median = sortedPrices[n / 2];
        }

        Console.WriteLine($"Lowest Price: {lowest}");

        Console.WriteLine($"Highest Price: {highest}");

        Console.WriteLine(
            $"Average Price: {average:F2}");

        Console.WriteLine(
            $"Median Price: {median:F2}");
    }

    // -----------------------------------
    // Binary Search Method
    // -----------------------------------

    static int BinarySearch(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            if (arr[mid] == target)
                return mid;

            else if (arr[mid] < target)
                left = mid + 1;

            else
                right = mid - 1;
        }

        return -1;
    }

    // -----------------------------------
    // Longest Increasing Subsequence
    // -----------------------------------

    static List<int> LongestIncreasingSubsequence(
        int[] arr)
    {
        List<int> lis = new List<int>();

        lis.Add(arr[0]);

        for (int i = 1; i < arr.Length; i++)
        {
            if (arr[i] > lis[lis.Count - 1])
            {
                lis.Add(arr[i]);
            }
        }

        return lis;
    }
}
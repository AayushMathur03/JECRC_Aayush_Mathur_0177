using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Customers in each category
        HashSet<string> electronics = new HashSet<string>
        {
            "C001","C002","C003","C005","C008"
        };

        HashSet<string> clothing = new HashSet<string>
        {
            "C002","C004","C005","C006","C009"
        };

        HashSet<string> books = new HashSet<string>
        {
            "C003","C005","C007","C008","C010"
        };

        Console.WriteLine("--- Customer Preference Analysis ---\n");

        // 1. Union → Customers in ANY category
        HashSet<string> anyCategory = new HashSet<string>(electronics);

        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        Console.WriteLine("1. Customers in ANY category (Union):");
        Console.WriteLine(string.Join(", ", anyCategory));
        Console.WriteLine($"Total: {anyCategory.Count} customers\n");


        // 2. Intersection → Customers in ALL categories
        HashSet<string> allCategories = new HashSet<string>(electronics);

        allCategories.IntersectWith(clothing);
        allCategories.IntersectWith(books);

        Console.WriteLine("2. Customers in ALL categories (Intersection):");
        Console.WriteLine(string.Join(", ", allCategories));
        Console.WriteLine($"Total: {allCategories.Count} customer\n");


        // 3. ONLY Electronics
        HashSet<string> onlyElectronics = new HashSet<string>(electronics);

        onlyElectronics.ExceptWith(clothing);
        onlyElectronics.ExceptWith(books);

        Console.WriteLine("3. Customers ONLY in Electronics (Difference):");
        Console.WriteLine(string.Join(", ", onlyElectronics));
        Console.WriteLine($"Total: {onlyElectronics.Count} customers\n");


        // 4. Electronics AND Books but NOT Clothing
        HashSet<string> elecAndBooks = new HashSet<string>(electronics);

        elecAndBooks.IntersectWith(books);
        elecAndBooks.ExceptWith(clothing);

        Console.WriteLine("4. Customers in Electronics AND Books but NOT Clothing:");
        Console.WriteLine(string.Join(", ", elecAndBooks));
        Console.WriteLine($"Total: {elecAndBooks.Count} customers");
    }
}
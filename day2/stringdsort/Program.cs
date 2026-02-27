using System;

class Program
{
    static void Main(string[] args)
    {

        string[] names = new string[5];

        Console.WriteLine("Enter 5 names:");

        for (int i = 0; i < names.Length; i++)
        {
            names[i] = Console.ReadLine();
        }

        // Sorting the array
        Array.Sort(names);

        // Display sorted array
        Console.WriteLine("\nSorted Names:");
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }

        Console.ReadLine();
    }
}

using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Enter 3 letters:");

        char letter1 = Console.ReadLine()[0];
        char letter2 = Console.ReadLine()[0];
        char letter3 = Console.ReadLine()[0];
        char letter4 = Console.ReadLine();

        // Display in reverse order
        Console.WriteLine("Letters in reverse order:");
        Console.WriteLine($"{letter3} {letter2} {letter1}");
    }
}

using System;
class Sampleif
{
    public static void Main()
    {
        int a, b;
        Console.WriteLine("Enter the value of a and b");
        a = int.Parse(Console.ReadLine());
        b = int.Parse(Console.ReadLine());
        if (a > b)
        {
            Console.WriteLine("a is greater than b");
        }
        else
        {
            Console.WriteLine("b is greater than a");
        }
    }
}
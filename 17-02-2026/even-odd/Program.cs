using System;

class Program
{
    static void Main()
    {
        Console.Write("Input First number: ");
        int num1 = Convert.ToInt32(Console.ReadLine());

        Console.Write("Input Second number: ");
        int num2 = Convert.ToInt32(Console.ReadLine());

        bool result = (num1 % 2 == 0 && num2 % 2 == 0) ||
                      (num1 % 2 != 0 && num2 % 2 != 0);

        Console.WriteLine(result);
    }
}

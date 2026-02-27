using System;

class ODLExcercise
{
    public static void Addition(int a, int b)
    {
        Console.WriteLine("The sum of {0} and {1} is: {2}", a, b, a + b);
    }

    public static void Subtraction(int a, int b)
    {
        Console.WriteLine("The difference of {0} and {2} is: {1}", a, b, a - b);
    }

    public static void Multiplication(int a, int b)
    {
        Console.WriteLine("The product of {0} and {1} is: {2}", a, b, a * b);
    }

    public static void Division(int a, int b)
    {
        if (b == 0)
        {
            Console.WriteLine("Error: Division by zero is not allowed.");
        }
        else
        {
            Console.WriteLine("The quotient of {0} and {1} is: {2}", a, b, a / b);
        }
    }


    public static void Main(string[] args)
    {
        int num1 = int.Parse(Console.ReadLine());
        int num2 = int.Parse(Console.ReadLine());
        Console.WriteLine("Performing operations on {0} and {1}:", num1, num2);

        Addition(num1, num2);
        Subtraction(num1, num2);
        Multiplication(num1, num2);
        Division(num1, num2);
    }
}
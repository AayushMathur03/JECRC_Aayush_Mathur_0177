using System;

class Program
{
    static void Main(string[] args)
    {
        int num = 2;
        begin:
        switch (num)
        {
            case 1:
                Console.WriteLine("One");
                break;

            case 2:
                Console.WriteLine("Two");
                break;

            default:
                Console.WriteLine("Other Number");
                break;
        }
    }
}

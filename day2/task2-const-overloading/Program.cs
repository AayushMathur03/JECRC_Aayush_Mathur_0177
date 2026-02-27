using System;

public class ODLExcercise
{
     public static int number ;

    public int Number {get {return number;}}

    public ODLExcercise()
    {
        Random r = new Random();
        number =r.Next();
    }

    public ODLExcercise(int seed)
    {
        Random r = new Random(seed);
        number =r.Next();
    }
}

class Program
{
    static void Main(string[] args)
    {
        ODLExcercise num = new ODLExcercise();
        Console.WriteLine(num.Number);

        ODLExcercise num1 = new ODLExcercise(10);
        ODLExcercise num2 = new ODLExcercise(10);
        
        Console.WriteLine(num1.Number);
    }
}



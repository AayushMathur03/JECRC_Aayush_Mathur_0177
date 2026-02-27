using System;
class Program
{
    static void Main(string[] args)
    {
        int marks = 85;
        Console.WriteLine("Boxing and Unboxing in C#");
        Console.WriteLine("Marks: " + marks);
        //object is refreence type and int is value type
        object objmarks = marks; // Boxing
        Console.WriteLine("Boxed Marks: " + objmarks);

        int unboxedMarks = (int)objmarks; // Unboxing
        Console.WriteLine("Unboxed Marks: " + unboxedMarks);

        unboxedMarks += 5; // Modifying unboxed value
        Console.WriteLine("Modified Unboxed Marks: " + unboxedMarks);
    }
}
/*
 * 
 * Doubt1:- There is no public static void Main() in my Program.cs, then how is my C# Console App still running?
 * 
 * Ans:-
 In .NET 5 and later, C# supports Top-Level Statements, which allow developers to write code without explicitly defining the Main() method.
The compiler automatically generates the Main() method behind the scenes, making the code cleaner and reducing boilerplate
 
 */

using ProductManagementSystem;  

ProductService service = new ProductService();

while (true)
{
    Console.WriteLine("\n1.Insert");
    Console.WriteLine("2.View All");
    Console.WriteLine("3.Search By Id");
    Console.WriteLine("4.Search By Category");
    Console.WriteLine("5.Update");
    Console.WriteLine("6.Delete");
    Console.WriteLine("7.Sort By Price");
    Console.WriteLine("8.Exit");

    int choice = Convert.ToInt32(Console.ReadLine());

    switch (choice)
    {
        case 1: service.InsertProduct(); break;
        case 2: service.ViewProducts(); break;
        case 3: service.SearchById(); break;
        case 4: service.SearchByCategory(); break;
        case 5: service.UpdateProduct(); break;
        case 6: service.DeleteProduct(); break;
        case 7: service.SortProducts(); break;
        case 8: return;
    }
}
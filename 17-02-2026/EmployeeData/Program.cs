using System;
using System.Dynamic;

namespace ConsoleApp
{
    class Employee
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public double Salary { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfJoining { get; set; }

        public void GetEmployeeData()
        {
            Console.WriteLine("Enter Employee Name:");
            Name = Console.ReadLine();
            
            Console.WriteLine("Enter Employee Id:");
            Id = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Department:");
            Department = Console.ReadLine();
            
            Console.WriteLine("Enter Position:");
            Position = Console.ReadLine();
            
            Console.WriteLine("Enter Salary:");
            Salary = Convert.ToDouble(Console.ReadLine());
            
            Console.WriteLine("Enter Email:");
            Email = Console.ReadLine();
            
            Console.WriteLine("Enter Phone Number:");
            Phone = Console.ReadLine();
            
            Console.WriteLine("Enter Date of Joining (yyyy-MM-dd):");
            DateOfJoining = DateTime.ParseExact(Console.ReadLine(), "yyyy-MM-dd", null);
        }

        public void DisplayEmployeeData()
        {
            Console.WriteLine($"Employee Name: {Name}");
            Console.WriteLine($"Employee Id: {Id}");
            Console.WriteLine($"Department: {Department}");
            Console.WriteLine($"Position: {Position}");
            Console.WriteLine($"Salary: ${Salary:F2}");
            Console.WriteLine($"Email: {Email}");
            Console.WriteLine($"Phone: {Phone}");
            Console.WriteLine($"Date of Joining: {DateOfJoining:yyyy-MM-dd}");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Employee emp = new Employee();
            emp.GetEmployeeData();
            emp.DisplayEmployeeData();

            Console.ReadLine();
        }
    }
}


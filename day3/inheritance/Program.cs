using System;

namespace InheritanceDemo
{
    public class Person
    {
        protected string name;
        protected int age;

        public void GetInformation()
        {
            Console.WriteLine("Enter name:");
            name = Console.ReadLine();

            Console.WriteLine("Enter age:");
            age = int.Parse(Console.ReadLine());
        }

        public void DisplayInformation()
        {
            Console.WriteLine("Welcome to .NET Training Mr/Mrs {0}, your age is {1}", name, age);
        }
    }

    public class Employee : Person
    {
        private string companyName;
        private string employeeID;

        public int EmployeeScore;

        public int GetEmployeeScore()
        {
            Console.WriteLine("Enter your company name:");
            companyName = Console.ReadLine();

            Console.WriteLine("Enter your Employee ID:");
            employeeID = Console.ReadLine();

            Console.WriteLine("Enter your Employee Score:");
            EmployeeScore = int.Parse(Console.ReadLine());

            return EmployeeScore;
        }

        public void DisplayEmployeeScore()
        {
            Console.WriteLine("Your company name is {0}, your employee ID is {1} and your score is {2}",
                                companyName, employeeID, EmployeeScore);
        }
    }

    interface IDepartment
    {
        string DepartmentName{get; set;}
        void DisplayDepartmentDetails(); 
    }
    public class EmployeeGradeLevel : Employee, IDepartment
    {
        public string DepartmentName { 
        get; 
        set; 
        }

        public void DisplayDepartmentDetails()
        {
         Console.WriteLine("Department: {DepartmentName}");
         //Console.WriteLine("Department: {0}", DepartmentName); we can also use this format to display the department name instead of using string interpolation
        }

        public void Eligibility()
        {
            if (EmployeeScore >= 150)// this.GetEmployeeScore() >= 150) // you can also call the method to get the score instead of using the variable
            {
                Console.WriteLine("You are eligible for promotion to the next grade level.");
            }
            else
            {
                Console.WriteLine("You are not eligible for promotion to the next grade level.");
            }
        }
    }

    public class TestProgram
    {
        public static void Main(string[] args)
        {
            EmployeeGradeLevel emp = new EmployeeGradeLevel();

            emp.GetInformation();
            emp.DisplayInformation();

            
            emp.GetEmployeeScore();
            emp.DisplayEmployeeScore();

            emp.Eligibility();
            emp.DepartmentName = "IT";
            emp.DisplayDepartmentDetails();


        }
    }
}

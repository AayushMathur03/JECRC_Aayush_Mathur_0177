using System;
using System.Collections.Generic;
using System.Linq;

class Student
{
    public string Name;
    public int[] Grades;

    public Student(string name, int[] grades)
    {
        Name = name;
        Grades = grades;
    }
}

class Program
{
    static void Main()
    {
        // Sample Input
        List<Student> students = new List<Student>()
        {
            new Student("John",  new int[] { 85, 90, 78, 92 }),
            new Student("Sarah", new int[] { 95, 88, 91, 89 }),
            new Student("Mike",  new int[] { 70, 65, 80, 75 }),
            new Student("Emma",  new int[] { 88, 92, 94, 96 })
        };

        Console.WriteLine("--- Student Grade Report ---\n");

        // Variables for top performer
        string topStudent = "";
        double highestAverage = 0;

        // HashSet for unique grades
        HashSet<int> uniqueGrades = new HashSet<int>();

        // -----------------------------
        // Student Statistics
        // -----------------------------

        foreach (Student student in students)
        {
            double average = student.Grades.Average();

            int highest = student.Grades.Max();

            int lowest = student.Grades.Min();

            Console.WriteLine(
                $"{student.Name}: " +
                $"Average = {average:F2}, " +
                $"Highest = {highest}, " +
                $"Lowest = {lowest}");

            // Check top performer
            if (average > highestAverage)
            {
                highestAverage = average;
                topStudent = student.Name;
            }

            // Add grades to HashSet
            foreach (int grade in student.Grades)
            {
                uniqueGrades.Add(grade);
            }
        }

        // -----------------------------
        // Top Performer
        // -----------------------------

        Console.WriteLine(
            $"\nTop Performer: {topStudent} " +
            $"(Average: {highestAverage:F2})\n");

        // -----------------------------
        // Students with all grades >= 80
        // -----------------------------

        Console.WriteLine("Students with all grades >= 80:\n");

        foreach (Student student in students)
        {
            bool allAbove80 = true;

            foreach (int grade in student.Grades)
            {
                if (grade < 80)
                {
                    allAbove80 = false;
                    break;
                }
            }

            if (allAbove80)
            {
                Console.WriteLine(
                    $"{student.Name} " +
                    $"({string.Join(",", student.Grades)})");
            }
        }

        // -----------------------------
        // Unique Grade Values
        // -----------------------------

        Console.WriteLine("\nUnique Grade Values Across All Students:\n");

        List<int> sortedGrades =
            uniqueGrades.OrderBy(x => x).ToList();

        Console.WriteLine(string.Join(",", sortedGrades));

        Console.WriteLine(
            $"\nTotal unique grades: {uniqueGrades.Count}");
    }
}
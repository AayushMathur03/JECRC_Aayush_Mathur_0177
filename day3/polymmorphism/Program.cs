using System;
    
class Car
{
    public string Name;
    public int NumberOfDoors;

    public Car()
    {
        Name = "No name";
        NumberOfDoors = 3;
    }

    public Car(string name, int numberOfDoors)
    {
        Name = name;
        NumberOfDoors = numberOfDoors;
    }

    public Car(string name)
    {
        Name = name;
        NumberOfDoors = 0;
    }

    public Car(int numberOfDoors)
    {
        Name = "";
        NumberOfDoors = numberOfDoors;
    }
}

class ODLExcercise
{
    static void Main(string[] args)
    {
        Car c1 = new Car();
        Car c2 = new Car(3);
        Car c3 = new Car("MyName");
        Car c4 = new Car("MyName", 4);

        Console.WriteLine(c1.NumberOfDoors);
        Console.WriteLine(c2.Name);
    }
}

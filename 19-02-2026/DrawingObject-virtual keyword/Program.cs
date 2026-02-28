public class DrawingObject
{
    public virtual void Draw()
    {
        // Console.WriteLine("Drawing an object.");
    }
}

public class Circle : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle.");
    }
}

public class Line : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a line.");
    }
}

public class Square : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a square.");
    }
}

class Test
{
    public static void Main(string[] args)
    {
        // int[] arr = new int[3];
        DrawingObject[] objects = new DrawingObject[3];
        objects[0] = new Circle();
        objects[1] = new Line();
        objects[2] = new Square();

        foreach (DrawingObject obj in objects)
        {
            obj.Draw();
        }
    }
}
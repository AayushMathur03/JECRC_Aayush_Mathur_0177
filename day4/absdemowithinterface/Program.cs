namespace AbstractDemo
{
    public abstract class CalcArea
    {
        public abstract void Area(double radius);
        public void bFunction()
        {
            Console.WriteLine("I am not an abstract method.");
        }
    }

    interface IVolume
    {
        void CalcVolume(int side);
    }

    public class CircleCube : CalcArea, IVolume
    {
        public override void Area(double radius)
        {
            double pie = 3.14;
            double result = pie * radius * radius;
            Console.WriteLine("Area of Circle: " + result);
        
        public void CalcVolume(int side)
        {
            int result = side * side * side;
            Console.WriteLine("Volume of Cube: " + result);
        }
    }

    class TestApp
    {
        public static void Main(string[] args)
        {
            CircleCube obj = new CircleCube();

            Console.WriteLine("Enter the value for radius:");

            double radius = double.Parse(Console.ReadLine());
            // double radius = Convert.ToDouble(Console.ReadLine());
            // Convert.ToDouble handles null input safely by returning 0.0 whereas double.Parse throws ArgumentNullException.
            obj.Area(radius);

            obj.bFunction();
            int side = int.Parse(Console.ReadLine());
            // double side = Convert.ToInt32(Console.ReadLine()); 
            obj.CalcVolume(side);
        }
    } 
    }
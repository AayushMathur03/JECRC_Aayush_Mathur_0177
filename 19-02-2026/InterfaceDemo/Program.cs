namespace InterfaceDemo
{
    interface IArea
    {
        void CalcArea(double radius);
    }

    interface IVolume
    {
        void CalcVolume(int side);
    }

    public class CircleCube : IArea
    {
        public void CalcArea(double radius)
        {
            double pie = 3.14;
            double result = pie * radius * radius;
            Console.WriteLine("Area of Circle: " + result);
        }

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
            obj.CalcArea(radius);

            int side = int.Parse(Console.ReadLine());
            // double side = Convert.ToInt32(Console.ReadLine()); 
            obj.CalcVolume(side);
        }
    } 
}
namespace Delegatedemo
{
    // can mention delagate outside the class, but it should be in the namespace, and public, so that it can be used in other classes as well
    public delegate void ArithmeticOperation(int x, int y);
    class UsingDelegates
    {
        // delegate declaration, it can also be in the class, and public, so that it can be used in other classes as well
        public delegate void ArithmeticOperation(int x, int y);

        //this fucntion is not matching the delegate signature, so it will not be used in the delegate invocation list
        static void Simple()
        {
            Console.WriteLine("no params add functions");
        }

        static void Add(int x, int y)
        {
            Console.WriteLine($"Addition: {x} + {y} = {x + y}");
        }

        static void Sub(int x, int y)
        {
            Console.WriteLine($"Subtraction: {x} - {y} = {x - y}");
        }

        static void Multi(int x, int y)
        {
            Console.WriteLine($"Multiplication: {x} * {y} = {x * y}");
        }

        static void Div(int x, int y)
        {
            Console.WriteLine($"Division: {x} / {y} = {x / y}");
        }

        static void Main(string[] args)
        {
            //single cast delegate
            ArithmeticOperation obj = new ArithmeticOperation(Add);
            obj(45, 30);
            ArithmeticOperation obj1 = new ArithmeticOperation(Sub);
            obj1(45, 30);

            Console.ReadLine();

            //multicast delegates
            ArithmeticOperation obj2 = new ArithmeticOperation(Add);

            obj2 += new ArithmeticOperation(Sub);
            obj2 += new ArithmeticOperation(Multi);
            obj2 += new ArithmeticOperation(Div);
            
            // obj2 += Sub;
            // obj2 += Multi;
            // obj2 += Div;

            obj2(45, 30);
            Console.ReadLine();

            obj2 += new ArithmeticOperation(Div);
            obj2(45, 30);
            Console.ReadLine();

        }
    }
}
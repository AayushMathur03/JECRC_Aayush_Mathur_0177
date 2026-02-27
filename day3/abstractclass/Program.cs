// sealed-example
class GroupAgent
{
    public virtual void show()
    {
        Console.WriteLine("Group Agent");
        Console.ReadLine();
    }
}

  class Agent : GroupAgent
    {
        public sealed override void show()   {
            Console.WriteLine("Agent created !!!");
            Console.ReadLine();
        }
    }
class Booking : Agent
{
    public override void show()
    {
        Console.WriteLine("Booking created !!!");
        Console.ReadLine();
    }
}

class ODLEx
{
    public static void Main()
    {
        GroupAgent ga = new GroupAgent();
        ga.show();

        Agent a = new Agent();
        a.show();

        GroupAgent ga2 = new Agent();   
        ga2.show();

    }
}
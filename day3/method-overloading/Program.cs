using System;
// it is not overding it is over hiding because the method is not virtual in the base class and we are using new keyword to hide the base class method
class GroupAgent
{
    public void show()
    {
        Console.WriteLine("Group Agent");
        Console.ReadLine();
    }
}

  class Agent : GroupAgent
    {
        public new void show() // over hiding the show method of GroupAgent
        {
            Console.WriteLine("Agent created !!!");
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
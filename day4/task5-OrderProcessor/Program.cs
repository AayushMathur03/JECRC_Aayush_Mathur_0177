using System;

namespace task5
{
    public abstract class OrderProcessor
    {
        
        public int OrderId { get; set; }
        public int Amount { get; set; }

        public OrderProcessor(int orderId, int amount)
        {
            OrderId = orderId;
            Amount = amount;
        }

        public abstract void ProcessPayment();
        public abstract void GenerateInvoice();
        public abstract void SendNotification();

        
        public void DisplayOrderDetails()
        {
            Console.WriteLine("\nOrder Details");
            Console.WriteLine("Order ID: " + OrderId);
            Console.WriteLine("Amount: " + Amount);
        }
    }

    
    public class OnlineOrder : OrderProcessor
    {
        
        public OnlineOrder(int orderId, int amount) : base(orderId, amount)
        {
        }

        
        public override void ProcessPayment()
        {
            Console.WriteLine("Processing online payment...");
        }

        
        public override void GenerateInvoice()
        {
            Console.WriteLine("Generating digital invoice...");
        }

        
        public override void SendNotification()
        {
            Console.WriteLine("Sending email notification...");
        }
    }

    class Test
    {
        public static void Main(string[] args)
        {
            
            OrderProcessor order = new OnlineOrder(101, 5000);

        
            order.DisplayOrderDetails();
            order.ProcessPayment();
            order.GenerateInvoice();
            order.SendNotification();
        }
    }
}

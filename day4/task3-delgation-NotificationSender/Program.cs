namespace task3{
    public delegate void NotificationSender(string message);

    public class Notifiers
    {
        public static void SendMail(string message)
        {
            Console.WriteLine($"Sending mail: {message}");
        }

        public static void SendSMS(string message)
        {
            Console.WriteLine($"Sending SMS: {message}");
        }
        
        public static void SendPushNotification(string message)
        {
            Console.WriteLine($"Sending push notification: {message}");
        }
    }

    public class NotificationManager
    {
        public void NotifyUser(string message, NotificationSender sender)
        {
            sender(message);
        }
    }

    public class Test
    {
        public static void Main(string[] args)
        {

        NotificationManager obj = new NotificationManager();
        obj.NotifyUser("Hello, this is a notification!", Notifiers.SendMail);
        // NotificationManager.NotifyUser("Hello, this is a notification!", Notifiers.SendMail);
        // NotificationManager.NotifyUser("Hello, this is a notification!", Notifiers.SendSMS);
        // NotificationManager.NotifyUser("Hello, this is a notification!", Notifiers.SendPushNotification);
           
        }
    }
}
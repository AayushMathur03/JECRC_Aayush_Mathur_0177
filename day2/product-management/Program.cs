using System;

namespace ProductManagement
{
    class Product
    {
        public int ProductID;
        public string ProductName;
        public DateTime ExpiryDate;
        public int ProductQuantity;
        public string ISOStandard;
        public double Price;

        public void DisplayProductDetails()
        {
            Console.WriteLine("\n--- Product Details ---");
            Console.WriteLine("Product ID: " + ProductID);
            Console.WriteLine("Product Name: " + ProductName);
            Console.WriteLine("Expiry Date: " + ExpiryDate.ToShortDateString());
            Console.WriteLine("Product Quantity: " + ProductQuantity);
            Console.WriteLine("ISO Standard: " + ISOStandard);
            Console.WriteLine("Price: ₹" + Price);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Product p1 = new Product();

            Console.Write("Enter Product ID: ");
            p1.ProductID = Convert.ToInt32(Console.ReadLine());

            Console.Write("Enter Product Name: ");
            p1.ProductName = Console.ReadLine();

            Console.Write("Enter Expiry Date (yyyy-mm-dd): ");
            p1.ExpiryDate = Convert.ToDateTime(Console.ReadLine());

            Console.Write("Enter Product Quantity: ");
            p1.ProductQuantity = Convert.ToInt32(Console.ReadLine());

            Console.Write("Enter ISO Standard: ");
            p1.ISOStandard = Console.ReadLine();

            Console.Write("Enter Price: ");
            p1.Price = Convert.ToDouble(Console.ReadLine());

            p1.DisplayProductDetails();

            Console.ReadLine();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;

namespace ProductDemo
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsStock { get; set; }  
    }

    public class ProductCatalog
    {
        private List<Product> Products{get; set;} 
        public ProductCatalog()
        {
            Products = new List<Product>
            {
                new Product { Id = 100, Name = "Laptop", Description = "A high-performance laptop", Price = 75000, IsStock = true },
                new Product { Id = 101, Name = "Smartphone", Description = "A latest model smartphone", Price = 499.99, IsStock = true },
                new Product { Id = 102, Name = "Headphones", Description = "Noise-cancelling headphones", Price = 199.99, IsStock = false },
                new Product { Id = 103, Name = "Smartwatch", Description = "A smartwatch with fitness tracking", Price = 299.99, IsStock = true },
                new Product { Id = 104, Name = "Tablet", Description = "A lightweight tablet for work and play", Price = 399.99, IsStock = false }
            };

            //Products = new List<Product>();
        }

        public void DisplayProducts()
        {
            Console.WriteLine("Product Catalog:");
            foreach (var product in Products)
            {
                Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Description: {product.Description}, Price: ${product.Price}, In Stock: {product.IsStock}");
            }
        }

        // public void AddProduct(Product product)
        // {
        //     Products.Add(product);
        //     // Console.WriteLine($"Product '{product.Name}' added to the catalog.");
        // }

        public void AddProduct(Product product)
        {
            Product newProduct = new Product();
            Console.WriteLine("Enter Product ID: ");
            newProduct.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Product Name: ");
            newProduct.Name = Console.ReadLine();
            Console.WriteLine("Enter Product Description: ");
            newProduct.Description = Console.ReadLine();
            Console.WriteLine("Enter Product Price: ");
            newProduct.Price = double.Parse(Console.ReadLine());
            Console.WriteLine("Is the Product in Stock? (true/false): ");
            newProduct.IsStock = bool.Parse(Console.ReadLine());

            Products.Add(newProduct);
        }

        public bool DeleteProduct(int Id)
        {
            var productId = Products.FirstOrDefault(p => p.Id == Id);
            if (productId == null)
            {
                Console.WriteLine($"Product with ID {Id} not found.");
                return false;
            }
            Products.Remove(productId);
            Console.WriteLine($"Product with ID {Id} has been removed.");
            return true;
        }
    }

    class TestProduct
    {
        public static void Main()
        {
            ProductCatalog catalog = new ProductCatalog();
            int choice ;
            int idToDelete ;
            do
            {
                Console.WriteLine("\n 1. Add Product");
                Console.WriteLine("\n 2. Display Product");
                Console.WriteLine("\n 3. Delete Product");
                Console.WriteLine("\n 0. Exit");
                Console.WriteLine("\n 4. Enter your Choice: ");
                choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        catalog.AddProduct(new Product());
                        break;
                    case 2:
                        catalog.DisplayProducts();
                        break;
                    case 3:
                            Console.WriteLine("Enter Product ID to delete: ");
                            idToDelete = Convert.ToInt32(Console.ReadLine());
                            catalog.DeleteProduct(idToDelete);
                            break;
                    case 0:
                        Console.WriteLine("Bye Bye, Exiting the program.");
                        return;
                    default:
                        Console.WriteLine("Invalid choice. Please try again.");
                        break;
                }
            }while(choice !=3);

            catalog.DisplayProducts();
        }
    }
}
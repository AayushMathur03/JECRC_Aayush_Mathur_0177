using System;
using System.Collections.Generic;
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
        private List<Product> Products ;
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
        }

        public void DisplayProducts()
        {
            Console.WriteLine("Product Catalog:");
            foreach (var product in Products)
            {
                Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Description: {product.Description}, Price: ${product.Price}, In Stock: {product.IsStock}");
            }
        }
    }

    class TestProduct
    {
        public static void Main()
        {
            ProductCatalog catalog = new ProductCatalog();
            catalog.DisplayProducts();
        }
    }
}
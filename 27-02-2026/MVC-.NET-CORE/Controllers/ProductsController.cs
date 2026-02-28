using Microsoft.AspNetCore.Mvc;
using MVC_.NET_CORE.Models;

namespace MVC_.NET_CORE.Controllers
{
    public class ProductsController : Controller
    {
        
        private static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Product 1", Price = 50000 },
            new Product { Id = 2, Name = "Product 2", Price = 500 },
            new Product { Id = 3, Name = "Product 3", Price = 1500 }
        };
    
        public IActionResult Index()
        {
            return View(products);
        }
    }
}

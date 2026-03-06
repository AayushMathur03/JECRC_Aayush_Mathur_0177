using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;          


namespace ProductAPI.Controllers
{
    // The ProductController class is responsible for handling HTTP requests related to products.
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // Dependency injection of the database context
        private readonly ApplicationDBContext _context;

        // Constructor to initialize the database context
        public ProductController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetProducts()
        {
            // Retrieve all products from the database and return them as a response
            var products = _context.Products.ToList();
            return Ok(products);
        }

    }
}
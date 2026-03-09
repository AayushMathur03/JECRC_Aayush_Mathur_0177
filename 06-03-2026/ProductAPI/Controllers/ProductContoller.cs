using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models;


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
        [HttpGet()]
        public IActionResult GetProducts()
        {
            // Retrieve all products from the database and return them a
            // s a response
            var products = _context.Products.ToList();
            return Ok(products);
        }

        // [HttpGet()]
        // public async Task<IActionResult> GetProductsAsync()
        // {
        //     // Retrieve all products from the database asynchronously and return them as a response
        //     var products = await _context.Products.ToListAsync();
        //     return Ok(products);
        // }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            // Retrieve a specific product from the database by its ID and return it as a response
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            // Add a new product to the database and return a response indicating the result
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updatedProduct)
        {
            var product = _context.Products.Find(id);
            if (id != updatedProduct.Id)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Quantity = updatedProduct.Quantity;
            _context.SaveChanges();
            return Ok(updatedProduct);
            //return Ok(product); //
            // Update an existing product in the database and return a response indicating the result
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
             var products = _context.Products.Find(id);
            if (products == null)            
                return NotFound();

                _context.Products.Remove(products);
                _context.SaveChanges();
                return NoContent();// Delete a product from the database by its ID and return a response indicating the result
        }

        [HttpGet("search")]
public IActionResult SearchProduct(string name)
{
    // Search products whose name contains the given text
    var products = _context.Products
                           .Where(p => p.Name.Contains(name))
                           .ToList();

    if (products == null || products.Count == 0)
    {
        return NotFound("No products found with the given name");
    }

    return Ok(products);
}
        


    }
}
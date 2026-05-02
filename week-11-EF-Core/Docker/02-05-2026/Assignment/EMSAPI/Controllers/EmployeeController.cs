using EMSAPI.Data;
using EMSAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Employees.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var emp = _context.Employees.Find(id);
            return emp == null ? NotFound() : Ok(emp);
        }

        [HttpPost]
        public IActionResult Create(Employee emp)
        {
            _context.Employees.Add(emp);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = emp.Id }, emp);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee emp)
        {
            var existing = _context.Employees.Find(id);
            if (existing == null) return NotFound();

            existing.Name = emp.Name;
            existing.Department = emp.Department;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var emp = _context.Employees.Find(id);
            if (emp == null) return NotFound();

            _context.Employees.Remove(emp);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
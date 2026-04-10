using EmployeePortal.models.dto;
using EmployeePortal.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        public static List<Employees> employees = new List<Employees>();    //treating this list as a database for now 

        public EmployeesController()
        {
            if (employees.Count == 0)
            {
                employees.Add(new Employees
                {
                    Id = Guid.NewGuid(),
                    Name = "John Doe",
                    Department = "HR",
                    Email = "john.doe@example.com",
                    Phone = "123-456-7890",
                    Salary = 50000,
                    Address = "123 Main St",
                    Password = "defaultPassword"
                });
            }
        }

        // GET: api/employees/{id}
        [HttpGet("{id}")]
        public IActionResult GetEmployeesById(Guid id)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            var response = new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Department = employee.Department,
                Email = employee.Email,
                Phone = employee.Phone,
                Salary = employee.Salary,
                Address = employee.Address
            };

            return Ok(response);
        }


        // GET: api/employees
        [HttpGet]
        public IActionResult GetEmployees()
        {
            var response = employees.Select(e => new EmployeeResponseDto
            {
                Id = e.Id,
                Name = e.Name,
                Department = e.Department,
                Email = e.Email,
                Phone = e.Phone,
                Salary = e.Salary,
                Address = e.Address
            }).ToList();
            
            return Ok(response);
        }

        // POST create employee : api/employees
        [HttpPost]
        
        public IActionResult CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newEmployee = new Employees
            {
                Id = Guid.NewGuid(),
                Name = createEmployeeDto.name,
                Email = createEmployeeDto.email,
                Department = createEmployeeDto.department,
                Password = createEmployeeDto.password,
                Phone = createEmployeeDto.phone,
                Salary = createEmployeeDto.salary,
                Address = createEmployeeDto.address,
            };
            employees.Add(newEmployee);

            var response = new EmployeeResponseDto
            {
                Id = newEmployee.Id,
                Name = newEmployee.Name,
                Department = newEmployee.Department,
                Email = newEmployee.Email,
                Phone = newEmployee.Phone,
                Salary = newEmployee.Salary,
                Address = newEmployee.Address
            };

            return CreatedAtAction(nameof(GetEmployeesById), new { id = response.Id }, response); 
        }

        // [HttpGet]
        // public IActionResult SalaryRangeCheck()
    }
}
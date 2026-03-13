using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseAPI.Data;
using SmartCourseAPI.DTOs;
using SmartCourseAPI.Models;

namespace SmartCourseAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _db;
    public StudentsController(AppDbContext db) => _db = db;

    // GET api/students
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Students.ToListAsync());

    // GET api/students/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var student = await _db.Students.FindAsync(id);
        return student is null ? NotFound(new { error = "Student not found" }) : Ok(student);
    }

    // POST api/students/login  — simple email-based lookup (no password for demo)
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] StudentLoginDto dto)
    {
        var student = await _db.Students.FirstOrDefaultAsync(s => s.Email == dto.Email);
        if (student is null) return NotFound(new { error = "Student not found" });
        return Ok(student);
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseAPI.Data;
using SmartCourseAPI.DTOs;
using SmartCourseAPI.Models;

namespace SmartCourseAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _db;
    public CoursesController(AppDbContext db) => _db = db;

    // FR1 – GET api/courses  (with optional search & department filter)
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int? departmentId)
    {
        var query = _db.Courses.Include(c => c.Department).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var q = search.ToLower();
            query = query.Where(c =>
                c.CourseName.ToLower().Contains(q) ||
                (c.Department != null && c.Department.DepartmentName.ToLower().Contains(q)));
        }

        if (departmentId.HasValue)
            query = query.Where(c => c.DepartmentId == departmentId.Value);

        var courses = await query.Select(c => new
        {
            c.CourseId,
            c.CourseName,
            c.DepartmentId,
            DepartmentName = c.Department != null ? c.Department.DepartmentName : "",
            c.Credits,
            c.SeatsAvailable,
            c.TotalSeats,
            c.EnrolledCount
        }).ToListAsync();

        return Ok(courses);
    }

    // GET api/courses/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var course = await _db.Courses
            .Include(c => c.Department)
            .Where(c => c.CourseId == id)
            .Select(c => new
            {
                c.CourseId,
                c.CourseName,
                c.DepartmentId,
                DepartmentName = c.Department != null ? c.Department.DepartmentName : "",
                c.Credits,
                c.SeatsAvailable,
                c.TotalSeats,
                c.EnrolledCount
            })
            .FirstOrDefaultAsync();

        return course is null ? NotFound(new { error = "Course not found" }) : Ok(course);
    }

    // FR3 – POST api/courses  (Admin only)
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CourseCreateDto dto)
    {
        var dept = await _db.Departments.FindAsync(dto.DepartmentId);
        if (dept is null) return BadRequest(new { error = "Department not found" });

        var course = new Course
        {
            CourseName     = dto.CourseName,
            DepartmentId   = dto.DepartmentId,
            Credits        = dto.Credits,
            TotalSeats     = dto.TotalSeats,
            SeatsAvailable = dto.TotalSeats > 0
        };

        _db.Courses.Add(course);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = course.CourseId }, course);
    }

    // FR4 – PUT api/courses/5  (Admin only)
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CourseUpdateDto dto)
    {
        var course = await _db.Courses.FindAsync(id);
        if (course is null) return NotFound(new { error = "Course not found" });

        course.CourseName   = dto.CourseName;
        course.DepartmentId = dto.DepartmentId;
        course.Credits      = dto.Credits;
        course.TotalSeats   = dto.TotalSeats;
        course.SeatsAvailable = course.EnrolledCount < dto.TotalSeats;

        await _db.SaveChangesAsync();
        return Ok(course);
    }

    // FR5 – DELETE api/courses/5  (Admin only)
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var course = await _db.Courses.FindAsync(id);
        if (course is null) return NotFound(new { error = "Course not found" });

        _db.Courses.Remove(course);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Course deleted successfully" });
    }
}

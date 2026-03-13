using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseAPI.Data;
using SmartCourseAPI.DTOs;
using SmartCourseAPI.Models;

namespace SmartCourseAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly AppDbContext _db;
    public EnrollmentsController(AppDbContext db) => _db = db;

    // FR8 – GET api/enrollments  (Admin – full history)
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Enrollments
            .Include(e => e.Course).ThenInclude(c => c!.Department)
            .Include(e => e.Student)
            .OrderByDescending(e => e.EnrollmentDate)
            .Select(e => new
            {
                e.EnrollmentId,
                e.StudentId,
                StudentName  = e.Student != null ? e.Student.Name : "",
                e.CourseId,
                CourseName   = e.Course != null ? e.Course.CourseName : "",
                DepartmentName = e.Course != null && e.Course.Department != null ? e.Course.Department.DepartmentName : "",
                e.EnrollmentDate,
                e.DropDate,
                e.IsActive
            })
            .ToListAsync());

    // GET api/enrollments/student/5  (FR – View My Enrollments)
    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetByStudent(int studentId) =>
        Ok(await _db.Enrollments
            .Where(e => e.StudentId == studentId && e.IsActive)
            .Include(e => e.Course).ThenInclude(c => c!.Department)
            .Select(e => new
            {
                e.EnrollmentId,
                e.CourseId,
                CourseName     = e.Course != null ? e.Course.CourseName : "",
                DepartmentName = e.Course != null && e.Course.Department != null ? e.Course.Department.DepartmentName : "",
                Credits        = e.Course != null ? e.Course.Credits : 0,
                TotalSeats     = e.Course != null ? e.Course.TotalSeats : 0,
                EnrolledCount  = e.Course != null ? e.Course.EnrolledCount : 0,
                e.EnrollmentDate
            })
            .ToListAsync());

    // FR6 – POST api/enrollments  (Enroll)
    [HttpPost]
    public async Task<IActionResult> Enroll([FromBody] EnrollRequestDto dto)
    {
        var student = await _db.Students.FindAsync(dto.StudentId);
        if (student is null) return NotFound(new { error = "Student not found" });

        var course = await _db.Courses.FindAsync(dto.CourseId);
        if (course is null) return NotFound(new { error = "Course not found" });

        // Check seats
        if (!course.SeatsAvailable)
            return BadRequest(new { error = "No seats available in this course" });

        // Check already enrolled
        var exists = await _db.Enrollments.AnyAsync(e =>
            e.StudentId == dto.StudentId && e.CourseId == dto.CourseId && e.IsActive);
        if (exists) return Conflict(new { error = "Already enrolled in this course" });

        var enrollment = new Enrollment
        {
            StudentId      = dto.StudentId,
            CourseId       = dto.CourseId,
            EnrollmentDate = DateTime.UtcNow,
            IsActive       = true
        };

        course.EnrolledCount++;
        course.SeatsAvailable = course.EnrolledCount < course.TotalSeats;

        _db.Enrollments.Add(enrollment);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetByStudent), new { studentId = dto.StudentId },
            new { message = "Enrolled successfully", enrollmentId = enrollment.EnrollmentId });
    }

    // FR7 – DELETE api/enrollments/drop  (Drop Course)
    [HttpDelete("drop")]
    public async Task<IActionResult> Drop([FromBody] DropRequestDto dto)
    {
        var enrollment = await _db.Enrollments.FirstOrDefaultAsync(e =>
            e.StudentId == dto.StudentId && e.CourseId == dto.CourseId && e.IsActive);

        if (enrollment is null) return NotFound(new { error = "Enrollment not found" });

        enrollment.IsActive = false;
        enrollment.DropDate = DateTime.UtcNow;

        var course = await _db.Courses.FindAsync(dto.CourseId);
        if (course != null)
        {
            course.EnrolledCount = Math.Max(0, course.EnrolledCount - 1);
            course.SeatsAvailable = course.EnrolledCount < course.TotalSeats;
        }

        await _db.SaveChangesAsync();
        return Ok(new { message = "Course dropped successfully" });
    }
}

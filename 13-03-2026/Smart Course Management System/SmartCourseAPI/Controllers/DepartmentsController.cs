using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseAPI.Data;

namespace SmartCourseAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly AppDbContext _db;
    public DepartmentsController(AppDbContext db) => _db = db;

    // GET api/departments
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Departments.ToListAsync());
}

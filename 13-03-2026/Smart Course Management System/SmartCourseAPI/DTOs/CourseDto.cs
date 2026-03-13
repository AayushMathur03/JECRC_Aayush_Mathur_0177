namespace SmartCourseAPI.DTOs;

public class CourseCreateDto
{
    public string CourseName { get; set; } = string.Empty;
    public int DepartmentId { get; set; }
    public int Credits { get; set; }
    public int TotalSeats { get; set; } = 30;
}

public class CourseUpdateDto
{
    public string CourseName { get; set; } = string.Empty;
    public int DepartmentId { get; set; }
    public int Credits { get; set; }
    public int TotalSeats { get; set; }
}

public class EnrollRequestDto
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
}

public class DropRequestDto
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
}

public class StudentLoginDto
{
    public string Email { get; set; } = string.Empty;
}

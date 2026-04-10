namespace EmployeePortal.Models.Entities
{
    public class Employees
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Department { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Phone { get; set; }
        public Decimal Salary { get; set; }
        public string? Address { get; set; }
    }
}
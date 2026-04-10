namespace EmployeePortal.models.dto
{
    public class EmployeeResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public decimal Salary { get; set; }
        public string? Address { get; set; }
    }
}

//Dto is use to hide the schema of the database and to return only the required data to the client. It is also used to validate the data before saving it to the database.
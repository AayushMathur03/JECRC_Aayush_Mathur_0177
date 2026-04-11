using System.ComponentModel.DataAnnotations;
using EmployeePortal.models.attributes;
using EmployeePortal_BE.models.dto;

namespace EmployeePortal.models.dto
{
  public class CreateEmployeeDto
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string name { get; set; }
        
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string department { get; set; }

        
        // public DateTime dateOfJoining { get; set; } = DateTime.Now;

        [Required]
        [EmailAddress]
        public string email { get; set; }
        
        [Required]
        [Password]
        public string password { get; set; }
        
        [Required]
        [Phone]
        [RegularExpression(@"^\+[1-9][1-9]-[6-9]\d{5,14}$", ErrorMessage = "Invalid phone number format.")]
        public string phone { get; set; }

        // [Range(1000,10000,ErrorMessage = "Salary must be between 1000 and 10000.")]
        
        [RangeSalary(1000, 10000)]
        public decimal salary { get; set; }
       

        [StringLength(50)]
        public AddressDto? address { get; set; }

        [Required]
        [Range(18, 60)]
        public int Age { get; set; }
    }
}

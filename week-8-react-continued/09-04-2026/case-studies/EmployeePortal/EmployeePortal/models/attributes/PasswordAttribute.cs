
using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.models.attributes;

class PasswordAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
    {
        if (value is string password)
        {
            if (password.Length < 8 || !password.Any(char.IsUpper) || !password.Any(char.IsLower) || !password.Any(char.IsDigit))
            {
                return new ValidationResult("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
            }
        }

        return ValidationResult.Success;
    }
}


//2.

// using System.ComponentModel.DataAnnotations;

// namespace EmployeePortal.models.attributes;

// class PasswordAttribute : ValidationAttribute
// {
//     private readonly int minLength;

//     public PasswordAttribute(int minLength)
//     {
//         this.minLength = minLength;
//     }

//     protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
//     {
//         if (value is string password)
//         {
//             if (password.Length < minLength ||
//                 !password.Any(char.IsUpper) ||
//                 !password.Any(char.IsLower) ||
//                 !password.Any(char.IsDigit))
//             {
//                 return new ValidationResult(
//                     $"Password must be at least {minLength} characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
//                 );
//             }
//         }

//         return ValidationResult.Success;
//     }
// }









using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.models.attributes;

class MinSalaryAttribute : ValidationAttribute
{
    private readonly int minSalary;

    public MinSalaryAttribute(int minSalary)
    {
        this.minSalary = minSalary;
    }

    protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
    {
        if (value is int salary && salary < minSalary)
        {
            return new ValidationResult($"The salary must be at least {minSalary}");
        }

        return ValidationResult.Success;
    }

}
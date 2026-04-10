using System.ComponentModel.DataAnnotations;

namespace Assessment01_ShoeShop.Models.Attributes
{
    public class ValidBrandAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            var brand = value as string;

            if (string.IsNullOrEmpty(brand))
                return new ValidationResult("Brand is required");

            if (brand.Length < 2)
                return new ValidationResult("Brand must be at least 2 characters");

            return ValidationResult.Success;
        }
    }
}
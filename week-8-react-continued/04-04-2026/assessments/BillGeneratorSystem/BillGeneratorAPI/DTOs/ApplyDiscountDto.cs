using System.ComponentModel.DataAnnotations;

namespace BillGeneratorAPI.DTOs
{
    public class ApplyDiscountDto
    {
        [Range(0, 100, ErrorMessage = "Discount percentage must be between 0 and 100")]
        public decimal DiscountPercentage { get; set; } = 0;

        [Range(0, double.MaxValue, ErrorMessage = "Discount amount must be 0 or greater")]
        public decimal DiscountAmount { get; set; } = 0;
    }
}

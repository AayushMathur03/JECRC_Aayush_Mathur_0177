using System.ComponentModel.DataAnnotations;

namespace BillGeneratorAPI.DTOs
{
    public class CreateBillDto
    {
        [MaxLength(500)]
        public string? Notes { get; set; }

        public bool IsDraft { get; set; } = true;

        public decimal TaxPercentage { get; set; } = 18; // Default GST 18%
    }
}

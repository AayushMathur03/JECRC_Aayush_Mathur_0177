using System.ComponentModel.DataAnnotations;

namespace BillGeneratorAPI.DTOs
{
    public class UpdateBillItemQuantityDto
    {
        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
    }
}

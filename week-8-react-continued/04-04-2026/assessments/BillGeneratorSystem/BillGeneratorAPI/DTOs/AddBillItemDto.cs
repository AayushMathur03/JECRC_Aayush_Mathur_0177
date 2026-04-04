using System.ComponentModel.DataAnnotations;

namespace BillGeneratorAPI.DTOs
{
    public class AddBillItemDto
    {
        public int? CatalogItemId { get; set; } // Null for custom items

        [Required(ErrorMessage = "Item name is required")]
        [MaxLength(100)]
        public string ItemName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; } = 1;

        [Required(ErrorMessage = "Unit price is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Unit price must be greater than 0")]
        public decimal UnitPrice { get; set; }

        [Required(ErrorMessage = "Item type is required")]
        [MaxLength(50)]
        public string ItemType { get; set; } = string.Empty; // EntranceFee, Donation, Product, Custom
    }
}

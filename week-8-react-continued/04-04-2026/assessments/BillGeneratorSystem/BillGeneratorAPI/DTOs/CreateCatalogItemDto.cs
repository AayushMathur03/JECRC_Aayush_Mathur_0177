using System.ComponentModel.DataAnnotations;

namespace BillGeneratorAPI.DTOs
{
    public class CreateCatalogItemDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, 999999.99, ErrorMessage = "Price must be between 0 and 999999.99")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "CatalogType is required")]
        [RegularExpression("^(EntranceFee|Donation|SellingPrice|Custom)$", 
            ErrorMessage = "CatalogType must be: EntranceFee, Donation, SellingPrice, or Custom")]
        public string CatalogType { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
    }
}
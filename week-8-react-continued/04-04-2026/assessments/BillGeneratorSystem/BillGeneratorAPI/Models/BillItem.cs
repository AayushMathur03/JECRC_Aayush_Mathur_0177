using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BillGeneratorAPI.Models
{
    public class BillItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BillId { get; set; }

        public int? CatalogItemId { get; set; } // Nullable for custom items

        [Required]
        [MaxLength(100)]
        public string ItemName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        public int Quantity { get; set; } = 1;

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        [MaxLength(50)]
        public string ItemType { get; set; } = string.Empty; // EntranceFee, Donation, Product, Custom

        // Navigation Properties
        [ForeignKey("BillId")]
        public Bill Bill { get; set; } = null!;

        [ForeignKey("CatalogItemId")]
        public CatalogItem? CatalogItem { get; set; }
    }
}
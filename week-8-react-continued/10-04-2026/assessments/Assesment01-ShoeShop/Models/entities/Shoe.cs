using System.ComponentModel.DataAnnotations;
using Assessment01_ShoeShop.Models.Attributes;

namespace Assessment01_ShoeShop.Models.Entities
{
    public class Shoe
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [ValidBrand]
        public string Brand { get; set; }

        [Required]
        [StringLength(30)]
        public string Category { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        [Required]
        [RegularExpression("^(Black|White|Red|Blue|Green)$",
            ErrorMessage = "Color must be valid")]
        public string Color { get; set; }

        [Required]
        public string Sole { get; set; }

        [Required]
        [RegularExpression("^(Male|Female|Unisex)$")]
        public string Gender { get; set; }

        [Range(3, 15)]
        public int Size { get; set; }

        [Range(100, 50000)]
        public decimal Price { get; set; }
    }
}
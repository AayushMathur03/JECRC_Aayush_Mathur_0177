using System.ComponentModel.DataAnnotations;
using Assessment01_ShoeShop.Models.Attributes;

namespace Assessment01_ShoeShop.Models.DTOs
{
    public class ShoeResponseDto
    {
        [Required]
        [ValidBrand]
        public string Brand { get; set; }

        [Required]
        public string Category { get; set; }

        public string Description { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public string Sole { get; set; }

        [Required]
        public string Gender { get; set; }

        [Range(3, 15)]
        public int Size { get; set; }

        [Range(100, 50000)]
        public decimal Price { get; set; }
    }
}
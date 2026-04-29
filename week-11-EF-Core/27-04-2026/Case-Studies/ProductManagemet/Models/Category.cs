
using System.ComponentModel.DataAnnotations;
namespace ProductManagement.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }
        public ICollection<Product>? Products { get; set; }
    }
}
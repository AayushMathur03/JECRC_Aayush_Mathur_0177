using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagement.Models
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        [ForeignKey("Product")]
        public Product? ProductId { get; set; }
        public Product? Product { get; set; }


    }
}
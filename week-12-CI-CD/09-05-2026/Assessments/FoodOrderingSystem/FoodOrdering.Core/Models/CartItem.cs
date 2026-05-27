namespace FoodOrdering.Core.Models
{
    public class CartItem
    {
        public int FoodItemId { get; set; }
        public string FoodItemName { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string? ImageUrl { get; set; }
        public decimal TotalPrice => UnitPrice * Quantity;
    }
}
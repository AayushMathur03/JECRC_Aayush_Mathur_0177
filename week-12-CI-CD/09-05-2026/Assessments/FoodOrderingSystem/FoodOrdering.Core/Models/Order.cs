namespace FoodOrdering.Core.Models
{
    public enum OrderStatus
    {
        Pending, Confirmed, Preparing, OutForDelivery, Delivered, Cancelled
    }

    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string DeliveryAddress { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
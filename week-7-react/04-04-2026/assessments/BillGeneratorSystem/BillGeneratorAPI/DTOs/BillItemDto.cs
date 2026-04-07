namespace BillGeneratorAPI.DTOs
{
    public class BillItemDto
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int? CatalogItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string ItemType { get; set; } = string.Empty;
    }
}

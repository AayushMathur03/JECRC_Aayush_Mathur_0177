namespace ProductManagementSystem
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public bool InStock { get; set; }
    }
}
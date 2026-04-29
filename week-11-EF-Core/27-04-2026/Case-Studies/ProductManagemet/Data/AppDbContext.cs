using Microsoft.EntityFrameworkCore;
using ProductManagement.Models;

namespace ProductManagement.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<Category> CategoryDetails { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            // Configure decimal precision for price
            modelBuilder.Entity<Product>()
                .Property(p => p.price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics" },
                new Category { Id = 2, Name = "Books" },
                new Category { Id = 3, Name = "Home" }
            );

            modelBuilder.Entity<Tag>().HasData(
                new Tag { Id = 1, Name = "New" },
                new Tag { Id = 2, Name = "Popular" },
                new Tag { Id = 3, Name = "Discount" }
            );

            // One to Many Setup
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany (c=> c.Products)
                .HasForeignKey(p=> p.CategoryId);

            // One to One Relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.productDetail)
                .WithOne(d => d.Product)
                .HasForeignKey<ProductDetail>(d => d.ProductId);

            // Many to Many Setup
            modelBuilder.Entity<ProductTag>()
                .HasKey(pt => new { pt.productId, pt.TagId });

            modelBuilder.Entity<ProductTag>()
                .HasOne(pt => pt.Product)
                .WithMany(p => p.ProductTags)
                .HasForeignKey(pt => pt.productId);

            modelBuilder.Entity<ProductTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.ProductTags)
                .HasForeignKey(pt => pt.TagId);

            base.OnModelCreating(modelBuilder);
        }
    }
}

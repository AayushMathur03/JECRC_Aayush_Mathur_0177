using Microsoft.EntityFrameworkCore;
using BillGeneratorAPI.Models;

namespace BillGeneratorAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CatalogItem> CatalogItems { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillItem> BillItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ========================================
            // CATALOG ITEM CONFIGURATION
            // ========================================
            modelBuilder.Entity<CatalogItem>(entity =>
            {
                entity.ToTable("CatalogItems");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Description)
                    .HasMaxLength(500);

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                entity.Property(e => e.CatalogType)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.IsActive)
                    .HasDefaultValue(true);

                entity.Property(e => e.CreatedDate)
                    .HasDefaultValueSql("GETDATE()");

                // Indexes for performance
                entity.HasIndex(e => e.CatalogType)
                    .HasDatabaseName("IX_CatalogItems_CatalogType");

                entity.HasIndex(e => e.IsActive)
                    .HasDatabaseName("IX_CatalogItems_IsActive");

                entity.HasIndex(e => new { e.CatalogType, e.IsActive })
                    .HasDatabaseName("IX_CatalogItems_CatalogType_IsActive");
            });

            // ========================================
            // BILL CONFIGURATION
            // ========================================
            modelBuilder.Entity<Bill>(entity =>
            {
                entity.ToTable("Bills");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.InvoiceNumber)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.BillDate)
                    .IsRequired()
                    .HasDefaultValueSql("GETDATE()");

                entity.Property(e => e.SubTotal)
                    .HasColumnType("decimal(18,2)")
                    .HasDefaultValue(0);

                entity.Property(e => e.DiscountAmount)
                    .HasColumnType("decimal(18,2)")
                    .HasDefaultValue(0);

                entity.Property(e => e.DiscountPercentage)
                    .HasColumnType("decimal(5,2)")
                    .HasDefaultValue(0);

                entity.Property(e => e.TaxAmount)
                    .HasColumnType("decimal(18,2)")
                    .HasDefaultValue(0);

                entity.Property(e => e.TaxPercentage)
                    .HasColumnType("decimal(5,2)")
                    .HasDefaultValue(18); // Default GST 18%

                entity.Property(e => e.TotalAmount)
                    .HasColumnType("decimal(18,2)")
                    .HasDefaultValue(0);

                entity.Property(e => e.Notes)
                    .HasMaxLength(500);

                entity.Property(e => e.IsDraft)
                    .HasDefaultValue(false);

                entity.Property(e => e.CreatedDate)
                    .HasDefaultValueSql("GETDATE()");

                // Unique constraint on InvoiceNumber
                entity.HasIndex(e => e.InvoiceNumber)
                    .IsUnique()
                    .HasDatabaseName("IX_Bills_InvoiceNumber_Unique");

                // Indexes for performance
                entity.HasIndex(e => e.BillDate)
                    .HasDatabaseName("IX_Bills_BillDate");

                entity.HasIndex(e => e.IsDraft)
                    .HasDatabaseName("IX_Bills_IsDraft");

                entity.HasIndex(e => new { e.BillDate, e.IsDraft })
                    .HasDatabaseName("IX_Bills_BillDate_IsDraft");

                // Relationship with BillItems (One-to-Many)
                entity.HasMany(e => e.BillItems)
                    .WithOne(e => e.Bill)
                    .HasForeignKey(e => e.BillId)
                    .OnDelete(DeleteBehavior.Cascade); // Delete bill items when bill is deleted
            });

            // ========================================
            // BILL ITEM CONFIGURATION
            // ========================================
            modelBuilder.Entity<BillItem>(entity =>
            {
                entity.ToTable("BillItems");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.BillId)
                    .IsRequired();

                entity.Property(e => e.ItemName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Description)
                    .HasMaxLength(500);

                entity.Property(e => e.Quantity)
                    .IsRequired()
                    .HasDefaultValue(1);

                entity.Property(e => e.UnitPrice)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                entity.Property(e => e.TotalPrice)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                entity.Property(e => e.ItemType)
                    .IsRequired()
                    .HasMaxLength(50);

                // Foreign Key to Bill (already configured above)
                entity.HasOne(e => e.Bill)
                    .WithMany(e => e.BillItems)
                    .HasForeignKey(e => e.BillId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Foreign Key to CatalogItem (Optional - for custom items)
                entity.HasOne(e => e.CatalogItem)
                    .WithMany()
                    .HasForeignKey(e => e.CatalogItemId)
                    .OnDelete(DeleteBehavior.SetNull); // Set to null if catalog item is deleted

                // Indexes for performance
                entity.HasIndex(e => e.BillId)
                    .HasDatabaseName("IX_BillItems_BillId");

                entity.HasIndex(e => e.CatalogItemId)
                    .HasDatabaseName("IX_BillItems_CatalogItemId");

                entity.HasIndex(e => e.ItemType)
                    .HasDatabaseName("IX_BillItems_ItemType");
            });
        }
    }
}
using BillGeneratorAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorAPI.Data
{
    public class DbSeeder
    {
        public static async Task SeedDataAsync(ApplicationDbContext context)
        {
            // Ensure database is created
            await context.Database.MigrateAsync();

            // Check if data already exists
            if (await context.CatalogItems.AnyAsync())
            {
                Console.WriteLine("Database already seeded. Skipping seed data.");
                return;
            }

            Console.WriteLine("Starting database seeding...");

            // ========================================
            // 1. ENTRANCE FEE CATALOG
            // ========================================
            var entranceFees = new List<CatalogItem>
            {
                new CatalogItem
                {
                    Name = "Adult Entry",
                    Description = "Standard adult entrance fee (Age 18-59)",
                    Price = 500,
                    CatalogType = "EntranceFee",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Child Entry",
                    Description = "Child entrance fee (Age 5-17)",
                    Price = 250,
                    CatalogType = "EntranceFee",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Senior Citizen Entry",
                    Description = "Senior citizen entrance fee (Age 60+)",
                    Price = 300,
                    CatalogType = "EntranceFee",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "VIP Entry",
                    Description = "VIP entrance with special privileges",
                    Price = 1500,
                    CatalogType = "EntranceFee",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Toddler Entry",
                    Description = "Toddler entrance fee (Age 2-4)",
                    Price = 100,
                    CatalogType = "EntranceFee",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Group Entry (10+ people)",
                    Description = "Group entrance fee with discount",
                    Price = 400,
                    CatalogType = "EntranceFee",
                    IsActive = true
                }
            };

            await context.CatalogItems.AddRangeAsync(entranceFees);
            Console.WriteLine($"Added {entranceFees.Count} entrance fee items.");

            // ========================================
            // 2. DONATION CATALOG
            // ========================================
            var donations = new List<CatalogItem>
            {
                new CatalogItem
                {
                    Name = "Small Donation",
                    Description = "Small contribution",
                    Price = 100,
                    CatalogType = "Donation",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Medium Donation",
                    Description = "Medium contribution",
                    Price = 500,
                    CatalogType = "Donation",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Large Donation",
                    Description = "Large contribution",
                    Price = 1000,
                    CatalogType = "Donation",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Premium Donation",
                    Description = "Premium contribution",
                    Price = 5000,
                    CatalogType = "Donation",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Custom Donation",
                    Description = "Enter your own donation amount",
                    Price = 0,
                    CatalogType = "Donation",
                    IsActive = true
                }
            };

            await context.CatalogItems.AddRangeAsync(donations);
            Console.WriteLine($"Added {donations.Count} donation items.");

            // ========================================
            // 3. SELLING PRICE CATALOG (Products)
            // ========================================
            var products = new List<CatalogItem>
            {
                // Merchandise
                new CatalogItem
                {
                    Name = "T-Shirt (Small)",
                    Description = "Cotton T-Shirt - Size S",
                    Price = 350,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "T-Shirt (Medium)",
                    Description = "Cotton T-Shirt - Size M",
                    Price = 350,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "T-Shirt (Large)",
                    Description = "Cotton T-Shirt - Size L",
                    Price = 350,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Cap",
                    Description = "Branded baseball cap",
                    Price = 200,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Keychain",
                    Description = "Souvenir keychain",
                    Price = 50,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Magnet",
                    Description = "Refrigerator magnet",
                    Price = 30,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Mug",
                    Description = "Ceramic coffee mug",
                    Price = 150,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Notebook",
                    Description = "Branded notebook - 100 pages",
                    Price = 80,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },

                // Food Items
                new CatalogItem
                {
                    Name = "Mineral Water (500ml)",
                    Description = "Bottled mineral water",
                    Price = 20,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Cold Drink (300ml)",
                    Description = "Chilled soft drink",
                    Price = 40,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Coffee",
                    Description = "Hot coffee",
                    Price = 50,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Tea",
                    Description = "Hot tea",
                    Price = 30,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Sandwich",
                    Description = "Veg sandwich",
                    Price = 80,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Samosa (2 pcs)",
                    Description = "Crispy samosas",
                    Price = 40,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Ice Cream",
                    Description = "Vanilla ice cream cup",
                    Price = 60,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Chips Packet",
                    Description = "Potato chips - Small pack",
                    Price = 20,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },

                // Services
                new CatalogItem
                {
                    Name = "Photo Print (4x6)",
                    Description = "Instant photo print",
                    Price = 30,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Photo Frame",
                    Description = "Decorative photo frame",
                    Price = 120,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Locker Rental",
                    Description = "Secure locker for 1 day",
                    Price = 50,
                    CatalogType = "SellingPrice",
                    IsActive = true
                },
                new CatalogItem
                {
                    Name = "Parking Fee",
                    Description = "Vehicle parking - Full day",
                    Price = 100,
                    CatalogType = "SellingPrice",
                    IsActive = true
                }
            };

            await context.CatalogItems.AddRangeAsync(products);
            Console.WriteLine($"Added {products.Count} selling price items.");

            // Save all changes
            await context.SaveChangesAsync();

            Console.WriteLine("Database seeding completed successfully!");
            Console.WriteLine($"Total items added: {entranceFees.Count + donations.Count + products.Count}");
        }
    }
}
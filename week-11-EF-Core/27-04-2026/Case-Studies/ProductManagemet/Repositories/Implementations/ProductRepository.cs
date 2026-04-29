using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Models;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(ProductRequestDTOs dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                price = dto.Price,
                CategoryId = dto.CategoryId,
                productDetail = new ProductDetail
                {
                    Description = dto.Description,
                },
                ProductTags = dto.TagIds?.Select(t => new ProductTag { TagId = t }).ToList()
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.productDetail)
                .Include(p => p.ProductTags)!
                .ThenInclude(pt => pt.Tag)
                .Select(p=> new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.price,
                    CategoryName = p.Category!.Name,
                    Description = p.productDetail!.Description,
                    Tags = p.ProductTags!.Select(pt=>pt.Tag!.Name!).ToList()
                }).ToListAsync();
        }

        public async Task<ProductResponseDto> GetByIdAsync(int id)
        {
            var p = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.productDetail)
                .Include(p => p.ProductTags)!
                .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (p == null) return null!;
            return new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.price,
                CategoryName = p.Category!.Name,
                Description = p.productDetail!.Description,
                Tags = p.ProductTags!.Select(pt => pt.Tag!.Name!).ToList()
            };
        }

        public async Task<bool> UpdateAsync(int id, ProductRequestDTOs dto)
        {
            var product = await _context.Products
                .Include(p => p.productDetail)
                .Include(p => p.ProductTags)!
                .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) return false;

            product.Name = dto.Name;
            product.price = dto.Price;
            product.CategoryId = dto.CategoryId;
            product.productDetail!.Description = dto.Description;

            product.ProductTags!.Clear();
            product.ProductTags = dto.TagIds?.Select(t => new ProductTag {
                productId = id,
                TagId = t
            }).ToList();
            await _context.SaveChangesAsync();
            return true;
        }

         public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
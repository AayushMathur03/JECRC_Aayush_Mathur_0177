using BillGeneratorAPI.Data;
using BillGeneratorAPI.DTOs;
using BillGeneratorAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorAPI.Services
{
    public class CatalogService : ICatalogService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CatalogService> _logger;

        public CatalogService(ApplicationDbContext context, ILogger<CatalogService> logger)
        {
            _context = context;
            _logger = logger;
        }

        // ========================================
        // GET ALL CATALOG ITEMS
        // ========================================
        public async Task<IEnumerable<CatalogItemDto>> GetAllCatalogItemsAsync()
        {
            try
            {
                var items = await _context.CatalogItems
                    .OrderBy(c => c.CatalogType)
                    .ThenBy(c => c.Name)
                    .ToListAsync();

                return items.Select(MapToDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all catalog items");
                throw;
            }
        }

        // ========================================
        // GET CATALOG ITEMS BY TYPE
        // ========================================
        public async Task<IEnumerable<CatalogItemDto>> GetCatalogItemsByTypeAsync(string catalogType)
        {
            try
            {
                var items = await _context.CatalogItems
                    .Where(c => c.CatalogType == catalogType)
                    .OrderBy(c => c.Name)
                    .ToListAsync();

                return items.Select(MapToDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving catalog items by type: {CatalogType}", catalogType);
                throw;
            }
        }

        // ========================================
        // GET CATALOG ITEM BY ID
        // ========================================
        public async Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id)
        {
            try
            {
                var item = await _context.CatalogItems.FindAsync(id);
                return item == null ? null : MapToDto(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving catalog item by ID: {Id}", id);
                throw;
            }
        }

        // ========================================
        // CREATE CATALOG ITEM
        // ========================================
        public async Task<CatalogItemDto> CreateCatalogItemAsync(CreateCatalogItemDto createDto)
        {
            try
            {
                var catalogItem = new CatalogItem
                {
                    Name = createDto.Name,
                    Description = createDto.Description,
                    Price = createDto.Price,
                    CatalogType = createDto.CatalogType,
                    IsActive = createDto.IsActive,
                    CreatedDate = DateTime.Now
                };

                _context.CatalogItems.Add(catalogItem);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Created new catalog item: {Name} (ID: {Id})", catalogItem.Name, catalogItem.Id);

                return MapToDto(catalogItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating catalog item");
                throw;
            }
        }

        // ========================================
        // UPDATE CATALOG ITEM
        // ========================================
        public async Task<CatalogItemDto?> UpdateCatalogItemAsync(int id, UpdateCatalogItemDto updateDto)
        {
            try
            {
                var catalogItem = await _context.CatalogItems.FindAsync(id);
                if (catalogItem == null)
                {
                    _logger.LogWarning("Catalog item not found for update: {Id}", id);
                    return null;
                }

                catalogItem.Name = updateDto.Name;
                catalogItem.Description = updateDto.Description;
                catalogItem.Price = updateDto.Price;
                catalogItem.CatalogType = updateDto.CatalogType;
                catalogItem.IsActive = updateDto.IsActive;
                catalogItem.UpdatedDate = DateTime.Now;

                _context.CatalogItems.Update(catalogItem);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Updated catalog item: {Name} (ID: {Id})", catalogItem.Name, catalogItem.Id);

                return MapToDto(catalogItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating catalog item: {Id}", id);
                throw;
            }
        }

        // ========================================
        // DELETE CATALOG ITEM
        // ========================================
        public async Task<bool> DeleteCatalogItemAsync(int id)
        {
            try
            {
                var catalogItem = await _context.CatalogItems.FindAsync(id);
                if (catalogItem == null)
                {
                    _logger.LogWarning("Catalog item not found for deletion: {Id}", id);
                    return false;
                }

                _context.CatalogItems.Remove(catalogItem);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Deleted catalog item: {Name} (ID: {Id})", catalogItem.Name, catalogItem.Id);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting catalog item: {Id}", id);
                throw;
            }
        }

        // ========================================
        // TOGGLE ACTIVE STATUS
        // ========================================
        public async Task<bool> ToggleActiveStatusAsync(int id)
        {
            try
            {
                var catalogItem = await _context.CatalogItems.FindAsync(id);
                if (catalogItem == null)
                {
                    _logger.LogWarning("Catalog item not found for toggle: {Id}", id);
                    return false;
                }

                catalogItem.IsActive = !catalogItem.IsActive;
                catalogItem.UpdatedDate = DateTime.Now;

                _context.CatalogItems.Update(catalogItem);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Toggled active status for catalog item: {Name} (ID: {Id}), New Status: {IsActive}", 
                    catalogItem.Name, catalogItem.Id, catalogItem.IsActive);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling active status for catalog item: {Id}", id);
                throw;
            }
        }

        // ========================================
        // PRIVATE HELPER: MAP TO DTO
        // ========================================
        private static CatalogItemDto MapToDto(CatalogItem item)
        {
            return new CatalogItemDto
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                CatalogType = item.CatalogType,
                IsActive = item.IsActive,
                CreatedDate = item.CreatedDate,
                UpdatedDate = item.UpdatedDate
            };
        }
    }
}
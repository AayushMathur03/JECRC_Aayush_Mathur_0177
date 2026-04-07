using BillGeneratorAPI.DTOs;

namespace BillGeneratorAPI.Services
{
    public interface ICatalogService
    {
        Task<IEnumerable<CatalogItemDto>> GetAllCatalogItemsAsync();
        Task<IEnumerable<CatalogItemDto>> GetCatalogItemsByTypeAsync(string catalogType);
        Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id);
        Task<CatalogItemDto> CreateCatalogItemAsync(CreateCatalogItemDto createDto);
        Task<CatalogItemDto?> UpdateCatalogItemAsync(int id, UpdateCatalogItemDto updateDto);
        Task<bool> DeleteCatalogItemAsync(int id);
        Task<bool> ToggleActiveStatusAsync(int id);
    }
}
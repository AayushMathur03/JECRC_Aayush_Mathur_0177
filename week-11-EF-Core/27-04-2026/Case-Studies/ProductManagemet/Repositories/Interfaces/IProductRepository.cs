using ProductManagement.Models;
using ProductManagement.DTOs;

namespace ProductManagement.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductResponseDto>> GetAllAsync();
        Task<ProductResponseDto> GetByIdAsync(int id);
        Task <int> CreateAsync(ProductRequestDTOs dto);
        Task <bool> UpdateAsync(int id, ProductRequestDTOs dto);
        Task <bool> DeleteAsync(int id);
    }
}

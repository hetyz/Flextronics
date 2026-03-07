using MesApi.Dto;
using MesApi.Entity;

namespace MesApi.Logic
{
    public interface IProductService
    {
        Task<bool> DeleteAsync(int id);
        Task<List<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int id);
        Task<UpdateResult> UpdateAsync(int id, UpdateProductDto dto);
        Task<ProductDto> CreateAsync(CreateProductDto dto);
    }
}
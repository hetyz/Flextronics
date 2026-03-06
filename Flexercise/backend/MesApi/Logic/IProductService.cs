using MesApi.Dto;
using MesApi.Entity;

namespace MesApi.Logic
{
    public interface IProductService
    {
        Task<bool> DeleteAsync(int id);
        Task<List<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task<UpdateResult> UpdateAsync(int id, UpdateProductDto dto);
        Task<Product> CreateAsync(CreateProductDto dto);
    }
}
using MesApi.Dto;
using MesApi.Entity;
using Microsoft.EntityFrameworkCore;

namespace MesApi.Logic
{
    public enum UpdateResult { NotFound, BadRequest, NoChanges, Updated }

    public class ProductService(ApplicationDbContext db) : IProductService
    {
        private readonly ApplicationDbContext _db = db;

        public async Task<Product> CreateAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                ProductType = dto.ProductType,
                Description = dto.Description,
                Status = dto.Status,
                Created = DateTime.UtcNow
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return product;
        }

        public Task<List<Product>> GetAllAsync() => _db.Products.ToListAsync();

        public Task<Product?> GetByIdAsync(int id) => _db.Products.FindAsync(id).AsTask();

        public async Task<UpdateResult> UpdateAsync(int id, UpdateProductDto dto)
        {
            if (id != dto.Id) return UpdateResult.BadRequest;

            var product = await _db.Products.FindAsync(id);
            if (product is null) return UpdateResult.NotFound;

            var changes = GetProductChanges(product, dto);
            if (changes.Count == 0) return UpdateResult.NoChanges;

            ApplyUpdate(product, dto);

            product.ModifiedTime = DateTime.UtcNow;
            product.LastUpdate = string.Join(", ", changes);

            await _db.SaveChangesAsync();
            return UpdateResult.Updated;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product is null) return false;
            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
            return true;
        }

        private static List<string> GetProductChanges(Product product, UpdateProductDto dto)
        {
            var changes = new List<string>();

            if (product.Name != dto.Name) changes.Add($"{nameof(Product.Name)}: {product.Name}");
            if (product.ProductType != dto.ProductType) changes.Add($"{nameof(Product.ProductType)}: {product.ProductType}");
            if (product.Description != dto.Description) changes.Add($"{nameof(Product.Description)}: {product.Description}");
            if (product.Status != dto.Status) changes.Add($"{nameof(Product.Status)}: {product.Status}");

            return changes;
        }

        private static void ApplyUpdate(Product product, UpdateProductDto dto)
        {
            product.Name = dto.Name;
            product.ProductType = dto.ProductType;
            product.Description = dto.Description;
            product.Status = dto.Status;
        }
    }
}
using MesApi.Dto;
using MesApi.Entity;

namespace MesApi.Extensions
{
    public static class ProductMappingExtensions
    {
        public static ProductDto ToDto(this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                ProductType = product.ProductType,
                Description = product.Description,
                Status = product.Status,
                Created = product.Created,
                ModifiedTime = product.ModifiedTime,
                LastUpdate = product.LastUpdate
            };
        }

        public static Product ToEntity(this CreateProductDto dto)
        {
            return new Product
            {
                Name = dto.Name,
                ProductType = dto.ProductType,
                Description = dto.Description,
                Status = dto.Status,
                Created = DateTime.UtcNow,
                ModifiedTime = null,
                LastUpdate = ""
            };
        }
    }
}
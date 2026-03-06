using MesApi.Entity;

namespace MesApi.Dto
{
    public class CreateProductDto
    {
        public required string Name { get; set; }
        public ProductType ProductType { get; set; }
        public string? Description { get; set; }
        public ProductStatus Status { get; set; }
    }
}
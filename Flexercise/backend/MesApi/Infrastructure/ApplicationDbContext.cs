using MesApi.Entity;
using Microsoft.EntityFrameworkCore;

namespace MesApi.Infrastructure
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : DbContext(options)
    {
        private readonly string _connectionString =
            configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Phone product",
                    ProductType = ProductType.Phone,
                    Description = "Phone product description",
                    Created = new DateTime(2026, 3, 1, 10, 0, 0, DateTimeKind.Utc),
                    Status = ProductStatus.Completed,
                    ModifiedTime = null,
                    LastUpdate = ""
                },
                new Product
                {
                    Id = 2,
                    Name = "Tablet product",
                    ProductType = ProductType.Tablet,
                    Description = "Tablet product description",
                    Created = new DateTime(2026, 3, 2, 10, 0, 0, DateTimeKind.Utc),
                    Status = ProductStatus.InProgress,
                    ModifiedTime = null,
                    LastUpdate = ""
                },
                new Product
                {
                    Id = 3,
                    Name = "Smartwatch product",
                    ProductType = ProductType.Smartwatch,
                    Description = "Smartwatch product description",
                    Created = new DateTime(2026, 3, 3, 10, 0, 0, DateTimeKind.Utc),
                    Status = ProductStatus.Halted,
                    ModifiedTime = null,
                    LastUpdate = ""
                },
                new Product
                {
                    Id = 4,
                    Name = "Earbuds product",
                    ProductType = ProductType.Earbuds,
                    Description = "Earbuds product description",
                    Created = new DateTime(2026, 3, 4, 10, 0, 0, DateTimeKind.Utc),
                    Status = ProductStatus.Canceled,
                    ModifiedTime = null,
                    LastUpdate = ""
                }
            );
        }
    }
}
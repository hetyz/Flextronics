using MesApi.Entity;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : DbContext(options)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var endDate = DateTime.Now;
        var startDate = endDate.Subtract(TimeSpan.FromDays(5));

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Phone product", ProductType = ProductType.Phone, Description = "Phone product description", Created = RandomDate(startDate, endDate), Status = ProductStatus.Completed, ModifiedTime = null, LastUpdate = "", },
            new Product { Id = 2, Name = "Tablet product", ProductType = ProductType.Tablet, Description = "Tablet product description", Created = RandomDate(startDate, endDate), Status = ProductStatus.InProgress, ModifiedTime = null, LastUpdate = "",  },
            new Product { Id = 3, Name = "Smartwatch product", ProductType = ProductType.Smartwatch, Description = "Smartwatch product description", Created = RandomDate(startDate, endDate), Status = ProductStatus.Halted, ModifiedTime = null, LastUpdate = "", },
            new Product { Id = 4, Name = "Earbuds product", ProductType = ProductType.Earbuds, Description = "Earbuds product description", Created = RandomDate(startDate, endDate), Status = ProductStatus.Canceled, ModifiedTime = null, LastUpdate = "", }
        );
    }

    private DateTime RandomDate(DateTime start, DateTime end)
    {
        var rand = new Random();
        var range = (end - start).Days;
        return start.AddDays(rand.Next(range)).AddHours(rand.Next(0, 24)).AddMinutes(rand.Next(0, 60)).AddSeconds(rand.Next(0, 60));
    }
}
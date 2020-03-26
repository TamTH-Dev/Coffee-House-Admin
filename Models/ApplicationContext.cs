using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CoffeeHouse.Models {
    public class ApplicationContext : IdentityDbContext {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<User> ApplicationUsers { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}

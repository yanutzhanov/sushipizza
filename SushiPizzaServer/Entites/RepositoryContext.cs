using Entites.Models;
using Microsoft.EntityFrameworkCore;

namespace Entites
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().Property(o => o.OrderTime).HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<Order>().Property(o => o.IsCompleted).HasDefaultValue(false);
        }
    }
}

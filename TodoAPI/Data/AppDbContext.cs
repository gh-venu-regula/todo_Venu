 using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;
namespace TodoAPI.Data
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TodoAPI.Models.Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
using Microsoft.EntityFrameworkCore;

using TodoAPI.Models;
namespace TodoAPI.Data
{

    // DbContext class for Entity Framework Core
    // Represents the database context for the application
    public class AppDbContext : DbContext
    {
        // Constructor for initializing the DbContext with options
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet for tasks
        // Represents the Tasks table in the database
        public DbSet<TodoAPI.Models.Task> Tasks { get; set; }

        // DbSet for users
        // Represents the Users table in the database
        public DbSet<User> Users { get; set; }
    }
}

using backebd.Models;
using Microsoft.EntityFrameworkCore;

namespace backebd.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) : base(options)
        {
            
        }

        public DbSet<TodoList> todoLists { get; set; }

    }
}

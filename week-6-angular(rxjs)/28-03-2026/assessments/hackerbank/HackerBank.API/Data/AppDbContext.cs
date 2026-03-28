using HackerBank.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HackerBank.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Transaction> Transactions { get; set; }
}
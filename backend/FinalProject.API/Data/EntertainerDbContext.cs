using Microsoft.EntityFrameworkCore;

namespace FinalProject.API.Data;

public class EntertainerContext : DbContext
{
    public DbSet<Entertainer> Entertainers { get; set; }
    public DbSet<Engagement> Engagements { get; set; }

    public EntertainerContext(DbContextOptions<EntertainerContext> options) : base(options) { }
}
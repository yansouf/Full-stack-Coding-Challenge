using System;
using Coding_challenge_BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Admin5.Models
{
    public partial class DataBaseContext : DbContext
    {
        public DataBaseContext()
        {
            // dotnet tool install --global dotnet-ef --version 3.0.0
            // scafolding to db
            // dotnet ef migrations add secondMG
            // dotnet ef database update
            // dotnet ef migrations remove
            // dotnet ef database update LastGoodMigration
            // dotnet ef migrations script
        }

        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .IsUnique();

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd(); 

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false); 
                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false); 

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
                
            });

           
            OnModelCreatingPartial(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User[] { 
            new User(1,"soufiane","chaoui","soufian.chaoui@gmail.com","123"),
            new User(2,"soufiane2","chaoui2","soufian.chaoui2@gmail.com","123"),
            new User(3,"soufiane3","chaoui3","soufian.chaoui3@gmail.com","123"),
            new User(4,"soufiane4","chaoui4","soufian.chaoui4@gmail.com","123")}); 



        }


        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

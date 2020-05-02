// ------------------------------------------------
// ARTEMIS - Open source forum software
// version 1.0 Alpha
//
// @project     Artemis API
// @author      Robert Monden
// @website     https://robertmonden.com/artemis
// @copyright   2020, Artemis
// @license     Apache 2.0; see LICENSE.txt
// ------------------------------------------------

namespace Artemis.Models
{
    using Microsoft.EntityFrameworkCore;

    using Controllers;

    public partial class ForumDbContext : DbContext
    {
        public DbSet<Board> Boards { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<LogEntry> LogEntries { get; set; }
        public DbSet<LogEntryType> LogEntryTypes { get; set; }
        public DbSet<PermissionSet> PermissionSets { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<User> Users { get; set; }

        public const long AdminGroupId = 1;
        public const long ModeratorGroupId = 2;
        public const long MemberGroupId = 3;
        public const long GuestGroupId = 4;

        public ForumDbContext() { }

        public ForumDbContext(DbContextOptions<ForumDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);

            var adminPermissionSet = new PermissionSet() { Id = 1, Title = "Administrators", Permissions = "manage_boards" };
            var moderatorPermissionSet = new PermissionSet() { Id = 2, Title = "Moderators", Permissions = "" };
            var memberPermissionSet = new PermissionSet() { Id = 3, Title = "Members", Permissions = "" };
            var guestPermissionSet = new PermissionSet() { Id = 4, Title = "Guests", Permissions = "" };
            modelBuilder.Entity<PermissionSet>().HasData(adminPermissionSet, moderatorPermissionSet, memberPermissionSet, guestPermissionSet);

            var adminGroup = new { Id = AdminGroupId, Title = "Administrator", Color = "#753838", PermissionSetId = adminPermissionSet.Id };
            modelBuilder.Entity<Group>().HasData
            (
                adminGroup,
                new { Id = ModeratorGroupId, Title = "Moderator", Color = "#385b75", PermissionSetId = moderatorPermissionSet.Id },
                new { Id = MemberGroupId, Title = "Member", PermissionSetId = memberPermissionSet.Id },
                new { Id = GuestGroupId, Title = "Guest", PermissionSetId = guestPermissionSet.Id }
            );

            modelBuilder.Entity<User>().HasData
            (
                new User { Id = (long)1, Username = "Admin", Email = "root@localhost", Password = AuthController.GetHashedPassword("password"), GroupId = adminGroup.Id }
            );
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

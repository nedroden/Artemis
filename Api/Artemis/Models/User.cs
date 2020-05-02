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
    using System;
    using System.ComponentModel.DataAnnotations;

    public enum Genders
    {
        Unknown,
        Male,
        Female,
        Other
    }

    public class User
    {
        public long Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Username { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        // Note: passwords are NEVER publicly visible.
        [Required]
        public string Password { get; set; }

        public Genders Gender { get; set; }

        public string Avatar { get; set; }

        public long GroupId { get; set; }
        public virtual Group Group { get; set; }

        public DateTime TimeCreated { get; set; }

        public string Language { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Location { get; set; }

        public bool IsBanned { get; set; }

        public User()
        {
            TimeCreated = DateTime.UtcNow;
            IsBanned = false;
            Gender = Genders.Unknown;
            Avatar = "";
            Language = "en";
            FirstName = "";
            LastName = "";
            Location = "";
        }

        public bool HasPermission(string permissionName)
        {
            return Group.HasPermission(permissionName);
        }
    }
}
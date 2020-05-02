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

    public class Post
    {
        public long Id { get; set; }

        [Required]
        public virtual Topic Topic { get; set; }

        [Required]
        public virtual User User { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public DateTime TimeCreated { get; set; }

        [Required]
        public DateTime TimeUpdated { get; set; }

        public virtual User LastUpdatedBy { get; set; }

        // @todo Needs validation method
        [Required]
        public string IpAddress { get; set; }

        public Post()
        {
            TimeCreated = DateTime.UtcNow;
            TimeUpdated = DateTime.UtcNow;
        }
    }
}
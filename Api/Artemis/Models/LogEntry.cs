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

    public class LogEntry
    {
        public long Id { get; set; }

        [Required]
        public virtual LogEntryType Type { get; set; }

        [Required]
        [StringLength(500)]
        public string Message { get; set; }

        [Required]
        public DateTime TimeCreated { get; set; }

        public LogEntry()
        {
            TimeCreated = DateTime.UtcNow;
        }
    }
}
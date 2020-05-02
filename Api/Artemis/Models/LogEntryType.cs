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
    using System.ComponentModel.DataAnnotations;

    public class LogEntryType
    {
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Description { get; set; }
    }
}
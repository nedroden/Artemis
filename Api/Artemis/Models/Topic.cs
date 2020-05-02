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

    public class Topic
    {
        public long Id { get; set; }

        [Required]
        public virtual Board Board { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        [Required]
        public bool IsSticky { get; set; }
    }
}
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

    public class PermissionSet
    {
        public long Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Permissions { get; set; }
    }
}
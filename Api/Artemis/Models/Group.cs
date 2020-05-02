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
    using System.Linq;

    public class Group
    {
        public long Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Title { get; set; }

        // @todo needs validation method
        [StringLength(15)]
        public string Color { get; set; }

        public virtual PermissionSet PermissionSet { get; set; }

        public bool HasPermission(string permissionName)
        {
            return PermissionSet.Permissions.Split(';').Contains(permissionName);
        }
    }
}
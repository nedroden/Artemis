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
    public class Board
    {
        public long Id { get; set; }

        public virtual Category Category { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public virtual Post LastMessage { get; set; }

        public int Position { get; set; }
    }
}
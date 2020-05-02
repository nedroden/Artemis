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

namespace Artemis.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;

    using Filters;
    using Models;

    [Route("/api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public CategoryController(ForumDbContext context) => _context = context;

        [HttpGet]
        [Authorized("manage_boards")]
        public ActionResult<List<Category>> GetCategories()
        {
            return _context.Categories.ToList();
        }

        [HttpGet("{id}", Name = "GetCategory")]
        public ActionResult<Category> GetCategory(long id)
        {
            Category category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPost]
        public ActionResult<Category> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();

            return CreatedAtAction("PostCategory", new Category { Id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public ActionResult PutCategory(long id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<Category> DeleteCategory(long id)
        {
            Category category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return category;
        }
    }
}
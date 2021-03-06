﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoffeeHouse.Models;

namespace CoffeeHouse.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase {
        private readonly ApplicationContext _context;

        public CategoriesController(ApplicationContext context) {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories() {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id) {
            var categoryModel = await _context.Categories.FindAsync(id);

            if (categoryModel == null) {
                return NotFound();
            }

            return categoryModel;
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category category) {
            if (id != category.CategoryID) {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!DoesExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category) {
            if (!IsDuplicate(category.CategoryName)) {
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
            } else {
                return BadRequest(new { message = "This Category existed" });
            }

            return CreatedAtAction("GetCategory", new { id = category.CategoryID }, category);
        }

        private bool DoesExists(int id) {
            return _context.Categories.Any(c => c.CategoryID == id);
        }

        private bool IsDuplicate(string categoryName) {
            return _context.Categories.Any(c => c.CategoryName.Trim().ToLower() == categoryName.Trim().ToLower());
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoffeeHouse.Models;

namespace CoffeeHouse.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase {
        private readonly ApplicationContext _context;

        public ProductsController(ApplicationContext context) {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts() {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            Product product;

            try {
                product = await _context.Products.FindAsync(id);
            } catch (Exception) {
                if (!DoesExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product) {
            if (!IsDuplicate(product.ProductName)) {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
            } else {
                return BadRequest(new { message = "This Product's Name existed" });
            }

            return CreatedAtAction("GetProduct", new { id = product.ProductID }, product);
        }


        // PUT: api/Products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product) {
            if (id != product.ProductID) {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

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

        // PUT: api/Products/Delete/{id}
        [HttpPut("Delete/{id}")]
        public async Task<IActionResult> DeleteProducts(int id) {
            var products = _context.Products.Where(p => p.CategoryID == id).ToList();
            products.ForEach(p => p.Status = false);

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return NoContent();
        }

        // PUT: api/Products/Restore/{id}
        [HttpPut("Restore/{id}")]
        public async Task<IActionResult> RestoreProducts(int id) {
            var products = _context.Products.Where(p => p.CategoryID == id).ToList();
            products.ForEach(p => p.Status = true);

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return NoContent();
        }

        private bool DoesExists(int id) {
            return _context.Products.Any(p => p.ProductID == id);
        }

        private bool IsDuplicate(string productName) {
            return _context.Products.Any(p => p.ProductName.Trim().ToLower() == productName.Trim().ToLower());
        }

        private string GetProductName(int id) {
            return _context.Products.Find(id).ProductName;
        }
    }
}

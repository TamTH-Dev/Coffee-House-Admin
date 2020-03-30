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
        public async Task<ActionResult<IEnumerable<ProductModel>>> GetProducts() {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductModel>> GetProduct(int id) {
            var product = await _context.Products.FindAsync(id);

            if (product == null) {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductModel>> CreateProduct(ProductModel product) {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductID }, product);
        }


        // PUT: api/Products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductModel product) {
            if (id != product.ProductID) {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!ProductExists(id)) {
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

        private bool ProductExists(int id) {
            return _context.Products.Any(e => e.ProductID == id);
        }
    }
}

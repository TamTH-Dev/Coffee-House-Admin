using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    public class CategoryModel {
        [Key]
        public int CategoryID { get; set; }
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Category { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public bool Status { get; set; }
    }
}

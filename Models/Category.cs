using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    [Table("Category")]
    public class Category {
        [Key]
        public int CategoryID { get; set; }
        [Required]
        [Column(TypeName = "varchar(256)")]
        public string CategoryName { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public bool Status { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    [Table("Product")]
    public class Product {
        [Key]
        [Required]
        public int ProductID { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string ProductName { get; set; }
        [Column(TypeName = "varchar(256)")]
        public string ImgPath { get; set; }
        [Required]
        public int CategoryID { get; set; }
        [ForeignKey("CategoryID")]
        public Category CategoryModel { get; set; }
        [Required]
        [Column(TypeName = "text")]
        public string Description { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public bool Status { get; set; }
    }
}

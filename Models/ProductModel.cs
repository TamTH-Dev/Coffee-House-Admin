using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    public class ProductModel {
        [Key]
        [Required]
        public int ProductID { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string ProductName { get; set; }
        [Column(TypeName = "varchar(255)")]
        public string ImgPath { get; set; }
        [Required]
        [Column("Category", TypeName = "varchar(255)")]
        public string Category { get; set; }
        [ForeignKey("Category")]
        public CategoryModel CategoryModel { get; set; }
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

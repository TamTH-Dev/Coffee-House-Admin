using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    public class Product {
        [Key]
        public int ProductID { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string ProductName { get; set; }
        [Required]
        public string ImgPath { get; set; }
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Category { get; set; }
        [Required]
        [Column(TypeName = "text")]
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public bool Status { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace CoffeeHouse.Models {
    public class UserModel {
        [Required]
        public string UserName { get; set; }
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string FullName { get; set; }
    }
}

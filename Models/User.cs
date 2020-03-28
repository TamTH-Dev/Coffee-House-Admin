using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    public class User : IdentityUser {
        [Column(TypeName = "nvarchar(255)")]
        public string FullName { get; set; }
    }
}

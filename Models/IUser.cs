using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse.Models {
    public class IUser : IdentityUser {
        [Column(TypeName = "nvarchar(256)")]
        public string FullName { get; set; }
    }
}

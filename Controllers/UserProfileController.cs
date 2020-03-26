using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeHouse.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<User> _userManager;

        public UserProfileController(UserManager<User> userManager) {
            _userManager = userManager; 
        }

        [HttpGet]
        [Authorize]
        public async Task<Object> GetUserProfile() {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userID);
            return new {
                user.FullName,
                user.Email,
                user.UserName
            };
        }
    }
}
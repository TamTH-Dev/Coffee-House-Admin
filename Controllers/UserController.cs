using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoffeeHouse.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CoffeeHouse.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private UserManager<User> _userManager;

        private readonly ApplicationSettings _appSettings;

        public UserController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings) {
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        // POST: api/User/Register
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<User>> PostUser(UserModel model) {
            var user = new User() {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };

            try {
                var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(result);
            } catch (Exception ex) {
                throw ex;
            }
        }

        // POST: api/User/Login
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<User>> Login(LoginModel model) {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password)) {
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserID", user.Id.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            } else {
                return BadRequest(new { message = "Username or Password is incorrect" });
            }
        }

        // GET: api/User/Profile
        [HttpGet]
        [Authorize]
        [Route("Profile")]
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

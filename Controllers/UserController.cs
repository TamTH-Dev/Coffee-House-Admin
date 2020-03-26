using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoffeeHouse.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

namespace CoffeeHouse.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly ApplicationContext _context;
        private UserManager<User> _userManager;
        private SignInManager<User> _signinManager;
        private readonly ApplicationSettings _appSettings;

        public UserController(ApplicationContext context, UserManager<User> userManager, SignInManager<User> signinManager, IOptions<ApplicationSettings> appSettings) {
            _context = context;
            _userManager = userManager;
            _signinManager = signinManager;
            _appSettings = appSettings.Value;
        }

        //// POST: api/User/Register
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> PostUser(UserModel model) {
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
                        new Claim("UserID", user.Id.ToString())
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
    }
}

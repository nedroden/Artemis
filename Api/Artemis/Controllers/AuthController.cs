// ------------------------------------------------
// ARTEMIS - Open source forum software
// version 1.0 Alpha
//
// @project     Artemis API
// @author      Robert Monden
// @website     https://robertmonden.com/artemis
// @copyright   2020, Artemis
// @license     Apache 2.0; see LICENSE.txt
// ------------------------------------------------

namespace Artemis.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;

    using Models;

    [Route("/api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ForumDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ForumDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public ActionResult<string> Login(LoginRequest loginRequest)
        {
            User user = _context.Users.Where(user => user.Email == loginRequest.Email).First();

            if (user == null || !IsCorrectPassword(user.Password, loginRequest.Password))
            {
                return Unauthorized();
            }

            return Ok(new { token = GenerateToken(user) });
        }

        [HttpPost]
        public ActionResult<User> Register(RegistrationRequest request)
        {
            User existingUser = _context.Users
                .Where(user => user.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase)).First();

            if (existingUser != null)
            {
                return BadRequest();
            }

            string hashedPassword = GetHashedPassword(request.Password);

            _context.Users.Add(new User
            {
                Username = request.Username,
                Email = request.Email,
                Password = hashedPassword,
                Group = FindRegularMemberGroup()
            });
            _context.SaveChanges();

            return Ok();
        }

        private Group FindRegularMemberGroup()
        {
            return _context.Groups.Find(ForumDbContext.MemberGroupId);
        }

        // @todo Move to service; implement deprecated encryption algorithm handling
        private bool IsCorrectPassword(string stored, string given)
        {
            var hasher = new PasswordHasher<User>();
            PasswordVerificationResult result = hasher.VerifyHashedPassword(null, stored, given);

            return result == PasswordVerificationResult.Success;
        }

        public static string GetHashedPassword(string password)
        {
            var hasher = new PasswordHasher<User>();

            return hasher.HashPassword(null, password);
        }

        // Credit goes to https://www.c-sharpcorner.com/article/jwt-json-web-token-authentication-in-asp-net-core/
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var token = new JwtSecurityToken
                (_configuration["Tokens:Issuer"],
                    _configuration["Tokens:Issuer"],
                    claims,
                    expires: DateTime.Now.AddMinutes(440),
                    signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;

using TodoAPI.Models;

namespace TodoAPI.Helper
{

    // Helper class for generating JWT tokens
    public static class JwtHelper
    {
        // Method to generate a JWT token for a user
        // Takes a User object and IConfiguration for accessing JWT settings
        public static string GenerateToken(User user, IConfiguration config)
        {
            // Define claims for the token
            // Includes the user's username and ID
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

            // Generate a symmetric security key using the JWT key from configuration
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));

            // Create signing credentials using the security key and HMAC SHA256 algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT token with issuer, audience, claims, expiration, and signing credentials
            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);
            // Return the serialized JWT token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
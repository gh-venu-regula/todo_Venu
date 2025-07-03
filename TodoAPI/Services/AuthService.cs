using System.Security.Cryptography;

using Microsoft.EntityFrameworkCore;

using TodoAPI.Data;
using TodoAPI.DTOs;
using TodoAPI.Helper;
using TodoAPI.Models;

namespace TodoAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        // Constructor initializes the DbContext and Configuration for dependency injection
        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // Method to register a new user
        // 1. Checks if a user with the same username already exists
        // 2. Creates a password hash and salt using HMACSHA512
        // 3. Maps the DTO to the User entity
        // 4. Saves the user to the database
        public async Task<bool> RegisterUserAsync(UserRegisterDto userRegisterDto)
        {
            // Check if user with same email exists (optional but good practice)
            if (await _context.Users.AnyAsync(u => u.Username == userRegisterDto.Username))
                return false; // User already exists

            // Create password hash & salt
            using var hmac = new HMACSHA512();
            byte[] passwordSalt = hmac.Key;
            byte[] passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userRegisterDto.Password));

            // Map to User entity (manual or AutoMapper)
            var user = new User
            {
                Username = userRegisterDto.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            // Add user to DbContext and save
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return true; // Registration success
        }

        // Method to log in a user
        // 1. Finds the user by username
        // 2. Hashes the incoming password using the stored salt
        // 3. Compares the computed hash with the stored hash
        // 4. Generates a JWT token for the user
        public async Task<string?> LoginUserAsync(UserLoginDto userLoginDto)
        {
            // Find the user by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userLoginDto.Username);
            if (user == null)
                return null; // User not found

            // Hash the incoming password with the stored salt
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userLoginDto.Password));

            // Compare the computed hash with the stored hash
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return null; // Invalid password
            }

            // Generate JWT token using your helper/service
            string token = JwtHelper.GenerateToken(user, _config);  // You’ll need to implement this

            return token;
        }

    }
}
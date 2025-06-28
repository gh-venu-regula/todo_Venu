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

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public async Task<bool> RegisterUserAsync(UserRegisterDto userRegisterDto)
        {
            // 1. Check if user with same email exists (optional but good practice)
            if (await _context.Users.AnyAsync(u => u.Username == userRegisterDto.Username))
                return false; // User already exists

            // 2. Create password hash & salt
            using var hmac = new HMACSHA512();
            byte[] passwordSalt = hmac.Key;
            byte[] passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userRegisterDto.Password));

            // 3. Map to User entity (manual or AutoMapper)
            var user = new User
            {
                Username = userRegisterDto.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            // 4. Add user to DbContext and save
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return true; // Registration success
        }


        public async Task<string?> LoginUserAsync(UserLoginDto userLoginDto)
        {
            // 1️⃣ Find the user by email (or username if you prefer)
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userLoginDto.Username);
            if (user == null)
                return null; // User not found

            // 2️⃣ Hash the incoming password with the stored salt
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userLoginDto.Password));

            // 3️⃣ Compare the computed hash with the stored hash
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return null; // Invalid password
            }

            // 4️⃣ Generate JWT token using your helper/service
            string token = JwtHelper.GenerateToken(user, _config);  // You’ll need to implement this

            return token;
        }

    }
}
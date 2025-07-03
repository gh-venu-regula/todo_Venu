using TodoAPI.DTOs;

namespace TodoAPI.Services
{
    // Interface for authentication service
    // Defines methods for user registration and login
    public interface IAuthService
    {
        // Method to register a new user
        // Takes a UserRegisterDto as input and returns a boolean indicating success or failure
        Task<bool> RegisterUserAsync(UserRegisterDto userRegisterDto);

        // Method to log in a user
        // Takes a UserLoginDto as input and returns a JWT token string or null if login fails
        Task<string?> LoginUserAsync(UserLoginDto userLoginDto);
    }
}
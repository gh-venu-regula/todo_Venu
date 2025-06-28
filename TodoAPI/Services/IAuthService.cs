using TodoAPI.DTOs;

namespace TodoAPI.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(UserRegisterDto userRegisterDto);
        Task<string?> LoginUserAsync(UserLoginDto userLoginDto);
    }
}
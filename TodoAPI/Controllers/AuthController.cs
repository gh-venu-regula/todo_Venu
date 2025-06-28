using AutoMapper;

using Microsoft.AspNetCore.Mvc;

using TodoAPI.DTOs;
using TodoAPI.Services;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            if (userRegisterDto == null || !ModelState.IsValid)
                return BadRequest("Invalid registration data.");

            var result = await _authService.RegisterUserAsync(userRegisterDto);
            if (!result)
                return BadRequest("User already exists or registration failed.");

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (userLoginDto == null || !ModelState.IsValid)
                return BadRequest("Invalid login data.");

            var token = await _authService.LoginUserAsync(userLoginDto);
            if (token == null)
                return Unauthorized("Invalid username or password.");

            return Ok(new { Token = token });
        }
    }
}

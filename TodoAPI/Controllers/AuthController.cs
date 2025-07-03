using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TodoAPI.DTOs;
using TodoAPI.Services;

namespace TodoAPI.Controllers
{
    // Controller for handling authentication-related endpoints
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        // Constructor initializes the authentication service and AutoMapper
        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        // Endpoint for user registration
        // Accepts UserRegisterDto and returns success or failure message
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            if (userRegisterDto == null || !ModelState.IsValid)
                return BadRequest("Invalid registration data.");

            var result = await _authService.RegisterUserAsync(userRegisterDto);
            if (!result)
                return BadRequest("User already exists or registration failed.");

            return Ok(new { Message = "User registered successfully." });
        }

        // Endpoint for user login
        // Accepts UserLoginDto and returns a JWT token or error message
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

        // Endpoint for verifying the validity of a JWT token
        // Requires authorization and returns success message
        [Authorize]
        [HttpGet("verify")]
        public IActionResult VerifyToken()
        {
            return Ok(new { isvalid = true, Message = "success" });
        }
    }
}


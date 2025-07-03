using System.ComponentModel.DataAnnotations;
namespace TodoAPI.DTOs
{
    // DTO class for user login
    public class UserLoginDto
    {
        // Username of the user
        // Required with a maximum length of 100 characters
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(100, ErrorMessage = "Username cannot be longer than 100 characters.")]
        [MinLength(5, ErrorMessage = "Username must be at least 5 characters long.")]
        public string Username { get; set; }

        // Password of the user
        // Required with a maximum length of 30 characters
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(30, ErrorMessage = "Password cannot be longer than 30 characters.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; }
    }
}
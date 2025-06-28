using System.ComponentModel.DataAnnotations;

namespace TodoAPI.DTOs
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(100, ErrorMessage = "Username cannot be longer than 100 characters.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(30, ErrorMessage = "Password cannot be longer than 30 characters.")]
        public string Password { get; set; }
    }
}
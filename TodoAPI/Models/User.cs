using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    // Model class representing a User entity
    public class User
    {
        // Primary key for the User entity
        public int Id { get; set; }

        // Username of the user
        // Required with a maximum length of 100 characters
        [Required(ErrorMessage = "Username is required.")]

        [StringLength(100, ErrorMessage = "Username cannot be longer than 100 characters.")]
        [MinLength(5, ErrorMessage = "Username must be at least 5 characters long.")]
        public string Username { get; set; } = string.Empty;

        // Password hash for secure storage
        // Required and generated during registration
        [Required(ErrorMessage = "Password hash is required.")]
        public byte[] PasswordHash { get; set; }

        // Password salt for secure storage
        // Required and generated during registration
        [Required(ErrorMessage = "Password salt is required.")]
        public byte[] PasswordSalt { get; set; }

        // Navigation property for tasks associated with the user
        // Represents a one-to-many relationship (1 User → Many Tasks)
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}

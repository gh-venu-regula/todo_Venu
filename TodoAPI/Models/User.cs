using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        [StringLength(100, ErrorMessage = "Username cannot be longer than 100 characters.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password hash is required.")]
        public byte[] PasswordHash { get; set; }

        [Required(ErrorMessage = "Password salt is required.")]
        public byte[] PasswordSalt { get; set; }

        // Navigation: 1 User → Many Todos
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}

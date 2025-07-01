using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoAPI.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, ErrorMessage = "Title cannot be longer than 200 characters.")]
        public string Title { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Description cannot be longer than 500 characters.")]
        public string? Description { get; set; } = "No description provided"; // ✅ Optional with default

        [Required(ErrorMessage = "Due date is required.")]
        [DataType(DataType.Date)]
        public DateTime? DueDate { get; set; }
        
        public bool IsCompleted { get; set; } = false;

        [Required(ErrorMessage = "Priority is required.")]
        [Range(1, 3, ErrorMessage = "Priority must be between 1 (Low) and 3 (High).")]
        public int Priority { get; set; } = 1;

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; //  Auto set

        [StringLength(200)]
        public string? Tags { get; set; } = "others"; // Optional with default

        public bool IsArchived { get; set; } = false; //  Soft delete or hide

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}

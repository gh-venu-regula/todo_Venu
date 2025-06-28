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
        public string? Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DueDate { get; set; }
        
        public bool IsCompleted { get; set; } = false;
        //only allow 1, 2, or 3 for priority
        [Required(ErrorMessage = "Priority is required.")]
        [Range(1, 3, ErrorMessage = "Priority must be between 1 (Low) and 3 (High).")]
        public int Priority { get; set; } = 1; // 1=Low, 2=Medium, 3=High

        // Foreign key
        [ForeignKey("User")]
        public int UserId { get; set; }

        // Navigation property
        public User? User { get; set; }
    }
}

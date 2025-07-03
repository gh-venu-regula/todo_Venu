using System.ComponentModel.DataAnnotations;

namespace TodoAPI.DTOs
{
    // DTO class for reading task details
    public class TaskReadDto
    {
        // Unique identifier for the task
        public int Id { get; set; }

        // Title of the task
        // Required with a maximum length of 200 characters
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, ErrorMessage = "Title cannot be longer than 200 characters.")]
        public string Title { get; set; } = string.Empty;

        // Description of the task
        // Optional with a maximum length of 500 characters
        [StringLength(500, ErrorMessage = "Description cannot be longer than 500 characters.")]
        public string? Description { get; set; }

        // Due date for the task
        // Optional and must be a valid date
        [DataType(DataType.Date)]
        public DateTime? DueDate { get; set; }

        // Indicates whether the task is completed
        // Defaults to false
        public bool IsCompleted { get; set; } = false;

        // Priority of the task
        // Required with a range between 1 (Low) and 3 (High)
        [Required(ErrorMessage = "Priority is required.")]
        [Range(1, 3, ErrorMessage = "Priority must be between 1 (Low) and 3 (High).")]
        public int Priority { get; set; } = 1; // 1=Low, 2=Medium, 3=High

        // Timestamp for when the task was created
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        // Tags associated with the task
        // Optional with a default value
        [StringLength(200)]
        public string? Tags { get; set; } = "others"; // Optional with default

        // Indicates whether the task is archived
        // Defaults to false for soft delete or hiding
        public bool IsArchived { get; set; } = false; // Soft delete or hide
    }
}
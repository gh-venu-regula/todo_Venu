using TodoAPI.DTOs;
namespace TodoAPI.Services
{
    // Interface for task service
    // Defines methods for managing tasks associated with a user
    public interface ITaskService
    {
        // Method to retrieve all tasks for a specific user
        // Takes a userId as input and returns a collection of TaskReadDto
        Task<IEnumerable<TaskReadDto>> GetAllTasksAsync(int userId);

        // Method to retrieve a specific task by its ID for a user
        // Takes userId and taskId as input and returns a TaskReadDto or null if not found
        Task<TaskReadDto?> GetTaskByIdAsync(int userId, int taskId);

        // Method to create a new task for a user
        // Takes userId and TaskCreateDto as input and returns a boolean indicating success or failure
        Task<bool> CreateTaskAsync(int userId, TaskCreateDto task);

        // Method to update an existing task for a user
        // Takes userId and TaskUpdateDto as input and returns a boolean indicating success or failure
        Task<bool> UpdateTaskAsync(int userId, TaskUpdateDto task);

        // Method to delete a task for a user
        // Takes userId and taskId as input and returns a boolean indicating success or failure
        Task<bool> DeleteTaskAsync(int userId, int taskId);
    }
}
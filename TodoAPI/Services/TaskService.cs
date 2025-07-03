using Microsoft.EntityFrameworkCore;

using TodoAPI.Data;
using TodoAPI.DTOs;
using TodoAPI.Models;
namespace TodoAPI.Services
{
    // Service class for managing tasks
    // Implements the ITaskService interface
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        // Constructor initializes the DbContext for dependency injection
        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        // Method to retrieve all tasks for a specific user
        // Filters tasks by userId and maps them to TaskReadDto
        public async Task<IEnumerable<TaskReadDto>> GetAllTasksAsync(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .Select(t => new TaskReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    Priority = t.Priority,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    Tags = t.Tags,
                    IsArchived = t.IsArchived
                })
                .ToListAsync();
        }
        // Method to retrieve a specific task by its ID for a user
        // Filters tasks by userId and taskId and maps them to TaskReadDto
        public async Task<TaskReadDto?> GetTaskByIdAsync(int userId, int taskId)
        {
            var task = await _context.Tasks
                .Where(t => t.UserId == userId && t.Id == taskId)
                .Select(t => new TaskReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    Priority = t.Priority,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    Tags = t.Tags,
                    IsArchived = t.IsArchived
                })
                .FirstOrDefaultAsync();

            return task;
        }

        // Method to create a new task for a user
        // Maps TaskCreateDto to Task entity and saves it to the database
        public async Task<bool> CreateTaskAsync(int userId, TaskCreateDto task)
        {
            var new_task = new TodoAPI.Models.Task
            {
                UserId = userId,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow, // Auto set
                Tags = task.Tags ?? "others", // Optional with default
                IsArchived = false
            };

            _context.Tasks.Add(new_task);
            return await _context.SaveChangesAsync() > 0;
        }

        // Method to update an existing task for a user
        // Finds the task by ID, updates its properties, and saves changes to the database
        public async Task<bool> UpdateTaskAsync(int userId, TaskUpdateDto task)
        {
            var taskToUpdate = await _context.Tasks.FindAsync(task.Id);
            if (taskToUpdate == null || taskToUpdate.UserId != userId) return false;

            taskToUpdate.Title = task.Title;
            taskToUpdate.Description = task.Description;
            taskToUpdate.IsCompleted = task.IsCompleted;
            taskToUpdate.DueDate = task.DueDate;
            taskToUpdate.Priority = task.Priority;
            taskToUpdate.Tags = task.Tags ?? "others"; // Optional with default
            taskToUpdate.IsArchived = task.IsArchived;
            return await _context.SaveChangesAsync() > 0;
        }

        // Method to delete a task for a user
        // Finds the task by ID, removes it from the database, and saves changes
        public async Task<bool> DeleteTaskAsync(int userId, int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null || task.UserId != userId) return false;

            _context.Tasks.Remove(task);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
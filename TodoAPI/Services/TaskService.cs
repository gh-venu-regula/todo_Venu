using Microsoft.EntityFrameworkCore;

using TodoAPI.Data;
using TodoAPI.DTOs;
using TodoAPI.Models;
namespace TodoAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

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
                    IsCompleted = t.IsCompleted
                })
                .ToListAsync();
        }
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
                    IsCompleted = t.IsCompleted
                })
                .FirstOrDefaultAsync();

            return task;
        }

        public async Task<bool> CreateTaskAsync(int userId, TaskCreateDto task)
        {
            var new_task = new TodoAPI.Models.Task
            {
                UserId = userId,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority,
                IsCompleted = false
            };

            _context.Tasks.Add(new_task);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateTaskAsync(int userId, TaskUpdateDto task)
        {
            var taskToUpdate = await _context.Tasks.FindAsync(task.Id);
            if (taskToUpdate == null || taskToUpdate.UserId != userId) return false;

            taskToUpdate.Title = task.Title;
            taskToUpdate.Description = task.Description;
            taskToUpdate.IsCompleted = task.IsCompleted;
            taskToUpdate.DueDate = task.DueDate;
            taskToUpdate.Priority = task.Priority;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteTaskAsync(int userId, int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null || task.UserId != userId) return false;

            _context.Tasks.Remove(task);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
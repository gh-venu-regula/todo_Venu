using TodoAPI.DTOs;
namespace TodoAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskReadDto>> GetAllTasksAsync(int userId);
        Task<TaskReadDto?> GetTaskByIdAsync(int userId, int taskId);
        Task<bool> CreateTaskAsync(int userId, TaskCreateDto task);
        Task<bool> UpdateTaskAsync(int userId, TaskUpdateDto task);
        Task<bool> DeleteTaskAsync(int userId, int taskId);
    }
}
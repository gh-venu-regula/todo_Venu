using System.Security.Claims;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using TodoAPI.DTOs; // Ensure DTOs are correctly referenced
using TodoAPI.Models; // Add this if TaskCreateDto is in the Models namespace
using TodoAPI.Services;

namespace TodoAPI.Controllers
{
    // Controller for handling task-related endpoints
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Ensures the controller is protected by authentication
    public class TaskController : Controller
    {
        private readonly ITaskService _taskService;

        // Property to retrieve the authenticated user's ID from claims
        protected int UserId
        {
            get
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                {
                    return userId;
                }
                throw new UnauthorizedAccessException("User ID claim not found.");
            }
        }

        // Constructor initializes the task service
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // Endpoint to retrieve all tasks for the authenticated user
        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync(UserId); // Fetches tasks for the user
            return Ok(new { Tasks = tasks });
        }

        // Endpoint to retrieve a specific task by its ID for the authenticated user
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(UserId, id);
            if (task == null) return NotFound();
            return Ok(new { Task = task });
        }

        // Endpoint to create a new task for the authenticated user
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto task)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _taskService.CreateTaskAsync(UserId, task);
            if (!result) return BadRequest("Failed to create task.");
            return Ok(new { Result = true });
        }

        // Endpoint to update an existing task for the authenticated user
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateDto task)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _taskService.UpdateTaskAsync(UserId, task);
            if (!result) return NotFound();
            return Ok(new { Result = true });
        }

        // Endpoint to delete a task for the authenticated user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTaskAsync(UserId, id);
            if (!result) return NotFound();
            return Ok(new { Result = true });
        }
    }
}
using AutoMapper;

using TodoAPI.DTOs;
using TodoAPI.Models;

namespace TodoAPI.Mapper
{
    // AutoMapper profile for mapping between DTOs and models
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            // Mapping from UserRegisterDto to User
            // Used during user registration
            CreateMap<UserRegisterDto, User>();

            // Mapping from UserLoginDto to User
            // Used during user login
            CreateMap<UserLoginDto, User>();

            // Mapping from TaskCreateDto to Task
            // Used when creating a new task
            CreateMap<TaskCreateDto, TodoAPI.Models.Task>();

            // Mapping from TaskUpdateDto to Task
            // Used when updating an existing task
            CreateMap<TaskUpdateDto, TodoAPI.Models.Task>();

            // Mapping from Task to TaskReadDto
            // Used when retrieving task details
            CreateMap<TodoAPI.Models.Task, TaskReadDto>();
        }
    }
}
using AutoMapper;

using TodoAPI.DTOs;
using TodoAPI.Models;

namespace TodoAPI.Mapper
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<TaskCreateDto, TodoAPI.Models.Task>();
            CreateMap<TaskUpdateDto, TodoAPI.Models.Task>();
            CreateMap<TodoAPI.Models.Task, TaskReadDto>();
        }
    }
}
using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.Dtos;

namespace Backend.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
        }
    }
}

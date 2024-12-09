using Backend.Models.Dtos;

namespace Backend.Services
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(int userId);
        Task<UserDto> GetUserByEmailAsync(string email);
        Task<IEnumerable<UserDto>> GetUsersByNameAsync(string name);
        Task<UserDto?> CreateUserAsync(CreateUserDto userDto);
        Task<bool> UpdateUserAsync(int userId, CreateUserDto updatedUserDto);
        Task<bool> DeleteUserAsync(int userId);
        Task<UserDto?> Login(CheckLoginDto checkLoginDto);
    }
}

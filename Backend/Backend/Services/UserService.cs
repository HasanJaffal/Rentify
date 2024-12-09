using AutoMapper;
using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly RentifyDbContext _context;
        private readonly IMapper _mapper;

        public UserService(RentifyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDto> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user != null ? _mapper.Map<UserDto>(user) : null;
        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user != null ? _mapper.Map<UserDto>(user) : null;
        }

        public async Task<IEnumerable<UserDto>> GetUsersByNameAsync(string name)
        {
            var users = await _context.Users
                .Where(u => u.Name.Contains(name))
                .ToListAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto userDto)
        {
            // Check if the email already exists
            var existingUserByEmail = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (existingUserByEmail != null)
            {
                throw new ArgumentException("This email is already in use.", nameof(userDto.Email));
            }

            // Map the CreateUserDto to the User entity
            var user = _mapper.Map<User>(userDto);

            // Add logic to hash password before saving to database
            user.Password = HashPassword(user.Password);

            // Save the user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return the mapped UserDto
            return _mapper.Map<UserDto>(user);
        }


        public async Task<bool> UpdateUserAsync(int userId, CreateUserDto updatedUserDto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            // Map updated properties (except password)
            user.Name = updatedUserDto.Name;
            user.Email = updatedUserDto.Email;
            user.PhoneNumber = updatedUserDto.PhoneNumber;

            if (!string.IsNullOrEmpty(updatedUserDto.Password))
            {
                user.Password = HashPassword(updatedUserDto.Password);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }

        private string HashPassword(string password)
        {
            // Add hashing logic here (e.g., using BCrypt or other libraries)
            return password; // Placeholder for demonstration purposes
        }

        public async Task<UserDto?> Login(CheckLoginDto checkLoginDto)
        {
            if (string.IsNullOrWhiteSpace(checkLoginDto.Email))
            {
                throw new ArgumentException("Email must not be null or empty.", nameof(checkLoginDto.Email));
            }

            if (string.IsNullOrWhiteSpace(checkLoginDto.Password))
            {
                throw new ArgumentException("Password must not be null or empty.", nameof(checkLoginDto.Password));
            }

            // Query the database to find a user by email or username
            var user = await _context.Users
                .FirstOrDefaultAsync(u => ( u.Email == checkLoginDto.Email && u.Password == checkLoginDto.Password));

            if (user == null)
            {
                return null;
            }

            // Check if the password matches (assumes passwords are stored securely as hashes)
            return await GetUserByEmailAsync(user.Email);
        }

    }
}

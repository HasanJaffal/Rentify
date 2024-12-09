using Backend.Models.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersByName(string name)
        {
            return Ok(await _userService.GetUsersByNameAsync(name));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto userDto)
        {
            var createdUser = await _userService.CreateUserAsync(userDto);
            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, CreateUserDto userDto)
        {
            var success = await _userService.UpdateUserAsync(id, userDto);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            return success ? NoContent() : NotFound();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CheckLoginDto checkLoginDto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(checkLoginDto.Email) || string.IsNullOrWhiteSpace(checkLoginDto.Password))
            {
                return BadRequest(new { message = "Both login and password must be provided." });
            }
            try
            {
                // Call the service method
                var login = await _userService.Login(checkLoginDto);

                if (login == null)
                {
                    return Unauthorized(new { message = "Invalid email or password." });
                }
                return Ok(login);
            }
            catch (ArgumentException ex)
            {
                // Handle argument exceptions
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle unexpected errors
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

    }
}

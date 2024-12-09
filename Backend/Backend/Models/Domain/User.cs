using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Domain
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();
    }
}

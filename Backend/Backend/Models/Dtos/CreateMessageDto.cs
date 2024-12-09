using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Dtos
{
    public class CreateMessageDto
    {
        [Required]
        public int SenderId { get; set; }

        [Required]
        public int ReceiverId { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }
    }
}

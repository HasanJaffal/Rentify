
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Domain
{
    public class Listing
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        [Required]
        public decimal Price { get; set; }

        [Required]
        public int BedroomsNumber { get; set; }

        public int TypeId { get; set; }
        public PropertyType Type { get; set; }

        [Required]
        public string Location { get; set; }

        public List<Image> Images { get; set; } = new List<Image>();

        [MaxLength(1000)]
        public string Description { get; set; }

        public int PosterId { get; set; }
        public User Poster { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public DateTime CreationDate { get; set; }
    }
}

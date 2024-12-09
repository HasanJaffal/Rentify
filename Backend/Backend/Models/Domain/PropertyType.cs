using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Domain
{
    public class PropertyType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}

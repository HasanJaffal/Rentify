using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Dtos
{
    public class ImageDto
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public int ListingId { get; set; }
    }
}

using Backend.Models.Domain;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Dtos
{
    public class CreateImageDto
    {
        public IFormFile Image { get; set; }

        public int ListingId { get; set; }
    }
}

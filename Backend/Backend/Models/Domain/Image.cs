using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Domain
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Path { get; set; }

        public int ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}

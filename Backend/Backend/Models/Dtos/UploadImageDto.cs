namespace Backend.Models.DTOs
{
    public class UploadImageDto
    {
        public IFormFile File { get; set; }
        public int ListingId { get; set; }
    }
}

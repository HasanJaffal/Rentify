namespace Backend.Models.Dtos
{
    public class CreateListingDto
    {
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int BedroomsNumber { get; set; }
        public int TypeId { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int PosterId { get; set; }
    }
}

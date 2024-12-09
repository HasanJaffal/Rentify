namespace Backend.Models.Dtos
{
    public class ListingDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int BedroomsNumber { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int TypeId { get; set; }
        public string PropertyTypeName { get; set; }  // Assuming PropertyType has a Name property
        public int PosterId { get; set; }
        public string PosterName { get; set; }  // Assuming User has a Name property
        public DateTime CreationDate { get; set; }
    }
}

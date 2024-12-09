using Backend.Models.Dtos;

namespace Backend.Services
{
    public interface IImageService
    {
        Task<ImageDto> AddImageAsync(CreateImageDto createImageDto);
        Task<ImageDto> GetImageByIdAsync(int id);
        Task<IEnumerable<ImageDto>> GetImagesByListingIdAsync(int listingId);
        Task<bool> DeleteImageAsync(int id);
    }
}
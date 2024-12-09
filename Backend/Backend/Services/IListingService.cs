using Backend.Models.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IListingService
    {
        Task<ListingDto> GetListingByIdAsync(int id);
        Task<IEnumerable<ListingDto>> GetAllListingsAsync(string title = null, decimal? minPrice = null, decimal? maxPrice = null,
            int? bedroomsNumber = null, string location = null, int? typeId = null, int? pageNumber = 1, int? pageSize = 100);
        Task<ListingDto> CreateListingAsync(CreateListingDto createListingDto);
        Task<bool> UpdateListingAsync(int id, CreateListingDto createListingDto);
        Task<bool> DeleteListingAsync(int id);
    }
}

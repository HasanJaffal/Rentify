using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ListingService : IListingService
    {
        private readonly RentifyDbContext _context;

        public ListingService(RentifyDbContext context)
        {
            _context = context;
        }

        // Get a single listing by its ID
        public async Task<ListingDto> GetListingByIdAsync(int id)
        {
            var listing = await _context.Listings
                                        .Include(l => l.Type)      // Property Type
                                        .Include(l => l.Images)    // Images
                                        .Include(l => l.Poster)    // Poster (User)
                                        .Where(l => l.Id == id)
                                        .FirstOrDefaultAsync();

            if (listing == null)
            {
                return null;
            }

            return new ListingDto
            {
                Id = listing.Id,
                Title = listing.Title,
                Price = listing.Price,
                BedroomsNumber = listing.BedroomsNumber,
                Location = listing.Location,
                Description = listing.Description,
                TypeId = listing.TypeId,
                PropertyTypeName = listing.Type.Name,  // Assuming PropertyType has a 'Name' property
                PosterId = listing.PosterId,
                PosterName = listing.Poster.Name,  // Assuming User has a 'Name' property
                CreationDate = listing.CreationDate
            };
        }

        // Get all listings with optional filters
        public async Task<IEnumerable<ListingDto>> GetAllListingsAsync(
            string title = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            int? bedroomsNumber = null,
            string location = null, 
            int? typeId = null,
            int? pageNumber = 1,
            int? pageSize = 100)
        {
            var query = _context.Listings.AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(l => l.Title.Contains(title));
            }

            if (minPrice.HasValue)
            {
                query = query.Where(l => l.Price >= minPrice);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(l => l.Price <= maxPrice);
            }

            if (bedroomsNumber.HasValue)
            {
                query = query.Where(l => l.BedroomsNumber == bedroomsNumber);
            }

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(l => l.Location.Contains(location));
            }

            if (typeId.HasValue)
            {
                query = query.Where(l => l.TypeId == typeId);
            }

            // Pagination
            var skip = (pageNumber.Value - 1) * pageSize.Value;
            query = query.Skip(skip).Take(pageSize.Value);

            // Execute query and map to DTO
            var listings = await query
                                .Include(l => l.Type)  // Property Type
                                .Include(l => l.Images) // Images
                                .Include(l => l.Poster) // Poster (User)
                                .ToListAsync();

            return listings.Select(listing => new ListingDto
            {
                Id = listing.Id,
                Title = listing.Title,
                Price = listing.Price,
                BedroomsNumber = listing.BedroomsNumber,
                Location = listing.Location,
                Description = listing.Description,
                TypeId = listing.TypeId,
                PropertyTypeName = listing.Type.Name,  // Mapping PropertyType name
                PosterId = listing.PosterId,
                PosterName = listing.Poster.Name, // Mapping User name
                CreationDate = listing.CreationDate
            });
        }

        // Create a new listing
        public async Task<ListingDto> CreateListingAsync(CreateListingDto createListingDto)
        {
            var listing = new Listing
            {
                Title = createListingDto.Title,
                Price = createListingDto.Price,
                BedroomsNumber = createListingDto.BedroomsNumber,
                Location = createListingDto.Location,
                TypeId = createListingDto.TypeId,
                Description = createListingDto.Description,
                PosterId = createListingDto.PosterId,
                CreationDate = DateTime.UtcNow
            };

            // Add the listing to the context
            _context.Listings.Add(listing);

            // Save changes to get the Listing with its related entities
            await _context.SaveChangesAsync();

            // Eagerly load the related PropertyType and Poster entities
            var listingWithRelations = await _context.Listings
                .Include(l => l.Type)    // Eager load the Type (PropertyType)
                .Include(l => l.Poster)  // Eager load the Poster (User)
                .FirstOrDefaultAsync(l => l.Id == listing.Id);

            if (listingWithRelations == null)
            {
                throw new Exception("Failed to load listing with related entities.");
            }

            return new ListingDto
            {
                Id = listingWithRelations.Id,
                Title = listingWithRelations.Title,
                Price = listingWithRelations.Price,
                BedroomsNumber = listingWithRelations.BedroomsNumber,
                Location = listingWithRelations.Location,
                TypeId = listingWithRelations.TypeId,
                PropertyTypeName = listingWithRelations.Type?.Name,  // Safely access the Type name
                PosterId = listingWithRelations.PosterId,
                PosterName = listingWithRelations.Poster?.Name,  // Safely access the Poster name
                CreationDate = listingWithRelations.CreationDate
            };
        }


        // Update a listing
        public async Task<bool> UpdateListingAsync(int id, CreateListingDto createListingDto)
        {
            var listing = await _context.Listings.FindAsync(id);
            if (listing == null)
            {
                return false;
            }

            listing.Title = createListingDto.Title;
            listing.Price = createListingDto.Price;
            listing.BedroomsNumber = createListingDto.BedroomsNumber;
            listing.Location = createListingDto.Location;
            listing.TypeId = createListingDto.TypeId;
            listing.Description = createListingDto.Description;

            await _context.SaveChangesAsync();
            return true;
        }

        // Delete a listing
        public async Task<bool> DeleteListingAsync(int id)
        {
            var listing = await _context.Listings.FindAsync(id);
            if (listing == null)
            {
                return false;
            }

            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

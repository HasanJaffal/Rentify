using Backend.Models.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingController : ControllerBase
    {
        private readonly IListingService _listingService;

        public ListingController(IListingService listingService)
        {
            _listingService = listingService;
        }

        // Get all listings with filters and pagination
        [HttpGet]
        public async Task<IActionResult> GetAllListings(
            [FromQuery] string title = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] int? bedroomsNumber = null,
            [FromQuery] string location = null,
            [FromQuery] int? typeId = null,
            [FromQuery] int? pageNumber = 1,
            [FromQuery] int? pageSize = 100)
        {
            // Call the service method with filter and pagination parameters
            var listings = await _listingService.GetAllListingsAsync(
                title, minPrice, maxPrice, bedroomsNumber, location, typeId, pageNumber, pageSize);

            if (listings != null)
            {
                return Ok(listings);  // Return listings if found
            }

            return NotFound("No listings found.");  // Return 404 if no listings are found
        }

        // Get a single listing by its ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListingById(int id)
        {
            var listing = await _listingService.GetListingByIdAsync(id);
            if (listing == null)
            {
                return NotFound("Listing not found.");  // Return 404 if listing is not found
            }

            return Ok(listing);  // Return the listing details if found
        }

        // Create a new listing
        [HttpPost]
        public async Task<IActionResult> CreateListing([FromBody] CreateListingDto createListingDto)
        {
            var listing = await _listingService.CreateListingAsync(createListingDto);
            return CreatedAtAction(nameof(GetListingById), new { id = listing.Id }, listing);
        }

        // Update an existing listing
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateListing(int id, [FromBody] CreateListingDto createListingDto)
        {
            var success = await _listingService.UpdateListingAsync(id, createListingDto);
            if (!success)
            {
                return NotFound("Listing not found.");  // Return 404 if the listing is not found
            }

            return NoContent();  // Return 204 No Content if the update is successful
        }

        // Delete a listing
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var success = await _listingService.DeleteListingAsync(id);
            if (!success)
            {
                return NotFound("Listing not found.");  // Return 404 if the listing is not found
            }

            return NoContent();  // Return 204 No Content if the deletion is successful
        }
    }
}

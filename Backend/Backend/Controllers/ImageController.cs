using Backend.Models.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] CreateImageDto createImageDto)
        {
            try
            {
                var imageDto = await _imageService.AddImageAsync(createImageDto);
                return Ok(imageDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            try
            {
                var imageDto = await _imageService.GetImageByIdAsync(id);
                return Ok(imageDto);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet("listing/{listingId}")]
        public async Task<IActionResult> GetImagesByListingId(int listingId)
        {
            var images = await _imageService.GetImagesByListingIdAsync(listingId);
            return Ok(images);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var result = await _imageService.DeleteImageAsync(id);
            if (!result) return NotFound(new { message = "Image not found." });

            return NoContent();
        }
    }
}

using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.Dtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ImageService : IImageService
    {
        private readonly RentifyDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ImageService(RentifyDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<ImageDto> AddImageAsync(CreateImageDto createImageDto)
        {
            if (createImageDto.Image == null || createImageDto.Image.Length == 0)
                throw new ArgumentException("Invalid image file.");

            // Save the image to the file system
            var imagesFolder = Path.Combine(_environment.ContentRootPath, "../../Frontend/public/images");
            if (!Directory.Exists(imagesFolder))
                Directory.CreateDirectory(imagesFolder);

            var fileName = Guid.NewGuid() + Path.GetExtension(createImageDto.Image.FileName);
            var filePath = Path.Combine(imagesFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await createImageDto.Image.CopyToAsync(stream);
            }

            // Save the image path and listing ID in the database
            var newImage = new Image
            {
                Path = $"/images/{fileName}",
                ListingId = createImageDto.ListingId
            };

            _context.Images.Add(newImage);
            await _context.SaveChangesAsync();

            return new ImageDto
            {
                Id = newImage.Id,
                Path = newImage.Path,
                ListingId = newImage.ListingId
            };
        }

        public async Task<ImageDto> GetImageByIdAsync(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null) throw new Exception("Image not found.");

            return new ImageDto
            {
                Id = image.Id,
                Path = image.Path,
                ListingId = image.ListingId
            };
        }

        public async Task<IEnumerable<ImageDto>> GetImagesByListingIdAsync(int listingId)
        {
            var images = await _context.Images
                .Where(img => img.ListingId == listingId)
                .Select(img => new ImageDto
                {
                    Id = img.Id,
                    Path = img.Path,
                    ListingId = img.ListingId
                })
                .ToListAsync();

            return images;
        }

        public async Task<bool> DeleteImageAsync(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null) return false;

            // Delete the file from the file system
            var filePath = Path.Combine(_environment.ContentRootPath, "../../Frontend/public", image.Path.TrimStart('/'));
            if (File.Exists(filePath))
                File.Delete(filePath);

            // Delete the record from the database
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

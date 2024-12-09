using Backend.Models.Dtos.Backend.Dtos;
using Backend.Models.Dtos;

namespace Backend.Services
{
    public interface IPropertyTypeService
    {
        Task<PropertyTypeDto> GetPropertyTypeByIdAsync(int id);
        Task<IEnumerable<PropertyTypeDto>> GetAllPropertyTypesAsync();
        Task<PropertyTypeDto> CreatePropertyTypeAsync(CreatePropertyTypeDto createPropertyTypeDto);
        Task<bool> UpdatePropertyTypeAsync(int id, CreatePropertyTypeDto createPropertyTypeDto);
        Task<bool> DeletePropertyTypeAsync(int id);
    }
}

using Backend.Models.Dtos.Backend.Dtos;
using Backend.Models.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyTypeController : ControllerBase
    {
        private readonly IPropertyTypeService _propertyTypeService;

        public PropertyTypeController(IPropertyTypeService propertyTypeService)
        {
            _propertyTypeService = propertyTypeService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyTypeDto>> GetPropertyType(int id)
        {
            var propertyType = await _propertyTypeService.GetPropertyTypeByIdAsync(id);
            if (propertyType == null) return NotFound();
            return Ok(propertyType);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyTypeDto>>> GetAllPropertyTypes()
        {
            return Ok(await _propertyTypeService.GetAllPropertyTypesAsync());
        }

        [HttpPost]
        public async Task<ActionResult<PropertyTypeDto>> CreatePropertyType(CreatePropertyTypeDto createPropertyTypeDto)
        {
            var createdPropertyType = await _propertyTypeService.CreatePropertyTypeAsync(createPropertyTypeDto);
            return CreatedAtAction(nameof(GetPropertyType), new { id = createdPropertyType.Id }, createdPropertyType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePropertyType(int id, CreatePropertyTypeDto createPropertyTypeDto)
        {
            var success = await _propertyTypeService.UpdatePropertyTypeAsync(id, createPropertyTypeDto);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePropertyType(int id)
        {
            var success = await _propertyTypeService.DeletePropertyTypeAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}

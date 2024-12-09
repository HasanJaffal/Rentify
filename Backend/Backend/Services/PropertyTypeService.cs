using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.Dtos.Backend.Dtos;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Data;

namespace Backend.Services
{
    public class PropertyTypeService : IPropertyTypeService
    {
        private readonly RentifyDbContext _context;
        private readonly IMapper _mapper;

        public PropertyTypeService(RentifyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PropertyTypeDto> GetPropertyTypeByIdAsync(int id)
        {
            var propertyType = await _context.PropertyTypes.FindAsync(id);
            return propertyType == null ? null : _mapper.Map<PropertyTypeDto>(propertyType);
        }

        public async Task<IEnumerable<PropertyTypeDto>> GetAllPropertyTypesAsync()
        {
            var propertyTypes = await _context.PropertyTypes.ToListAsync();
            return _mapper.Map<IEnumerable<PropertyTypeDto>>(propertyTypes);
        }

        public async Task<PropertyTypeDto> CreatePropertyTypeAsync(CreatePropertyTypeDto createPropertyTypeDto)
        {
            var propertyType = _mapper.Map<PropertyType>(createPropertyTypeDto);
            _context.PropertyTypes.Add(propertyType);
            await _context.SaveChangesAsync();
            return _mapper.Map<PropertyTypeDto>(propertyType);
        }

        public async Task<bool> UpdatePropertyTypeAsync(int id, CreatePropertyTypeDto createPropertyTypeDto)
        {
            var propertyType = await _context.PropertyTypes.FindAsync(id);
            if (propertyType == null) return false;

            _mapper.Map(createPropertyTypeDto, propertyType);
            _context.PropertyTypes.Update(propertyType);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletePropertyTypeAsync(int id)
        {
            var propertyType = await _context.PropertyTypes.FindAsync(id);
            if (propertyType == null) return false;

            _context.PropertyTypes.Remove(propertyType);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

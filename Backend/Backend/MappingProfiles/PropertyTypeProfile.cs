using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.Dtos.Backend.Dtos;
using Backend.Models.Dtos;

namespace Backend.Models.MappingProfiles
{
    public class PropertyTypeProfile : Profile
    {
        public PropertyTypeProfile()
        {
            CreateMap<PropertyType, PropertyTypeDto>();
            CreateMap<CreatePropertyTypeDto, PropertyType>();
        }
    }
}

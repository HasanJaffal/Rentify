using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.Dtos;

namespace Backend.Models.MappingProfiles
{
    public class ListingProfile : Profile
    {
        public ListingProfile()
        {
            CreateMap<Listing, ListingDto>()
                .ForMember(dest => dest.PropertyTypeName, opt => opt.MapFrom(src => src.Type.Name))
                .ForMember(dest => dest.PosterName, opt => opt.MapFrom(src => src.Poster.Name));

            CreateMap<CreateListingDto, Listing>();
        }
    }
}

using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.Dtos;

namespace Backend.MappingProfiles
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageDto>();
            CreateMap<CreateMessageDto, Message>();
        }
    }
}

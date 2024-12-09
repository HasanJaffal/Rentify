using Backend.Models.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IMessageService
    {
        Task<MessageDto> GetMessageByIdAsync(int messageId);
        Task<IEnumerable<MessageDto>> GetMessagesBySenderIdAsync(int senderId);
        Task<IEnumerable<MessageDto>> GetMessagesByReceiverIdAsync(int receiverId);
        Task<IEnumerable<MessageDto>> GetMessagesBySenderAndReceiverIdAsync(int senderId, int receiverId);
        Task<MessageDto> CreateMessageAsync(CreateMessageDto messageDto);
        Task<bool> UpdateMessageAsync(int messageId, CreateMessageDto updatedMessageDto);
        Task<bool> DeleteMessageAsync(int messageId);
    }
}

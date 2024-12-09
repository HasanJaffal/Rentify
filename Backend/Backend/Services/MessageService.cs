using AutoMapper;
using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class MessageService : IMessageService
    {
        private readonly RentifyDbContext _context;
        private readonly IMapper _mapper;

        public MessageService(RentifyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MessageDto> GetMessageByIdAsync(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            return message != null ? _mapper.Map<MessageDto>(message) : null;
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesBySenderIdAsync(int senderId)
        {
            var messages = await _context.Messages
                .Where(m => m.SenderId == senderId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesByReceiverIdAsync(int receiverId)
        {
            var messages = await _context.Messages
                .Where(m => m.ReceiverId == receiverId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesBySenderAndReceiverIdAsync(int senderId, int receiverId)
        {
            var messages = await _context.Messages
                .Where(m => m.SenderId == senderId && m.ReceiverId == receiverId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<MessageDto> CreateMessageAsync(CreateMessageDto messageDto)
        {
            var message = _mapper.Map<Message>(messageDto);
            message.CreationDate = DateTime.UtcNow;

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return _mapper.Map<MessageDto>(message);
        }

        public async Task<bool> UpdateMessageAsync(int messageId, CreateMessageDto updatedMessageDto)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message == null) return false;

            _mapper.Map(updatedMessageDto, message);
            _context.Messages.Update(message);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteMessageAsync(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message == null) return false;

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

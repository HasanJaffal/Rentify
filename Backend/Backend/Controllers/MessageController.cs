using Backend.Models.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MessageDto>> GetMessage(int id)
        {
            var message = await _messageService.GetMessageByIdAsync(id);
            if (message == null) return NotFound();
            return Ok(message);
        }

        [HttpGet("sender/{senderId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesBySender(int senderId)
        {
            return Ok(await _messageService.GetMessagesBySenderIdAsync(senderId));
        }

        [HttpGet("receiver/{receiverId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesByReceiver(int receiverId)
        {
            return Ok(await _messageService.GetMessagesByReceiverIdAsync(receiverId));
        }

        [HttpGet("conversation")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesBySenderAndReceiver(int senderId, int receiverId)
        {
            return Ok(await _messageService.GetMessagesBySenderAndReceiverIdAsync(senderId, receiverId));
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto messageDto)
        {
            var createdMessage = await _messageService.CreateMessageAsync(messageDto);
            return CreatedAtAction(nameof(GetMessage), new { id = createdMessage.Id }, createdMessage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMessage(int id, CreateMessageDto messageDto)
        {
            var success = await _messageService.UpdateMessageAsync(id, messageDto);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var success = await _messageService.DeleteMessageAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}

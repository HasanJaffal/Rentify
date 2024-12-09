import axios from "axios";
import { MessageDto } from "../interfaces/MessageDto";
import { CreateMessageDto } from "../interfaces/CreateMessageDto";

const API_BASE_URL = "https://localhost:7059/api/message";

export class MessageService {
    // Get a single message by its ID
    async getMessageById(id: number): Promise<MessageDto | null> {
        try {
            const response = await axios.get<MessageDto>(
                `${API_BASE_URL}/${id}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    // Get all messages sent by a specific sender
    async getMessagesBySenderId(senderId: number): Promise<MessageDto[]> {
        const response = await axios.get<MessageDto[]>(
            `${API_BASE_URL}/sender/${senderId}`
        );
        return response.data;
    }

    // Get all messages received by a specific receiver
    async getMessagesByReceiverId(receiverId: number): Promise<MessageDto[]> {
        const response = await axios.get<MessageDto[]>(
            `${API_BASE_URL}/receiver/${receiverId}`
        );
        return response.data;
    }

    // Get all messages between a sender and receiver
    async getMessagesBySenderAndReceiverId(
        senderId: number,
        receiverId: number
    ): Promise<MessageDto[]> {
        const response = await axios.get<MessageDto[]>(
            `${API_BASE_URL}/conversation`,
            {
                params: { senderId, receiverId },
            }
        );
        return response.data;
    }

    // Create a new message
    async createMessage(messageDto: CreateMessageDto): Promise<MessageDto> {
        const response = await axios.post<MessageDto>(
            `${API_BASE_URL}`,
            messageDto
        );
        return response.data;
    }

    // Update an existing message
    async updateMessage(
        id: number,
        messageDto: CreateMessageDto
    ): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, messageDto);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    }

    // Delete a message
    async deleteMessage(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    }
}

export default new MessageService();

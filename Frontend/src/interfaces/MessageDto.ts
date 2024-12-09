export interface MessageDto {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    creationDate: string;  // Use string for dates, or Date if needed
}

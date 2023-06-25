export interface CreatePrivateMessageDto {
    content: string;
    senderId: number;
    recipientId: number;
}
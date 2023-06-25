import { User } from "../user.model";

export interface PrivateMessageDto {
    id: number;
    content: string;
    sender: User;
    recipient: User;
    sentDateTime: Date;
    chatId: number;

}
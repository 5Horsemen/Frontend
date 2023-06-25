import { UserDto } from "../users/user-dto.model";


export interface PrivateMessageDto {
    id: number;
    content: string;
    sender: UserDto;
    recipient: UserDto;
    sentDateTime: Date;
    chatId: number;

}
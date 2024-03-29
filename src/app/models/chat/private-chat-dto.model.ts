import { PrivateMessageDto } from "../messages/private-message-dto";
import { UserDto } from "../users/user-dto.model";


export interface PrivateChatDto {
    id: number;
    user1: UserDto;
    user2: UserDto;
    messages: PrivateMessageDto[];
}
import { PrivateMessageDto } from "./private-message-dto";

export interface GroupedMessages {
    date: Date;
    messages: PrivateMessageDto[];

}
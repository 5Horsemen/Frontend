import { UserDto } from "../users/user-dto.model";

export interface CommentDto {
    id: number;
    content: string;
    user: UserDto;
    postId: number;
    likes: number[];
}
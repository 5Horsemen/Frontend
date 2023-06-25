import { UserDto } from "../users/user-dto.model";
import { CommentDto } from "./comment-dto.model";


export interface PostDto {
    id: number;
    content: string;
    userId: number;
    likes: UserDto[];
    shares: UserDto[];
    comments: CommentDto[];
    image: any[];
    createdDate: Date;
    imageUrl: string;
}
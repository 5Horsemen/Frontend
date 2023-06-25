import { CommentDto } from "./comment-dto.model";
import { User } from "./user.model";

export interface PostDto {
    id: number;
    content: string;
    userId: number;
    likes: User[];
    shares: User[];
    comments: CommentDto[];
    image: any[];
    createdDate: Date;
    imageUrl: string;
}
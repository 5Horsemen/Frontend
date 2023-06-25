import { UserAndEmployerDto } from "./UserAndEmployerDto.model";
import { UserAndStudentDto } from "./UserAndStudentDto.model";

export interface UserDto {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    role: string;
    student: UserAndStudentDto;
    employer: UserAndEmployerDto;
}

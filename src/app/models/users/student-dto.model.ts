import { UserDto } from "./user-dto.model";

export interface StudentDto extends UserDto {
    dni: string;
    uEmail: string;
    college: string;
    career: string;
}

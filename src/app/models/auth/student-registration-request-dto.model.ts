import {StudentDto} from "../users/student-dto.model";


export interface StudentRegistrationRequestDto {

  student: StudentDto;
  collegeId: number;
  careerId: number;
}

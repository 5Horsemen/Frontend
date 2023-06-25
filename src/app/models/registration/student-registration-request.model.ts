import { StudentDto } from "../users/student-dto.model";

export interface StudentRegistrationRequest {

  student: StudentDto;
  collegeId: number;
  careerId: number;
}

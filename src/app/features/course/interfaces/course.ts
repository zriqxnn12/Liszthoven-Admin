import { Branch } from '@features/branch/interfaces/branch';
import { CoursePackage } from '@features/course-package/interfaces/course-package';
import { Instrument } from '@features/instrument/interfaces/instrument';
import { Student } from '@features/student/interfaces/student';

export interface Course {
  id: number;
  student_id: number;
  course_package_id: number;
  instrument_id: number;
  music_genre_id: number;
  branch_id: number;
  description: string;
  course_package: CoursePackage;
  student: Student;
  instrument: Instrument;
  branch: Branch;
}

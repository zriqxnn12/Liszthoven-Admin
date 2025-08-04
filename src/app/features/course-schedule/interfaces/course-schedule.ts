import { Classroom } from '@features/classroom/interfaces/classroom';
import { Course } from '@features/course/interfaces/course';
import { Teacher } from '@features/teacher/interfaces/teacher';

export interface CourseSchedule {
  id: number;
  course_id: number;
  teacher_id: number;
  classroom_id: number;
  status_name: string;
  status: number;
  duration: number;
  date: string;
  date_start: string;
  date_end: string;
  day: number;
  start_time: string;
  end_time: string;
  teacher: Teacher;
  classroom: Classroom;
  course: Course;
}

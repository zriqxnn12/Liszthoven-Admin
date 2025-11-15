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
  attendance: Attendance;
  course_reschedule: CourseReschedule;
}

export interface Attendance {
  id: number;
  status_name: string;
  status: number;
  course_schedule_id: number;
  file_path: string;
  note: string;
}

export interface CourseReschedule {
  id: number;
  course_schedule_id: number;
  date: string;
  date_start: string;
  date_end: string;
  start_time: string;
  end_time: string;
  note: string;
}

import { Branch } from '@features/branch/interfaces/branch';
import { Classroom } from '@features/classroom/interfaces/classroom';
import { staff } from '@features/staff/interfaces/staff';

export interface Teacher {
  id: number;
  type_name: string;
  staff_id: number;
  classroom_id: number;
  branch_id: number;
  type: number;
  description: string;
  qualify: string;
  staff: staff;
  classroom: Classroom;
  branch: Branch;
}

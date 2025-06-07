import { Branch } from '@features/branch/interfaces/branch';

export interface Classroom {
  id: number;
  room: string;
  location: string;
  branch_id: number;
  branch: Branch;
}

import { User } from '@features/user-profile/interfaces/user-profile';

export interface staff {
  role_name: string;
  status_name: string;
  role: number;
  status: number;
  note: string;
  user: User;
}

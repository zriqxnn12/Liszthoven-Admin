import { User } from '@features/user-profile/interfaces/user-profile';

export interface Student {
  id: number;
  user_id: number;
  gender: string;
  religion: string;
  school: string;
  province: string;
  city: string;
  whatsapp_number: string;
  note: string;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

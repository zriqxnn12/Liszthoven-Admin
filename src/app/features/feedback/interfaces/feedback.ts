import { User } from '@features/user-profile/interfaces/user-profile';

export interface Feedback {
  id: number;
  user_id: number;
  name: string;
  note: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

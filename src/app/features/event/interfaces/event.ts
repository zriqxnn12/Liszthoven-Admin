import { User } from '@features/user-profile/interfaces/user-profile';

export interface Event {
  id: number;
  title: string;
  type_name: string;
  type: number;
  quota: number;
  date: string;
  fee: string;
  start_time: string;
  end_time: string;
  description: string;
  address: string;
  file_path: string;
  event_participants: EventParticipant[];
}

export interface EventParticipant {
  id: number;
  status_name: string;
  event_id: number;
  user_id: number;
  status: number;
  total: string;
  is_paid: boolean;
  paid_at: any;
  file_path?: string;
  created_at: string;
  updated_at: string;
  user: User;
  loading: boolean;
}

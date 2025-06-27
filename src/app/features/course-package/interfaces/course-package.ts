import { Instrument } from '@features/instrument/interfaces/instrument';

export interface CoursePackage {
  id: number;
  name: string;
  registration_fee: string;
  duration: number;
  description: string;
  instrument: Instrument;
}

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  endedOn?: Date;
  state?: 'completed' | 'cancelled' | null;
}

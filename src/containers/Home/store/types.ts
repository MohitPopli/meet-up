export interface HomeState {
  currentSelectedDate: Date;
  busyHours: BusyHours[];
}

export type BusyHours = {
  date: number;
  month: number;
  year: number;
  time: string[];
};

export type MeetUpDTO = {
  data: string;
  message: string;
};

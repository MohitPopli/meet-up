import { BusyHours, MeetUpDTO } from './store/types';

export type FirebaseDTO = {
  [key: string]: MeetUpDTO;
};

/**
 * This utility function will receive data from Firebase and map data into business model to be used by application.
 * @param data Firebase data object
 * @returns mapped data for app
 */
export const MapMentorHours = (data: FirebaseDTO) => {
  const mentorSchedule: BusyHours[] = [];
  Object.values(data).forEach((item: MeetUpDTO) => {
    const timeArr: string[] = [];
    const newDate = new Date(item.data);

    const isExistingEle = mentorSchedule.find(
      (schedule) =>
        schedule.year === newDate.getFullYear() &&
        schedule.month === newDate.getMonth() &&
        schedule.date === newDate.getDate(),
    );
    if (isExistingEle !== undefined) {
      const tempArr = [newDate.getHours().toString()];
      const updatedTimeArr = isExistingEle.time.concat(tempArr);
      isExistingEle.time = [...updatedTimeArr];
    } else {
      timeArr.push(newDate.getHours().toString());
      const busyHours: BusyHours = {
        date: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
        time: [...timeArr],
      };
      mentorSchedule.push(busyHours);
    }
  });
  return mentorSchedule;
};

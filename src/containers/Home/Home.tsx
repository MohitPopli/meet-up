import * as React from 'react';
import Calender from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import * as homeActions from './store/actions';
import { homeStateSelector } from './store/selectors';
import { HomeWrapper } from '../../components/Styled/home';
import firebase from '../../config';
import { BusyHours, MeetUpDTO } from './store/types';
import TimeButton from '../TimeButton/TimeButton';

const Home = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(homeStateSelector);
  const homeRef = React.useRef<HTMLElement>(null);
  const [showTime, setShowTime] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mentorSchedule: BusyHours[] = [];
    const data = firebase.database().ref('meetups');
    data.once('value', (dbSnapshot) => {
      const items = dbSnapshot.val();

      Object.values(items).forEach((item: MeetUpDTO) => {
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
      dispatch(homeActions.setBusyHours(mentorSchedule));
    });
  }, [dispatch]);

  const meetingConfirmHandler = (hour: string, message: string) => {
    const firebaseRef = firebase.database().ref('meetups');
    const currentDate = selectedDate;
    currentDate.setHours(Number(hour), 0, 0, 0);
    const meetupDetail: MeetUpDTO = {
      data: currentDate.toISOString(),
      message,
    };
    firebaseRef.push(meetupDetail).then(() => {
      dispatch(homeActions.setCurrentSelectedDate(currentDate));
      setShowTime(false);
      dispatch(homeActions.navigateToConfirmationPage());
    });
  };

  return (
    <HomeWrapper ref={homeRef}>
      <h1>Welcome to Meet Up</h1>
      <Calender
        defaultView="month"
        onChange={(date) => {
          dispatch(homeActions.setCurrentSelectedDate(date as Date));
          setShowTime(true);
        }}
        onActiveStartDateChange={() => {
          setShowTime(false);
        }}
        className="calendar"
      />

      {showTime && <TimeButton onConfirm={(hour: string, message: string) => meetingConfirmHandler(hour, message)} />}
    </HomeWrapper>
  );
};

export default Home;

import * as React from 'react';
import Calender from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import * as homeActions from './store/actions';
import { homeStateSelector } from './store/selectors';
import { HomeWrapper } from '../../components/Styled/home';
import firebase from '../../config';
import { MeetUpDTO } from './store/types';
import { MapMentorHours } from './util';
import { TimeButton } from '../TimeButton/TimeButton';

const Home = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(homeStateSelector);
  const homeRef = React.useRef<HTMLElement>(null);
  const [showTime, setShowTime] = React.useState<boolean>(false);

  React.useEffect(() => {
    const data = firebase.database().ref('meetups');
    data.once('value', (dbSnapshot) => {
      const items = dbSnapshot.val();
      const mentorSchedule = MapMentorHours(items);
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

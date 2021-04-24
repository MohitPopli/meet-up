import * as React from 'react';
import * as homeActions from './store/actions';
import Calender from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { homeStateSelector } from './store/selectors';
import { HomeWrapper } from '../../components/Styled/home';
import TimeButton from '../TimeButton/timeButton';
import firebase from '../../config';

const Home = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(homeStateSelector);
  const homeRef = React.useRef<HTMLElement>(null);
  const [showTime, setShowTime] = React.useState<boolean>(false);

  React.useEffect(() => {
    const data = firebase.database().ref('meetups');
    data.on('value', (dbSnapshot) => {
      let items = dbSnapshot.val();
      console.log(items);
    });
  }, []);

  const meetingConfirmHandler = (date: Date, message: string) => {
    const firebaseRef = firebase.database().ref('meetups');
    const meetupDetail = {
      data: date.toISOString(),
      message: message,
    };
    firebaseRef.push(meetupDetail);
    setShowTime(false);
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
        onClickDay={(date) => console.log(date)}
        className="calendar"
      />

      {showTime && (
        <TimeButton
          allocatedHours={['13']}
          onConfirm={(date: Date, message: string) => meetingConfirmHandler(date, message)}
        />
      )}
    </HomeWrapper>
  );
};

export default Home;

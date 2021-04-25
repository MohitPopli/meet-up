import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../components/Button/CustomButton';
import { MeetupConfirmWrapper } from '../../components/Styled/meetingConfirmation';
import { homeStateSelector } from '../Home/store/selectors';
import { navigateToHome } from './store/actions';

const MeetingConfirmation = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(homeStateSelector);
  return (
    <MeetupConfirmWrapper data-testid='meeting-confirmation'>
      <span>✅</span>
      <span>
        Your meeting has been confirmed at <strong>{selectedDate.toDateString()}</strong> at{' '}
        <strong>{selectedDate.getHours()}</strong>:<strong>00 hours</strong>. Please make sure you have stable internet
        connection.
      </span>
      <CustomButton
        id="nav-to-home"
        callback={() => dispatch(navigateToHome())}
        type="button"
        title="Back to home"
        text="Back"
      />
    </MeetupConfirmWrapper>
  );
};

export default MeetingConfirmation;

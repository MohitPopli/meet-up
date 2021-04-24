import * as React from 'react';
import Button from '../../components/Button/button';
import Dialog from '../../components/Dialog/dialog';
import { TimeButtonWrapper, TimeWrapper } from '../../components/Styled/time';
import { AllowedTimes } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { homeStateSelector } from '../Home/store/selectors';
import * as homeActions from '../Home/store/actions';

interface TimeButtonProps {
  allocatedHours: string[];
  onConfirm: (date: Date, message: string) => void;
}

const TimeButton = ({ allocatedHours, onConfirm }: TimeButtonProps) => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(homeStateSelector);
  const [isTimeAvailable, setAvailableTime] = React.useState<boolean>(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const timeButtonHandler = (time: string) => {
    if (!allocatedHours.some((hour) => hour === time)) {
      setAvailableTime(true);
      const currentDate = selectedDate;
      currentDate.setHours(Number(time), 0, 0, 0);
      dispatch(homeActions.setCurrentSelectedDate(currentDate));
    }
    if (dialogRef.current !== null) {
      dialogRef.current.showModal();
    }
  };
  const renderButtons = () => {
    return AllowedTimes.map((time, index) => {
      return (
        <TimeButtonWrapper key={`${time}-${index}`}>
          <Button
            callback={() => timeButtonHandler(time)}
            text={`${time}:00`}
            type="button"
            value={time}
            customStyles={{
              border: `1px solid ${allocatedHours.some((hour) => hour === time) ? '#CC0000' : '#3399FF'}`,
            }}
          />
        </TimeButtonWrapper>
      );
    });
  };
  return (
    <TimeWrapper>
      {renderButtons()}
      <Dialog
        refObject={dialogRef}
        canScheduleMeeting={isTimeAvailable}
        closeDialog={() => {
          if (dialogRef.current !== null) {
            dialogRef.current.close();
          }
          setAvailableTime(false);
          dispatch(homeActions.setCurrentSelectedDate(new Date()));
        }}
        onConfirm={(message) => {
          if (dialogRef.current !== null) {
            dialogRef.current.close();
          }
          setAvailableTime(false);
          onConfirm(selectedDate, message)
          // console.log(val);
          // console.log(selectedDate);
        }}
      />
    </TimeWrapper>
  );
};

export default TimeButton;

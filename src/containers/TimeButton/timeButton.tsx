import * as React from 'react';
import { useSelector } from 'react-redux';
import { TimeButtonWrapper, TimeWrapper } from '../../components/Styled/time';
import { AllowedTimes } from './types';
import { homeStateSelector } from '../Home/store/selectors';
import Button from '../../components/Button/CustomButton';
import Dialog from '../../components/Dialog/Dialog';

interface TimeButtonProps {
  onConfirm: (hour: string, message: string) => void;
}

const TimeButton = ({ onConfirm }: TimeButtonProps) => {
  const { selectedDate, mentorBusyHours } = useSelector(homeStateSelector);
  const [isTimeAvailable, setAvailableTime] = React.useState<boolean>(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [selectedHour, setSelectedHour] = React.useState<string>('');

  const filterMentorHours = () => {
    const hoursArr: string[] = [...AllowedTimes];
    const element = mentorBusyHours.find(
      item =>
        item.year === selectedDate.getFullYear() &&
        item.month === selectedDate.getMonth() &&
        item.date === selectedDate.getDate(),
    );
    if (element !== undefined) {
      const freeHours = hoursArr.filter(hour => !element.time.includes(hour));
      return freeHours;
    }
    return hoursArr;
  };

  const timeButtonHandler = (time: string) => {
    const hoursArr = filterMentorHours();
    if (hoursArr.includes(time)) {
      setAvailableTime(true);
      setSelectedHour(time);
    }
    if (dialogRef.current !== null) {
      dialogRef.current.showModal();
    }
  };
  const renderButtons = () => {
    const hours = filterMentorHours();
    return AllowedTimes.map(time => {
      const isAvailable = hours.includes(time);
      return (
        <TimeButtonWrapper key={time}>
          <Button
            callback={() => timeButtonHandler(time)}
            text={`${time}:00`}
            type="button"
            value={time}
            customStyles={{
              border: `1px solid ${isAvailable ? '#3399FF' : '#CC0000'}`,
            }}
            id={time}
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
          setSelectedHour('');
          setAvailableTime(false);
        }}
        onConfirm={message => {
          if (dialogRef.current !== null) {
            dialogRef.current.close();
          }
          setAvailableTime(false);
          onConfirm(selectedHour, message);
        }}
      />
    </TimeWrapper>
  );
};

export default TimeButton;

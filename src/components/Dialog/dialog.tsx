import Button from '../Button/button';
import './dialog.css';
import { ErrorContentWrapper, ContentWrapper, DialogButtonWrapper } from '../Styled/dialog';
import * as React from 'react';

interface DialogProps {
  canScheduleMeeting: boolean;
  refObject: React.RefObject<HTMLDialogElement>;
  onConfirm: (message: string) => void;
  closeDialog: () => void;
}

const Dialog = ({ canScheduleMeeting, closeDialog, refObject, onConfirm }: DialogProps) => {
  const [reason, setReason] = React.useState<string>('');

  const renderContent = () => {
    if (canScheduleMeeting) {
      return (
        <ContentWrapper>
          <label htmlFor="meeting-reason"> Reason for meeting </label>
          <textarea
            id="meeting-reason"
            required
            autoFocus
            value={reason}
            onChange={(ev) => setReason(ev.currentTarget.value)}
            rows={5}
            cols={5}
          ></textarea>
          <DialogButtonWrapper>
            <Button
              type="button"
              text="Close"
              callback={closeDialog}
              customStyles={{ border: '1px solid #3399FF', alignSelf: 'center' }}
              title="close"
            />
            <Button
              type="button"
              text="Confirm"
              callback={() => onConfirm(reason.trim())}
              disabled={reason.length === 0}
              customStyles={{
                border: reason.length === 0 ? '1px solid #B0B0B0' : '1px solid #3399FF',
                alignSelf: 'center',
              }}
              title="confirm meeting"
            />
          </DialogButtonWrapper>
        </ContentWrapper>
      );
    }
    return (
      <ErrorContentWrapper>
        <span>
          Sorry!! This time slot is currently unavailable for scheduling the meeting. Please select other time slot to
          schedule meeting
        </span>
        <Button
          type="button"
          text="Close"
          callback={() => closeDialog()}
          customStyles={{ border: '1px solid #3399FF', alignSelf: 'center' }}
        />
      </ErrorContentWrapper>
    );
  };

  return <dialog ref={refObject}>{renderContent()}</dialog>;
};

export default Dialog;

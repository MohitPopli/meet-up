import './CustomDialog.css';
import * as React from 'react';
import { ErrorContentWrapper, ContentWrapper, DialogButtonWrapper } from '../Styled/dialog';
import Button from '../Button/CustomButton';

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
        <ContentWrapper data-testid="confirmation-content-dialog">
          <label htmlFor="meeting-reason"> Reason for meeting </label>
          <textarea
            id="meeting-reason"
            required
            value={reason}
            onChange={(ev) => setReason(ev.currentTarget.value)}
            rows={5}
            cols={5}
          />
          <DialogButtonWrapper>
            <Button
              type="button"
              text="Close"
              callback={closeDialog}
              customStyles={{ border: '1px solid #3399FF', alignSelf: 'center' }}
              title="close"
              id="meeting-dialog-close"
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
              id="meeting-dialog-confirm"
            />
          </DialogButtonWrapper>
        </ContentWrapper>
      );
    }
    return (
      <ErrorContentWrapper data-testid="error-content-dialog">
        <span>
          Sorry!! This time slot is currently unavailable for scheduling the meeting. Please select other time slot to
          schedule meeting.
        </span>
        <Button
          type="button"
          text="Close"
          callback={() => closeDialog()}
          customStyles={{ border: '1px solid #3399FF', alignSelf: 'center' }}
          id="error-dialog-close"
        />
      </ErrorContentWrapper>
    );
  };

  return <dialog ref={refObject}>{renderContent()}</dialog>;
};

export default Dialog;

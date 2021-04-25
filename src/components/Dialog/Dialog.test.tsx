import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Dialog from './Dialog';
import userEvent from '@testing-library/user-event';

describe('Dialog tests', () => {
  const onConfirm = jest.fn();
  const closeDialog = jest.fn();
  const refObj = React.createRef<HTMLDialogElement>();

  beforeEach(() => jest.clearAllMocks());
  test('should render error dialog and perform validations', () => {
    render(
      <Dialog refObject={refObj} canScheduleMeeting={false} onConfirm={onConfirm} closeDialog={closeDialog} />,
    );

    expect(screen.getByTestId(/error-content-dialog/i)).toBeInTheDocument();
    expect(screen.getByTestId(/error-dialog-close-custom-button/i)).toBeInTheDocument();

    expect(screen.getByTestId(/error-content-dialog/i).querySelector('span')?.textContent).toEqual('Sorry!! This time slot is currently unavailable for scheduling the meeting. Please select other time slot to schedule meeting.')

    // test closing error dialog
    userEvent.click(screen.getByTestId(/error-dialog-close-custom-button/i));
    expect(closeDialog).toHaveBeenCalledTimes(1)
  });

  test('should render confirmation dialog and perform validations', () => {
    render(
      <Dialog refObject={refObj} canScheduleMeeting onConfirm={onConfirm} closeDialog={closeDialog} />,
    );

    expect(screen.queryByTestId(/error-content-dialog/i)).not.toBeInTheDocument();
    expect(screen.getByTestId(/confirmation-content-dialog/i)).toBeInTheDocument();

    expect(screen.getByTestId(/confirmation-content-dialog/i).querySelector('label')?.textContent).toEqual(' Reason for meeting ')

    expect(screen.getByTestId(/confirmation-content-dialog/i).querySelector('textarea')?.getAttribute('required')).toStrictEqual('')

    expect(screen.getByTestId(/meeting-dialog-confirm-custom-button/i).getAttribute('disabled')).toStrictEqual('')
    expect(screen.getByTestId(/meeting-dialog-close-custom-button/i).getAttribute('disabled')).toBeNull()
  });

  test('should render confirmation dialog and able to confirm meeting', () => {
    render(
      <Dialog refObject={refObj} canScheduleMeeting onConfirm={onConfirm} closeDialog={closeDialog} />,
    );

    
    expect(screen.getByTestId(/meeting-dialog-confirm-custom-button/i).getAttribute('disabled')).toStrictEqual('')
    userEvent.type(screen.getByTestId(/confirmation-content-dialog/i).querySelector('textarea') as HTMLTextAreaElement, 'confirm meeting')
    
    expect(screen.getByTestId(/meeting-dialog-confirm-custom-button/i).getAttribute('disabled')).toBeNull()

    // click on confirm button to confirm meeting
    userEvent.click(screen.getByTestId(/meeting-dialog-confirm-custom-button/i))

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith('confirm meeting')
  });

  test('should render confirmation dialog and close dialog', () => {
    render(
      <Dialog refObject={refObj} canScheduleMeeting onConfirm={onConfirm} closeDialog={closeDialog} />,
    );

    // click on confirm button to confirm meeting
    userEvent.click(screen.getByTestId(/meeting-dialog-close-custom-button/i))

    expect(onConfirm).toHaveBeenCalledTimes(0);
    expect(closeDialog).toHaveBeenCalledTimes(1)
  });
});

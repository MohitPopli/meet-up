import CustomButton from './CustomButton';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Custom button', () => {
  const callbackFn = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  test('should render button and perform basic validations', () => {
    render(<CustomButton id="btn" text="mock" callback={callbackFn} type="button" />);
    expect(screen.getByTestId(/btn-custom-button/i)).toBeInTheDocument();
    expect(screen.getByTestId(/btn-custom-button/i).textContent).toEqual('mock');
  });

  test('should invoke callback', () => {
    render(<CustomButton id="btn" text="mock" callback={callbackFn} type="button" />);
    userEvent.click(screen.getByTestId(/btn-custom-button/i));
    expect(callbackFn).toHaveBeenCalledTimes(1);
  });

  test('should not invoke callback when disabled', () => {
    render(<CustomButton id="btn" text="mock" callback={callbackFn} type="button" disabled />);
    expect(screen.getByTestId(/btn-custom-button/i).getAttribute('disabled')).toStrictEqual('');
    fireEvent.click(screen.getByTestId(/btn-custom-button/i));
    expect(callbackFn).toHaveBeenCalledTimes(0);
  });
});

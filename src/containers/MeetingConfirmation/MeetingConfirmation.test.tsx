import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MeetingConfirmation from './MeetingConfirmation';
import { navigateToHome } from './store/actions';

describe('Meeting confirmation test', () => {
  test('should render component', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      home: {
        currentSelectedDate: new Date(),
        busyHours: [
          {
            date: 23,
            month: 4,
            year: 2021,
            time: [],
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <MeetingConfirmation />
      </Provider>,
    );

    expect(screen.getByTestId(/meeting-confirmation/i)).toBeInTheDocument();
    expect(screen.getByTestId(/meeting-confirmation/i).querySelectorAll('span')[1].textContent).toEqual(
      `Your meeting has been confirmed at ${new Date().toDateString()} at ${new Date().getHours()}:00 hours. Please make sure you have stable internet connection.`,
    );

    expect(screen.getByTestId(/nav-to-home-custom-button/i).textContent).toEqual('Back');

    // test appropriate action should be dispatched to store

    userEvent.click(screen.getByTestId(/nav-to-home-custom-button/i));
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()[0]).toEqual(navigateToHome());
  });
});

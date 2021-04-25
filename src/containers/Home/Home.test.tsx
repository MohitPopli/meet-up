import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import { MeetUpDTO } from './store/types';
import { setCurrentSelectedDate } from './store/actions';

jest.mock('firebase/app', () => {
  const data: MeetUpDTO = { data: new Date().toISOString(), message: 'hello' };
  const snapshot = { val: () => data };
  return {
    initializeApp: jest.fn().mockReturnValue({
      database: jest.fn().mockReturnValue({
        ref: jest.fn().mockReturnThis(),
        once: jest.fn(() => Promise.resolve(snapshot)),
      }),
    }),
  };
});

describe('Home tests', () => {
  test('should render home', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      home: {
        currentSelectedDate: new Date(),
        busyHours: [],
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    // should display time wrapper and set selected date

    userEvent.click(container.querySelectorAll('.react-calendar__tile')[0]);
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()[0]).toEqual(setCurrentSelectedDate(expect.anything()));
    expect(screen.getByTestId(/time-button-wrapper/i)).toBeInTheDocument();
  });

  test('should hide time wrapper when user updates view', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      home: {
        currentSelectedDate: new Date(),
        busyHours: [],
      },
    });
    const { container, debug } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    // should display time wrapper and set selected date
    userEvent.click(container.querySelectorAll('.react-calendar__tile')[0]);
    expect(screen.getByTestId(/time-button-wrapper/i)).toBeInTheDocument();

    // change view

    userEvent.click(container.querySelector('.react-calendar__navigation__next-button'));
    expect(screen.queryByTestId(/time-button-wrapper/i)).not.toBeInTheDocument();
  });
});

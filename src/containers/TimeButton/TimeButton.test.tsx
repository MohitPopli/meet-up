import { render, screen } from '@testing-library/react';
import * as React from 'react';
import TimeButton from './TimeButton';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Time button test', () => {
  const onConfirm = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should render time buttons and perform basic validations', () => {
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
        <TimeButton onConfirm={onConfirm} />
      </Provider>,
    );

    expect(screen.getAllByRole('button')).toHaveLength(25);
  });

  test('should render time buttons with different style if mentor is busy at that time', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      home: {
        currentSelectedDate: new Date(),
        busyHours: [
          {
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            time: ['1'],
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <TimeButton onConfirm={onConfirm} />
      </Provider>,
    );

    expect(screen.getAllByRole('button')).toHaveLength(25);
    expect(screen.getAllByRole('button')[1]).toHaveStyle('border: 1px solid #cc0000;');
  });
});

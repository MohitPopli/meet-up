import { setBusyHours, setCurrentSelectedDate } from './actions';
import { homeReducer, initialState } from './reducer';
import { BusyHours } from './types';

describe('Home reducer tests', () => {
  const rootState = initialState;
  test('should return the initial state', () => {
    const mockAction: any = {
      type: 'none',
      payload: '',
    };
    expect(homeReducer(rootState, mockAction)).toEqual(rootState);
  });

  test('SET_CURRENT_DATE', () => {
    const date = new Date();
    expect(homeReducer(rootState, setCurrentSelectedDate(date))).toEqual({
      ...rootState,
      currentSelectedDate: date,
    });
  });

  test('SET_BUSY_HOURS', () => {
    const date = new Date();
    const hours: BusyHours[] = [
      {
        month: date.getMonth(),
        year: date.getFullYear(),
        date: date.getDate(),
        time: ['1', '2'],
      },
    ];
    expect(homeReducer(rootState, setBusyHours(hours))).toEqual({
      ...rootState,
      busyHours: hours,
    });
  });
});

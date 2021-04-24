import { action } from 'typesafe-actions';
import { HomeActionTypes } from './constants';

export const setCurrentSelectedDate = (date: Date) => action(HomeActionTypes.SET_CURRENT_DATE, date);

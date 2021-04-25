import { action } from 'typesafe-actions';
import { HomeActionTypes } from './constants';
import { BusyHours } from './types';

export const setCurrentSelectedDate = (date: Date) => action(HomeActionTypes.SET_CURRENT_DATE, date);

export const setBusyHours = (data: BusyHours[]) => action(HomeActionTypes.SET_BUSY_HOURS, data);

export const navigateToConfirmationPage = () => action(HomeActionTypes.NAVIGATE_TO_CONFIRMATION_PAGE);

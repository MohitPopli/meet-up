import { action } from 'typesafe-actions';
import { MeetingConfirmationActionTypes } from './constants';

export const navigateToHome = () => action(MeetingConfirmationActionTypes.NAVIGATE_TO_HOME);

import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { MeetingConfirmationActionTypes } from './constants';

export function* navigateToHome() {
  yield put(push('/'));
}

function* meetingConfirmationSagas() {
  yield takeLatest(MeetingConfirmationActionTypes.NAVIGATE_TO_HOME, navigateToHome);
}

// eslint-disable-next-line
export default [meetingConfirmationSagas];

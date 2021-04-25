import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { HomeActionTypes } from './constants';

export function* navigateToConfirmationPage() {
  yield put(push('/meeting-confirmed'));
}

function* homeSagas() {
  yield takeLatest(HomeActionTypes.NAVIGATE_TO_CONFIRMATION_PAGE, navigateToConfirmationPage);
}

// eslint-disable-next-line
export default [homeSagas];

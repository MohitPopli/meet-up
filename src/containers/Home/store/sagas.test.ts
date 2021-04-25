import { navigateToConfirmationPage } from './sagas';
import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

describe('Home Sagas tests', () => {
  let gen: any;

  afterEach(() => {
    expect(gen.next().done).toBeTruthy();
    jest.clearAllMocks();
  });

  test('navigateToConfirmationPage', () => {
    gen = navigateToConfirmationPage();
    expect(gen.next().value).toEqual(put(push('/meeting-confirmed')));
  });
});

import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { navigateToHome } from './sagas';

describe('Meeting confirmation Sagas tests', () => {
  let gen: any;

  afterEach(() => {
    expect(gen.next().done).toBeTruthy();
    jest.clearAllMocks();
  });

  test('navigateToHome', () => {
    gen = navigateToHome();
    expect(gen.next().value).toEqual(put(push('/')));
  });
});

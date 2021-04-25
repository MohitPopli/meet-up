import * as React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import App from './App';

describe('App tests', () => {
  let history = createMemoryHistory({ initialEntries: ['/'] });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders / route', () => {
    history = createMemoryHistory({
      initialEntries: ['/'],
    });

    const mockStore = configureMockStore();
    const store = mockStore({
      home: {},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(history.location.pathname).toBe('/');
  });
});

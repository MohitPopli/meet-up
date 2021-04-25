import * as React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import App from './App';

describe('App tests', () => {
  let history: any;

  beforeEach(() => {
    jest.clearAllMocks();
    history = null;
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

  test('renders /meeting-confirmed route', () => {
    history = createMemoryHistory({
      initialEntries: ['/meeting-confirmed'],
    });

    const mockStore = configureMockStore();
    const store = mockStore({
      home: {
        currentSelectedDate: new Date(),
        busyHours: ['5', '12'],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(history.location.pathname).toBe('/meeting-confirmed');
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

describe('App tests', () => {
  let wrapper;
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
    wrapper = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(history.location.pathname).toBe('/');
  });
});

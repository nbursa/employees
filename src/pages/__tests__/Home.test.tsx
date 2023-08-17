import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
// import {fetchEmployees} from '../../redux/actions';
import Home from '../Home';
import {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('../../api/config', () => ({
  API_BASE_URL: 'http://testurl.com/'
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home Page', () => {
  let store: MockStoreEnhanced<unknown, object>;

  beforeEach(() => {
    store = mockStore({
      employees: {
        employees: [],
        status: 'idle',
        error: null
      }
    });
  });

  it('dispatches fetchEmployees on mount', () => {
    render(
      <Provider store={store}>
        <Home/>
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(expect.objectContaining({type: 'employees/fetchAll/pending'}));
    // expect(actions).toContainEqual(fetchEmployees({}));
  });

  it('displays loading state', () => {
    store = mockStore({
      employees: {
        employees: [],
        status: 'loading',
        error: null
      }
    });
    render(
      <Provider store={store}>
        <Home/>
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error state', () => {
    store = mockStore({
      employees: {
        employees: [],
        status: 'failed',
        error: 'Something went wrong'
      }
    });
    render(
      <Provider store={store}>
        <Home/>
      </Provider>
    );
    expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
  });

  it('displays list of employees', async () => {
    const mockEmployees = [
      {_id: '1', name: 'John Doe'},
      {_id: '2', name: 'Jane Smith'}
    ];
    store = mockStore({
      employees: {
        employees: mockEmployees,
        status: 'completed',
        error: null
      }
    });
    render(
      <Provider store={store}>
        <Home/>
      </Provider>
    );
    for (const employee of mockEmployees) {
      expect(screen.getByText(employee.name)).toBeInTheDocument();
    }
  });
});
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Home from '../Home';
import {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {
  EmployeeFormProvider
} from '../../contexts/EmployeeFormContext';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import defaultTheme from "../../themes/defaultTheme.ts";
import {ThemeProvider} from "@mui/material/styles";

jest.mock('../../api/config', () => ({
  API_BASE_URL: 'http://testurl.com/'
}));

// Mock the useEmployeeForm hook
jest.mock('../../hooks/useEmployeeForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockEmployeeFormContext = {
  handleInputChange: jest.fn(),
  onSubmit: jest.fn(),
  // ...other mock values
};

const mockUseEmployeeForm = useEmployeeForm as jest.Mock;
mockUseEmployeeForm.mockReturnValue(mockEmployeeFormContext);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home Page', () => {
  let store: MockStoreEnhanced<unknown, object>;

  beforeEach(() => {
    store = mockStore({
      employees: {
        employees: [],
        status: 'idle',
        errors: null
      }
    });
  });

  it('dispatches fetchEmployees on mount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <EmployeeFormProvider>
              <Home/>
            </EmployeeFormProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(expect.objectContaining({type: 'employees/fetchAll/pending'}));
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
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <Home/>
          </ThemeProvider>
        </BrowserRouter>
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
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <Home/>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/No Employees Found!/i)).toBeInTheDocument();

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
        errors: null
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <Home/>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
    for (const employee of mockEmployees) {
      expect(screen.getByText(employee.name)).toBeInTheDocument();
    }
  });
});
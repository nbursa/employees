import React from 'react';
import Navigation from "./components/Navigation.tsx";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import {Provider} from 'react-redux';
import store from './redux/store';
import {
  AdapterDateFns
} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {ToastContainer} from 'react-toastify';
import EmployeeFormProvider
  from "./contexts/EmployeeFormContext.tsx";
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    yellow: {
      main: 'rgb(254, 249, 195)',
      100: 'rgb(234, 229, 175)',
      200: '#FFEB3B',
      400: '#FDD835',
      700: '#FBC02D',
    },
  },
});

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    // Top-level error boundary to catch any unhandled errors in child components
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <Navigation/>
            <EmployeeFormProvider>
              <RouterProvider router={router}/>
            </EmployeeFormProvider>
            <ToastContainer/>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
import React from 'react';
import Navigation from "./components/Navigation.tsx";
import {
  BrowserRouter, Routes, Route
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
  ThemeProvider
} from '@mui/material/styles';
import defaultTheme from './themes/defaultTheme';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
              <Navigation/>
              <div className='pt-16'>
                <EmployeeFormProvider>
                  <Routes>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Routes>
                </EmployeeFormProvider>
                <ToastContainer/>
              </div>
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
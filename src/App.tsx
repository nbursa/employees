import React from 'react';
import Navigation from "./components/Navigation.tsx";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import {Provider} from 'react-redux';
import store from './redux/store';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {ToastContainer} from 'react-toastify';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Navigation/>
          <RouterProvider router={router}/>
          <ToastContainer/>
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
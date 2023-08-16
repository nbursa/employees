import React from 'react';
import Navigation from "./components/Navigation.tsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Navigation />
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
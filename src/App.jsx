import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import store from './redux/store.js';
import HomePage from './pages/Home.jsx';
import RootLayout from './pages/Root.jsx';
import AboutPage from './pages/About.jsx';
import WatchlistPage from './pages/Watchlist.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import { authLoader } from './loaders/authLoader.js';
import ErrorPage from './pages/Error.jsx';
import { guestLoader } from './loaders/guestLoader.js';
import CompanyDetailPage from './pages/CompanyDetail.jsx';
import Financials from './components/Financials.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'watchlist',
        element: <WatchlistPage />,
        loader: authLoader,
      },
      {
        path: 'watchlist/:companySymbol/:tab',
        element: <CompanyDetailPage />,
        children: [{ path: 'financials/subTab', element: <Financials /> }],
      },
      {
        path: 'login',
        element: <LoginPage />,
        loader: guestLoader,
      },
      {
        path: 'register',
        element: <RegisterPage />,
        loader: guestLoader,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

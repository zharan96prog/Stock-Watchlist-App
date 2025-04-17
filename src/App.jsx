import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

import './App.css';
import store from './redux/store.js';
import HomePage from './pages/Home.jsx';
import RootLayout from './pages/Root.jsx';
import AboutPage from './pages/About.jsx';
import WatchlistPage from './pages/Watchlist.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import { authLoader } from './loaders/authLoader.js';

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
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
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
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

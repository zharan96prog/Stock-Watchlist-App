import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import store from './redux/store.js';
import HomePage from './pages/Home.jsx';
import RootLayout from './pages/Root.jsx';
import AboutPage from './pages/About.jsx';
import WatchlistPage from './pages/Watchlist.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import { checkUser } from './redux/slices/authSlice.js';

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
        element: (
          <ProtectedRoute>
            <WatchlistPage />
          </ProtectedRoute>
        ),
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

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function AppWrapper() {
  const dispatch = useDispatch();
  const isAuthChecking = useSelector((state) => state.auth.isAuthChecking);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  if (isAuthChecking) {
    return <Spinner />;
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;

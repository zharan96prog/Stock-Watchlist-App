import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import AboutPage from './pages/About';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

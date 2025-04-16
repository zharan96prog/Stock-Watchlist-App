import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

export default function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthChecking } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Stock Watchlist</h1>
        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlist">Watchlist</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {!isAuthChecking && ( // Замість перевірки тільки на user, додав перевірку на isAuthChecking
              <>
                {user ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Sign Up</NavLink>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

export default function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isChecking } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'underline text-accent font-semibold' : 'hover:opacity-80';

  const renderAuthLinks = () => {
    if (isChecking) {
      return (
        <li className="animate-spin text-xs text-muted-foreground">
          Checking...
        </li>
      );
    }

    return user ? (
      <li>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </li>
    ) : (
      <>
        <li>
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={navLinkClass}>
            Sign Up
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Stock Watchlist</h1>
        <nav>
          <ul className="flex gap-6 text-sm font-medium items-center">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/watchlist" className={navLinkClass}>
                  Watchlist
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            {renderAuthLinks()}
          </ul>
        </nav>
      </div>
    </header>
  );
}

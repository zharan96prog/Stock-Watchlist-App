import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
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
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/watchlist">Watchlist</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

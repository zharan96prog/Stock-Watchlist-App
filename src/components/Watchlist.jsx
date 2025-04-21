import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import WatchlistItem from './WatchlistItem.jsx';
import { getWatchlist } from '../redux/slices/watchlistSlice.js';

export default function Watchlist() {
  const dispatch = useDispatch();
  const { companies: watchlist, status } = useSelector(
    (state) => state.watchlist
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getWatchlist());
    }
  }, [dispatch, status]);

  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">My Watchlist</h2>
      {status === 'loading' && watchlist.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : status === 'failed' ? (
        <p className="text-center text-red-500">
          Failed to load watchlist. Please try again later.
        </p>
      ) : watchlist.length === 0 ? (
        <p className="text-center text-sm text-primary-foreground/80">
          You don't have any companies listed yet. Add the first one!
        </p>
      ) : (
        <table className="w-full border-separate border border-border rounded-lg table-fixed mb-10">
          <thead>
            <tr className="bg-primary-dark/10">
              <th className="px-4 py-2 text-сenter w-1/2">Company Name</th>
              <th className="px-4 py-2 text-сenter w-1/4">Company Symbol</th>
              <th className="px-4 py-2 text-center w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((company) => (
              <WatchlistItem key={company.id} company={company} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

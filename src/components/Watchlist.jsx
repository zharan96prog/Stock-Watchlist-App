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

  const onRemove = (symbol) => {
    console.log(`Removing ${symbol} from watchlist`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'failed' ? (
        <p>Failed to load watchlist. Please try again later.</p>
      ) : watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        watchlist.map((company) => (
          <WatchlistItem
            key={company.id}
            company={company}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
}

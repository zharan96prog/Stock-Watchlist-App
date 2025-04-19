import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import WatchlistItem from './WatchlistItem.jsx';
import {
  getWatchlist,
  removeCompanyFromWatchlist,
} from '../redux/slices/watchlistSlice.js';

export default function Watchlist() {
  const dispatch = useDispatch();
  const { companies: watchlist, status } = useSelector(
    (state) => state.watchlist
  );

  const [localWatchlist, setLocalWatchlist] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getWatchlist());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Синхронізуємо локальний стан із Redux Store
    setLocalWatchlist(watchlist);
  }, [watchlist]);

  const onRemove = (id) => {
    const proceed = window.confirm(
      'Are you sure you want to remove this company from your watchlist?'
    );

    if (proceed) {
      const updatedWatchlist = localWatchlist.filter(
        (company) => company.id !== id
      );
      setLocalWatchlist(updatedWatchlist);

      dispatch(removeCompanyFromWatchlist(id)).catch((error) => {
        console.error('Failed to remove company:', error);

        setLocalWatchlist(watchlist);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
      {status === 'loading' && localWatchlist.length === 0 ? (
        <p>Loading...</p>
      ) : status === 'failed' ? (
        <p>Failed to load watchlist. Please try again later.</p>
      ) : localWatchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        localWatchlist.map((company) => (
          <WatchlistItem
            key={company.id}
            company={company}
            onRemove={() => onRemove(company.id)}
          />
        ))
      )}
    </div>
  );
}

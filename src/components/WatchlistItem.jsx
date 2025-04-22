import { useState } from 'react';
import Button from './UI/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCompanyFromWatchlist } from '../redux/slices/watchlistSlice.js';

export default function WatchlistItem({ company }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = async () => {
    const proceed = window.confirm(
      'Are you sure you want to remove this company from your watchlist?'
    );

    if (proceed) {
      setIsRemoving(true);
      try {
        await dispatch(removeCompanyFromWatchlist(company.id)).unwrap();
      } catch (error) {
        console.error('Failed to remove company:', error);
      } finally {
        setIsRemoving(false);
      }
    }
  };

  const handleClick = () => {
    navigate(`/watchlist/${company.symbol}/overview`, {
      state: { company },
    });
  };

  return (
    <tr
      className="hover:bg-primary-dark/20 cursor-pointer"
      onClick={handleClick}
    >
      <td className="px-4 py-2">{company.name}</td>
      <td className="px-4 py-2">{company.symbol}</td>
      <td className="px-4 py-2 text-center">
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Запобігаємо переходу при кліку на кнопку
            handleRemove();
          }}
          disabled={isRemoving}
        >
          {isRemoving ? 'Removing...' : 'Remove'}
        </Button>
      </td>
    </tr>
  );
}

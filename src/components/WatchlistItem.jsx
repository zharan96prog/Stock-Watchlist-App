import { useState } from 'react';

import Button from './UI/Button.jsx';
import { useNavigate } from 'react-router-dom';

export default function WatchlistItem({ company, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove();
    setIsRemoving(false);
  };

  const handleClick = () => {
    navigate(`/watchlist/${company.symbol}`, {
      state: { company },
    });
  };

  return (
    <div
      className="flex w-full flex-row items-center justify-between p-4 border border-border rounded-lg bg-primary-dark/10 mb-4"
      onClick={handleClick}
    >
      <h3>{company.name}</h3>
      <p>{company.symbol}</p>
      <Button
        onClick={(e) => {
          e.Button.stopPropagation();
          handleRemove();
        }}
        disabled={isRemoving}
      >
        {isRemoving ? 'Removing...' : 'Remove'}
      </Button>
    </div>
  );
}

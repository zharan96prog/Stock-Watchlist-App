import { useState } from 'react';

import Button from './UI/Button.jsx';

export default function WatchlistItem({ company, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove();
    setIsRemoving(false);
  };

  return (
    <div className="flex w-full flex-row items-center justify-between p-4 border border-border rounded-lg bg-primary-dark/10 mb-4">
      <h3>{company.name}</h3>
      <p>{company.symbol}</p>
      <Button onClick={handleRemove} disabled={isRemoving}>
        {isRemoving ? 'Removing...' : 'Remove'}
      </Button>
    </div>
  );
}

import { useState } from 'react';

import Button from '../components/UI/Button.jsx';
import Input from '../components/UI/Input.jsx';

export default function WatchlistPage() {
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  const handleAddCompany = () => {
    setIsAddingCompany(true);
  };

  return (
    <section className="mt-10 flex items-center justify-center">
      <div className="w-10/12 bg-primary-dark/10 p-4 rounded-lg border border-border text-center">
        <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
        {!isAddingCompany ? (
          <>
            <p className="text-sm text-primary-foreground/80">
              You don't have any companies listed yet. Add the first one!
            </p>
            <Button className="mt-5" onClick={handleAddCompany}>
              + Add a company
            </Button>
          </>
        ) : (
          <Input
            type="text"
            className="min-w-96"
            placeholder="Search for a company..."
          ></Input>
        )}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../components/UI/Input.jsx';
import Watchlist from '../components/Watchlist.jsx';
import { searchCompanies } from '../services/fmpService.js';
import { useSelector } from 'react-redux';

export default function WatchlistPage() {
  const watchlist = useSelector((state) => state.watchlist.companies);
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setCompanies([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchCompanies(query);
      setCompanies(results);
    } catch (error) {
      console.error('Error searching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyClick = (company) => {
    navigate(`/watchlist/${company.symbol}/overview`, { state: { company } });
  };

  return (
    <section className="mt-10 flex flex-col items-center justify-center">
      <div className="w-10/12 bg-primary-dark/10 p-4 rounded-lg border border-border text-center">
        <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
        {watchlist.length === 0 && (
          <>
            <p className="text-sm mb-2 text-primary-foreground/80">
              You don't have any companies listed yet. Add the first one!
            </p>
          </>
        )}

        <Input
          type="text"
          className="min-w-96"
          placeholder="Search for a company..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {isLoading ? (
          <p className="mt-4 text-sm text-primary-foreground/80">Loading...</p>
        ) : (
          <ul className="mt-4 text-left">
            {companies.map((company) => (
              <li
                key={company.symbol}
                className="text-sm text-primary-foreground/80 cursor-pointer hover:underline"
                onClick={() => handleCompanyClick(company)}
              >
                {company.name} ({company.symbol})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-10/12 mt-8">
        <Watchlist />
      </div>
    </section>
  );
}

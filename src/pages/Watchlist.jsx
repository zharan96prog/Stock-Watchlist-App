import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/UI/Button.jsx';
import Input from '../components/UI/Input.jsx';
import { searchCompanies } from '../services/fmpService.js';

export default function WatchlistPage() {
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () => {
    setIsAddingCompany(true);
  };

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
    navigate(`/watchlist/${company.symbol}`, { state: { company } });
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
          <>
            <Input
              type="text"
              className="min-w-96"
              placeholder="Search for a company..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {isLoading ? (
              <p className="mt-4 text-sm text-primary-foreground/80">
                Loading...
              </p>
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
          </>
        )}
      </div>
    </section>
  );
}

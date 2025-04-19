import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCompanyDetails } from '../services/fmpService';
import Button from '../components/UI/Button';
import { addCompanyToWatchlist } from '../redux/slices/watchlistSlice';

export default function CompanyDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (company?.symbol) {
      const getCompanyDetails = async () => {
        try {
          const data = await fetchCompanyDetails(company.symbol);
          setCompanyDetails(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      getCompanyDetails();
    } else {
      setLoading(false);
    }
  }, [company?.symbol]);

  const dispatch = useDispatch();

  const handleAddToWatchlist = () => {
    const companyData = {
      symbol: companyDetails.symbol,
      name: companyDetails.companyName,
      exchangeShortName: companyDetails.exchangeShortName,
    };

    dispatch(addCompanyToWatchlist(companyData))
      .then(() => {
        console.log('Company added to watchlist successfully');
      })
      .catch((error) => {
        console.error('Failed to add company to watchlist:', error);
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading company details...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!companyDetails) {
    return <p className="text-center mt-10">No company details available.</p>;
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="bg-primary-dark/10 p-4 text-center h-screen">
        <div className="flex justify-between items-center px-4 py-2 text-primary-foreground">
          <Button
            onClick={() => navigate('/watchlist')}
            className="text-sm font-medium underline hover:opacity-80"
          >
            Back to My Watchlist
          </Button>
          <Button
            onClick={handleAddToWatchlist}
            className="border rounded-lg px-4 py-2 text-white hover:border-blue-500"
          >
            Add to My Watchlist
          </Button>
        </div>
        <img
          src={companyDetails.image}
          alt={`${companyDetails.companyName} logo`}
          className="mx-auto mb-4 h-20"
        />
        <h2 className="text-xl font-semibold mb-4">
          {companyDetails.companyName}
        </h2>
        <p className="text-sm text-primary-foreground/80">
          Symbol: {companyDetails.symbol}
        </p>
        <p className="text-sm text-primary-foreground/80">
          Exchange: {companyDetails.exchange} (
          {companyDetails.exchangeShortName})
        </p>
        <p className="text-sm text-primary-foreground/80">
          Industry: {companyDetails.industry}
        </p>
        <p className="text-sm text-primary-foreground/80">
          CEO: {companyDetails.ceo}
        </p>
        <p className="text-sm text-primary-foreground/80">
          Market Cap: ${companyDetails.mktCap.toLocaleString()}
        </p>
        <p className="text-sm text-primary-foreground/80">
          Description: {companyDetails.description}
        </p>
        <a
          href={companyDetails.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-4 block"
        >
          Visit Website
        </a>
      </div>
    </section>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCompanyDetails } from '../services/fmpService.js';
import Button from '../components/UI/Button.jsx';
import { addCompanyToWatchlist } from '../redux/slices/watchlistSlice.js';
import NotificationBadge from '../components/UI/NotificationBadge.jsx';
import Overview from '../components/Overview.jsx';
import Profile from '../components/Profile.jsx';

export default function CompanyDetailPage() {
  const { companySymbol, tab = 'overview' } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const watchlist = useSelector((state) => state.watchlist.companies);

  useEffect(() => {
    if (!companySymbol) {
      navigate('/watchlist');
      return;
    }

    const getCompanyDetails = async () => {
      try {
        const data = await fetchCompanyDetails(companySymbol);
        setCompanyDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCompanyDetails();
  }, [companySymbol, navigate]);

  const handleAddToWatchlist = () => {
    const isAlreadyInWatchlist = watchlist.some(
      (item) => item.companySymbol === companyDetails.companySymbol
    );

    if (isAlreadyInWatchlist) {
      setNotification({
        message: 'Company is already in your watchlist',
        type: 'error',
      });
      return;
    }

    const companyData = {
      companySymbol: companyDetails.companySymbol,
      name: companyDetails.companyName,
      exchangeShortName: companyDetails.exchangeShortName,
    };

    dispatch(addCompanyToWatchlist(companyData))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setNotification({
            message: 'Company added to watchlist successfully',
            type: 'success',
          });
        } else {
          throw new Error('Failed to add company to watchlist');
        }
      })
      .catch((error) => {
        console.error('Error adding company to watchlist:', error);
        setNotification({
          message:
            'Failed to add company to watchlist. Please check your connection.',
          type: 'error',
        });
      });
  };

  const handleTabChange = (newTab) => {
    navigate(`/watchlist/${companySymbol}/${newTab}`);
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
    <section className="items-center justify-center w-full">
      {notification && (
        <NotificationBadge
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-60"
        />
      )}
      <div className="p-4 text-center pb-14 h-max">
        <div className="flex justify-between items-center px-4 py-2 text-primary-foreground">
          <Button
            onClick={() => navigate('/watchlist')}
            className="text-sm font-medium hover:opacity-80"
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

        <div className="flex flex-col items-start mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">
              {companyDetails.companyName}
            </h2>
            <span className="text-xl ml-2 text-primary-foreground/80">
              ({companyDetails.symbol})
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-primary-foreground/80">
              {companyDetails.exchangeShortName}
            </p>
            <span>: {companyDetails.symbol}</span>
          </div>
          <div className="flex items-center">
            <h2 className="text-xl font-semibold mr-3">
              {companyDetails.price.toFixed(2)}
            </h2>
            <span
              className={`${
                companyDetails.changes > 0
                  ? 'text-green-500'
                  : companyDetails.changes < 0
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}
            >
              {companyDetails.changes.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="content">
          <div className="border-b border-border mb-4">
            <nav className="flex justify-between text-sm font-medium text-primary-foreground">
              {[
                'overview',
                'estimate',
                'forecast',
                'financials',
                'statistics',
                'news',
                'profile',
              ].map((tabName) => (
                <span
                  key={tabName}
                  className={`cursor-pointer px-2 ${
                    tab === tabName
                      ? 'text-primary font-semibold'
                      : 'hover:text-primary'
                  }`}
                  onClick={() => handleTabChange(tabName)}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </span>
              ))}
            </nav>
          </div>

          <div className="mt-4">
            {tab === 'overview' && <Overview companies={companyDetails} />}
            {tab === 'estimate' && <p>Estimate content goes here...</p>}
            {tab === 'forecast' && <p>Forecast content goes here...</p>}
            {tab === 'financials' && <p>Financials content goes here...</p>}
            {tab === 'statistics' && <p>Statistics content goes here...</p>}
            {tab === 'news' && <p>News content goes here...</p>}
            {tab === 'profile' && <Profile companies={companyDetails} />}
          </div>
        </div>
      </div>
    </section>
  );
}

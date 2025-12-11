import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCompanyDetails,
  fetchCompanyQuote,
} from '../services/fmpService.js';
import Button from '../components/UI/Button.jsx';
import { addCompanyToWatchlist } from '../redux/slices/watchlistSlice.js';
import NotificationBadge from '../components/UI/NotificationBadge.jsx';
import Overview from '../components/Overview.jsx';
import Profile from '../components/Profile.jsx';
import News from '../components/News.jsx';
import Forecast from '../components/Forecast.jsx';
import Estimate from '../components/Estimate.jsx';
import Financials from '../components/Financials.jsx';
import FreePlanNotice from '../components/UI/FreePlanNotice.jsx';
import { isAvailableOnFreePlan } from '../config/fmpFreeSymbols.js';

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

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [details, quote] = await Promise.all([
          fetchCompanyDetails(companySymbol),
          fetchCompanyQuote(companySymbol),
        ]);

        // Об'єднуємо дані, враховуючи можливі розбіжності в назвах полів
        const mergedData = {
          ...details,
          ...quote,
          // Забезпечуємо сумісність назв полів
          changes: quote?.change || details?.change || 0,
          changesPercentage:
            quote?.changePercentage || details?.changePercentage || 0,
          companyName:
            details?.companyName || details?.name || quote?.name || 'Unknown',
          companySymbol: details?.symbol || quote?.symbol || companySymbol,
        };

        setCompanyDetails(mergedData);
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError(err.message || 'Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Помилка завантаження
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>

          {!isAvailableOnFreePlan(companySymbol) && <FreePlanNotice />}

          <Button onClick={() => navigate('/watchlist')} className="mt-4">
            Повернутись до списку
          </Button>
        </div>
      </div>
    );
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
              {companyDetails.price ? companyDetails.price.toFixed(2) : 'N/A'}
            </h2>
            {companyDetails.changes !== undefined &&
            companyDetails.changes !== null ? (
              <span
                className={`${
                  companyDetails.changes > 0
                    ? 'text-green-500'
                    : companyDetails.changes < 0
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {companyDetails.changes.toFixed(2)} (
                {(
                  companyDetails.changesPercentage ||
                  companyDetails.changePercentage ||
                  0
                ).toFixed(2)}
                %)
              </span>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>

        <div className="content">
          <div className="border-b border-border mb-4">
            <nav className="flex justify-around text-lg font-bold text-primary-foreground">
              {[
                'overview',
                'estimate',
                'forecast',
                'financials',
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
            {tab === 'estimate' && <Estimate />}
            {tab === 'forecast' && <Forecast />}
            {tab === 'financials' && <Financials />}
            {tab === 'news' && <News />}
            {tab === 'profile' && <Profile companies={companyDetails} />}
          </div>
        </div>
      </div>
    </section>
  );
}

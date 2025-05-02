import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeers } from '../services/finnhubService.js';
import { fetchRating } from '../services/fmpService.js';
import Spinner from './UI/Spinner.jsx';
import { usePeersFinancials } from '../hooks/usePeersFinancials.js';
import MetricSummaries from './Estimate/MetricSummaries.jsx';
import MetricComparisons from './Estimate/MetricComparisons.jsx';

export default function Estimate() {
  const { companySymbol } = useParams();
  const [peers, setPeers] = useState([]);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchPeersAndRating = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('companies')) || {};
        const today = new Date().toISOString().split('T')[0];

        if (
          storedData[companySymbol]?.lastFetchedEstimateDate === today &&
          storedData[companySymbol]?.peers
        ) {
          setPeers(storedData[companySymbol].peers);
          setRating(storedData[companySymbol].rating || null);
          return;
        }

        const peers = await getPeers(companySymbol);
        const rating = await fetchRating(companySymbol);

        setPeers(peers);
        console.log('Peers:', peers);
        setRating(rating);
        localStorage.setItem(
          'companies',
          JSON.stringify({
            ...storedData,
            [companySymbol]: {
              ...storedData[companySymbol],
              lastFetchedEstimateDate: today,
              peers,
              rating,
            },
          })
        );
      } catch (error) {
        console.error('Error fetching peers or rating:', error);
      }
    };

    fetchPeersAndRating();
  }, [companySymbol]);

  const {
    financials,
    loading: financialsLoading,
    error: financialsError,
  } = usePeersFinancials(peers, companySymbol);

  console.log('Financials:', financials);

  const comparisonsData = ['roe', 'roa', 'roic'].map((metricKey) => ({
    metricKey,
    data: Object.values(financials)
      .map((entry) => ({
        symbol: entry.symbol,
        [metricKey]:
          entry[metricKey] !== undefined && entry[metricKey] !== 'N/A'
            ? entry[metricKey]
            : null,
      }))
      .filter((entry) => entry[metricKey] !== null),
  }));

  const summariesData = ['pe', 'ps', 'pb'].map((metricKey) => ({
    metricKey,
    data: Object.values(financials)
      .map((entry) => ({
        symbol: entry.symbol,
        name: entry.name,
        [metricKey]:
          entry[metricKey] !== undefined && entry[metricKey] !== 'N/A'
            ? entry[metricKey]
            : null,
      }))
      .filter((entry) => entry[metricKey] !== null),
  }));

  if (financialsLoading) {
    return <Spinner />;
  }

  if (financialsError) {
    return <p>Error loading financials</p>;
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="w-max">
          <div className="flex flex-row">
            <MetricComparisons
              data={comparisonsData}
              companySymbol={companySymbol}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <MetricSummaries data={summariesData} companySymbol={companySymbol} />
      </div>
      <div className="flex flex-row justify-center mt-10">
        <div className="w-max">
          {rating && rating.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">
                Rating for {companySymbol}
              </h2>
              <p>
                <strong>Rating:</strong> {rating[0].rating} (
                {rating[0].ratingRecommendation})
              </p>
              <p>
                <strong>Score:</strong> {rating[0].ratingScore}
              </p>
              <ul className="ml-6 text-left">
                <li>
                  <strong>DCF:</strong>{' '}
                  {rating[0].ratingDetailsDCFRecommendation} (Score:{' '}
                  {rating[0].ratingDetailsDCFScore})
                </li>
                <li>
                  <strong>DE:</strong> {rating[0].ratingDetailsDERecommendation}{' '}
                  (Score: {rating[0].ratingDetailsDEScore})
                </li>
                <li>
                  <strong>PB:</strong> {rating[0].ratingDetailsPBRecommendation}{' '}
                  (Score: {rating[0].ratingDetailsPBScore})
                </li>
                <li>
                  <strong>PE:</strong> {rating[0].ratingDetailsPERecommendation}{' '}
                  (Score: {rating[0].ratingDetailsPEScore})
                </li>
                <li>
                  <strong>ROA:</strong>{' '}
                  {rating[0].ratingDetailsROARecommendation} (Score:{' '}
                  {rating[0].ratingDetailsROAScore})
                </li>
                <li>
                  <strong>ROE:</strong>{' '}
                  {rating[0].ratingDetailsROERecommendation} (Score:{' '}
                  {rating[0].ratingDetailsROEScore})
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-max">
          <p className="underline">Peers data for {companySymbol}</p>
          {peers.map((peer, index) => (
            <div key={`${peer}-${index}`}>{peer}</div>
          ))}
          <a
            href="https://finnhub.io/docs/api/company-peers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Peers on Finnhub
          </a>
        </div>
      </div>
    </div>
  );
}

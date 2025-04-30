import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeers } from '../services/finnhubService.js';
import { fetchRating } from '../services/fmpService.js';
import Spinner from './UI/Spinner.jsx';
import { usePeersFinancials } from '../hooks/usePeersFinancials.js';
import MetricComparison from './Estimate/MetricComparison.jsx';

export default function Estimate() {
  const { companySymbol } = useParams();
  const [peers, setPeers] = useState([]);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const peers = await getPeers(companySymbol);
        const rating = await fetchRating(companySymbol);

        setPeers(peers);
        setRating(rating);
      } catch (error) {
        console.error('Error fetching peers:', error);
      }
    };

    fetchPeers();
  }, [companySymbol]);

  const {
    financials,
    loading: financialsLoading,
    error: financialsError,
  } = usePeersFinancials(peers);

  const roeData = Object.entries(financials)
    .map(([symbol, data]) => ({
      symbol,
      roe: data.roe !== undefined && data.roe !== 'N/A' ? data.roe : null,
    }))
    .filter((entry) => entry.roe !== null);

  const roaData = Object.entries(financials)
    .map(([symbol, data]) => ({
      symbol,
      roa: data.roa !== undefined && data.roa !== 'N/A' ? data.roa : null,
    }))
    .filter((entry) => entry.roa !== null);

  const roicData = Object.entries(financials)
    .map(([symbol, data]) => ({
      symbol,
      roic: data.roic !== undefined && data.roic !== 'N/A' ? data.roic : null,
    }))
    .filter((entry) => entry.roic !== null);

  return (
    <div>
      <div className="flex flex-row">
        {rating && rating.length > 0 && (
          <div className="mb-4 w-1/3">
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
            <ul className="ml-6">
              <li>
                <strong>DCF:</strong> {rating[0].ratingDetailsDCFRecommendation}{' '}
                (Score: {rating[0].ratingDetailsDCFScore})
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
                <strong>ROA:</strong> {rating[0].ratingDetailsROARecommendation}{' '}
                (Score: {rating[0].ratingDetailsROAScore})
              </li>
              <li>
                <strong>ROE:</strong> {rating[0].ratingDetailsROERecommendation}{' '}
                (Score: {rating[0].ratingDetailsROEScore})
              </li>
            </ul>
          </div>
        )}
        <div className="w-1/3 left-0">
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
        <div className="w-1/2 left-0 ml-10">
          {financialsLoading ? (
            <Spinner />
          ) : financialsError ? (
            <p>Error loading financials</p>
          ) : (
            <>
              <MetricComparison
                title="Return on Equity (ROE)"
                data={roeData}
                companySymbol={companySymbol}
                metricKey="roe"
              ></MetricComparison>
              <MetricComparison
                title="Return on Equity (ROA)"
                data={roaData}
                companySymbol={companySymbol}
                metricKey="roa"
              ></MetricComparison>
              <MetricComparison
                title="Return on Invested Capital (ROIC)"
                data={roicData}
                companySymbol={companySymbol}
                metricKey="roic"
              ></MetricComparison>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

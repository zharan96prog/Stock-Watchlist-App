import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeers } from '../services/finnhubService.js';
import { getRating } from '../services/fmpService.js';

export default function Estimate() {
  const { companySymbol } = useParams();
  const [peers, setPeers] = useState([]);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const peers = await getPeers(companySymbol);
        const rating = await getRating(companySymbol);

        // Видаляю перший елемент (companySymbol) з масиву peers
        const filteredPeers = peers.filter((peer) => peer !== companySymbol);

        setPeers(filteredPeers);
        setRating(rating);
      } catch (error) {
        console.error('Error fetching peers:', error);
      }
    };

    fetchPeers();
  }, [companySymbol]);

  return (
    <div>
      <h1>Estimate</h1>
      <p>This is the Estimate component.</p>
      <div className="flex flex-row">
        <div className="w-36 left-0">
          <p className="underline">Peers data for {companySymbol}</p>
          {peers.map((peer) => (
            <div key={peer}>{peer}</div>
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
        <div className="w-52 left-0 ml-10">
          <p className="underline">Rating data for {companySymbol}</p>
          {rating && Array.isArray(rating) && rating.length > 0 ? (
            <div>
              <p>Date: {rating[0].date}</p>
              <p>Rating: {rating[0].rating}</p>
              <p>Rating Score: {rating[0].ratingScore}</p>
              <p>Recommendation: {rating[0].ratingRecommendation}</p>
              <p>DCF Score: {rating[0].ratingDetailsDCFScore}</p>
              <p>
                DCF Recommendation: {rating[0].ratingDetailsDCFRecommendation}
              </p>
              <p>ROE Score: {rating[0].ratingDetailsROEScore}</p>
              <p>
                ROE Recommendation: {rating[0].ratingDetailsROERecommendation}
              </p>
              <p>ROA Score: {rating[0].ratingDetailsROAScore}</p>
              <p>
                ROA Recommendation: {rating[0].ratingDetailsROARecommendation}
              </p>
              <p>DE Score: {rating[0].ratingDetailsDEScore}</p>
              <p>
                DE Recommendation: {rating[0].ratingDetailsDERecommendation}
              </p>
              <p>PE Score: {rating[0].ratingDetailsPEScore}</p>
              <p>
                PE Recommendation: {rating[0].ratingDetailsPERecommendation}
              </p>
              <p>PB Score: {rating[0].ratingDetailsPBScore}</p>
              <p>
                PB Recommendation: {rating[0].ratingDetailsPBRecommendation}
              </p>
            </div>
          ) : (
            <p>Loading rating data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

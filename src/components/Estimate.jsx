import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeers } from '../services/finnhubService.js';

export default function Estimate() {
  const { companySymbol } = useParams();
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const peers = await getPeers(companySymbol);

        // Видаляю перший елемент (companySymbol) з масиву peers
        const filteredPeers = peers.filter((peer) => peer !== companySymbol);

        setPeers(filteredPeers);
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
      <div className="w-36 left-0">
        <p className="underline">Peers data for {companySymbol}</p>
        {peers.map((peer) => (
          <div key={peer}>{peer}</div>
        ))}
      </div>
    </div>
  );
}

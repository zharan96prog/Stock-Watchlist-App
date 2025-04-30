import { useState, useEffect } from 'react';
import { fetchCompanyBasicFinancials } from '../services/finnhubService.js';

export function usePeersFinancials(peers) {
  const [financials, setFinancials] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!peers || peers.length === 0) return;

    const fetchFinancials = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          peers.map(async (peer) => {
            try {
              const data = await fetchCompanyBasicFinancials(peer);
              // console.log(`Data for ${peer}:`, data);

              const roaArray = data.series?.annual?.roa || [];
              const roeArray = data.series?.annual?.roe || [];
              const roicArray = data.series?.annual?.roic || [];
              const pb = data.series?.annual?.pb || [];
              const pe = data.series?.annual?.pe || [];
              const ps = data.series?.annual?.ps || [];

              return {
                symbol: peer,
                roa: roaArray.length > 0 ? roaArray[0].v : 'N/A',
                roe: roeArray.length > 0 ? roeArray[0].v : 'N/A',
                roic: roicArray.length > 0 ? roicArray[0].v : 'N/A',
                pb: pb.length > 0 ? parseFloat(pb[0].v).toFixed(2) : 'N/A',
                pe: pe.length > 0 ? parseFloat(pe[0].v).toFixed(2) : 'N/A',
                ps: ps.length > 0 ? parseFloat(ps[0].v).toFixed(2) : 'N/A',
              };
            } catch (err) {
              console.error(`Error fetching financials for ${peer}:`, err);
              return { symbol: peer, error: true };
            }
          })
        );

        const financialsMap = results.reduce((acc, { symbol, ...metrics }) => {
          acc[symbol] = metrics;
          return acc;
        }, {});

        setFinancials(financialsMap);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancials();
  }, [peers]);

  return { financials, loading, error };
}

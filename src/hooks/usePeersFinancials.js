import { useState, useEffect } from 'react';
import { openDB } from 'idb';
import {
  fetchCompanyBasicFinancials,
  fetchCompanyNameBySymbol,
} from '../services/finnhubService.js';

const dbPromise = openDB('estimate-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('financials')) {
      db.createObjectStore('financials', { keyPath: 'companySymbol' });
    }
  },
});

// This hook fetches financial data for a company's peers.
// It uses IndexedDB (estimate-db) to cache data locally and checks the lastFetchedEstimateDate
// in localStorage to avoid unnecessary API calls.
// If data is valid and up-to-date, it retrieves it from
// IndexedDB; otherwise, it fetches data from the API and updates both IndexedDB and localStorage.

export function usePeersFinancials(peers, companySymbol) {
  const [financials, setFinancials] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!peers || peers.length === 0) return;

    const fetchFinancials = async () => {
      setLoading(true);
      setError(null);

      try {
        const db = await dbPromise;
        const storedData = JSON.parse(localStorage.getItem('companies')) || {};
        const today = new Date().toISOString().split('T')[0];

        const cachedData = await db.get('financials', companySymbol);
        const lastFetchedEstimateDate =
          storedData[companySymbol]?.lastFetchedEstimateDate;

        if (cachedData && lastFetchedEstimateDate === today) {
          setFinancials(cachedData.peers || {});
          setLoading(false);
          return;
        }

        const results = await Promise.all(
          peers.map(async (peer) => {
            const cachedPeer = cachedData?.peers?.find(
              (p) => p.symbol === peer
            );

            if (cachedPeer?.name) {
              return cachedPeer;
            }

            const data = await fetchCompanyBasicFinancials(peer);

            const roaArray = data.series?.annual?.roa || [];
            const roeArray = data.series?.annual?.roe || [];
            const roicArray = data.series?.annual?.roic || [];
            const pb = data.series?.annual?.pb || [];
            const pe = data.series?.annual?.pe || [];
            const ps = data.series?.annual?.ps || [];

            const companyInfo = await fetchCompanyNameBySymbol(peer);

            const peerData = {
              symbol: peer,
              name: companyInfo.name,
              roa: roaArray.length > 0 ? roaArray[0].v : 'N/A',
              roe: roeArray.length > 0 ? roeArray[0].v : 'N/A',
              roic: roicArray.length > 0 ? roicArray[0].v : 'N/A',
              pb: pb.length > 0 ? parseFloat(pb[0].v).toFixed(2) : 'N/A',
              pe: pe.length > 0 ? parseFloat(pe[0].v).toFixed(2) : 'N/A',
              ps: ps.length > 0 ? parseFloat(ps[0].v).toFixed(2) : 'N/A',
            };

            return peerData;
          })
        );

        const financialData = {
          companySymbol,
          peers: results,
        };
        await db.put('financials', financialData);

        localStorage.setItem(
          'companies',
          JSON.stringify({
            ...storedData,
            [companySymbol]: {
              ...storedData[companySymbol],
              lastFetchedEstimateDate: today,
            },
          })
        );

        setFinancials(
          results.reduce((acc, item) => {
            acc[item.symbol] = item;
            return acc;
          }, {})
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancials();
  }, [peers, companySymbol]);

  return { financials, loading, error };
}

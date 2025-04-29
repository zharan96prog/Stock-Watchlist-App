import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { openDB } from 'idb';

import Chart from 'react-apexcharts';
import Spinner from './UI/Spinner.jsx';
import { recommendationTrends } from '../services/finnhubService.js';
import {
  createSeries,
  calculateConsensus,
  getChartOptions,
} from '../utils/forecastUtils.js';

const dbPromise = openDB('forecast-db', 1, {
  upgrade(db) {
    db.createObjectStore('forecasts', { keyPath: 'symbol' });
  },
});

export default function Forecast() {
  const { companySymbol } = useParams();
  const [forecastData, setForecastData] = useState([]);

  // This logic is implemented to reduce the response time from the API,
  // as the data changes very rarely.
  // Additionally, it helps to stay within the API request limit
  // by caching the data locally.
  // The data is stored in IndexedDB and localStorage.
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const db = await dbPromise;
        const storedData = JSON.parse(localStorage.getItem('companies')) || {};
        const lastFetchedDate = storedData[companySymbol]?.lastFetchedDate;
        const today = new Date().toISOString().split('T')[0];

        if (lastFetchedDate === today) {
          const companyData = await db.get('forecasts', companySymbol);
          if (companyData) {
            setForecastData(companyData.data);
            return;
          }
        }

        const forecast = await recommendationTrends(companySymbol);

        await db.put('forecasts', {
          symbol: companySymbol,
          data: forecast,
        });

        localStorage.setItem(
          'companies',
          JSON.stringify({
            ...storedData,
            [companySymbol]: { lastFetchedDate: today },
          })
        );

        setForecastData(forecast);
      } catch (error) {
        console.error('Error fetching recommendation trends:', error);
        setForecastData([]);
      }
    };

    fetchForecast();
  }, [companySymbol]);

  const series =
    Array.isArray(forecastData) && forecastData.length > 0
      ? createSeries(forecastData)
      : [];
  const consensus =
    Array.isArray(forecastData) && forecastData.length > 0
      ? calculateConsensus(forecastData)
      : 'N/A';
  const options = getChartOptions(forecastData);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Forecast for {companySymbol}</h1>
      <div className="w-10/12">
        {Array.isArray(forecastData) && forecastData.length > 0 ? (
          <>
            <Chart options={options} series={series} type="bar" height={400} />
            <h2 className="text-xl font-bold">
              Analyst Consensus: {consensus}
            </h2>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

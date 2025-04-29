import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { recommendationTrends } from '../services/finnhubService.js';
import Spinner from './UI/Spinner.jsx';
import {
  createSeries,
  calculateConsensus,
  getChartOptions,
} from '../utils/forecastUtils.js';

export default function Forecast() {
  const { companySymbol } = useParams();
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    // This logic is implemented to reduce the response time from the API,
    // as the data changes very rarely.
    // Additionally, it helps to stay within the API request limit
    // by caching the data locally.
    const fetchForecast = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('companies')) || {};
        const companyData = storedData[companySymbol]?.forecast || {};
        const lastFetchedDate = companyData?.lastFetchedDate;
        const today = new Date().toISOString().split('T')[0];

        if (companyData.data && lastFetchedDate === today) {
          setForecastData(companyData.data);
        } else {
          const forecast = await recommendationTrends(companySymbol);

          const updatedData = {
            ...storedData,
            [companySymbol]: {
              ...storedData[companySymbol],
              forecast: {
                lastFetchedDate: today,
                data: forecast,
              },
            },
          };
          localStorage.setItem('companies', JSON.stringify(updatedData));

          setForecastData(forecast);
        }
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

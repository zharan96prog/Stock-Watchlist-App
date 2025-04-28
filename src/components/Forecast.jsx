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
    const fetchForecast = async () => {
      try {
        const forecast = await recommendationTrends(companySymbol);
        setForecastData(forecast);
      } catch (error) {
        console.error('Error fetching recommendation trends:', error);
      }
    };

    fetchForecast();
  }, [companySymbol]);

  const series = createSeries(forecastData);
  const consensus = calculateConsensus(forecastData);
  const options = getChartOptions(forecastData);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Forecast for {companySymbol}</h1>
      <div className="w-10/12">
        {forecastData.length > 0 ? (
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

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { recommendationTrends } from '../services/finnhubService.js';

export default function Forecast() {
  const { companySymbol } = useParams();
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecast = await recommendationTrends(companySymbol);
        setForecastData(forecast);
        console.log('Forecast data:', forecast);
      } catch (error) {
        console.error('Error fetching recommendation trends:', error);
      }
    };

    fetchForecast();
  }, [companySymbol]);

  return (
    <div>
      <h1>Forecast for {companySymbol}</h1>
      <div>
        {forecastData.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Period</th>
                <th className="border border-gray-300 px-4 py-2">Buy</th>
                <th className="border border-gray-300 px-4 py-2">Hold</th>
                <th className="border border-gray-300 px-4 py-2">Sell</th>
                <th className="border border-gray-300 px-4 py-2">Strong Buy</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.period}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.buy}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.hold}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.sell}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.strongBuy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading forecast data...</p>
        )}
      </div>
    </div>
  );
}

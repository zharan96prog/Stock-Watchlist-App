import React from 'react';

import displayRatioKeys from '../../constants/displayRatioKeys';
import GrowthRow from './GrowthRow.jsx';

export default function Ratios({ ratios, keyMetrics }) {
  if (
    !ratios ||
    !Array.isArray(ratios) ||
    ratios.length === 0 ||
    !keyMetrics ||
    !Array.isArray(keyMetrics) ||
    keyMetrics.length === 0
  ) {
    return <p>Loading Financial Ratios...</p>;
  }

  const combinedData = ratios.map((ratio, index) => ({
    ...ratio,
    ...keyMetrics[index],
  }));

  const years = combinedData.map((item) => item.calendarYear);

  const selectedKeys = Object.keys(displayRatioKeys);

  const percentageKeys = [
    'returnOnEquity',
    'returnOnAssets',
    'returnOnCapitalEmployed',
    'dividendYield',
  ];

  const formatValue = (num, key) => {
    if (typeof num !== 'number') return 'N/A';

    if (percentageKeys.includes(key)) {
      return (num * 100).toFixed(2) + '%';
    }

    if (num < 1) {
      return num.toFixed(2);
    }
    if (num < 200) {
      return num.toFixed(2);
    }
    return (num / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 w-full">
        <h2 className="text-2xl font-bold text-primary text-left">
          Ratios and Metrics
        </h2>
        <p className="text-sm text-primary-foreground/80 text-left">
          Market cap in millions USD. Fiscal year is January - December.
        </p>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse border border-gray-300 w-full mb-8">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Fiscal Year</th>
              {years.map((year, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedKeys.map((key) => (
              <React.Fragment key={key}>
                <tr key={key}>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {displayRatioKeys[key]}
                  </td>
                  {combinedData.map((item, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {formatValue(item[key], key)}
                    </td>
                  ))}
                </tr>

                {key === 'marketCap' && (
                  <GrowthRow
                    label="Market Cap Growth"
                    data={combinedData}
                    keyName={key}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from 'react';
import displayIncomeKeys from '../../constants/displayIncomeKeys.js';
import GrowthRow from './GrowthRow';

export default function Income({ incomeStatement }) {
  if (
    !incomeStatement ||
    !Array.isArray(incomeStatement) ||
    incomeStatement.length === 0
  ) {
    return <p>Loading Income Statement...</p>;
  }

  const years = incomeStatement.map((sheet) => sheet.date.split('-')[0]);

  const selectedKeys = Object.keys(displayIncomeKeys);

  const formatValue = (num) => {
    if (typeof num !== 'number') return 'N/A';
    if (num < 1) {
      return num.toFixed(2);
    }
    if (num < 100) {
      return num.toFixed(2);
    }
    return (num / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Income Statement
        </h1>
        <div className="overflow-x-auto w-full mb-8">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Metric
                </th>
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
                  {/* Основний рядок */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {displayIncomeKeys[key]}
                    </td>
                    {incomeStatement.map((statement, index) => (
                      <td
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {formatValue(statement[key])}
                      </td>
                    ))}
                  </tr>

                  {key === 'revenue' && (
                    <GrowthRow
                      label="Revenue Growth (YoY)"
                      data={incomeStatement}
                      keyName={key}
                    />
                  )}

                  {key === 'eps' && (
                    <GrowthRow
                      label="EPS Growth (YoY)"
                      data={incomeStatement}
                      keyName={key}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

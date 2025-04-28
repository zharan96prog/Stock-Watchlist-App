import React from 'react';

import displayCashFlowKeys from '../../constants/displayCashFlowKeys.js';
import GrowthRow from './GrowthRow.jsx';
import Spinner from '../UI/Spinner.jsx';

export default function CashFlow({ cashFlow }) {
  if (!cashFlow || !Array.isArray(cashFlow) || cashFlow.length === 0) {
    return <Spinner />;
  }

  const years = cashFlow.map((cashFl) => cashFl.calendarYear);

  const selectedKeys = Object.keys(displayCashFlowKeys);

  const formatValue = (num, key) => {
    if (key === 'date') {
      const date = new Date(num);
      if (isNaN(date)) return 'N/A';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    }
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
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 w-full">
        <h2 className="text-2xl font-bold text-primary text-left">
          {cashFlow[0].symbol} Cash Flow Statement
        </h2>
        <p className="text-sm text-primary-foreground/80 text-left">
          Financials in millions USD. Fiscal year is January - December.
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
                    {displayCashFlowKeys[key]}
                  </td>
                  {cashFlow.map((statement, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {formatValue(statement[key], key)}
                    </td>
                  ))}
                </tr>
                {key === 'operatingCashFlow' && (
                  <GrowthRow
                    label="Operating Cash Flow Growth"
                    data={cashFlow}
                    keyName={key}
                  />
                )}
                {key === 'freeCashFlow' && (
                  <GrowthRow
                    label="Free Cash Flow Growth"
                    data={cashFlow}
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

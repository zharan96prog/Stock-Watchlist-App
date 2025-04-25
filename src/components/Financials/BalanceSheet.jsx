import displayBalanceKeys from '../../constants/displayBalanceKeys';

export default function BalanceSheet({ balanceSheet }) {
  if (
    !balanceSheet ||
    !Array.isArray(balanceSheet) ||
    balanceSheet.length === 0
  ) {
    return <p>Loading Balance Sheet...</p>;
  }

  const years = balanceSheet.map((sheet) => sheet.calendarYear);

  const selectedKeys = Object.keys(displayBalanceKeys);

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
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-primary mb-6">Balance Sheet</h1>
      <div className="overflow-x-auto w-full">
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
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {displayBalanceKeys[key]}
                </td>
                {balanceSheet.map((statement, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {formatValue(statement[key], key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

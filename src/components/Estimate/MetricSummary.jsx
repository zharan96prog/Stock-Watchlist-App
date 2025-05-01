import { useEffect, useState } from 'react';

import { fetchCompanyNameBySymbol } from '../../services/finnhubService';

export default function MetricSummary({
  title,
  data,
  companySymbol,
  metricKey,
}) {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchAndTransformData() {
      const transformedData = await transformData(
        data,
        companySymbol,
        metricKey
      );
      setCompanies(transformedData);
    }

    fetchAndTransformData();
  }, [data, companySymbol, metricKey]);

  const maxMetric =
    companies.length > 0
      ? Math.max(
          ...companies
            .map((company) => company[metricKey])
            .filter((value) => !isNaN(value))
        ) * 1.1
      : 0;

  const calculateMedian = (data, key) => {
    if (!data || data.length === 0) return 0;

    const numericValues = data
      .map((entry) => parseFloat(entry[key]))
      .filter((value) => !isNaN(value));

    if (numericValues.length === 0) return 0;

    const sortedValues = [...numericValues].sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);

    return sortedValues.length % 2 === 0
      ? (sortedValues[mid - 1] + sortedValues[mid]) / 2
      : sortedValues[mid];
  };

  // Filters the companies to include up to two with higher metric values
  // and up to three with lower metric values relative to the companySymbol,
  // excluding those with NaN metric values.
  const filteredCompanies = () => {
    const validCompanies = companies.filter(
      (company) => !isNaN(company[metricKey])
    );

    const currentIndex = validCompanies.findIndex(
      (company) => company.symbol === companySymbol
    );

    if (currentIndex === -1) return [];

    const higherMetric = validCompanies.slice(0, currentIndex).slice(0, 2);
    const lowerMetric = validCompanies.slice(currentIndex + 1).slice(0, 3);

    return [...higherMetric, validCompanies[currentIndex], ...lowerMetric];
  };

  const peerAvg = calculateMedian(data, metricKey);

  return (
    <div className="flex flex-col justify-center items-center w-9/12 mt-10">
      <h2 className="text-xl font-bold mb-2 text-left">{title}</h2>
      <p className="text-left">
        How does {companySymbol}'s {metricKey.toUpperCase()} Ratio compare to
        its peers?
      </p>
      <div className="bg-[#0D1117] text-white p-6 rounded-lg w-full max-w-4xl mt-16">
        <div className="relative h-max space-y-3">
          <div
            className="absolute -top-7 bottom-0 border-l-2 border-yellow-400"
            style={{
              left:
                maxMetric > 0
                  ? `${Math.min((peerAvg / maxMetric) * 100, 100)}%`
                  : '0%',
            }}
          >
            <div className="absolute w-max -top-14 text-base bg-yellow-400 text-black p-2 rounded">
              Peer Avg {peerAvg.toFixed(1)}x
            </div>
          </div>
          {filteredCompanies().map((company, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-2">
                <div
                  className="h-auto flex items-center justify-between p-3 text-sm font-semibold rounded-md"
                  style={{
                    width: `${(company[metricKey] / maxMetric) * 100}%`,
                    backgroundColor: company.highlighted
                      ? '#1f6feb'
                      : '#1F2937',
                  }}
                >
                  <div className="text-left">
                    <p className="mb-2">{company[metricKey]}x</p>
                    <p>{company.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function transformData(data, companySymbol, metricKey) {
  const transformedCompanies = await Promise.all(
    data.map(async (entry) => {
      const companyInfo = await fetchCompanyNameBySymbol(entry.symbol);
      return {
        symbol: entry.symbol,
        name: companyInfo.name,
        [metricKey]: parseFloat(entry[metricKey]),
        highlighted: entry.symbol === companySymbol,
      };
    })
  );

  return transformedCompanies.sort((a, b) => b[metricKey] - a[metricKey]);
}

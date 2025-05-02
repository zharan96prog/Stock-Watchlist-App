import MetricComparison from './MetricComparison';
import Spinner from '../UI/Spinner';

export default function MetricComparisons({ data, companySymbol }) {
  const metrics = [
    { title: 'Return on Equity (ROE)', metricKey: 'roe' },
    { title: 'Return on Assets (ROA)', metricKey: 'roa' },
    { title: 'Return on Invested Capital (ROIC)', metricKey: 'roic' },
  ];

  console.log('MetricComparisons data:', data);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      {metrics.map(({ title, metricKey }) => {
        const metricData =
          data.find((item) => item.metricKey === metricKey)?.data || [];
        return (
          <MetricComparison
            key={metricKey}
            title={title}
            data={metricData}
            companySymbol={companySymbol}
            metricKey={metricKey}
          />
        );
      })}
    </div>
  );
}

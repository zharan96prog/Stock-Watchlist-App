import MetricSummary from './MetricSummary';
import Spinner from '../UI/Spinner';

export default function MetricSummaries({ data, companySymbol }) {
  const metrics = [
    { title: 'Price to Book Ratio vs Peers', metricKey: 'pb' },
    { title: 'Price to Earnings Ratio vs Peers', metricKey: 'pe' },
    { title: 'Price to Sales Ratio vs Peers', metricKey: 'ps' },
  ];
  console.log('MetricSummaries data:', data);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {metrics.map(({ title, metricKey }) => {
        const metricData =
          data.find((item) => item.metricKey === metricKey)?.data || [];
        return (
          <MetricSummary
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

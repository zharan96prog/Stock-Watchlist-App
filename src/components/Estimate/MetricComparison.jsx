import { PieChart, Pie, Cell } from 'recharts';

export default function MetricComparison({
  title,
  data,
  companySymbol,
  metricKey,
}) {
  const calculateMedian = (values) => {
    if (!values || values.length === 0) return 'N/A';

    const numericValues = values.filter(
      (value) => typeof value === 'number' && !isNaN(value)
    );

    if (numericValues.length === 0) return 'N/A';

    const sortedValues = [...numericValues].sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);

    return sortedValues.length % 2 === 0
      ? (sortedValues[mid - 1] + sortedValues[mid]) / 2
      : sortedValues[mid];
  };

  const metricValues = data.map((entry) => entry[metricKey]);
  const median = calculateMedian(metricValues);

  const companyEntry = data.find((entry) => entry.symbol === companySymbol);
  const companyValue = companyEntry ? companyEntry[metricKey] : 'N/A';

  const max = Math.max(...metricValues, median);
  const goodThreshold = 0.2;
  const angle = 180;

  const normalizeValue = (value) => {
    if (value >= goodThreshold) {
      return ((value - goodThreshold) / (max - goodThreshold)) * 0.5 + 0.5;
    }
    return (value / goodThreshold) * 0.5;
  };

  const percentToAngle = (value) => normalizeValue(value) * angle;

  const pointerAngle =
    companyValue !== 'N/A' ? percentToAngle(companyValue) : 0;
  const industryAngle = median !== 'N/A' ? percentToAngle(median) : 0;

  const gaugeData = Array.from({ length: 20 }, (_, i) => ({
    value: 1,
    color:
      i < 4
        ? '#dc2626'
        : i < 8
        ? '#f97316'
        : i < 12
        ? '#facc15'
        : i < 14
        ? '#4ade80'
        : i < 16
        ? '#22c55e'
        : i < 18
        ? '#16a34a'
        : '#15803d',
  }));

  return (
    <div className="metric-comparison text-center">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="flex justify-center">
        <PieChart width={300} height={150}>
          <Pie
            data={gaugeData}
            startAngle={180}
            endAngle={0}
            cx={150}
            cy={150}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={1}
            dataKey="value"
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Company Pointer */}
          {companyValue !== 'N/A' && (
            <line
              x1="150"
              y1="150"
              x2={150 + 90 * Math.cos(Math.PI - (pointerAngle * Math.PI) / 180)}
              y2={150 - 90 * Math.sin((pointerAngle * Math.PI) / 180)}
              stroke="#3b82f6"
              strokeWidth="4"
            />
          )}

          {/* Industry Pointer */}
          {median !== 'N/A' && (
            <line
              x1="150"
              y1="150"
              x2={
                150 + 70 * Math.cos(Math.PI - (industryAngle * Math.PI) / 180)
              }
              y2={150 - 70 * Math.sin((industryAngle * Math.PI) / 180)}
              stroke="#a1a1aa"
              strokeWidth="3"
              strokeDasharray="4"
            />
          )}
        </PieChart>
      </div>

      <div className="mt-4">
        <p>
          <span className="text-blue-400">{companySymbol}:</span>{' '}
          {companyValue !== 'N/A'
            ? `${(companyValue * 100).toFixed(1)}%`
            : 'No data available'}
        </p>
        <p>
          <span className="text-gray-400">Industry Median:</span>{' '}
          {median !== 'N/A'
            ? `${(median * 100).toFixed(1)}%`
            : 'No data available'}
        </p>
      </div>
    </div>
  );
}

import React from 'react';

export default function GrowthRow({ label, data, keyName }) {
  const calculateGrowth = (current, previous) => {
    if (typeof current !== 'number' || typeof previous !== 'number')
      return 'N/A';
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(2) + '%';
  };

  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-500">
        {label}
      </td>
      {data.map((item, index) => {
        const current = item[keyName];
        const previous =
          index < data.length - 1 ? data[index + 1][keyName] : null;
        const growth = calculateGrowth(current, previous);

        return (
          <td
            key={index}
            className={`border border-gray-300 px-4 py-2 text-center ${
              growth.includes('-') ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {growth}
          </td>
        );
      })}
    </tr>
  );
}

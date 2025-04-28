export const createSeries = (forecastData) => [
  {
    name: 'Sell',
    data: forecastData.map((item) => item.sell),
  },
  {
    name: 'Hold',
    data: forecastData.map((item) => item.hold),
  },
  {
    name: 'Buy',
    data: forecastData.map((item) => item.buy),
  },
  {
    name: 'Strong Buy',
    data: forecastData.map((item) => item.strongBuy),
  },
];

export const calculateConsensus = (forecastData) => {
  const totalSell = forecastData.reduce((acc, item) => acc + item.sell, 0);
  const totalHold = forecastData.reduce((acc, item) => acc + item.hold, 0);
  const totalBuy = forecastData.reduce((acc, item) => acc + item.buy, 0);
  const totalStrongBuy = forecastData.reduce(
    (acc, item) => acc + item.strongBuy,
    0
  );

  const totalRecommendations =
    totalSell + totalHold + totalBuy + totalStrongBuy;

  const percentages = {
    Sell: (totalSell / totalRecommendations) * 100,
    Hold: (totalHold / totalRecommendations) * 100,
    Buy: (totalBuy / totalRecommendations) * 100,
    StrongBuy: (totalStrongBuy / totalRecommendations) * 100,
  };

  const maxCategory = Object.keys(percentages).reduce((a, b) =>
    percentages[a] > percentages[b] ? a : b
  );

  return maxCategory;
};

export const getChartOptions = (forecastData) => ({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        total: {
          enabled: false,
        },
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#000000'],
    },
  },
  xaxis: {
    categories: forecastData.map((item) => item.period),
    labels: {
      style: {
        colors: '#ffffff',
        fontSize: '16px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#ffffff',
        fontSize: '16px',
      },
    },
  },
  legend: {
    position: 'top',
    labels: {
      colors: '#ffffff',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
  },
  tooltip: {
    theme: 'dark',
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    x: {
      formatter: (val) => `Period: ${val}`,
    },
    y: {
      formatter: (val) => `${val} recommendations`,
    },
  },
  fill: {
    opacity: 1,
  },
  colors: ['#f44336', '#ffeb3b', '#4caf50', '#2196f3'],
});

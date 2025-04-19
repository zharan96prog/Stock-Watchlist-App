import WatchlistItem from './WatchlistItem';

export default function Watchlist() {
  const watchlist = [
    { name: 'Apple Inc.', symbol: 'AAPL' },
    { name: 'Microsoft Corp.', symbol: 'MSFT' },
    { name: 'Amazon.com Inc.', symbol: 'AMZN' },
  ];

  const onRemove = (symbol) => {
    console.log(`Removing ${symbol} from watchlist`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2>Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        watchlist.map((company) => (
          <WatchlistItem
            key={company.symbol}
            company={company}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
}

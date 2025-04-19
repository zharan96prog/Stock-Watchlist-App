import Button from './Button.jsx';

export default function WatchlistItem({ company, onRemove }) {
  return (
    <div className="watchlist-item">
      <h3>{company.name}</h3>
      <p>{company.symbol}</p>
      <Button onClick={() => onRemove(company.symbol)}>Remove</Button>
    </div>
  );
}

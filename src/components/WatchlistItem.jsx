import Button from './UI/Button.jsx';

export default function WatchlistItem({ company, onRemove }) {
  return (
    <div className="flex w-full flex-row items-center justify-between p-4 border border-border rounded-lg bg-primary-dark/10 mb-4">
      <h3>{company.name}</h3>
      <p>{company.symbol}</p>
      <Button onClick={() => onRemove(company.symbol)}>Remove</Button>
    </div>
  );
}

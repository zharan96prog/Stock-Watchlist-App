export default function WatchlistPage() {
  return (
    <section className="mt-10 flex items-center justify-center">
      <div className="w-1/2 bg-primary-dark/10 p-4 rounded-lg border border-border text-center">
        <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
        <p className="text-sm text-primary-foreground/80">
          You don't have any companies listed yet. Add the first one!
        </p>
        <button className="mt-4 bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded">
          + Add a company
        </button>
      </div>
    </section>
  );
}

export default function WatchlistPage() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Мій Watchlist</h2>
      <div className="bg-primary-dark/10 p-4 rounded-lg border border-border">
        <p className="text-sm text-primary-foreground/80">
          У вас ще немає компаній у списку. Додайте першу!
        </p>
        <button className="mt-4 bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded">
          + Додати компанію
        </button>
      </div>
    </section>
  );
}

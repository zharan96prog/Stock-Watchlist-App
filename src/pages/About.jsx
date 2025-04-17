import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AboutPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to Stock Watchlist App
        </h1>
        <p className="text-lg mb-6">
          Your go-to platform for tracking and evaluating stocks. Whether you're
          a seasoned investor or just starting out, our app provides the tools
          you need to make informed decisions.
        </p>
        <h2 className="text-2xl font-semibold mb-4">What You Can Do</h2>
        <ul className="list-disc list-inside text-left text-lg space-y-3">
          <li>Search for companies by symbol or name</li>
          <li>Add stocks to your personal watchlist</li>
          <li>View detailed company information</li>
          <li>Read the latest company-related news</li>
          <li>Analyze short- and long-term stock price forecasts</li>
          <li>
            Evaluate companies using financial ratios to determine if they are a
            good investment
          </li>
        </ul>
        {!user && (
          <p className="mt-6 text-lg">
            Ready to get started?{' '}
            <Link to="/login" className="text-blue-500 underline">
              Log in to your account
            </Link>{' '}
            or{' '}
            <Link to="/register" className="text-blue-500 underline">
              create an account
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import Button from './UI/Button';

export default function Overview({ companies }) {
  const truncatedDescription = companies.description
    ? companies.description.split(' ').slice(0, 50).join(' ')
    : 'No description available'; // Обрізаємо текст

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Market Cap $
          {companies.marketCap ? companies.marketCap.toLocaleString() : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          52-Week Range {companies.range}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Beta{' '}
          {companies.beta !== undefined && companies.beta !== null
            ? companies.beta.toFixed(2)
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Dividend ${companies.lastDividend || companies.lastDiv || 'N/A'}{' '}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Open{' '}
          {companies.open !== undefined && companies.open !== null
            ? companies.open
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Previous Close{' '}
          {companies.previousClose !== undefined &&
          companies.previousClose !== null
            ? companies.previousClose
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Volume {companies.volume ? companies.volume.toLocaleString() : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          EPS (ttm){' '}
          {companies.eps !== undefined && companies.eps !== null
            ? companies.eps.toFixed(2)
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          PE Ratio{' '}
          {companies.pe !== undefined && companies.pe !== null
            ? companies.pe.toFixed(2)
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Shares Out{' '}
          {companies.sharesOutstanding
            ? companies.sharesOutstanding.toLocaleString()
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Day Low{' '}
          {companies.dayLow !== undefined && companies.dayLow !== null
            ? companies.dayLow.toFixed(2)
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Day High{' '}
          {companies.dayHigh !== undefined && companies.dayHigh !== null
            ? companies.dayHigh.toFixed(2)
            : 'N/A'}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          <p>Earnings Date Announcement</p>
          <p>
            {companies.earningsAnnouncement
              ? new Date(companies.earningsAnnouncement).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )
              : 'N/A'}
          </p>
        </div>
      </div>

      <div className="bg-primary-dark/10 p-4 rounded-lg">
        {companies.image && (
          <img
            src={companies.image}
            alt={`${companies.companyName || 'Company'} logo`}
            className="mx-auto mb-4 h-20"
          />
        )}
        <p className="text-sm text-primary-foreground/80 line-clamp-10">
          {truncatedDescription}
          {companies.description && '...'}
          <Link
            to={`/watchlist/${companies.symbol}/profile`}
            className="text-blue-500 underline ml-2"
          >
            Read more
          </Link>
        </p>
        <div className="col-span-3 grid grid-cols-2 gap-1 mt-2 mb-2 rounded-lg text-left">
          <div>
            <p className="font-semibold text-primary-foreground">Industry</p>
            <p className="text-primary-foreground/80">{companies.industry}</p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground">Sector</p>
            <p className="text-primary-foreground/80">{companies.sector}</p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground">IPO Date</p>
            <p className="text-primary-foreground/80">{companies.ipoDate}</p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground">Employees</p>
            <p className="text-primary-foreground/80">
              {companies.fullTimeEmployees}
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground">
              Stock Exchange
            </p>
            <p className="text-primary-foreground/80">{companies.exchange}</p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground">
              Ticker Symbol
            </p>
            <p className="text-primary-foreground/80">{companies.symbol}</p>
          </div>
          <div>
            <p className="font-semibold text-primary-foreground">Website</p>
            <a
              href={companies.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {companies.website}
            </a>
          </div>
        </div>
        <Link to={`/watchlist/${companies.symbol}/profile`}>
          <Button>Full Company Profile</Button>
        </Link>
      </div>
    </div>
  );
}

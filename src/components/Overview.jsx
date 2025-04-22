import { Link } from 'react-router-dom';
import Button from './UI/Button';

export default function Overview({ companies }) {
  const truncatedDescription = companies.description
    .split(' ')
    .slice(0, 50)
    .join(' '); // Обрізаємо текст

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Market Cap ${companies.mktCap.toLocaleString()}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          52-Week Range {companies.range}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Beta {companies.beta}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">
          Dividend ${companies.lastDiv}{' '}
        </div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">05</div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">06</div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">07</div>
        <div className="bg-primary-dark/10 p-4 rounded-lg">08</div>
      </div>

      <div className="bg-primary-dark/10 p-4 rounded-lg">
        <img
          src={companies.image}
          alt={`${companies.companyName} logo`}
          className="mx-auto mb-4 h-20"
        />
        <p className="text-sm text-primary-foreground/80 line-clamp-10">
          {truncatedDescription}...
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

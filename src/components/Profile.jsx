export default function Profile({ companies }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 text-left rounded-lg">
        <h2 className="text-semibold text-xl">Company Description</h2>
        {companies.description}
      </div>

      <div className="bg-primary-dark/10 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{companies.companyName}</h2>
        <img
          src={companies.image}
          alt={`${companies.companyName} logo`}
          className="mx-auto mb-4 h-20"
        />
        <div className="col-span-3 gap-1 mt-2 mb-2 rounded-lg text-left">
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">Country</p>
            <p className="text-primary-foreground/80">{companies.country}</p>
          </div>
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">Industry</p>
            <p className="text-primary-foreground/80">{companies.industry}</p>
          </div>
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">Sector</p>
            <p className="text-primary-foreground/80">{companies.sector}</p>
          </div>
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">CEO</p>
            <p className="text-primary-foreground/80 line-clamp-10">
              {companies.ceo}
            </p>
          </div>
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">IPO Date</p>
            <p className="text-primary-foreground/80">{companies.ipoDate}</p>
          </div>
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">Employees</p>
            <p className="text-primary-foreground/80">
              {companies.fullTimeEmployees}
            </p>
          </div>
          <div className=" flex justify-between border-b border-border p-2">
            <p className="font-semibold text-primary-foreground">Website</p>
            <a
              href={companies.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {companies.website}
            </a>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-2">Contact Details</h2>
        <div className="text-left border-b border-border p-2">
          <p className="font-semibold text-primary-foreground">Address</p>
          <p className="text-primary-foreground/80">{companies.address}</p>
          <p className="text-primary-foreground/80">
            {companies.city}, {companies.state} {companies.zip}
          </p>
          <p className="text-primary-foreground/80">{companies.country}</p>
        </div>

        <h2 className="text-xl font-semibold mt-2">Stock Details</h2>
        <div className=" flex justify-between border-b border-border p-2">
          <p className="font-semibold text-primary-foreground">Ticker Symbol</p>
          <p className="text-primary-foreground/80">{companies.symbol}</p>
        </div>
        <div className=" flex justify-between border-b border-border p-2">
          <p className="font-semibold text-primary-foreground">Exchange</p>
          <p className="text-primary-foreground/80">
            {companies.exchangeShortName}
          </p>
        </div>
        <div className=" flex justify-between border-b border-border p-2">
          <p className="font-semibold text-primary-foreground">
            Reporting Currency
          </p>
          <p className="text-primary-foreground/80">{companies.currency}</p>
        </div>
        <div className=" flex justify-between border-b border-border p-2">
          <p className="font-semibold text-primary-foreground">CIK Code</p>
          <p className="text-primary-foreground/80">{companies.cik}</p>
        </div>
        <div className=" flex justify-between border-b border-border p-2">
          <p className="font-semibold text-primary-foreground">ISIN Number</p>
          <p className="text-primary-foreground/80">{companies.isin}</p>
        </div>
        <div className=" flex justify-between p-2">
          <p className="font-semibold text-primary-foreground">CUSIP Number</p>
          <p className="text-primary-foreground/80">{companies.cusip}</p>
        </div>
      </div>
    </div>
  );
}

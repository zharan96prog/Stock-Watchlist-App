const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export async function fetchCompanyNameBySymbol(symbol) {
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch company name by symbol: ${response.statusText}`
      );
    }
    const data = await response.json();

    return {
      symbol: data.ticker,
      name: data.name,
    };
  } catch (error) {
    console.error('Error fetching company name by symbol:', error);
    throw error;
  }
}

export async function fetchCompanyBasicFinancials(symbol) {
  const url = `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch company basic financials: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching company basic financials:', error);
    throw error;
  }
}

export async function searchCompanyNews(query, fromDate, toDate) {
  const url = `https://finnhub.io/api/v1/company-news?symbol=${query}&from=${fromDate}&to=${toDate}&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch company news: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching company news:', error);
    throw error;
  }
}

export async function getPeers(query) {
  const url = `https://finnhub.io/api/v1/stock/peers?symbol=${query}&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch peers: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching peers:', error);
    throw error;
  }
}

export async function recommendationTrends(query) {
  const url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${query}&token=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recommendation trends: ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: Expected JSON');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommendation trends:', error);
    throw error;
  }
}

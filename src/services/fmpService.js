const API_KEY = import.meta.env.VITE_FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export async function searchCompanies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${query}&limit=10&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}

export async function getRating(symbol) {
  const url = `${BASE_URL}/rating/${symbol}?apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch rating');
  }
  const data = await response.json();
  return data;
}

export async function fetchCompanyDetails(symbol) {
  const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch company details');
  }
  const data = await response.json();
  return data[0];
}

export async function fetchCompanyQuote(symbol) {
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch company quote');
  }
  const data = await response.json();
  return data[0];
}

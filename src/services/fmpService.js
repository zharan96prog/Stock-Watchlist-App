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

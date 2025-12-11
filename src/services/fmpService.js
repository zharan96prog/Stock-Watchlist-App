import {
  isAvailableOnFreePlan,
  FREE_PLAN_MESSAGE,
} from '../config/fmpFreeSymbols.js';

const API_KEY = import.meta.env.VITE_FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/stable';

/**
 * Перевіряє відповідь API на помилки підписки
 */
function checkSubscriptionError(data) {
  if (typeof data === 'object' && data !== null) {
    const errorMessage =
      data['Error Message'] || data.error || data.message || '';
    if (
      errorMessage.toLowerCase().includes('subscription') ||
      errorMessage.toLowerCase().includes('premium')
    ) {
      throw new Error(FREE_PLAN_MESSAGE.message);
    }
  }
  return data;
}

export async function searchCompanies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search-symbol?query=${query}&limit=10&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }
    const data = await response.json();

    // Фільтруємо тільки доступні символи на FREE плані
    const availableResults = data.filter((company) =>
      isAvailableOnFreePlan(company.symbol)
    );

    // Якщо нічого не знайдено, додаємо підказку
    if (availableResults.length === 0 && data.length > 0) {
      console.warn(
        'Знайдені компанії недоступні на безкоштовному плані:',
        data.map((c) => c.symbol)
      );
    }

    return availableResults;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}

export async function fetchIncomeStatement(symbol) {
  const url = `${BASE_URL}/income-statement?symbol=${symbol}&period=annual&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch income statement');
  }
  const data = await response.json();
  return data;
}

export async function fetchBalanceSheetStatement(symbol) {
  const url = `${BASE_URL}/balance-sheet-statement?symbol=${symbol}&period=annual&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch balance sheet statement');
  }
  const data = await response.json();
  return data;
}

export async function fetchCashFlowStatement(symbol) {
  const url = `${BASE_URL}/cash-flow-statement?symbol=${symbol}&period=annual&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch cash flow statement');
  }
  const data = await response.json();
  return data;
}

export async function fetchKeyMetrics(symbol) {
  const url = `${BASE_URL}/key-metrics?symbol=${symbol}&period=annual&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch key metrics');
  }
  const data = await response.json();
  return data;
}

export async function fetchRatios(symbol) {
  const url = `${BASE_URL}/ratios?symbol=${symbol}&period=annual&apikey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch ratios');
  }
  const data = await response.json();
  return data;
}

export async function fetchRating(symbol) {
  const url = `${BASE_URL}/ratings-snapshot?symbol=${symbol}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch rating');
  }
  const data = await response.json();
  return data;
}

export async function fetchCompanyDetails(symbol) {
  const url = `${BASE_URL}/profile?symbol=${symbol}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch company details');
  }
  const data = await response.json();
  checkSubscriptionError(data);
  return data[0];
}

export async function fetchCompanyQuote(symbol) {
  const url = `${BASE_URL}/quote?symbol=${symbol}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch company quote');
  }
  const data = await response.json();
  checkSubscriptionError(data);
  return data[0];
}

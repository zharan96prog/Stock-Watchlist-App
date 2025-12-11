/**
 * FMP Free Tier Available Symbols
 * На безкоштовному плані FMP доступні тільки найпопулярніші компанії
 *
 * Список складено на основі документації та тестування
 * Оновлено: грудень 2025
 */

export const FMP_FREE_SYMBOLS = [
  // Tech Giants
  'AAPL', // Apple
  'MSFT', // Microsoft
  'GOOGL', // Alphabet (Google)
  'GOOG', // Alphabet Class C
  'AMZN', // Amazon
  'META', // Meta (Facebook)
  'TSLA', // Tesla
  'NVDA', // Nvidia
  'AMD', // AMD
  'INTC', // Intel
  'ORCL', // Oracle
  'CSCO', // Cisco
  'ADBE', // Adobe
  'CRM', // Salesforce
  'NFLX', // Netflix

  // Financial
  'BRK.B', // Berkshire Hathaway
  'JPM', // JPMorgan Chase
  'BAC', // Bank of America
  'WFC', // Wells Fargo
  'C', // Citigroup
  'GS', // Goldman Sachs
  'MS', // Morgan Stanley
  'V', // Visa
  'MA', // Mastercard
  'AXP', // American Express

  // Healthcare
  'JNJ', // Johnson & Johnson
  'UNH', // UnitedHealth
  'PFE', // Pfizer
  'ABBV', // AbbVie
  'TMO', // Thermo Fisher
  'MRK', // Merck
  'LLY', // Eli Lilly

  // Consumer
  'WMT', // Walmart
  'HD', // Home Depot
  'PG', // Procter & Gamble
  'KO', // Coca-Cola
  'PEP', // PepsiCo
  'COST', // Costco
  'MCD', // McDonald's
  'NKE', // Nike
  'DIS', // Disney
  'SBUX', // Starbucks

  // Industrial
  'BA', // Boeing
  'HON', // Honeywell
  'UPS', // UPS
  'MMM', // 3M

  // Energy
  'XOM', // Exxon Mobil
  'CVX', // Chevron

  // Telecom
  'T', // AT&T
  'VZ', // Verizon

  // Other Popular
  'UBER', // Uber
  'ABNB', // Airbnb
  'PYPL', // PayPal
  'SQ', // Block (Square)
  'COIN', // Coinbase
  'SNAP', // Snap
  'SHOP', // Shopify
  'SPOT', // Spotify
  'ZM', // Zoom
  'DOCU', // DocuSign

  // Додайте сюди інші символи після тестування
];

/**
 * Перевіряє чи доступний символ на FREE плані
 * @param {string} symbol - Тікер компанії
 * @returns {boolean}
 */
export function isAvailableOnFreePlan(symbol) {
  if (!symbol) return false;
  return FMP_FREE_SYMBOLS.includes(symbol.toUpperCase());
}

/**
 * Отримує список популярних символів для автокомпліту
 * @returns {Array<{symbol: string, name: string}>}
 */
export function getPopularSymbols() {
  return [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'V', name: 'Visa Inc.' },
    { symbol: 'WMT', name: 'Walmart Inc.' },
  ];
}

/**
 * Повідомлення про обмеження FREE плану
 */
export const FREE_PLAN_MESSAGE = {
  title: '⚠️ Обмеження безкоштовного плану',
  message:
    'Ця компанія недоступна на безкоштовному плані FMP. Доступні тільки найпопулярніші компанії.',
  action: 'Спробуйте пошукати: AAPL, MSFT, GOOGL, AMZN, TSLA',
};

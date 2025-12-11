# 🔧 FMP API Migration Guide

## Проблема

Після 31 серпня 2025 FMP API змінив структуру і старі `/api/v3` endpoints більше не працюють.

## Що було виправлено

### 1. ✅ Оновлено Base URL

```javascript
// ❌ Старий
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

// ✅ Новий
const BASE_URL = 'https://financialmodelingprep.com/stable';
```

### 2. ✅ Оновлено всі endpoints

```javascript
// ❌ Старий формат
/api/v3/profile/AAPL
/api/v3/quote/AAPL
/api/v3/income-statement/AAPL

// ✅ Новий формат
/stable/profile?symbol=AAPL
/stable/quote?symbol=AAPL
/stable/income-statement?symbol=AAPL
```

### 3. ✅ Додано whitelist символів

FREE план підтримує тільки ~80 найпопулярніших компаній:

- Tech: AAPL, MSFT, GOOGL, AMZN, TSLA, META, NVDA
- Finance: JPM, BAC, V, MA, BRK.B
- Consumer: WMT, HD, KO, PEP, COST
- [Повний список в `src/config/fmpFreeSymbols.js`]

### 4. ✅ Додано error handling

- Автоматична перевірка subscription errors
- Фільтрація результатів пошуку
- User-friendly повідомлення

### 5. ✅ Додано UI компонент

`<FreePlanNotice />` - інформує користувачів про обмеження

## Обмеження FREE плану

| Параметр   | Значення       |
| ---------- | -------------- |
| API calls  | 250/day        |
| Символів   | ~80 популярних |
| Real-time  | ❌ End-of-day  |
| Historical | ✅ 5 років     |
| Coverage   | 🌍 Global      |

## Як користуватись

### Перевірка доступності символу

```javascript
import { isAvailableOnFreePlan } from './config/fmpFreeSymbols';

if (isAvailableOnFreePlan('AAPL')) {
  // Можна робити запит
}
```

### Пошук

```javascript
// Автоматично фільтрує недоступні символи
const results = await searchCompanies('Apple');
```

### Error handling

```javascript
try {
  const data = await fetchCompanyDetails('XYZ');
} catch (error) {
  // "Ця компанія недоступна на безкоштовному плані"
  console.error(error.message);
}
```

## Альтернативи

Якщо потрібно більше символів:

1. **Оновити до Starter ($19/міс)**

   - 300 calls/minute
   - US stocks (всі)
   - Real-time data

2. **Використати Finnhub (вже підключений)**

   - 60 calls/minute
   - Всі символи
   - Basic financials

3. **Комбінувати API**
   - FMP для популярних (FREE)
   - Finnhub для решти (FREE)
   - Alpha Vantage для фінансів (25/day)

## Тестування

```bash
# Перевірка AAPL (працює)
curl "https://financialmodelingprep.com/stable/quote?symbol=AAPL&apikey=YOUR_KEY"

# Перевірка CAT (не працює на FREE)
curl "https://financialmodelingprep.com/stable/quote?symbol=CAT&apikey=YOUR_KEY"
# => "Premium Query Parameter: not available under your current subscription"
```

## Що далі?

- ✅ Основні endpoints працюють
- ✅ Є whitelist доступних символів
- ✅ Користувачі бачать зрозумілі помилки
- 🔄 Можна додати більше символів після тестування
- 🔄 Розглянути міграцію на Finnhub для search

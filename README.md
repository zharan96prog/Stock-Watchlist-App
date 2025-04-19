# 📈 Stock Watchlist App

A web application for tracking and evaluating stocks of interest, built with React, Redux, and Tailwind CSS.

## 🧾 Description

This app allows users to:

- 🔎 Search for companies by symbol or name
- ⭐ Add stocks to a personal watchlist
- 📄 View detailed company information
- 📰 Read the latest company-related news
- 📊 View short- and long-term stock price forecasts
- 💡 Evaluate companies based on financial ratios (e.g., is it a good buy? Is it overvalued?)

## 🔧 Technologies Used

- **React**
- **Redux Toolkit**
- **React Router v6**
- **Tailwind CSS**
- **Finnhub API** — company profile, stock quote, news
- **Financial Modeling Prep (FMP) API** — forecasts, financials, valuation
- **Firebase / Local Auth** — user authentication

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/zharan96prog/Stock-Watchlist-App.git
cd stock-watchlist-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your API keys:

# Finnhub API Key

REACT_APP_FINNHUB_API_KEY=your_finnhub_key

# Financial Modeling Prep (FMP) API Key

REACT_APP_FMP_API_KEY=your_fmp_key

# Firebase Config (если используешь Firebase для аутентификации)

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

### 4. Run the app

```bash
npm start
```

## 🛠 Features

- User authentication
- Search for companies
- View company details
- Add/remove companies from watchlist
- Company evaluation (valuation, P/E ratio, etc.)
- Stock price forecasts (1m, 3m, 6m, 1y)
- Latest news integration

## 📅 Roadmap

- 🔜 Add SSR/SSG with **Next.js**
- 🔜 Store user watchlist in **MongoDB**
- 🔜 Compare multiple companies side-by-side
- 🔜 Add rating and recommendation system

# 📈 Stock Watchlist App – Development Plan

## 🔗 APIs Used

- [Finnhub](https://finnhub.io/) — company profile, stock price, news
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/developer/docs/) — search, forecasts, financials, valuation

---

## Phase 1: React SPA

### ✅ Done

#### 1. Initial Setup

- Initialize React project with **Vite**
- Set up **Tailwind CSS**
- Add **React Router v6**
- Configure **Redux Toolkit** with `Provider`

#### 2. Authentication

- Implement authentication using **Firebase**
- Components: `Login`, `Register`
- Create `loader` for protected pages

---

### 🚧 In Progress / To Do

#### 3. Watchlist

- Create Redux slice: `watchlist`
- Watchlist component with “Add to Watchlist” button
- Persist list in `localStorage` or using **Firebase**

#### 4. Company Search

- Create search form (use **FMP Search Endpoint**)
- Display search results

#### 5. Company Detail Page

- Fetch and display:
  - ✅ Company profile info
  - ✅ Stock prices
  - ✅ Latest news (FMP News)
  - ✅ Short- and long-term price forecasts
  - ✅ Valuation based on financial metrics

#### 6. UI

- Style components using **Tailwind CSS**
- Add form validation
- Implement skeleton loaders and error handling

---

## 🚀 Phase 2: Next.js / Node.js

#### 1. Migration to Next.js

- Convert components to `pages/` structure
- Use **SSR** or **SSG** for company pages
- Store wishlist in **MongoDB** or **PostgreSQL**

#### 2. API Proxy

- Create internal API routes: `/api/company/:ticker`
- Fetch data server-side (no direct client requests)

#### 3. Advanced Authentication

- Use **NextAuth** or improved **Firebase Auth**
- Associate wishlist with authenticated users

#### 4. Additional Features

- Email notifications (optional)
- Filtering: by industry, rating, price forecast

---

## 💡 Recommendations

- 🔐 Use free APIs during development (**FMP** is great)
- 💾 Store `wishlist` in **Redux + localStorage**
- 🔄 Build a custom `useFetch` hook for reuse
- 🧠 Centralize API logic in `services/fmpService.js`
- 💬 Add user feedback via toasts, error states, loaders
- 🎯 Implement pagination and lazy loading

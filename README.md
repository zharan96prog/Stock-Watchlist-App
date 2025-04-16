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

```env
REACT_APP_FINNHUB_API_KEY=your_finnhub_key
REACT_APP_FMP_API_KEY=your_fmp_key
```

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

## 👨‍💻 Author

Created as a learning project using concepts from [React - The Complete Guide (incl. Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).

import { useEffect, useState } from 'react';
import { openDB } from 'idb';

import {
  fetchRatios,
  fetchKeyMetrics,
  fetchCashFlowStatement,
  fetchBalanceSheetStatement,
  fetchIncomeStatement,
} from '../services/fmpService.js';

const dbPromise = openDB('financials-db', 1, {
  upgrade(db) {
    db.createObjectStore('financials', { keyPath: 'symbol' });
  },
});

// This logic is implemented to reduce the response time from the API,
// as the data changes very rarely.
// Additionally, it helps to stay within the API request limit
// by caching the data locally.
// The data is stored in IndexedDB and localStorage.

export function useFinancialData(companySymbol) {
  const [ratios, setRatios] = useState(null);
  const [keyMetrics, setKeyMetrics] = useState(null);
  const [cashFlow, setCashFlow] = useState(null);
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [incomeStatement, setIncomeStatement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const db = await dbPromise;
        const storedData = JSON.parse(localStorage.getItem('companies')) || {};
        const lastFetchedDate = storedData[companySymbol]?.lastFetchedDate;
        const today = new Date().toISOString().split('T')[0];

        if (lastFetchedDate === today) {
          const companyData = await db.get('financials', companySymbol);
          if (companyData) {
            setRatios(companyData.ratios);
            setKeyMetrics(companyData.keyMetrics);
            setCashFlow(companyData.cashFlow);
            setBalanceSheet(companyData.balanceSheet);
            setIncomeStatement(companyData.incomeStatement);
            setIsLoading(false);
            return;
          }
        }

        const [
          data,
          metrics,
          cashFlowData,
          balanceSheetData,
          incomeStatementData,
        ] = await Promise.all([
          fetchRatios(companySymbol),
          fetchKeyMetrics(companySymbol),
          fetchCashFlowStatement(companySymbol),
          fetchBalanceSheetStatement(companySymbol),
          fetchIncomeStatement(companySymbol),
        ]);

        await db.put('financials', {
          symbol: companySymbol,
          ratios: data,
          keyMetrics: metrics,
          cashFlow: cashFlowData,
          balanceSheet: balanceSheetData,
          incomeStatement: incomeStatementData,
        });

        localStorage.setItem(
          'companies',
          JSON.stringify({
            ...storedData,
            [companySymbol]: { lastFetchedDate: today },
          })
        );

        setRatios(data);
        setKeyMetrics(metrics);
        setCashFlow(cashFlowData);
        setBalanceSheet(balanceSheetData);
        setIncomeStatement(incomeStatementData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [companySymbol]);

  return {
    ratios,
    keyMetrics,
    cashFlow,
    balanceSheet,
    incomeStatement,
    isLoading,
  };
}

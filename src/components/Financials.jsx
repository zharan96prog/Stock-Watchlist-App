import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from './UI/Spinner.jsx';

import {
  fetchRatios,
  fetchKeyMetrics,
  fetchCashFlowStatement,
  fetchBalanceSheetStatement,
  fetchIncomeStatement,
} from '../services/fmpService.js';

import Income from './Financials/Income.jsx';
import BalanceSheet from './Financials/BalanceSheet.jsx';
import CashFlow from './Financials/CashFlow.jsx';
import Ratios from './Financials/Ratios.jsx';

export default function Financials() {
  const { companySymbol } = useParams();
  const [ratios, setRatios] = useState(null);
  const [keyMetrics, setKeyMetrics] = useState(null);
  const [cashFlow, setCashFlow] = useState(null);
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [incomeStatement, setIncomeStatement] = useState(null);
  const [subTab, setSubTab] = useState('income');

  const validSubTabs = ['income', 'balance-sheet', 'cash-flow', 'ratios'];

  useEffect(() => {
    // This logic is implemented to reduce the response time from the API,
    // as the data changes very rarely.
    // Additionally, it helps to stay within the API request limit
    // by caching the data locally.
    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('companies')) || {};
        const companyData = storedData[companySymbol]?.financials || {};
        const lastFetchedDate = companyData?.lastFetchedDate;
        const today = new Date().toISOString().split('T')[0];

        if (companyData && lastFetchedDate === today) {
          setRatios(companyData.ratios);
          setKeyMetrics(companyData.keyMetrics);
          setCashFlow(companyData.cashFlow);
          setBalanceSheet(companyData.balanceSheet);
          setIncomeStatement(companyData.incomeStatement);
        } else {
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

          const updatedData = {
            ...storedData,
            [companySymbol]: {
              ...storedData[companySymbol],
              financials: {
                lastFetchedDate: today,
                ratios: data,
                keyMetrics: metrics,
                cashFlow: cashFlowData,
                balanceSheet: balanceSheetData,
                incomeStatement: incomeStatementData,
              },
            },
          };
          localStorage.setItem('companies', JSON.stringify(updatedData));

          setRatios(data);
          setKeyMetrics(metrics);
          setCashFlow(cashFlowData);
          setBalanceSheet(balanceSheetData);
          setIncomeStatement(incomeStatementData);
        }
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
  }, [companySymbol]);

  const handleSubTabChange = (newSubTab) => {
    setSubTab(newSubTab);
  };

  if (
    !ratios ||
    !keyMetrics ||
    !cashFlow ||
    !balanceSheet ||
    !incomeStatement
  ) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <div className="border-b border-border mb-4 w-max">
          <nav className="flex justify-start text-base text-primary-foreground">
            {validSubTabs.map((subTabName) => (
              <span
                key={subTabName}
                className={`cursor-pointer px-2 ${
                  subTab === subTabName
                    ? 'text-primary font-semibold'
                    : 'hover:text-primary'
                }`}
                onClick={() => handleSubTabChange(subTabName)}
              >
                {subTabName.charAt(0).toUpperCase() + subTabName.slice(1)}
              </span>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <div className="overflow-x-auto w-full">
          {subTab === 'income' && incomeStatement && (
            <Income incomeStatement={incomeStatement} />
          )}
          {subTab === 'balance-sheet' && balanceSheet && (
            <BalanceSheet balanceSheet={balanceSheet} />
          )}
          {subTab === 'cash-flow' && cashFlow && (
            <CashFlow cashFlow={cashFlow} />
          )}
          {subTab === 'ratios' && ratios && (
            <Ratios ratios={ratios} keyMetrics={keyMetrics} />
          )}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    const fetchData = async () => {
      try {
        const data = await fetchRatios(companySymbol);
        const metrics = await fetchKeyMetrics(companySymbol);
        const cashFlowData = await fetchCashFlowStatement(companySymbol);
        const balanceSheetData = await fetchBalanceSheetStatement(
          companySymbol
        );
        const incomeStatementData = await fetchIncomeStatement(companySymbol);
        setIncomeStatement(incomeStatementData);
        setRatios(data);
        setKeyMetrics(metrics);
        setCashFlow(cashFlowData);
        setBalanceSheet(balanceSheetData);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="mt-4 text-lg text-gray-500">Loading financial data...</p>
      </div>
    );
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

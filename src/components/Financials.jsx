import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFinancialData } from '../hooks/useFinancialData';
import Spinner from './UI/Spinner.jsx';
import Income from './Financials/Income.jsx';
import BalanceSheet from './Financials/BalanceSheet.jsx';
import CashFlow from './Financials/CashFlow.jsx';
import Ratios from './Financials/Ratios.jsx';

export default function Financials() {
  const { companySymbol } = useParams();
  const {
    ratios,
    keyMetrics,
    cashFlow,
    balanceSheet,
    incomeStatement,
    isLoading,
  } = useFinancialData(companySymbol);

  const [subTab, setSubTab] = useState('income');
  const validSubTabs = ['income', 'balance-sheet', 'cash-flow', 'ratios'];

  const handleSubTabChange = (newSubTab) => {
    setSubTab(newSubTab);
  };

  if (isLoading) {
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

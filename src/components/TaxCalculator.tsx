import React, { useState, useEffect } from 'react';
import { SSNIT_RATE, monthlyTaxRates } from '../lib/rates';
import { calculateIncomeTax } from '../lib/core';
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";


const TaxCalculator: React.FC = () => {
  const [basicIncome, setBasicIncome] = useState<number>(0);
  const [allowances, setAllowances] = useState<number>(0);
  const [taxRelief, setTaxRelief] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);
  const [ssnit, setSsnit] = useState<number>(0);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  useEffect(() => {
    // Calculate SSNIT (5.5% of basic income)
    const ssnitAmount = basicIncome * (SSNIT_RATE / 100);
    setSsnit(ssnitAmount);

    // Taxable income
    const taxableIncome = basicIncome + allowances - ssnitAmount - taxRelief;
    
    // Calculate income tax based on Ghana tax brackets
    const calculatedTax = taxableIncome > 0 ? calculateIncomeTax(taxableIncome) : 0;
    setIncomeTax(calculatedTax);
    
    // Calculate net income
    setNetIncome(basicIncome + allowances - ssnitAmount - calculatedTax);
  }, [basicIncome, allowances, taxRelief]);

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  // Generate tax breakdown details for display
  

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <div className="bg-orange-500 text-white p-3 w-full text-center mb-4">
        Updated with {" "}
        <a
            href="https://gra.gov.gh/domestic-tax/tax-types/paye/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline">
            Jan. 2024
        </a>{" "} tax rates !
      </div>
      
      <div className="border border-gray-200 rounded p-6 w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Tax Calculator GH</h1>
        
        <p className="text-center mb-6">
          Compute your <span className="font-bold">net income</span>, PAYE <span className="font-bold">income tax</span> and <span className="font-bold">SSNIT deductions</span>.
        </p>
        
        <div className="mb-4">
          <label className="block text-green-700 mb-2">Monthly basic income</label>
          <div className="flex items-center border rounded">
            <span className="pl-2 text-gray-500">GH₵</span>
            <input
              type="number"
              className="w-full p-2 outline-none"
              value={basicIncome || ''}
              onChange={(e) => setBasicIncome(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-green-700 mb-2">Monthly allowances*</label>
          <div className="flex items-center border rounded">
            <span className="pl-2 text-gray-500">GH₵</span>
            <input
              type="number"
              className="w-full p-2 outline-none"
              value={allowances || ''}
              onChange={(e) => setAllowances(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-green-700 mb-2">Tax relief</label>
          <div className="flex items-center border rounded border-blue-500">
            <span className="pl-2 text-gray-500">GH₵</span>
            <input
              type="number"
              className="w-full p-2 outline-none"
              value={taxRelief || ''}
              onChange={(e) => setTaxRelief(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-blue-600 mb-2">Net Income (take home)</p>
          <p className="text-4xl text-blue-600 font-bold">GH₵ {formatCurrency(netIncome)}</p>
        </div>
        
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <p className="text-blue-600 mb-1">Income Tax</p>
            <p className="font-bold text-blue-600">GH₵ {formatCurrency(incomeTax)}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-600 mb-1">SSNIT</p>
            <p className="font-bold text-blue-600">GH₵ {formatCurrency(ssnit)}</p>
          </div>
        </div>
        
      
      </div>
    </div>
  );
};

export default TaxCalculator;
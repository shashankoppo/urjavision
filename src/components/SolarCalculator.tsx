import { useState } from 'react';
import { Calculator, Zap, TrendingUp, Clock } from 'lucide-react';
import { calculateSolarSystem } from '../utils/helpers';

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const bill = parseFloat(monthlyBill);
    if (bill && bill > 0) {
      const calculation = calculateSolarSystem(bill);
      setResult(calculation);
    }
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Calculator className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#1F1F1F]">Solar Savings Calculator</h3>
          <p className="text-sm text-gray-600">Estimate your solar system and savings</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
          Your Monthly Electricity Bill (₹)
        </label>
        <input
          type="number"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          placeholder="Enter your monthly bill amount"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={!monthlyBill || parseFloat(monthlyBill) <= 0}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Calculate Savings
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1E8449]/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={20} className="text-[#1E8449]" />
                <span className="text-sm font-semibold text-gray-700">System Size</span>
              </div>
              <div className="text-2xl font-bold text-[#1F1F1F]">{result.systemSize}</div>
            </div>

            <div className="bg-[#FFC300]/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-[#FFC300]" />
                <span className="text-sm font-semibold text-gray-700">Daily Generation</span>
              </div>
              <div className="text-2xl font-bold text-[#1F1F1F]">{result.dailyGeneration}</div>
            </div>

            <div className="bg-[#1E8449]/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-[#1E8449]" />
                <span className="text-sm font-semibold text-gray-700">Yearly Savings</span>
              </div>
              <div className="text-2xl font-bold text-[#1E8449]">{result.yearlySavings}</div>
            </div>

            <div className="bg-[#FFC300]/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={20} className="text-[#FFC300]" />
                <span className="text-sm font-semibold text-gray-700">ROI Period</span>
              </div>
              <div className="text-2xl font-bold text-[#1F1F1F]">{result.roi}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Estimated Investment:</strong> {result.estimatedCost}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              * These are approximate estimates. Actual results may vary based on location, sunlight, and system efficiency.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarCalculator;

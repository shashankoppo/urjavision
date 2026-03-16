import { useState } from 'react';
import { Calculator, Zap, TrendingUp, Clock, Shield, CheckCircle } from 'lucide-react';
import { calculateSolarSystem } from '../utils/helpers';

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [category, setCategory] = useState<'Residential' | 'Commercial' | 'Enterprise'>('Residential');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const bill = parseFloat(monthlyBill);
    if (bill && bill > 0) {
      const calculation = calculateSolarSystem(bill, category);
      setResult(calculation);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
          <Calculator className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-900">Solar Savings Calculator</h3>
          <p className="text-xs text-gray-500">Madhya Pradesh tariffs · Accurate ROI</p>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          {(['Residential', 'Commercial', 'Enterprise'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setResult(null); }}
              className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                category === cat
                  ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Monthly Electricity Bill (₹)
        </label>
        <input
          type="number"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          placeholder={category === 'Residential' ? 'e.g. 3000' : 'e.g. 15000'}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg font-bold bg-gray-50 focus:bg-white transition-all"
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={!monthlyBill || parseFloat(monthlyBill) <= 0}
        className="w-full btn-primary py-3 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Zap size={16} /> Calculate Savings
      </button>

      {result && (
        <div className="mt-6 space-y-4 animate-fade-up">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={14} className="text-emerald-600" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">System Size</span>
              </div>
              <div className="text-2xl font-black text-emerald-700">{result.systemSize}</div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp size={14} className="text-amber-600" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Daily Output</span>
              </div>
              <div className="text-2xl font-black text-amber-700">{result.dailyGeneration}</div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp size={14} className="text-emerald-600" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Yearly Savings</span>
              </div>
              <div className="text-2xl font-black text-emerald-700">{result.yearlySavings}</div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={14} className="text-amber-600" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">ROI Period</span>
              </div>
              <div className="text-2xl font-black text-amber-700">{result.roi}</div>
            </div>
          </div>

          {/* Investment */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-500">Gross Investment:</span>
              <span className="text-sm font-bold text-gray-500 line-through">{result.grossCost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1"><CheckCircle size={12} /> After Subsidy:</span>
              <span className="text-lg font-black text-emerald-700">{result.estimatedCost}</span>
            </div>
            {result.subsidyAmount !== '₹0' && (
              <div className="flex items-center gap-1.5 mt-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                <Shield size={12} className="text-amber-500" />
                <span className="text-[10px] font-bold text-amber-700">Govt. Subsidy: {result.subsidyAmount} saved</span>
              </div>
            )}
          </div>

          <p className="text-[10px] text-gray-400 leading-relaxed">
            * Estimates based on MP DISCOM tariffs. Actual savings depend on location, shading & consumption. Contact us for a precise survey.
          </p>
        </div>
      )}
    </div>
  );
};

export default SolarCalculator;

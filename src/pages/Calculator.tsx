import { useState } from 'react';
import { Calculator as CalcIcon, Sun, IndianRupee, Zap, Leaf, TrendingUp, ArrowRight, Phone, CheckCircle, Shield } from 'lucide-react';
import { calculateSolarSystem } from '../utils/helpers';

const Calculator = () => {
  const [bill, setBill] = useState('');
  const [category, setCategory] = useState<'Residential' | 'Commercial' | 'Enterprise'>('Residential');
  const [result, setResult] = useState<any>(null);
  const [animate, setAnimate] = useState(false);

  const calculate = () => {
    const b = parseFloat(bill);
    if (!b || b <= 0) return;
    setAnimate(false);
    setTimeout(() => {
      setResult(calculateSolarSystem(b, category));
      setAnimate(true);
    }, 50);
  };

  const categoryInfo = {
    Residential: { rate: '₹7/unit', desc: 'Home rooftop systems (1-10 kW)', subsidy: 'Up to 40% Govt Subsidy', emoji: '🏠' },
    Commercial: { rate: '₹9/unit', desc: 'Shops, hotels, offices (5-50 kW)', subsidy: 'No subsidy, faster ROI', emoji: '🏢' },
    Enterprise: { rate: '₹11/unit', desc: 'Factories, mills, plants (50-500 kW)', subsidy: 'Bulk pricing discount', emoji: '🏭' },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-[#0A0F1E] noise-overlay">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/80 via-[#0A0F1E]/40 to-[#0A0F1E] z-10" />
          <img
            src="https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Solar Architecture"
            className="w-full h-full object-cover scale-110 opacity-40"
          />
        </div>
        
        <div className="container relative z-20 pt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-8 animate-fade-up">
            <CalcIcon size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Financial Precision Engine</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6 animate-fade-up delay-100">
            Solar <span className="mega-gradient-text">Architectural ROI</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Professional-grade financial modeling based on MPPKVVCL tariffs. Quantifying your transition to energy sovereignty.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding bg-gray-50 -mt-8 relative z-10">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-5 gap-6">

            {/* Input Card — 2 columns */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-7 h-fit">
              <h3 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                <CalcIcon size={20} className="text-emerald-600" /> Enter Details
              </h3>

              {/* Category */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Consumer Category</label>
                <div className="space-y-2">
                  {(['Residential', 'Commercial', 'Enterprise'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setResult(null); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border-2 ${
                        category === cat
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <span className="text-xl">{categoryInfo[cat].emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-bold ${category === cat ? 'text-emerald-700' : 'text-gray-800'}`}>{cat}</div>
                        <div className="text-[10px] text-gray-400 truncate">{categoryInfo[cat].desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-xs font-black ${category === cat ? 'text-emerald-600' : 'text-gray-500'}`}>{categoryInfo[cat].rate}</div>
                        <div className="text-[9px] text-gray-400 whitespace-nowrap">{categoryInfo[cat].subsidy}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Input */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Monthly Electricity Bill</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={bill}
                    onChange={e => setBill(e.target.value)}
                    placeholder={category === 'Residential' ? '2000 – 10000' : category === 'Commercial' ? '10000 – 50000' : '50000+'}
                    className="w-full pl-10 pr-4 py-3.5 text-lg font-bold border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5">Enter your average monthly bill from MPPKVVCL</p>
              </div>

              <button
                onClick={calculate}
                disabled={!bill || parseFloat(bill) <= 0}
                className="w-full btn-primary py-3.5 text-base shadow-lg shadow-emerald-200 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <Zap size={18} /> Calculate My Savings
              </button>
            </div>

            {/* Results Card — 3 columns */}
            {/* Results Card — 3 columns */}
            <div className="md:col-span-3 bg-gradient-to-br from-[#0A0F1E] via-[#0A1A2E] to-[#0A0F1E] rounded-[40px] shadow-2xl p-8 md:p-10 text-white relative overflow-hidden border border-white/5 min-h-[500px]">
              {/* Dynamic Glow */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <TrendingUp size={20} />
                    </div>
                    Architectural Analysis
                  </h3>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-500 tracking-widest uppercase">
                    MP Tariff: {category}
                  </div>
                </div>

                {!result ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
                      <Sun size={40} className="text-emerald-500/40" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-2">Awaiting Input Parameters</div>
                      <p className="text-gray-500 text-sm max-w-[240px] leading-relaxed">Quantify your potential for energy independence in real-time.</p>
                    </div>
                  </div>
                ) : (
                  <div className={`space-y-8 flex-1 ${animate ? 'animate-fade-up' : 'opacity-0'}`}>
                    {/* Hero Output */}
                    <div className="p-8 rounded-[32px] glass-morphism border border-white/10 text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Recommended Infrastructure</div>
                      <div className="text-7xl font-black tracking-tighter mb-2 mega-gradient-text">{result.systemSize}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">Intelligence Layer Capacity</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Net Investment</div>
                        <div className="text-2xl font-black text-white">{result.estimatedCost}</div>
                        <div className="text-[10px] text-gray-600 line-through mt-1">Gross: {result.grossCost}</div>
                      </div>
                      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-2">Yearly Revenue</div>
                        <div className="text-2xl font-black text-emerald-400">{result.yearlySavings}</div>
                        <div className="text-[10px] text-emerald-500/60 mt-1">ROI: {result.roi}</div>
                      </div>
                    </div>

                    {/* Wealth Transfer Projection */}
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">25-Year Wealth Transfer</div>
                        <div className="text-emerald-400 text-xs font-bold">~₹{ (parseInt(result.yearlySavings.replace(/[^0-9]/g, '')) * 25 / 100000).toFixed(1) } Lakhs</div>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 w-[75%] animate-shimmer" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-2"><Leaf size={14} className="text-emerald-500" /> CO₂ Avoidance Ready</div>
                      <div className="flex items-center gap-2">Intelligence Certified <Shield size={14} className="text-amber-500" /></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA below */}
          {result && (
            <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-5 animate-fade-up">
              <div>
                <h3 className="font-black text-gray-900 mb-1">Ready to make it happen?</h3>
                <p className="text-sm text-gray-500">Book a free site survey — our engineer will finalize the exact design for your property.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href="tel:+917247391595" className="btn-primary text-sm px-6 py-3 flex items-center gap-2">
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={`https://wa.me/917247391595?text=${encodeURIComponent(`Hi! I used the solar calculator. My ${category} bill is ₹${bill}/month. System recommended: ${result.systemSize}. Please share a detailed quote.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
                >
                  WhatsApp <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          {/* How it works */}
          <div className="mt-12">
            <h3 className="text-center font-black text-gray-900 text-xl mb-8">How Our Calculation Works</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '01', icon: IndianRupee, title: 'Bill → Units', desc: 'We convert your bill to monthly units using MPPKVVCL tariff rates for your category.' },
                { step: '02', icon: Sun, title: 'Units → System Size', desc: '1 kW generates ~120 units/month in MP. We calculate the optimal system size for 90% offset.' },
                { step: '03', icon: TrendingUp, title: 'Cost → ROI', desc: 'After applying govt subsidies and bulk discounts, we compute your payback period and lifetime savings.' },
              ].map(item => (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all text-center group">
                  <div className="text-3xl font-black text-emerald-100 mb-2">{item.step}</div>
                  <div className="w-12 h-12 mx-auto bg-emerald-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                    <item.icon size={22} className="text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-black text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> These are approximate estimates based on average MPPKVVCL tariffs and standard solar panel performance in Madhya Pradesh (4-5 peak sun hours/day). Actual savings depend on roof orientation, shading, panel quality, and consumption patterns. Subsidy availability is subject to government policy. Contact us for a precise engineering survey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;

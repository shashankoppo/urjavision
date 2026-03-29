import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  Landmark,
  Quote,
  MapPin,
  Clock
} from 'lucide-react';
import gsap from 'gsap';
import { COMPANY_INFO, SOLAR_PACKAGES, TESTIMONIALS } from '../utils/constants';
import { solarProjects } from '../utils/data';
import { calculateSolarSystem } from '../utils/helpers';

interface HomeProps {
  onNavigate?: (path: string) => void;
}

const Home = ({ onNavigate }: HomeProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      })
      .from(subtextRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-cta-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.6');
    }, heroRef);

    const timer = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-white selection:bg-blue-600 selection:text-white w-full overflow-x-hidden">
      {/* ─── HERO SECTION ─── */}
      <section 
        ref={heroRef} 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20 pb-20"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-[#FF9933]/5 to-transparent rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-[#128807]/5 to-transparent rounded-full blur-[150px]" />
        </div>
        
        <div className="container relative z-10 flex flex-col items-center text-center px-4">
          <div className="inline-flex items-center gap-4 mb-8 px-6 py-2.5 rounded-full border border-slate-100 bg-white shadow-sm text-slate-800">
            <div className="flex -space-x-1">
               <div className="w-2 h-2 rounded-full bg-[#FF9933]"></div>
               <div className="w-2 h-2 rounded-full bg-white border border-slate-100"></div>
               <div className="w-2 h-2 rounded-full bg-[#128807]"></div>
            </div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-900/80">PM Surya Ghar Official Partner · Central India Division</span>
          </div>

          <h1 ref={headlineRef} className="text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[8rem] font-black tracking-[-0.04em] leading-[0.95] mb-10 max-w-7xl mx-auto text-[#0B1221]">
            Bharat's Vision for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Solar Sovereignty.</span>
          </h1>

          <p ref={subtextRef} className="text-slate-500 text-lg md:text-xl lg:text-2xl font-medium max-w-4xl mx-auto mb-12 leading-relaxed">
            Jabalpur's premier solar boutique. We empower Indian homes through <span className="text-[#0B1221] font-black italic">Grid Independence.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto">
            <button 
              onClick={() => onNavigate?.('/calculator')}
              className="hero-cta-btn btn-primary w-full sm:w-auto px-10 py-5 text-lg"
            >
              Calculate Savings <ArrowRight size={20} className="ml-2" />
            </button>
            <button 
              onClick={() => onNavigate?.('/contact')}
              className="hero-cta-btn w-full sm:w-auto px-10 py-5 rounded-full text-slate-800 font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
            >
              Free Site Survey
            </button>
          </div>
        </div>
      </section>

      {/* ─── METRICS BAR ─── */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Energy Deployed', value: '45.2', unit: 'MW' },
              { label: 'Active Sites', value: '850', unit: '+' },
              { label: 'Carbon Neutralised', value: '12', unit: 'Kt' },
              { label: 'Grid Uptime', value: '99.9', unit: '%' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl lg:text-5xl font-black text-[#0B1221] mb-2">{s.value}<span className="text-blue-600 text-xl ml-1">{s.unit}</span></div>
                <div className="text-slate-400 text-[10px] font-black tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION ─── */}
      <section className="py-24 bg-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#0B1221] mb-20 tracking-tight">
            The smartest financial move <span className="text-blue-600">for modern India.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { Icon: Landmark, title: '40% Subsidy', desc: 'Official PM Surya Ghar integration for immediate capital injection.' },
              { Icon: TrendingUp, title: 'Fixed Costs', desc: 'Shield your wealth from rising electricity tariffs indefinitely.' },
              { Icon: Shield, title: '25Y Security', desc: 'Tier-1 hardware backed by sovereign-grade lifecycle engineering.' }
            ].map((f, i) => (
              <div key={i} className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-100 transition-all text-left">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-8"><f.Icon size={28} /></div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-16 px-4">
             <h2 className="text-3xl md:text-5xl font-black text-[#0B1221] tracking-tight">Engineering <br/><span className="text-blue-600">Records.</span></h2>
             <button onClick={() => onNavigate?.('/solar-projects')} className="text-xs font-black tracking-widest uppercase text-slate-400 hover:text-blue-600 transition-colors">Full Archive</button>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 px-4">
            {solarProjects.slice(0, 2).map((p) => (
              <div key={p.id} className="group relative rounded-[3rem] overflow-hidden aspect-video cursor-pointer" onClick={() => onNavigate?.(`/projects/${p.id}`)}>
                <img src={p.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] to-transparent opacity-80" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="text-[10px] uppercase tracking-widest font-black text-emerald-400 mb-2">{p.type}</div>
                  <h4 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">{p.title}</h4>
                  <div className="flex gap-8 text-xs font-bold opacity-70">
                    <span className="flex items-center gap-2"><MapPin size={14} /> {p.location}</span>
                    <span className="flex items-center gap-2"><Zap size={14} /> {p.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALCULATOR ─── */}
      <section className="py-24 bg-[#0B1221] text-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="px-4">
                <span className="text-blue-400 text-xs font-black tracking-widest uppercase mb-8 block">Financial Analytics</span>
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">Identify your <br/>savings potential.</h2>
                <p className="text-slate-400 text-lg md:text-xl font-medium opacity-80 leading-relaxed mb-12">Data-driven solar modeling for the Indian grid.</p>
                <div className="space-y-4">
                   {['Payload sizing', 'Installation cost', 'Subsidy applied'].map(t => (
                     <div key={t} className="flex items-center gap-3 font-bold"><CheckCircle className="text-blue-500" size={20} /> {t}</div>
                   ))}
                </div>
             </div>
             <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl">
                <SolarCalculatorInline />
             </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="py-24 bg-white flex items-center justify-center">
         <div className="container px-4 text-center">
            <Quote size={80} className="text-blue-100 mx-auto mb-16" />
            <div className="text-2xl md:text-4xl font-black text-[#0B1221] leading-snug tracking-tight mb-20 px-4">
              "{TESTIMONIALS[currentTestimonial].text}"
            </div>
            <div className="flex flex-col items-center gap-6">
               <img src={TESTIMONIALS[currentTestimonial].image} className="w-24 h-24 rounded-full object-cover shadow-xl ring-8 ring-slate-50" />
               <div>
                  <div className="text-2xl font-black text-slate-900">{TESTIMONIALS[currentTestimonial].name}</div>
                  <div className="text-[10px] font-black tracking-widest uppercase text-slate-400 mt-2">{TESTIMONIALS[currentTestimonial].location}</div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

const SolarCalculatorInline = () => {
  const [bill, setBill] = useState('');
  const [category, setCategory] = useState<'Residential' | 'Commercial' | 'Enterprise'>('Residential');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const b = parseFloat(bill);
    if (!b || b <= 0) return;
    const r = calculateSolarSystem(b, category);
    setResult(r);
  };

  return (
    <div className="text-slate-900 w-full text-left">
      <h3 className="font-black text-3xl mb-8 tracking-tight">Financing Model</h3>
      <div className="flex gap-2 mb-8 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
        {(['Residential', 'Commercial', 'Enterprise'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setResult(null); }}
            className={`flex-1 py-3 px-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
              category === cat ? 'bg-white text-blue-700 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {!result ? (
          <div className="animate-fade-in">
            <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">Monthly Bill (₹)</label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="00"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-2xl font-black focus:outline-none focus:border-blue-600 transition-all mb-8"
            />
            <button 
              onClick={calculate}
              className="w-full btn-primary py-5 text-lg shadow-xl"
            >
              Analyze Potential
            </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
               <div className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">Size</div>
               <div className="text-3xl font-black">{result.sizeKw}kW</div>
            </div>
            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
               <div className="text-[9px] font-black uppercase text-emerald-600 tracking-widest mb-1">Returns</div>
               <div className="text-3xl font-black">₹{(result.yearlySavingsNum * 25 / 100000).toFixed(1)}L</div>
            </div>
          </div>
          <button onClick={() => setResult(null)} className="w-full text-center text-[10px] font-black tracking-widest uppercase text-slate-400 py-2">Recalculate</button>
        </div>
      )}
    </div>
  );
};

export default Home;

import { Droplets, CheckCircle, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';

const PMKusumYojana = () => {
  const { kusumSolutions: pmKusumYojanaSolutions } = useData();
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden h-[400px] flex items-center">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <img
            src="https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="PM Kusum Yojana Solar Pumps"
            className="w-full h-full object-cover scale-105 opacity-20 mix-blend-overlay"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
              <Droplets size={14} className="text-amber-400" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">PM Kusum Yojana</span>
            </div>
            <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
              Solar Power <span className="mega-gradient-text">for Every Farmer</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed animate-fade-up delay-200">
              Empowering Indian farmers with clean solar energy — free irrigation, reduced costs, and increased income through PM Kusum Yojana and other government schemes.
            </p>
            <div className="flex flex-wrap gap-3 mt-8 animate-fade-up delay-300">
              {['Up to 90% Subsidy', 'No Electricity Bill', 'Irrigate Anytime', '5-Year Warranty'].map((tag) => (
                <span key={tag} className="flex items-center gap-2 glass-morphism text-white text-xs font-bold px-4 py-2 rounded-full border border-white/10 shadow-lg">
                  <CheckCircle size={14} className="text-emerald-400" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4 animate-fade-up">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">Our Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight animate-fade-up delay-100">Solar Solutions for Agriculture</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pmKusumYojanaSolutions.map((solution, i) => (
              <div key={solution.id} className={`card-premium overflow-hidden group animate-fade-up`} style={{ animationDelay: `${(i % 2 + 1) * 100}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
                  <img src={solution.image} alt={solution.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {solution.subsidyAvailable && (
                    <span className="absolute top-4 left-4 z-20 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-300 shadow-xl shadow-amber-400/20">🎯 Subsidy Available</span>
                  )}
                  <h3 className="absolute bottom-4 left-6 z-20 text-white font-black text-2xl group-hover:text-amber-400 transition-colors">{solution.title}</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-500 text-base mb-6 leading-relaxed font-medium">{solution.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {solution.benefits.map((benefit: string) => (
                      <div key={benefit} className="flex items-center gap-3 text-xs font-bold text-gray-700 bg-gray-50 p-2 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <CheckCircle size={12} className="text-emerald-600" />
                        </span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 w-full btn-primary text-sm py-4 shadow-xl shadow-emerald-500/20 group/btn">
                    Get Free Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PM Kusum */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden z-20">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 text-center glass-morphism rounded-[40px] p-12 md:p-20 border border-white/10 shadow-2xl max-w-5xl mx-auto">
          <h2 className="text-white mb-6 text-4xl md:text-5xl font-black tracking-tight">PM Kusum Yojana</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
            Get up to <strong>90% government subsidy</strong> on solar irrigation pumps. We handle all documentation. Save lakhs on diesel and electricity costs.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
            {[
              { val: '90%', label: 'Subsidy Available' },
              { val: '₹0', label: 'Electricity Bill' },
              { val: '25yr', label: 'Panel Lifespan' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-black text-white mb-2">{s.val}</div>
                <div className="text-emerald-200 text-xs font-black uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
          <a href="tel:+917247391595" className="btn-primary bg-white text-emerald-900 border-none hover:bg-emerald-50 px-10 py-5 text-lg font-black shadow-xl shadow-white/10 inline-flex items-center gap-3 group">
            <Phone size={20} className="group-hover:animate-bounce" /> Apply for PM Kusum Yojana
          </a>
        </div>
      </section>
    </div>
  );
};

export default PMKusumYojana;

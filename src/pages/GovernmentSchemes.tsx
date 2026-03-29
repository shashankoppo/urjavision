import { GOVERNMENT_SCHEMES } from '../utils/constants';
import { CheckCircle, ExternalLink, Phone, Zap, DollarSign, Users } from 'lucide-react';

const GovernmentSchemes = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden h-[450px] flex items-center">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <DollarSign size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Government Schemes</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Solar Subsidies & <span className="mega-gradient-text">Schemes</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Take advantage of generous central and state government subsidies on solar installations. We handle all documentation and paperwork — completely free.
          </p>
        </div>
      </section>

      {/* Schemes */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="space-y-8 max-w-5xl mx-auto">
            {GOVERNMENT_SCHEMES.map((scheme, i) => (
              <div key={scheme.id} className={`card-premium p-8 md:p-10 animate-fade-up`} style={{ animationDelay: `${(i % 3 + 1) * 100}ms` }}>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-black text-gray-900">{scheme.name}</h3>
                      <span className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-300 shadow-xl shadow-amber-400/20">{scheme.subsidy}</span>
                    </div>
                    <p className="text-gray-500 mb-6 text-base leading-relaxed font-medium">{scheme.description}</p>
                    <div className="flex items-center gap-3 text-sm font-bold text-emerald-700 mb-6 bg-emerald-50 inline-flex px-4 py-2 rounded-xl border border-emerald-100">
                      <Users size={18} /> Eligibility: {scheme.eligibility}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {scheme.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-3 text-xs font-bold text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle size={12} className="text-emerald-600" />
                          </span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col gap-4 md:w-56 justify-center">
                    <a href="tel:+917247391595" className="btn-primary text-sm py-4 w-full flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20">
                      <Phone size={16} /> Apply Now
                    </a>
                    <a
                      href="https://mnre.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold transition-all text-sm py-4 w-full flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} /> Scheme Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden z-20">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 text-center glass-morphism rounded-[40px] p-12 md:p-20 border border-white/10 shadow-2xl max-w-5xl mx-auto">
          <h2 className="text-white mb-6 text-4xl md:text-5xl font-black tracking-tight">We Handle All Subsidy Paperwork — Free</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
            Navigating government subsidy applications can be complex. Our dedicated team handles all documentation, registration, and follow-ups at no extra cost.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
            {['Document Preparation', 'Registration & Filing', 'Approval Follow-up'].map((step, i) => (
              <div key={step} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <div className="text-5xl font-black text-amber-400 mb-4 opacity-50" style={{ fontFamily: 'Outfit' }}>0{i + 1}</div>
                <div className="text-white text-lg font-black">{step}</div>
              </div>
            ))}
          </div>
          <a href="tel:+917247391595" className="btn-primary bg-white text-emerald-900 border-none hover:bg-emerald-50 px-10 py-5 text-lg font-black shadow-xl shadow-white/10 inline-flex items-center gap-3 group">
            <Phone size={20} className="group-hover:animate-bounce" /> Get Subsidy Guidance
          </a>
        </div>
      </section>
    </div>
  );
};

export default GovernmentSchemes;

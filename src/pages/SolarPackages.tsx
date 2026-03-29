import { CheckCircle, ArrowRight, Shield, Zap, Award, Phone, Mail } from 'lucide-react';
import { SOLAR_PACKAGES } from '../utils/constants';

const SolarPackages = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#0A0F1E]/80 to-[#0A0F1E] z-10" />
          <img
            src="https://images.pexels.com/photos/4254885/pexels-photo-4254885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Solar Packages"
            className="w-full h-full object-cover scale-105 opacity-30 mix-blend-overlay"
          />
        </div>

        <div className="container relative z-10 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <Award size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Premium Packages</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-6 animate-fade-up delay-100">
            All-Inclusive <span className="mega-gradient-text">Solar Packages</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Transparent, zero hidden cost pricing. Choose the tier that matches your energy demands and start saving instantly.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative -mt-10 overflow-hidden z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SOLAR_PACKAGES.map((pkg, index) => {
              const isFeatured = index === 1;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-[32px] p-8 transition-all duration-500 animate-fade-up flex flex-col ${isFeatured
                      ? 'bg-gradient-hero text-white shadow-2xl shadow-emerald-900/20 scale-105 border border-white/10 z-10'
                      : 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100/50 hover:-translate-y-2'
                    }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {isFeatured && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-amber-500/40 bg-gradient-to-br from-amber-400 to-amber-600">
                        ⭐ Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isFeatured ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {pkg.name}
                  </div>
                  <div className={`text-5xl font-black tracking-tighter mb-2 ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{pkg.price}</div>
                  <div className={`text-xs font-semibold mb-8 ${isFeatured ? 'text-gray-400' : 'text-gray-500'}`}>
                    Fully Installed Turnkey System
                  </div>

                  <div className={`rounded-2xl p-5 mb-8 flex-1 ${isFeatured ? 'bg-white/5 border border-white/10' : 'bg-gray-50/80 border border-gray-100'}`}>
                    {/* Details section */}
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${isFeatured ? 'text-emerald-400' : 'text-gray-400'}`}>System Specs</div>
                    <div className="space-y-3">
                      {[
                        { label: 'Capacity', val: pkg.capacity },
                        { label: 'Daily Yield', val: pkg.generation },
                        { label: 'Savings', val: pkg.savings },
                        { label: 'ROI', val: pkg.roi },
                      ].map((row) => (
                        <div key={row.label} className={`flex justify-between items-center text-sm border-b pb-3 last:border-0 last:pb-0 ${isFeatured ? 'border-white/10' : 'border-gray-200'}`}>
                          <span className={`font-semibold ${isFeatured ? 'text-gray-400' : 'text-gray-500'}`}>{row.label}</span>
                          <span className={`font-black ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${isFeatured ? 'text-emerald-400' : 'text-gray-400'}`}>
                    Premium Inclusions
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.components.map((comp) => (
                      <li key={comp} className={`flex items-start gap-3 text-sm font-medium ${isFeatured ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div className={`mt-0.5 rounded-full p-0.5 max-w-fit ${isFeatured ? 'bg-amber-400/20 text-amber-400' : 'bg-emerald-50 text-emerald-500'}`}>
                          <CheckCircle size={14} className="flex-shrink-0" />
                        </div>
                        {comp}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="tel:+917247391595"
                    className={`w-full mt-auto flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all text-sm ${isFeatured
                        ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20'
                        : 'btn-primary'
                      }`}
                  >
                    Deploy This System <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>

          <p className="text-center font-bold text-sm text-gray-400 mt-12 bg-white/50 backdrop-blur-md inline-block max-w-2xl mx-auto rounded-2xl py-3 px-6 border border-gray-100">
            Government subsidy up to 40% available for residential installations. We handle all subsidy paperwork natively.
          </p>
        </div>
      </section>

      {/* Custom Package */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Soft radial background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto bg-gradient-hero rounded-[40px] p-12 md:p-16 text-white text-center relative overflow-hidden border border-white/5 shadow-2xl">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-xl">
                <Zap size={30} className="text-amber-400" />
              </div>
              <h2 className="text-white mb-4 text-4xl md:text-5xl font-black tracking-tight">Need an Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Solution?</span></h2>
              <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                For large commercial, industrial, or unique requirements — our engineering team models completely bespoke solar infrastructures. Contact us for a strategic quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+917247391595" className="btn-primary px-8 py-4 rounded-xl font-bold shadow-xl shadow-emerald-900/50 hover:shadow-emerald-900/30 flex items-center justify-center gap-2">
                  <Phone size={18} /> Schedule Engineering Call
                </a>
                <a href="mailto:info@urjavision.com" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Mail size={18} /> Email RFP Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding-sm bg-gray-50 border-t border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Tier-1 Hardware', desc: 'All warranties backed by top-tier manufacturers vertically' },
              { icon: Zap, title: 'Turnkey Integration', desc: 'We handle everything from supply to commission' },
              { icon: Award, title: 'Subsidy Native', desc: 'We file and track all subsidy pipelines natively' },
              { icon: CheckCircle, title: 'O&M Protocol', desc: 'Comprehensive AMC included for the first year' },
            ].map((item, i) => (
              <div key={item.title} className="text-center p-4 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                  <item.icon size={28} />
                </div>
                <div className="font-black text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto font-medium">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarPackages;

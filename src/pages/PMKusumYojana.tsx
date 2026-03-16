import { Droplets, CheckCircle, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';

const PMKusumYojana = () => {
  const { kusumSolutions: pmKusumYojanaSolutions } = useData();
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="PM Kusum Yojana Solar Pumps"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="section-tag !bg-white/10 !text-white !border-white/20 mb-4">
              <Droplets size={12} /> PM Kusum Yojana
            </div>
            <h1 className="text-white mb-4">Solar Power for Every Farmer</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Empowering Indian farmers with clean solar energy — free irrigation, reduced costs, and increased income through PM Kusum Yojana and other government schemes.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['Up to 90% Subsidy', 'No Electricity Bill', 'Irrigate Anytime', '5-Year Warranty'].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 bg-white/10 text-white text-sm font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  <CheckCircle size={12} className="text-emerald-400" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">Our Solutions</div>
            <h2>Solar Solutions for Agriculture</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pmKusumYojanaSolutions.map((solution, i) => (
              <div key={solution.id} className={`card group animate-fade-up delay-${(i % 2 + 1) * 100}`}>
                <div className="img-overlay h-52">
                  <img src={solution.image} alt={solution.title} />
                  {solution.subsidyAvailable && (
                    <span className="absolute top-3 left-3 z-10 badge badge-featured">🎯 Subsidy Available</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-700 transition-colors">{solution.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{solution.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {solution.benefits.map((benefit: string) => (
                      <div key={benefit} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle size={13} className="text-emerald-500 flex-shrink-0" /> {benefit}
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 w-full btn-primary text-sm py-3">
                    Get Free Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PM Kusum */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <h2 className="text-white mb-4">PM Kusum Yojana</h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-8 text-lg">
            Get up to <strong>90% government subsidy</strong> on solar irrigation pumps under PM Kusum Yojana. We handle all documentation and registration. Save lakhs on diesel and electricity costs.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { val: '90%', label: 'Subsidy Available' },
              { val: '₹0', label: 'Electricity Bill' },
              { val: '25yr', label: 'Panel Lifespan' },
            ].map((s) => (
              <div key={s.label} className="card-stat p-5">
                <div className="text-3xl font-black text-white">{s.val}</div>
                <div className="text-emerald-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <a href="tel:+917247391595" className="btn-secondary px-8 py-4 text-base inline-flex items-center gap-2">
            <Phone size={18} /> Apply for PM Kusum Yojana
          </a>
        </div>
      </section>
    </div>
  );
};

export default PMKusumYojana;

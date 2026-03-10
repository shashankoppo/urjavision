import { CheckCircle, ArrowRight, Shield, Zap, Award, Phone } from 'lucide-react';
import { SOLAR_PACKAGES } from '../utils/constants';

const SolarPackages = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <Award size={12} /> Solar Packages
          </div>
          <h1 className="text-white mb-4">All-Inclusive Solar Packages</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Transparent pricing, no hidden costs. Choose the package that fits your needs and start saving immediately.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SOLAR_PACKAGES.map((pkg, index) => {
              const isFeatured = index === 1;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl p-8 transition-all duration-300 ${isFeatured
                      ? 'bg-gradient-primary text-white shadow-2xl shadow-emerald-200 scale-105'
                      : 'bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2'
                    }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="badge badge-featured px-5 py-2 text-sm shadow-xl">⭐ Most Popular</span>
                    </div>
                  )}

                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isFeatured ? 'text-emerald-200' : 'text-emerald-600'}`}>
                    {pkg.name}
                  </div>
                  <div className={`text-4xl font-black mb-1 ${isFeatured ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit' }}>
                    {pkg.price}
                  </div>
                  <div className={`text-xs mb-6 ${isFeatured ? 'text-emerald-200' : 'text-gray-500'}`}>
                    Complete installed system
                  </div>

                  <div className={`rounded-xl p-4 mb-6 ${isFeatured ? 'bg-white/12' : 'bg-gray-50 border border-gray-100'}`}>
                    {[
                      { label: 'System Capacity', val: pkg.capacity },
                      { label: 'Daily Generation', val: pkg.generation },
                      { label: 'Monthly Savings', val: pkg.savings },
                      { label: 'ROI period', val: pkg.roi },
                    ].map((row) => (
                      <div key={row.label} className={`flex justify-between py-2 text-sm border-b last:border-0 ${isFeatured ? 'border-white/10' : 'border-gray-200'}`}>
                        <span className={isFeatured ? 'text-emerald-200' : 'text-gray-500'}>{row.label}</span>
                        <span className={`font-bold ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isFeatured ? 'text-emerald-200' : 'text-gray-500'}`}>
                    What's Included
                  </div>
                  <ul className="space-y-2 mb-8">
                    {pkg.components.map((comp) => (
                      <li key={comp} className={`flex items-start gap-2 text-sm ${isFeatured ? 'text-white/90' : 'text-gray-600'}`}>
                        <CheckCircle size={15} className={`flex-shrink-0 mt-0.5 ${isFeatured ? 'text-amber-300' : 'text-emerald-500'}`} />
                        {comp}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="tel:+917247391595"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all text-sm ${isFeatured
                        ? 'bg-white text-emerald-700 hover:bg-amber-50 shadow-lg'
                        : 'btn-primary'
                      }`}
                  >
                    Get This Package <ArrowRight size={15} />
                  </a>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-400 mt-10">
            Government subsidy up to 40% available for residential installations. We handle all subsidy paperwork.
          </p>
        </div>
      </section>

      {/* Custom Package */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-primary rounded-3xl p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">⚡</div>
              <h2 className="text-white mb-3">Need a Custom Solution?</h2>
              <p className="text-white/85 mb-8 max-w-xl mx-auto">
                For large commercial, industrial, or unique requirements — we design completely custom solar systems. Contact us for a custom quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+917247391595" className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-bold">
                  <Phone size={16} /> Call for Custom Quote
                </a>
                <a href="mailto:info@urjavision.com" className="btn-outline px-8 py-3.5 rounded-xl text-sm font-bold">
                  Email for Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding-sm bg-gray-50 border-t border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Genuine Warranty', desc: 'All warranties backed by manufacturers' },
              { icon: Zap, title: 'Turnkey Installation', desc: 'We handle everything, start to finish' },
              { icon: Award, title: 'Subsidy Help', desc: 'We file all subsidy paperwork for free' },
              { icon: CheckCircle, title: 'Post-Sales Support', desc: 'Free AMC for first year' },
            ].map((item) => (
              <div key={item.title} className="text-center p-4">
                <item.icon size={28} className="text-emerald-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarPackages;

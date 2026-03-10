import { GOVERNMENT_SCHEMES } from '../utils/constants';
import { CheckCircle, ExternalLink, Phone, Zap, DollarSign, Users } from 'lucide-react';

const GovernmentSchemes = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <DollarSign size={12} /> Government Schemes
          </div>
          <h1 className="text-white mb-4">Solar Subsidies & Government Schemes</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Take advantage of generous central and state government subsidies on solar installations. We handle all documentation and paperwork — completely free.
          </p>
        </div>
      </section>

      {/* Schemes */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="space-y-8 max-w-4xl mx-auto">
            {GOVERNMENT_SCHEMES.map((scheme, i) => (
              <div key={scheme.id} className={`card p-7 md:p-8 animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{scheme.name}</h3>
                      <span className="badge badge-featured">{scheme.subsidy}</span>
                    </div>
                    <p className="text-gray-500 mb-4 text-sm leading-relaxed">{scheme.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 mb-4">
                      <Users size={15} /> Eligibility: {scheme.eligibility}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {scheme.benefits.map((b) => (
                        <div key={b} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {b}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col gap-3 md:w-44">
                    <a href="tel:+917247391595" className="btn-primary text-sm py-3 w-full">
                      <Phone size={14} /> Apply Now
                    </a>
                    <a
                      href="https://mnre.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-green text-sm py-3 w-full"
                    >
                      <ExternalLink size={14} /> Scheme Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section-padding bg-gradient-primary">
        <div className="container text-center">
          <h2 className="text-white mb-4">We Handle All Subsidy Paperwork — Free</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">
            Navigating government subsidy applications can be complex. Our dedicated team handles all documentation, registration, and follow-ups at no extra cost.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {['Document Preparation', 'Registration & Filing', 'Approval Follow-up'].map((step, i) => (
              <div key={step} className="card-stat p-5">
                <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Outfit' }}>Step {i + 1}</div>
                <div className="text-emerald-200 text-sm">{step}</div>
              </div>
            ))}
          </div>
          <a href="tel:+917247391595" className="btn-secondary px-8 py-4 text-base inline-flex items-center gap-2">
            <Phone size={18} /> Get Subsidy Guidance
          </a>
        </div>
      </section>
    </div>
  );
};

export default GovernmentSchemes;

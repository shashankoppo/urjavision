import { useState } from 'react';
import { CheckCircle, Users, Handshake, Globe, Phone, ArrowRight } from 'lucide-react';

const vendorBenefits = [
  'Exclusive territory distribution rights',
  'Marketing and sales support',
  'Technical training and certification',
  'Attractive commission structure',
  'Priority customer leads',
  'Co-branded marketing materials',
];

const partnerTypes = [
  { icon: Users, title: 'Channel Partner', desc: 'Sell our solar products and earn commissions in your local area. Ideal for electricians, contractors and entrepreneurs.' },
  { icon: Globe, title: 'Regional Distributor', desc: 'Become our exclusive product distributor for a district or region with dedicated support and team.' },
  { icon: Handshake, title: 'Installation Partner', desc: 'Join our certified installer network. We provide training, tools, and customer referrals to growing your business.' },
];

const VendorPartner = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', city: '', type: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <Handshake size={12} /> Partner with Us
          </div>
          <h1 className="text-white mb-4">Grow Your Business with Solar</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Join Urja Vision's growing partner network. Get exclusive territories, attractive commissions, and full business support to build a thriving solar business.
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">Partnership Models</div>
            <h2>Choose Your Partnership</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {partnerTypes.map((pt, i) => (
              <div key={pt.title} className={`card p-7 text-center animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="icon-wrapper icon-wrapper-green mx-auto mb-5">
                  <pt.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{pt.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="section-tag mb-4">Partner Benefits</div>
              <h2 className="mb-5">Why Partner with Urja Vision?</h2>
              <div className="grid grid-cols-2 gap-3">
                {vendorBenefits.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card p-7">
              <h3 className="mb-1">Apply to Become a Partner</h3>
              <p className="text-sm text-gray-500 mb-5">Fill in your details and we'll get back to you within 24 hours.</p>

              {submitted && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl mb-4 text-sm">
                  <CheckCircle size={16} className="text-emerald-500" /> Application submitted! We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Name *</label>
                    <input required type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Company</label>
                    <input type="text" placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone *</label>
                    <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">City *</label>
                    <input required type="text" placeholder="Your city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email *</label>
                  <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Partnership Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                    <option value="">Select type</option>
                    {partnerTypes.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full btn-primary py-3.5">
                  Submit Application <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorPartner;

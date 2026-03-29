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
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden h-[400px] flex items-center">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <Handshake size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Partner with Us</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Grow Your Business <span className="mega-gradient-text">with Solar</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Join Urja Vision's growing partner network. Get exclusive territories, attractive commissions, and full business support to build a thriving solar business.
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4 animate-fade-up">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">Partnership Models</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight animate-fade-up delay-100">Choose Your Partnership</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {partnerTypes.map((pt, i) => (
              <div key={pt.title} className={`card-premium p-8 text-center animate-fade-up`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/20">
                  <pt.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{pt.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed font-medium">{pt.desc}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-6">
                <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.2em]">Partner Benefits</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-8">Why Partner with<br/>Urja Vision?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendorBenefits.map((b) => (
                  <div key={b} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-emerald-600" />
                    </span>
                    <span className="text-sm font-bold text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card-premium p-8 md:p-10 animate-fade-up delay-100">
              <h3 className="text-3xl font-black text-gray-900 mb-2">Apply to Become a Partner</h3>
              <p className="text-base text-gray-500 mb-8 font-medium">Fill in your details and we'll get back to you within 24 hours.</p>

              {submitted && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl mb-6 text-sm font-bold">
                  <CheckCircle size={20} className="text-emerald-500 shrink-0" /> Application submitted! We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-2">Name *</label>
                    <input required type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-2 border-transparent focus-within:border-emerald-500">Company</label>
                    <input type="text" placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-2">Phone *</label>
                    <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-2">City *</label>
                    <input required type="text" placeholder="Your city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-2">Email *</label>
                  <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-2 border-transparent">Partnership Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="">Select type</option>
                    {partnerTypes.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4">
                  Submit Application <ArrowRight size={18} />
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

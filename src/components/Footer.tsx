import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Sun, Zap, Shield, Award, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_MENU } from '../utils/constants';
import { getPhoneLink, getEmailLink, getWhatsAppLink } from '../utils/helpers';
import Logo from './Logo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const navigate = (path: string) => {
    if (onNavigate) onNavigate(path);
  };
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-100 overflow-hidden">
      {/* ─── ARCHITECTURAL CTA SECTION ─── */}
      <div className="container py-32 border-b border-slate-100 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-[#0B1221] font-black text-4xl md:text-6xl mb-8 tracking-[-0.03em] leading-[1.1]">
              Ready to architect your <br/><span className="text-blue-600">energy independence?</span>
            </h3>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              Join the league of 850+ premium clients across Madhya Pradesh who have eliminated their power bills forever.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
            <a
              href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I want a free solar consultation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B1221] text-white px-10 py-5 rounded-full font-black text-base shadow-2xl hover:bg-black hover:-translate-y-1.5 transition-all text-center flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} />
              Consultation
            </a>
            <a
              href={getPhoneLink(COMPANY_INFO.contact.phone)}
              className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-full font-black text-base shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1.5 transition-all text-center"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER ─── */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4 lg:col-span-5">
            <button 
              onClick={() => navigate('/')}
              className="mb-8 block outline-none transition-transform hover:scale-105 origin-left"
              title="Urja Vision Home"
            >
              <Logo className="h-10" />
            </button>

            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-sm">
              Madhya Pradesh's most trusted solar engineering partner. We deliver unparalleled quality, precision architectures, and flawless execution for residential and enterprise clients.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-4 mb-12">
              {[
                { icon: Shield, label: 'ISO 9001:2015 QUALITY MANAGEMENT' },
                { icon: Award, label: 'MNRE REGISTERED ENGINEERING FIRM' },
                { icon: Zap, label: 'PREMIUM TIER-1 HARDWARE INTEGRATION' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-slate-400 group">
                  <b.icon size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                  {b.label}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { href: COMPANY_INFO.social.facebook, Icon: Facebook, label: 'Facebook', hover: 'hover:bg-blue-600 hover:text-white hover:border-blue-600' },
                { href: COMPANY_INFO.social.twitter, Icon: Twitter, label: 'Twitter', hover: 'hover:bg-sky-500 hover:text-white hover:border-sky-500' },
                { href: COMPANY_INFO.social.linkedin, Icon: Linkedin, label: 'LinkedIn', hover: 'hover:bg-blue-700 hover:text-white hover:border-blue-700' },
                { href: COMPANY_INFO.social.instagram, Icon: Instagram, label: 'Instagram', hover: 'hover:bg-pink-600 hover:text-white hover:border-pink-600' },
              ].map(({ href, Icon, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-all text-slate-500 hover:shadow-sm ${hover}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — 2 cols */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-6 flex items-center gap-3">
              Platform
            </h4>
            <ul className="space-y-4">
              {NAVIGATION_MENU.slice(0, 5).map(item => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors hover:translate-x-1 inline-flex items-center gap-2"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — 2 cols */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-6 flex items-center gap-3">
              Solutions
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Residential Architecture', path: '/solar-products' },
                { name: 'Commercial Scale', path: '/solar-products' },
                { name: 'PM Surya Ghar', path: '/government-schemes' },
                { name: 'ROI Calculator', path: '/calculator' },
                { name: 'Case Studies', path: '/solar-projects' },
              ].map(s => (
                <li key={s.name}>
                  <button
                    onClick={() => navigate(s.path)}
                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors hover:translate-x-1 inline-flex items-center gap-2"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-6 flex items-center gap-3">
              Headquarters
            </h4>
            <ul className="space-y-4 mb-8">
              <li>
                <a
                  href={`https://maps.google.com/?q=390+Premnagar+Jabalpur+MP`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-slate-600 hover:text-blue-600 transition-colors group items-start font-medium"
                >
                  <MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{COMPANY_INFO.address.line1}, <br/>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</span>
                </a>
              </li>
              <li>
                <a
                  href={getPhoneLink(COMPANY_INFO.contact.phone)}
                  className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors font-bold text-lg"
                >
                  <Phone size={20} className="text-emerald-500 shrink-0" />
                  {COMPANY_INFO.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={getEmailLink(COMPANY_INFO.contact.email)}
                  className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors font-medium"
                >
                  <Mail size={20} className="text-blue-600 shrink-0" />
                  {COMPANY_INFO.contact.email}
                </a>
              </li>
            </ul>

            {/* Newsletter Minimal */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-sm font-bold text-slate-800 mb-3">Subscribe to Market Updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                />
                <button 
                  className="bg-[#0B1221] hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold transition-colors shadow-md flex items-center justify-center shrink-0" 
                  title="Subscribe"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TECHNICAL PARTNER STRIP ─── */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Technology Partner</span>
              <div className="w-px h-6 bg-slate-300 hidden sm:block" />
              <a
                href="https://elsxglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform" >
                  <Zap size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    ELSxGlobal
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -mt-1" />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Division of Evolucentsphere</div>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              Made in Bharat <span className="mx-1">🇮🇳</span> for a greener tomorrow.
            </div>
          </div>
        </div>
      </div>

      {/* ─── COPYRIGHT BAR ─── */}
      <div className="bg-white border-t border-slate-100">
        <div className="container py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <p>© {currentYear} {COMPANY_INFO.name}. Engineering Excellence.</p>
            <div className="flex items-center gap-10">
              <button className="hover:text-blue-600 transition-colors">Privacy</button>
              <button className="hover:text-blue-600 transition-colors">Terms</button>
              <button className="hover:text-blue-600 transition-colors">Sitemap</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

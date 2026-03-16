import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Sun, Zap, Shield, Award, ArrowRight, ExternalLink } from 'lucide-react';
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
    <footer className="bg-gray-950 text-white relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-[180px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[180px] opacity-5 pointer-events-none" />

      {/* ─── CTA STRIP ─── */}
      <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 border-b border-emerald-500/30">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <h3 className="text-white font-black text-xl mb-1">Start Saving with Solar Today</h3>
              <p className="text-emerald-200 text-sm">Free consultation · Site survey · Custom quote — all within 24 hours.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I want a free solar consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 text-sm shadow-lg"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                WhatsApp Us
              </a>
              <a
                href={getPhoneLink(COMPANY_INFO.contact.phone)}
                className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition-all text-sm"
              >
                <Phone size={15} /> {COMPANY_INFO.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER ─── */}
      <div className="container py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            <button 
              onClick={() => navigate('/')}
              className="mb-8 block outline-none"
              title="Urja Vision Home"
            >
              <Logo light className="h-10 md:h-12" />
            </button>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Madhya Pradesh's trusted solar partner — powering homes, businesses & farms with premium solar solutions backed by government subsidies.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Shield, label: 'ISO Certified' },
                { icon: Award, label: 'MNRE Approved' },
                { icon: Zap, label: 'Govt. Empaneled' },
              ].map(b => (
                <span key={b.label} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-[10px] text-gray-400 font-bold hover:bg-white/[0.08] transition-colors">
                  <b.icon size={11} className="text-amber-400" />
                  {b.label}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2.5">
              {[
                { href: COMPANY_INFO.social.facebook, Icon: Facebook, label: 'Facebook' },
                { href: COMPANY_INFO.social.twitter, Icon: Twitter, label: 'Twitter' },
                { href: COMPANY_INFO.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: COMPANY_INFO.social.instagram, Icon: Instagram, label: 'Instagram' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 flex items-center justify-center transition-all hover:scale-110 text-gray-400 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — 2 cols */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-white uppercase tracking-[.15em] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-amber-400" /> Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAVIGATION_MENU.slice(0, 6).map(item => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — 2 cols */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-white uppercase tracking-[.15em] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-amber-400" /> Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Residential Solar', path: '/solar-solutions' },
                { name: 'Commercial Solar', path: '/solar-solutions' },
                { name: 'PM Kusum Yojana', path: '/pm-kusum-yojana' },
                { name: 'Solar Calculator', path: '/calculator' },
                { name: 'Solar Shop', path: '/shop' },
                { name: 'Govt. Schemes', path: '/government-schemes' },
              ].map(s => (
                <li key={s.name}>
                  <button
                    onClick={() => navigate(s.path)}
                    className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 transform inline-block"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black text-white uppercase tracking-[.15em] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-amber-400" /> Get in Touch
            </h4>
            <ul className="space-y-3.5 mb-6">
              <li>
                <a
                  href={`https://maps.google.com/?q=390+Premnagar+Jabalpur+MP`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <MapPin size={15} className="text-emerald-500 shrink-0 mt-0.5 group-hover:text-emerald-400" />
                  <span>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</span>
                </a>
              </li>
              <li>
                <a
                  href={getPhoneLink(COMPANY_INFO.contact.phone)}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <Phone size={15} className="text-emerald-500 shrink-0 group-hover:text-emerald-400" />
                  {COMPANY_INFO.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={getEmailLink(COMPANY_INFO.contact.email)}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <Mail size={15} className="text-emerald-500 shrink-0 group-hover:text-emerald-400" />
                  {COMPANY_INFO.contact.email}
                </a>
              </li>
            </ul>

            {/* Newsletter mini form */}
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-300 mb-2">Get Solar Tips & Offers</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shrink-0" title="Subscribe to newsletter">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TECHNICAL PARTNER STRIP ─── */}
      <div className="border-t border-white/[0.06]">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-[.2em] font-bold">Technical Partner</span>
              <div className="w-px h-4 bg-gray-700 hidden sm:block" />
              <a
                href="https://elsxglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-partner-badge group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
                    <Zap size={13} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      ELSxGlobal
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] text-gray-500 leading-tight">Division of Evolucentsphere Pvt Ltd</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Sun size={11} className="text-amber-500" />
              <span>Designed & Developed with ☀️ for a greener India</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── COPYRIGHT BAR ─── */}
      <div className="border-t border-white/[0.04] bg-black/20">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-gray-600">
            <p>© {currentYear} {COMPANY_INFO.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Sitemap</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

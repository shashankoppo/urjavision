import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Sun, Zap, Shield, Award } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_MENU } from '../utils/constants';
import { getPhoneLink, getEmailLink, getWhatsAppLink } from '../utils/helpers';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const navigate = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      {/* ─── NEWSLETTER STRIP ─── */}
      <div className="bg-gradient-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Stay Updated with Solar News</h3>
              <p className="text-emerald-100 text-sm">Get solar tips, scheme alerts, and exclusive offers.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/60 focus:outline-none focus:border-white/50 text-sm font-medium"
              />
              <button className="bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl hover:bg-amber-50 transition-colors text-sm flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Sun size={22} className="text-white" />
              </div>
              <div>
                <div className="font-extrabold text-white text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  URJA <span className="text-amber-400">VISION</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Solar Energy Solutions</div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {COMPANY_INFO.tagline}. Leading provider of solar energy solutions across Madhya Pradesh — empowering homes, businesses, and farms.
            </p>

            {/* Trust badges */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: Shield, label: 'ISO Certified' },
                { icon: Award, label: 'MNRE Approved' },
                { icon: Zap, label: 'Govt. Empaneled' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 bg-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-400">
                  <b.icon size={11} className="text-amber-400" />
                  {b.label}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
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
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gradient-primary flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAVIGATION_MENU.slice(0, 7).map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 group-hover:bg-emerald-400 rounded-full transition-colors"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-amber-400 font-bold mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Residential Solar', path: '/solar-solutions' },
                { name: 'Commercial Solar', path: '/solar-solutions' },
                { name: 'Industrial Solar', path: '/solar-solutions' },
                { name: 'Solar EPC', path: '/solar-solutions' },
                { name: 'Solar Pumps (Kisan)', path: '/kisan-urja' },
                { name: 'Solar Training', path: '/training-internship' },
                { name: 'Govt. Schemes', path: '/government-schemes' },
              ].map((s) => (
                <li key={s.name}>
                  <button
                    onClick={() => navigate(s.path)}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 group-hover:bg-emerald-400 rounded-full transition-colors"></span>
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-400 font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=390+Premnagar+Jabalpur+Madhya+Pradesh`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <MapPin size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2}<br />
                    {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={getPhoneLink(COMPANY_INFO.contact.phone)}
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Phone size={16} className="text-amber-400 flex-shrink-0" />
                  {COMPANY_INFO.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={getEmailLink(COMPANY_INFO.contact.email)}
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Mail size={16} className="text-amber-400 flex-shrink-0" />
                  {COMPANY_INFO.contact.email}
                </a>
              </li>

              <li className="pt-2">
                <a
                  href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I need solar consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                  WhatsApp Now
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>&copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <button className="hover:text-gray-300 transition-colors">Privacy Policy</button>
              <button className="hover:text-gray-300 transition-colors">Terms of Service</button>
              <button className="hover:text-gray-300 transition-colors">Sitemap</button>
            </div>
            <p className="text-xs text-gray-600">Made with ☀️ in Jabalpur, MP</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

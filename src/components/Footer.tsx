import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sprout,
  SunMedium,
  Twitter,
  Zap
} from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_MENU } from '../utils/constants';
import { getEmailLink, getPhoneLink, getWhatsAppLink } from '../utils/helpers';
import Logo from './Logo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

const quickSolutions = [
  { name: 'Home Rooftop Solar', path: '/solar-solutions' },
  { name: 'Commercial Solar', path: '/solar-solutions' },
  { name: 'Solar Packages', path: '/solar-packages' },
  { name: 'Government Schemes', path: '/government-schemes' },
  { name: 'Solar Calculator', path: '/calculator' }
];

const Footer = ({ onNavigate }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const navigate = (path: string) => {
    onNavigate?.(path);
  };

  return (
    <footer className="overflow-hidden border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,#fff8ef_0%,#fffdf8_100%)]">
      <div className="container py-20">
        <div className="relative overflow-hidden rounded-[36px] border border-[rgba(249,115,22,0.18)] bg-[linear-gradient(135deg,#fff1dc_0%,#ffffff_55%,#eefaf1_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[rgba(249,115,22,0.16)] blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[rgba(34,197,94,0.14)] blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <SunMedium size={14} className="text-[var(--accent-saffron)]" />
                Solar for Indian homes and businesses
              </div>
              <h3 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)] md:text-5xl">
                Ready for a quotation that feels practical, local, and commercially strong?
              </h3>
              <p className="mt-4 max-w-xl text-lg text-[var(--text-secondary)]">
                Talk to the {COMPANY_INFO.brandName} team for rooftop solar, business installations, project support, and subsidy-aligned guidance in Madhya Pradesh.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I want a solar quote for my home or business.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={18} />
                WhatsApp Quote
              </a>
              <a href={getPhoneLink(COMPANY_INFO.contact.phone)} className="btn-warm">
                <Phone size={18} />
                Call Sales
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button
              onClick={() => navigate('/')}
              className="inline-flex transition-transform duration-300 hover:scale-[1.02]"
              title="Urja Vision home"
            >
              <Logo className="h-11" />
            </button>

            <p className="mt-6 max-w-md text-base leading-8 text-[var(--text-secondary)]">
              Trusted solar partner for homes, commercial buyers, institutions, and farms. We combine local market understanding with cleaner design, stronger execution, and service that helps people buy with confidence.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: ShieldCheck, text: 'Clear proposals and practical sizing' },
                { icon: Zap, text: 'Residential, commercial and industrial execution' },
                { icon: Sprout, text: 'Support for agriculture and subsidy-driven solar journeys' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm font-semibold text-[var(--text-primary)]">
                  <item.icon size={18} className="text-[var(--brand-green)]" />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { href: COMPANY_INFO.social.facebook, icon: Facebook, label: 'Facebook' },
                { href: COMPANY_INFO.social.twitter, icon: Twitter, label: 'Twitter' },
                { href: COMPANY_INFO.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: COMPANY_INFO.social.instagram, icon: Instagram, label: 'Instagram' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
                >
                  <item.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">Company</h4>
            <div className="mt-6 space-y-4">
              {NAVIGATION_MENU.slice(0, 6).map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="block text-left text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-red)]"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">Solutions</h4>
            <div className="mt-6 space-y-4">
              {quickSolutions.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="block text-left text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-red)]"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">Contact</h4>
            <div className="mt-6 space-y-4">
              <a
                href="https://maps.google.com/?q=390+Premnagar+Jabalpur+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm font-medium leading-6 text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-red)]"
              >
                <MapPin size={18} className="mt-1 shrink-0 text-[var(--brand-green)]" />
                <span>
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.pincode}
                </span>
              </a>
              <a
                href={getPhoneLink(COMPANY_INFO.contact.phone)}
                className="flex items-center gap-3 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-red)]"
              >
                <Phone size={18} className="text-[var(--brand-green)]" />
                {COMPANY_INFO.contact.phone}
              </a>
              <a
                href={getEmailLink(COMPANY_INFO.contact.email)}
                className="flex items-center gap-3 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-red)]"
              >
                <Mail size={18} className="text-[var(--brand-red)]" />
                {COMPANY_INFO.contact.email}
              </a>
            </div>

            <div className="mt-8 rounded-[24px] border border-[var(--border-soft)] bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.05)]">
              <div className="text-sm font-black text-[var(--text-primary)]">Stay updated on solar offers</div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Get package ideas, subsidy updates, and buyer-friendly solar information.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-soft)] px-4 py-3 text-sm"
                />
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--text-primary)] text-white transition-colors hover:bg-[var(--brand-red)]">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border-soft)] bg-white">
        <div className="container flex flex-col gap-4 py-6 text-sm font-semibold text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} {COMPANY_INFO.name}. Built for Bharat’s cleaner energy future.</p>
          <div className="flex flex-wrap items-center gap-5">
            <button className="transition-colors hover:text-[var(--brand-red)]">Privacy</button>
            <button className="transition-colors hover:text-[var(--brand-red)]">Terms</button>
            <button className="transition-colors hover:text-[var(--brand-red)]">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useCallback, useEffect, useState } from 'react';
import { Calculator as CalculatorIcon, ChevronDown, Menu, Phone, X, Zap } from 'lucide-react';
import { COMPANY_INFO } from './utils/constants';
import { getPhoneLink, getWhatsAppLink } from './utils/helpers';

import About from './pages/About';
import AdminLayout from './pages/admin/AdminLayout';
import Calculator from './pages/Calculator';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Home from './pages/Home';
import KnowledgeHub from './pages/KnowledgeHub';
import PMKusumYojana from './pages/PMKusumYojana';
import Shop from './pages/Shop';
import SolarPackages from './pages/SolarPackages';
import SolarProducts from './pages/SolarProducts';
import SolarProjects from './pages/SolarProjects';
import SolarSolutions from './pages/SolarSolutions';
import TrainingInternship from './pages/TrainingInternship';
import VendorPartner from './pages/VendorPartner';
import Footer from './components/Footer';
import Logo from './components/Logo';

const NAV_GROUPS = [
  {
    label: 'Solutions',
    items: [
      { name: 'Solar Solutions', path: '/solar-solutions', desc: 'For homes, businesses, schools and factories' },
      { name: 'Solar Packages', path: '/solar-packages', desc: 'Simple package options for faster decisions' },
      { name: 'PM Kusum Yojana', path: '/pm-kusum-yojana', desc: 'Solar opportunities for agriculture and pumps' }
    ]
  },
  {
    label: 'Products',
    items: [
      { name: 'Solar Shop', path: '/shop', desc: 'Panels, inverters, batteries and accessories' },
      { name: 'Solar Products', path: '/solar-products', desc: 'Product categories for practical buying' },
      { name: 'Solar Projects', path: '/solar-projects', desc: 'Recent installations and project highlights' },
      { name: 'Government Schemes', path: '/government-schemes', desc: 'Subsidy and policy support pages' }
    ]
  },
  {
    label: 'Company',
    items: [
      { name: 'About Us', path: '/about', desc: 'Who we are and how we work' },
      { name: 'Careers', path: '/careers', desc: 'Build your future with our team' },
      { name: 'Training & Internship', path: '/training-internship', desc: 'Practical solar learning opportunities' }
    ]
  },
  {
    label: 'More',
    items: [
      { name: 'Vendor / Partner', path: '/vendor-partner', desc: 'Partner with our solar business network' },
      { name: 'Knowledge Hub', path: '/knowledge-hub', desc: 'Buyer guides, insights and updates' },
      { name: 'Contact', path: '/contact', desc: 'Speak with sales and support' }
    ]
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname || '/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navigate = useCallback((path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPage(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    const handlePopState = () => setCurrentPage(window.location.pathname);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const closeDropdown = () => setActiveDropdown(null);

    if (activeDropdown) {
      const timer = window.setTimeout(() => document.addEventListener('click', closeDropdown), 80);

      return () => {
        window.clearTimeout(timer);
        document.removeEventListener('click', closeDropdown);
      };
    }

    return undefined;
  }, [activeDropdown]);

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <Home onNavigate={navigate} />;
      case '/about':
        return <About />;
      case '/solar-solutions':
        return <SolarSolutions />;
      case '/solar-products':
        return <SolarProducts />;
      case '/solar-packages':
        return <SolarPackages />;
      case '/government-schemes':
        return <GovernmentSchemes />;
      case '/pm-kusum-yojana':
        return <PMKusumYojana />;
      case '/vendor-partner':
        return <VendorPartner />;
      case '/training-internship':
        return <TrainingInternship />;
      case '/careers':
        return <Careers />;
      case '/solar-projects':
        return <SolarProjects />;
      case '/knowledge-hub':
        return <KnowledgeHub />;
      case '/contact':
        return <Contact />;
      case '/calculator':
        return <Calculator />;
      case '/shop':
        return <Shop />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  if (currentPage.startsWith('/admin')) {
    return <AdminLayout currentPage={currentPage} onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-cream)]">
      <div
        className="hidden overflow-hidden text-sm text-white md:block"
        style={{
          background: 'linear-gradient(135deg, #166534 0%, #15803d 45%, #ea580c 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-flow 8s ease infinite'
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-6">
              <a href={getPhoneLink(COMPANY_INFO.contact.phone)} className="flex items-center gap-2 transition-colors hover:text-orange-200">
                <Phone size={13} />
                <span className="font-semibold">{COMPANY_INFO.contact.phone}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.contact.email}`} className="flex items-center gap-2 transition-colors hover:text-orange-200">
                <span className="font-black">@</span>
                <span>{COMPANY_INFO.contact.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/85">
              <Zap size={12} className="text-yellow-300" />
              <span>Free site survey, subsidy guidance, and commercial consultation</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-[2px]"
        style={{
          background: 'linear-gradient(90deg, #15803d, #22c55e, #f59e0b, #ea580c, #15803d)',
          backgroundSize: '200% 100%',
          animation: 'gradient-flow 6s linear infinite'
        }}
      />

      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-[var(--border-soft)] bg-white/88 backdrop-blur-2xl' : 'border-b border-[var(--border-soft)] bg-white/95'
        }`}
        style={scrolled ? { boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)' } : undefined}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between md:h-[74px]">
            <button onClick={() => navigate('/')} className="flex-shrink-0" title="Urja Vision home">
              <Logo className="h-10 md:h-11" />
            </button>

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="relative">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveDropdown(activeDropdown === group.label ? null : group.label);
                    }}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-3 text-sm font-bold transition-colors ${
                      activeDropdown === group.label ? 'text-[var(--brand-red)]' : 'text-[var(--text-primary)] hover:text-[var(--brand-red)]'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeDropdown === group.label ? 'rotate-180 text-[var(--brand-red)]' : 'text-[var(--text-muted)]'
                      }`}
                    />
                  </button>

                  {activeDropdown === group.label && (
                    <div
                      className="absolute left-0 top-full mt-3 w-72 rounded-[24px] border border-[var(--border-soft)] bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="mb-2 h-1 rounded-full bg-[linear-gradient(90deg,#15803d,#f59e0b,#ea580c)]" />
                      {group.items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`mx-1 w-full rounded-2xl px-4 py-3 text-left transition-all ${
                            currentPage === item.path ? 'bg-[var(--bg-soft)]' : 'hover:bg-[var(--bg-soft)]'
                          }`}
                        >
                          <div className="text-sm font-bold text-[var(--text-primary)]">{item.name}</div>
                          <div className="mt-1 text-xs text-[var(--text-muted)]">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => navigate('/calculator')}
                className="ml-3 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                style={{
                  background: currentPage === '/calculator'
                    ? 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)'
                    : 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                  boxShadow: '0 12px 24px rgba(234, 88, 12, 0.18)'
                }}
              >
                <CalculatorIcon size={17} />
                Calculator
              </button>

              <button onClick={() => navigate('/contact')} className="btn-primary ml-2 text-sm">
                Get Free Quote
              </button>

              <a
                href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I need solar consultation for my home or business.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-warm ml-2 text-sm"
              >
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-2xl p-2 transition-colors hover:bg-[var(--bg-soft)] lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-[var(--text-primary)]" /> : <Menu size={24} className="text-[var(--text-primary)]" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[var(--border-soft)] bg-white/95 backdrop-blur-xl lg:hidden">
            <div className="container max-h-[82vh] overflow-y-auto py-4">
              <div className="mb-4 h-[2px] rounded-full bg-[linear-gradient(90deg,#15803d,#f59e0b,#ea580c)]" />

              <div className="mb-4 flex gap-2">
                <a
                  href={getPhoneLink(COMPANY_INFO.contact.phone)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--bg-soft)] py-3 text-sm font-bold text-[var(--brand-green)]"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I need solar consultation for my home or business.')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#25D366,#128C7E)] py-3 text-sm font-bold text-white"
                >
                  WhatsApp
                </a>
              </div>

              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="mb-2">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                      mobileExpanded === group.label ? 'bg-[var(--bg-soft)] text-[var(--brand-red)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileExpanded === group.label ? 'rotate-180 text-[var(--brand-red)]' : 'text-[var(--text-muted)]'}`}
                    />
                  </button>

                  {mobileExpanded === group.label && (
                    <div className="ml-3 mt-2 space-y-1 border-l-2 border-[rgba(234,88,12,0.18)] pl-3">
                      {group.items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`block w-full rounded-2xl px-3 py-3 text-left text-sm font-medium ${
                            currentPage === item.path ? 'bg-[var(--bg-soft)] text-[var(--brand-red)]' : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--border-soft)] pt-4">
                <button
                  onClick={() => navigate('/calculator')}
                  className="rounded-2xl bg-[linear-gradient(135deg,#f59e0b,#ea580c)] py-3 text-sm font-bold text-white"
                >
                  Calculator
                </button>
                <button onClick={() => navigate('/contact')} className="rounded-2xl bg-[linear-gradient(135deg,#172033,#0f172a)] py-3 text-sm font-bold text-white">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>{renderPage()}</main>

      <Footer onNavigate={navigate} />

      <a
        href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I am interested in solar solutions for my home or business.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#25D366,#128C7E)] shadow-[0_20px_40px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
      </a>
    </div>
  );
};

export default App;

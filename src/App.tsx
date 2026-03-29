import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Phone, ChevronDown, Zap, Calculator as CalculatorIcon } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_MENU } from './utils/constants';
import { getPhoneLink, getWhatsAppLink } from './utils/helpers';

import Home from './pages/Home';
import About from './pages/About';
import SolarSolutions from './pages/SolarSolutions';
import SolarProducts from './pages/SolarProducts';
import SolarPackages from './pages/SolarPackages';
import GovernmentSchemes from './pages/GovernmentSchemes';
import PMKusumYojana from './pages/PMKusumYojana';
import VendorPartner from './pages/VendorPartner';
import TrainingInternship from './pages/TrainingInternship';
import Careers from './pages/Careers';
import SolarProjects from './pages/SolarProjects';
import KnowledgeHub from './pages/KnowledgeHub';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import Shop from './pages/Shop';
import Logo from './components/Logo';
import Footer from './components/Footer';
import AdminLayout from './pages/admin/AdminLayout';

// Group nav items for mega-menu
const NAV_GROUPS = [
  {
    label: 'Solutions',
    items: [
      { name: 'Solar Solutions', path: '/solar-solutions', desc: 'Residential, commercial & industrial' },
      { name: 'Solar Packages', path: '/solar-packages', desc: 'Ready-to-install bundles' },
      { name: 'PM Kusum Yojana', path: '/pm-kusum-yojana', desc: 'Solar for farmers & agriculture' },
    ]
  },
  {
    label: 'Products',
    items: [
      { name: 'Solar Shop', path: '/shop', desc: 'Buy solar products online' },
      { name: 'Solar Products', path: '/solar-products', desc: 'Panels, inverters, batteries & more' },
      { name: 'Solar Projects', path: '/solar-projects', desc: 'Our completed installations' },
      { name: 'Government Schemes', path: '/government-schemes', desc: 'Subsidies & incentives' },
    ]
  },
  {
    label: 'Company',
    items: [
      { name: 'About Us', path: '/about', desc: 'Our story & mission' },
      { name: 'Careers', path: '/careers', desc: 'Join our growing team' },
      { name: 'Training & Internship', path: '/training-internship', desc: 'Learn solar skills' },
    ]
  },
  {
    label: 'More',
    items: [
      { name: 'Vendor / Partner', path: '/vendor-partner', desc: 'Become a partner' },
      { name: 'Knowledge Hub', path: '/knowledge-hub', desc: 'Solar guides & blogs' },
      { name: 'Contact', path: '/contact', desc: 'Get in touch' },
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handlePopState = () => setCurrentPage(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = () => setActiveDropdown(null);
    if (activeDropdown) {
      setTimeout(() => document.addEventListener('click', handler), 100);
      return () => document.removeEventListener('click', handler);
    }
  }, [activeDropdown]);

  const renderPage = () => {
    switch (currentPage) {
      case '/': return <Home onNavigate={navigate} />;
      case '/about': return <About />;
      case '/solar-solutions': return <SolarSolutions />;
      case '/solar-products': return <SolarProducts />;
      case '/solar-packages': return <SolarPackages />;
      case '/government-schemes': return <GovernmentSchemes />;
      case '/pm-kusum-yojana': return <PMKusumYojana />;
      case '/vendor-partner': return <VendorPartner />;
      case '/training-internship': return <TrainingInternship />;
      case '/careers': return <Careers />;
      case '/solar-projects': return <SolarProjects />;
      case '/knowledge-hub': return <KnowledgeHub />;
      case '/contact': return <Contact />;
      case '/calculator': return <Calculator />;
      case '/shop': return <Shop />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  // If we are on an admin route, completely bypass the public layout
  if (currentPage.startsWith('/admin')) {
    return <AdminLayout currentPage={currentPage} onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ─── TOP BAR — Animated gradient ─── */}
      <div className="text-white text-sm hidden md:block relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #047857 25%, #059669 50%, #10B981 75%, #34D399 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-flow 8s ease infinite',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-6">
              <a href={getPhoneLink(COMPANY_INFO.contact.phone)} className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
                <Phone size={13} />
                <span className="font-medium">{COMPANY_INFO.contact.phone}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.contact.email}`} className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
                <span>✉</span>
                <span>{COMPANY_INFO.contact.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <Zap size={12} className="text-amber-300" />
              <span>Free Site Survey &amp; Solar Consultation Available</span>
            </div>
          </div>
        </div>
      </div>
      {/* ─── Gradient strip ─── */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #064E3B, #059669, #0EA5E9, #F59E0B, #059669, #064E3B)', backgroundSize: '200% 100%', animation: 'gradient-flow 6s linear infinite' }} />

      {/* ─── MAIN NAVBAR ─── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/92 backdrop-blur-2xl border-b border-gray-100/50'
            : 'bg-white/98 border-b border-gray-100'
          }`}
        style={scrolled ? { boxShadow: '0 4px 30px rgba(0,0,0,0.07), 0 1px 4px rgba(5,150,105,0.04)' } : {}}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* LOGO */}
            <button
              onClick={() => navigate('/')}
              className="flex-shrink-0"
              title="Urja Vision Home"
            >
              <Logo className="h-10 md:h-11" />
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === group.label ? null : group.label);
                    }}
                    className={`flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all relative group ${
                      activeDropdown === group.label
                        ? 'text-emerald-700'
                        : 'text-gray-700 hover:text-emerald-700'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeDropdown === group.label ? 'rotate-180 text-emerald-600' : 'text-gray-400'}`}
                    />
                    {/* Gradient underline indicator */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                      activeDropdown === group.label ? 'w-5' : 'w-0 group-hover:w-4'
                    }`} style={{ background: 'linear-gradient(90deg, #059669, #F59E0B)' }} />
                  </button>
                  {activeDropdown === group.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 rounded-2xl py-2 menu-animate"
                      style={{
                        background: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(5,150,105,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
                        borderRadius: '16px',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Gradient top accent */}
                      <div className="h-[3px] mx-2 mb-2 rounded-full" style={{ background: 'linear-gradient(90deg, #059669, #0EA5E9, #F59E0B)' }} />
                      {group.items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`w-full text-left px-4 py-3 transition-colors group/item rounded-lg mx-0.5 ${
                            currentPage === item.path
                              ? 'bg-gradient-to-r from-emerald-50 to-green-50'
                              : 'hover:bg-gradient-to-r hover:from-emerald-50/60 hover:to-transparent'
                          }`}
                        >
                          <div className={`text-sm font-semibold ${
                            currentPage === item.path
                              ? 'text-emerald-700'
                              : 'text-gray-800 group-hover/item:text-emerald-700'
                          }`}>
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Calculator button — amber gradient */}
              <button
                onClick={() => navigate('/calculator')}
                className="ml-3 relative overflow-hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:scale-105 group"
                style={{
                  background: currentPage === '/calculator'
                    ? 'linear-gradient(135deg, #92400E, #D97706)'
                    : 'linear-gradient(135deg, #B45309, #D97706, #F59E0B)',
                  boxShadow: '0 4px 16px rgba(245,158,11,0.25)',
                }}
                title="Solar Calculator"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <CalculatorIcon size={18} className="text-white relative z-10" />
                <span className="text-sm font-bold text-white relative z-10">Calculator</span>
              </button>

              {/* Get Free Quote — green gradient */}
              <button
                onClick={() => navigate('/contact')}
                className="ml-2 relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, #047857, #059669, #10B981)',
                  boxShadow: '0 4px 16px rgba(5,150,105,0.25)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10">Get Free Quote</span>
              </button>

              {/* WhatsApp — green gradient */}
              <a
                href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I need solar consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 relative overflow-hidden flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="relative z-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                <span className="relative z-10">WhatsApp</span>
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>

          </div>
        </div>

        {/* ─── MOBILE MENU ─── */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 menu-animate"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
          >
            <div className="container mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
              {/* Gradient accent bar */}
              <div className="h-[2px] rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #059669, #0EA5E9, #F59E0B)' }} />

              {/* Quick contact for mobile */}
              <div className="flex gap-2 mb-4">
                <a
                  href={getPhoneLink(COMPANY_INFO.contact.phone)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-emerald-700"
                  style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.06), rgba(16,185,129,0.1))', border: '1px solid rgba(5,150,105,0.12)' }}
                >
                  <Phone size={15} /> Call Now
                </a>
                <a
                  href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I need solar consultation.')}
                  className="flex-1 flex items-center justify-center gap-2 text-white py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 12px rgba(37,211,102,0.2)' }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="mb-1.5">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                    className={`w-full flex items-center justify-between px-3 py-3 font-bold text-sm rounded-xl transition-all ${
                      mobileExpanded === group.label ? 'text-emerald-700' : 'text-gray-800 hover:text-emerald-700'
                    }`}
                    style={mobileExpanded === group.label ? { background: 'linear-gradient(135deg, rgba(5,150,105,0.04), rgba(16,185,129,0.08))' } : {}}
                  >
                    {group.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileExpanded === group.label ? 'rotate-180 text-emerald-500' : 'text-gray-400'}`}
                    />
                  </button>
                  {mobileExpanded === group.label && (
                    <div className="ml-3 pl-3 space-y-1" style={{ borderLeft: '2px solid', borderImage: 'linear-gradient(180deg, #059669, #F59E0B) 1' }}>
                      {group.items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            currentPage === item.path
                              ? 'text-emerald-700 font-semibold'
                              : 'text-gray-600 hover:text-emerald-700'
                          }`}
                          style={currentPage === item.path ? { background: 'linear-gradient(135deg, rgba(5,150,105,0.06), rgba(16,185,129,0.1))' } : {}}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3 border-t border-gray-100/60 mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate('/calculator')}
                  className="flex items-center justify-center gap-2 text-white py-3 rounded-xl text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #B45309, #D97706, #F59E0B)', boxShadow: '0 4px 12px rgba(245,158,11,0.2)' }}
                >
                  <CalculatorIcon size={18} /> Calculator
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-white py-3 rounded-xl text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #047857, #059669, #10B981)', boxShadow: '0 4px 12px rgba(5,150,105,0.2)' }}
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─── PAGE CONTENT ─── */}
      <main>
        {renderPage()}
      </main>

      {/* ─── FOOTER ─── */}
      <Footer onNavigate={navigate} />

      {/* ─── WHATSAPP FLOAT ─── */}
      <a
        href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I am interested in solar solutions.')}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
      </a>
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_MENU } from '../utils/constants';
import { getPhoneLink, getEmailLink } from '../utils/helpers';
import Logo from './Logo';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (path: string) => void;
}

const Navbar = ({ currentPage = '/', onNavigate }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top contact bar */}
      <div className={`transition-all duration-300 overflow-hidden bg-slate-900 text-white ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center h-full text-xs">
          <div className="flex items-center gap-6">
            <a href={getPhoneLink(COMPANY_INFO.contact.phone)} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Phone size={13} className="text-emerald-500" />
              <span className="font-medium tracking-wide">{COMPANY_INFO.contact.phone}</span>
            </a>
            <a href={getEmailLink(COMPANY_INFO.contact.email)} className="hidden sm:flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Mail size={13} className="text-emerald-500" />
              <span className="font-medium tracking-wide">{COMPANY_INFO.contact.email}</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4 font-semibold tracking-wider text-slate-300">
            {COMPANY_INFO.tagline}
          </div>
        </div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${scrolled ? 'glass shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-white/50' : 'bg-white/50 backdrop-blur-sm border-transparent'}`}>
            <button 
              className="outline-none origin-left transition-transform hover:scale-105" 
              onClick={() => handleNavigation('/')}
              aria-label="Home"
            >
              <Logo className={scrolled ? 'h-9' : 'h-10'} />
            </button>

            <div className="hidden lg:flex items-center gap-2">
              {NAVIGATION_MENU.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-6 py-2 text-[13px] font-black uppercase tracking-[0.15em] transition-all rounded-full ${
                    currentPage === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-900 hover:text-blue-600 hover:bg-slate-50/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => handleNavigation('/contact')}
                className="bg-[#0B1221] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black hover:-translate-y-1 transition-all"
              >
                Get Started
              </button>
            </div>

            <button
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden animate-fade-in">
              <div className="container py-4 space-y-2">
                {NAVIGATION_MENU.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full px-4 py-3.5 text-left text-sm font-bold transition-all rounded-xl ${
                      currentPage === item.path
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                  <button
                    onClick={() => handleNavigation('/contact')}
                    className="w-full btn-primary py-3"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

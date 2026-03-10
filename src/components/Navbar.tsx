import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_MENU } from '../utils/constants';
import { getPhoneLink } from '../utils/helpers';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (path: string) => void;
}

const Navbar = ({ currentPage = '/', onNavigate }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-[#1E8449] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href={getPhoneLink(COMPANY_INFO.contact.phone)} className="flex items-center gap-2 hover:text-[#FFC300] transition">
              <Phone size={14} />
              <span>{COMPANY_INFO.contact.phone}</span>
            </a>
            <a href={`mailto:${COMPANY_INFO.contact.email}`} className="flex items-center gap-2 hover:text-[#FFC300] transition hidden sm:flex">
              <Mail size={14} />
              <span>{COMPANY_INFO.contact.email}</span>
            </a>
          </div>
          <div className="text-xs hidden md:block">
            {COMPANY_INFO.tagline}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="bg-gradient-primary w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">UV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E8449]">{COMPANY_INFO.brandName}</h1>
              <p className="text-xs text-gray-600">Solar Energy Solutions</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION_MENU.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 text-sm font-medium transition rounded hover:bg-[#1E8449] hover:text-white ${
                  currentPage === item.path ? 'bg-[#1E8449] text-white' : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            className="lg:hidden p-2 text-[#1E8449]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col gap-2">
              {NAVIGATION_MENU.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-3 text-left text-sm font-medium transition rounded ${
                    currentPage === item.path
                      ? 'bg-[#1E8449] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

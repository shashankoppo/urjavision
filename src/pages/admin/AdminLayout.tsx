import { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, LayoutDashboard, Package, MessageSquare, 
  Mail, Settings, LogOut, Bell, Image as ImageIcon, Star,
  Search, ShoppingBag, Clock, CheckCircle, ChevronRight
} from 'lucide-react';

import AdminDashboard from './AdminDashboard.tsx';
import AdminPricingCatalog from './AdminPricingCatalog.tsx';
import AdminEnquiries from './AdminEnquiries.tsx';
import AdminSettings from './AdminSettings.tsx';
import Logo from '../../components/Logo';

interface AdminLayoutProps {
  currentPage: string;
  onNavigate: (path: string) => void;
}

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ImageIcon, label: 'Portfolio', path: '/admin/portfolio' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
  { icon: MessageSquare, label: 'Enquiries', path: '/admin/enquiries' },
  { icon: Star, label: 'Reviews', path: '/admin/reviews' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const NOTIFICATIONS = [
  { id: 1, title: 'New Enquiry', desc: 'Ramesh Singh inquiry', time: '2h ago', type: 'enquiry', read: false },
  { id: 2, title: 'Stock Low', desc: 'Adani 545W Panel', time: '4h ago', type: 'stock', read: false },
  { id: 3, title: 'New Review', desc: '5★ rating received', time: '6h ago', type: 'review', read: false },
];

const notifIcons: Record<string, { icon: typeof Bell; color: string }> = {
  enquiry: { icon: MessageSquare, color: 'bg-blue-500/10 text-blue-400' },
  stock: { icon: Package, color: 'bg-amber-500/10 text-amber-400' },
  review: { icon: Star, color: 'bg-purple-500/10 text-purple-400' },
  system: { icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-400' },
};

const AdminLayout = ({ currentPage, onNavigate }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNav = (path: string) => {
    onNavigate(path);
    if (isMobile) setSidebarOpen(false);
  };

  const renderContent = () => {
    if (currentPage === '/admin') return <AdminDashboard onNavigate={handleNav} />;
    if (currentPage.startsWith('/admin/products') || currentPage.startsWith('/admin/portfolio') || currentPage.startsWith('/admin/orders')) return <AdminPricingCatalog currentTab={currentPage} />;
    if (currentPage.startsWith('/admin/enquiries') || currentPage.startsWith('/admin/reviews')) return <AdminEnquiries currentTab={currentPage} />;
    if (currentPage.startsWith('/admin/settings')) return <AdminSettings currentTab={currentPage} />;
    return <AdminDashboard onNavigate={handleNav} />;
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex overflow-hidden font-sans text-gray-300">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 transform bg-[#111827] border-r border-white/5 flex flex-col ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <button onClick={() => handleNav('/admin')} className="outline-none flex items-center gap-2">
            <Logo light showText={sidebarOpen} className="h-8" />
          </button>
          {isMobile && <button onClick={() => setSidebarOpen(false)} className="text-gray-400"><X size={20} /></button>}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = link.path === '/admin' ? currentPage === '/admin' : currentPage.startsWith(link.path);
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${isActive ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                title={link.label}
              >
                <link.icon size={18} className={isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-gray-300'} />
                {sidebarOpen && <span className="text-sm font-semibold">{link.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => onNavigate('/')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-[#0A0F1E] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-400 hover:text-white"><Menu size={20} /></button>
            <div className="hidden md:flex items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Search size={14} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-xs text-gray-300 ml-2 w-48"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-white transition-colors relative"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0A0F1E]" />}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1F2937] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-gray-400">Notifications</span>
                    <button onClick={() => setNotifications([])} className="text-xs text-emerald-400">Clear</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => {
                      const Icon = notifIcons[n.type]?.icon || Bell;
                      return (
                        <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-lg ${notifIcons[n.type]?.color}`}><Icon size={14} /></div>
                            <div>
                              <div className="text-xs font-bold text-gray-200">{n.title}</div>
                              <div className="text-[10px] text-gray-500">{n.desc}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-black">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#0A0F1E] p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

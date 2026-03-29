import { useState, useEffect } from 'react';
import { 
  Menu, X, LayoutDashboard, Package, MessageSquare, 
  Settings, LogOut, Bell, Image as ImageIcon, Star,
  Search, ShoppingBag, CheckCircle, ChevronRight, Globe, Sidebar
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

const notifIcons: Record<string, { icon: any; color: string }> = {
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
      if (mobile) setSidebarOpen(false);
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - Single Unified Source of Truth */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-[70] transition-all duration-300 transform bg-[#111827] border-r border-white/5 flex flex-col shadow-2xl ${
          sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 bg-[#0B1120]">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">U</div>
             {sidebarOpen && <div className="font-black text-white text-lg tracking-tight">URJA <span className="text-emerald-500">ADMIN</span></div>}
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = link.path === '/admin' ? currentPage === '/admin' : currentPage.startsWith(link.path);
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group relative ${
                  isActive 
                  ? 'bg-emerald-500 text-black font-black shadow-lg shadow-emerald-500/10' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <link.icon size={20} className={isActive ? 'text-black' : 'text-gray-500 group-hover:text-emerald-400 transition-colors'} />
                {sidebarOpen && <span className="text-sm tracking-tight">{link.label}</span>}
                {!sidebarOpen && !isMobile && (
                  <div className="absolute left-full ml-4 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {link.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-[#0B1120] border-t border-white/5">
           <button 
             onClick={() => onNavigate('/')} 
             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold"
           >
             <LogOut size={20} />
             {sidebarOpen && <span className="text-sm">Exit Admin</span>}
           </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0A0F1E]">
        {/* Header */}
        <header className="h-20 bg-[#111827]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all border border-white/5"
            >
              {sidebarOpen ? <Sidebar size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="hidden md:flex items-center gap-4">
               <div className="h-8 w-px bg-white/10" />
               <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#059669]">
                  <Globe size={14} />
                  <span>Production Environment</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center bg-white/5 border border-white/5 px-4 py-2 rounded-xl focus-within:border-emerald-500/40 transition-all">
              <Search size={16} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Command Search..." 
                className="bg-transparent border-none focus:outline-none text-sm text-gray-300 ml-3 w-48"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            {/* Notifications */}
            <div className="relative">
              <button 
                className={`p-3 rounded-xl transition-all relative ${notifOpen ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#111827] animate-pulse" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-4 w-96 bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Activity Buffer</span>
                    <button onClick={() => setNotifications([])} className="text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors">Clear Stack</button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? notifications.map(n => {
                      const Icon = notifIcons[n.type]?.icon || Bell;
                      return (
                        <div key={n.id} className="p-6 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="flex gap-4">
                            <div className={`p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${notifIcons[n.type]?.color}`}>
                              <Icon size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-black text-gray-200">{n.title}</span>
                                <span className="text-[10px] font-bold text-gray-500">{n.time}</span>
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed">{n.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-700"><Bell size={24} /></div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">All Systems Clear</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNav('/admin/settings')} className="flex items-center gap-3 pl-2 group">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-lg shadow-emerald-500/10">
                AD
              </div>
              <div className="hidden lg:block text-left">
                 <div className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">Admin User</div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sysop</div>
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#0A0F1E] p-8 lg:p-10 custom-scrollbar relative">
           {/* Background Mesh */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="max-w-7xl mx-auto relative z-10">
             {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

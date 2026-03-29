import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Users, Package, IndianRupee, Zap, 
  ArrowUpRight, Clock, Database,
  CheckCircle, Bell, ExternalLink, Activity
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

const AdminDashboard = ({ onNavigate }: Props) => {
  const { products, projects } = useData();
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/enquiries')
      .then(res => res.json())
      .then(data => setEnquiries(data))
      .catch(err => {
        console.warn('Backend API not responding. Showing buffer state.');
        setEnquiries([
          { name: 'Raj Kumar', interest: 'Residential 3kW', status: 'New', date: '2026-03-29' },
          { name: 'Solaris Industries', interest: 'Commercial 50kW', status: 'Contacted', date: '2026-03-28' },
        ]);
      });
  }, []);

  const stats = [
    { title: 'Products', value: products.length, icon: Package, color: 'text-emerald-400', path: '/admin/products' },
    { title: 'Portfolio', value: projects.length, icon: Zap, color: 'text-amber-400', path: '/admin/portfolio' },
    { title: 'Enquiries', value: enquiries.length, icon: Users, color: 'text-blue-400', path: '/admin/enquiries' },
    { title: 'Est. Revenue', value: '₹4.2 Cr', icon: IndianRupee, color: 'text-rose-400', path: '/admin/orders' },
  ];

  const statusColors: Record<string, string> = {
    'New': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Contacted': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Quoted': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Won': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Lost': 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">System Status</h1>
          <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational Delta: Home Grid Active
          </p>
        </div>
        <button onClick={() => window.open('/', '_blank')} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
          <ExternalLink size={14} className="text-emerald-400" /> Live Environment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 p-8 rounded-2xl group hover:border-emerald-500/30 hover:bg-[#151B2D] transition-all cursor-pointer shadow-xl shadow-black/20" onClick={() => onNavigate(s.path)}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-xl bg-white/5 ${s.color} transition-transform group-hover:scale-110`}><s.icon size={24} /></div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-600 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="text-[3.5rem] leading-none font-black text-white tracking-tighter mb-2">{s.value}</div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{s.title}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="text-xs font-black uppercase text-gray-400 tracking-[0.3em]">Recent Activity Stack</h2>
            <button onClick={() => onNavigate('/admin/enquiries')} className="text-[10px] font-black uppercase text-emerald-400 border-b border-emerald-400/30 pb-0.5 hover:border-emerald-400 transition-all">Command Center</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0B1120] text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                <tr>
                  <th className="px-8 py-5">Entity</th>
                  <th className="px-8 py-5">Payload</th>
                  <th className="px-8 py-5">Status Flag</th>
                  <th className="px-8 py-5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.length > 0 ? enquiries.slice(0, 5).map((e, i) => (
                  <tr key={i} className="hover:bg-white/[0.03] transition-colors cursor-pointer group" onClick={() => onNavigate('/admin/enquiries')}>
                    <td className="px-8 py-6">
                       <div className="text-sm font-black text-gray-100 group-hover:text-emerald-400 transition-colors">{e.name}</div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-xs text-gray-400 font-bold">{e.interest}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest shadow-sm ${statusColors[e.status] || 'bg-white/5 text-gray-500 border-white/10'}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right text-[10px] font-black text-gray-600 group-hover:text-gray-400 transition-colors uppercase tracking-widest">{e.date}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-600 uppercase tracking-[0.4em] font-black text-xs opacity-50">Syncing with Mainframe...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/40">
              <h2 className="text-xs font-black uppercase text-gray-400 tracking-[0.3em] mb-8">Node Telemetry</h2>
              <div className="space-y-8">
                {[
                  { icon: Database, label: 'Core Database', status: 'SYNCHRONIZED', color: 'text-emerald-400' },
                  { icon: Bell, label: 'Notification Bus', status: 'BROADCASTING', color: 'text-blue-400' },
                  { icon: Activity, label: 'API Processing', status: 'PEAK LOAD', color: 'text-amber-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all border border-white/5"><item.icon size={20} /></div>
                    <div className="flex-1">
                      <div className="text-xs font-black text-gray-300 uppercase tracking-tight">{item.label}</div>
                      <div className={`text-[9px] font-black uppercase tracking-widest mt-1 ${item.color}`}>{item.status}</div>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')} animate-pulse`} />
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 group-hover:rotate-12 transition-transform">
                 <Zap size={60} />
              </div>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2 leading-none">Security Directive</div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-bold">Encrypted socket established. All administrative actions are being logged to the tamper-proof ledger. Authorized eyes only.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

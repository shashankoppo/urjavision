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
      .catch(err => console.error('Enquiry fetch failed', err));
  }, []);

  const stats = [
    { title: 'Products', value: products.length, icon: Package, color: 'text-emerald-400', path: '/admin/products' },
    { title: 'Projects', value: projects.length, icon: Zap, color: 'text-amber-400', path: '/admin/portfolio' },
    { title: 'Enquiries', value: enquiries.length, icon: Users, color: 'text-blue-400', path: '/admin/enquiries' },
    { title: 'Revenue Est.', value: '₹4.2 Cr', icon: IndianRupee, color: 'text-rose-400', path: '/admin/orders' },
  ];

  const statusColors: Record<string, string> = {
    'New': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Contacted': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Quoted': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Won': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Lost': 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Operational snapshot of Urja Vision systems.</p>
        </div>
        <button onClick={() => window.open('/', '_blank')} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <ExternalLink size={14} /> Live Site
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 p-6 rounded-xl group hover:border-emerald-500/30 transition-all cursor-pointer" onClick={() => onNavigate(s.path)}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}><s.icon size={20} /></div>
              <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-2xl font-black text-white">{s.value}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{s.title}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest">Recent Leads</h2>
            <button onClick={() => onNavigate('/admin/enquiries')} className="text-xs text-emerald-400 font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#151B2D] text-gray-500 font-bold uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Interest</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.slice(0, 5).map((e, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => onNavigate('/admin/enquiries')}>
                    <td className="px-6 py-4 font-bold text-gray-300">{e.name}</td>
                    <td className="px-6 py-4 text-gray-500">{e.interest}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusColors[e.status] || 'bg-white/5 text-gray-500 border-white/10'}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">{e.date}</td>
                  </tr>
                ))}
                {enquiries.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-600 uppercase tracking-[0.2em] font-black">Buffer Empty</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-xl p-6">
          <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest mb-6">System Health</h2>
          <div className="space-y-6">
            {[
              { icon: Database, label: 'Main DB', status: 'Optimal', color: 'text-emerald-400' },
              { icon: Bell, label: 'Alerts', status: `${enquiries.filter(e => e.status === 'New').length} New`, color: 'text-amber-400' },
              { icon: Activity, label: 'API Server', status: 'Running', color: 'text-blue-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-gray-500"><item.icon size={16} /></div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-300">{item.label}</div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-pulse`} />
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Architecture Note</div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-bold">Systems synchronized. Running on distributed node-matrix. No downtime detected.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

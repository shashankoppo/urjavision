import { useState, useEffect } from 'react';
import { MessageSquare, Star, Search, CheckCircle, XCircle, Phone, Mail, User, Tag, MapPin, Trash2, Loader2, Filter } from 'lucide-react';

interface Props {
  currentTab: string;
}

const STATUS_COLORS: Record<string, string> = {
  'New': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Contacted': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Quoted': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Won': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Lost': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Published': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

const STAR_RATINGS = [1, 2, 3, 4, 5];

const AdminEnquiries = ({ currentTab }: Props) => {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'reviews'>(
    currentTab.includes('reviews') ? 'reviews' : 'enquiries'
  );
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to fetch enquiries', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchEnquiries(), fetchReviews()]);
      setLoading(false);
    };
    init();
  }, []);

  const filteredEnquiries = enquiries.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) ||
     e.email.toLowerCase().includes(search.toLowerCase()) ||
     (e.interest || '').toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || e.status === statusFilter)
  );

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
      if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev: any) => ({ ...prev, status }));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const deleteEnquiry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries(prev => prev.filter(e => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch (err) {
      console.error('Failed to delete enquiry', err);
    }
  };

  const publishReview = async (id: number) => {
    try {
      await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Published' })
      });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'Published' } : r));
    } catch (err) {
      console.error('Failed to publish review', err);
    }
  };

  const deleteReview = async (id: number) => { 
    if (!confirm('Delete this review?')) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to delete review', err);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-600 gap-3 animate-pulse">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
        <p className="text-xs font-black uppercase tracking-[0.2em]">Synchronizing Records</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-gray-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Intelligence Hub</h1>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Leads & Feedback Protocols</p>
        </div>
        <div className="flex p-1 bg-white/5 border border-white/5 rounded-xl">
          {(['enquiries', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[280px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
              />
            </div>
            {activeTab === 'enquiries' && (
              <select
                title="Status Filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none hover:bg-white/10 transition-all cursor-pointer"
              >
                <option value="All">All Status</option>
                {['New', 'Contacted', 'Quoted', 'Won', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
          </div>

          <div className="space-y-2">
            {activeTab === 'enquiries' ? (
              filteredEnquiries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEnquiry(item)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                    selectedEnquiry?.id === item.id 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : 'bg-[#111827] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white text-sm font-black border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                        {item.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-gray-200 group-hover:text-emerald-400 transition-colors">{item.name}</div>
                        <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-0.5">{item.interest}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${STATUS_COLORS[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
                reviews.filter(r => r.name.toLowerCase().includes(search.toLowerCase())).map((review) => (
                <div key={review.id} className="p-6 bg-[#111827] rounded-2xl border border-white/5 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white font-black overflow-hidden">
                        {review.image ? <img src={review.image} alt={review.name} className="w-full h-full object-cover" /> : review.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-gray-200">{review.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {STAR_RATINGS.map((s) => (
                            <Star key={s} size={10} className={s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-800'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {review.status !== 'Published' && (
                        <button onClick={() => publishReview(review.id)} className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 hover:scale-105 transition-all">Publish</button>
                      )}
                      <button onClick={() => deleteReview(review.id)} className="p-2 text-gray-600 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed italic">"{review.comment || review.review}"</p>
                </div>
              ))
            )}
            {!loading && (activeTab === 'enquiries' ? filteredEnquiries : reviews).length === 0 && (
              <div className="text-center py-20 bg-white/[0.01] rounded-2xl border border-dashed border-white/5 text-gray-700 font-black uppercase tracking-widest text-xs">Records Empty</div>
            )}
          </div>
        </div>

        {/* Sidebar Details */}
        <div className="lg:col-span-4">
          <div className="bg-[#111827] rounded-2xl border border-white/5 p-8 sticky top-24">
            {selectedEnquiry ? (
              <div className="animate-fade-in space-y-8 text-gray-400">
                <div className="text-center border-b border-white/5 pb-8 relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl font-black mx-auto mb-4">
                    {selectedEnquiry.name[0]}
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">{selectedEnquiry.name}</h3>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Acquisition Lead</p>
                  <button onClick={() => setSelectedEnquiry(null)} className="absolute -top-2 -right-2 p-2 text-gray-600 hover:text-white"><XCircle size={18} /></button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3">Communication</div>
                    <div className="space-y-2">
                        <a href={`tel:${selectedEnquiry.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all font-bold text-sm">
                            <Phone size={14} className="text-emerald-500" /> +91 {selectedEnquiry.phone}
                        </a>
                        <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all font-bold text-sm truncate">
                            <Mail size={14} className="text-indigo-500" /> {selectedEnquiry.email}
                        </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3">Intelligence</div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 italic leading-relaxed">
                        "{selectedEnquiry.message || 'No additional narrative data.'}"
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 text-center">Update Protocol</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Won', 'Lost', 'Quoted', 'Contacted'].map(status => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedEnquiry.id, status)}
                        className="px-4 py-2 rounded-lg border border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-emerald-500/30 transition-all font-bold"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all mt-6"
                  >
                    <Trash2 size={14} /> Terminate Record
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center animate-fade-in opacity-50">
                <User size={40} className="text-gray-800 mx-auto mb-6" />
                <h4 className="text-white font-black uppercase tracking-widest text-xs">Waiting For Selection</h4>
                <p className="text-gray-600 text-[9px] font-bold mt-2 uppercase tracking-tight">Access Deep Lead Intelligence</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;

import { useState, useEffect } from 'react';
import { Package, Plus, Image as ImageIcon, Search, Edit3, Trash2, X, Save, CheckCircle, MapPin, Calendar, Zap, LayoutGrid, List } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface Props {
  currentTab: string;
}

const CATEGORIES = [
  'Solar Panels', 'Solar Inverters', 'Solar Batteries', 'Solar Mounting Structures', 
  'Solar DC Cables', 'Solar Monitoring Systems', 'Solar Pumps', 'Solar Street Lights',
  'Solar Combos', 'Solar Services'
];
const PROJECT_TYPES = ['Commercial','Residential','Educational','Agriculture','Healthcare','Hospitality','Industrial'];

const AdminPricingCatalog = ({ currentTab }: Props) => {
  const [activeTab, setActiveTab] = useState<'products' | 'portfolio' | 'orders'>( 
    currentTab.includes('portfolio') ? 'portfolio' : 
    currentTab.includes('orders') ? 'orders' : 'products' 
  );
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const { products, setProducts, projects, setProjects } = useData();

  const blankProduct = { name: '', category: CATEGORIES[0], capacity: '', brand: '', description: '', specifications: '', image: '' };
  const blankProject = { title: '', location: '', capacity: '', type: PROJECT_TYPES[0], description: '', image: '', year: new Date().getFullYear().toString() };

  const [newProduct, setNewProduct] = useState({ ...blankProduct });
  const [newProject, setNewProject] = useState({ ...blankProject });

  useEffect(() => {
    fetch('/api/enquiries')
      .then(res => res.json())
      .then(data => setEnquiries(data))
      .catch(err => console.error('Enquiry fetch failed', err));
  }, []);

  const productEnquiries = enquiries.filter(e => 
    (e.interest || '').toLowerCase().includes('buy') || 
    (e.interest || '').toLowerCase().includes('product') ||
    (e.message || '').toLowerCase().includes('price') ||
    (e.message || '').toLowerCase().includes('order')
  );

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  const handleAddProduct = async () => {
    setSaving(true);
    try {
      const specs = newProduct.specifications.split('\n').filter(Boolean);
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, specifications: specs })
      });
      const data = await res.json();
      setProducts([...products, { ...newProduct, id: data.id, specifications: specs }] as any);
      setNewProduct({ ...blankProduct });
      setSaved(true);
      setTimeout(() => { setSaved(false); setShowModal(false); }, 1000);
    } finally {
      setSaving(false);
    }
  };

  const handleAddProject = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      const data = await res.json();
      setProjects([...projects, { ...newProject, id: data.id }] as any);
      setNewProject({ ...blankProject });
      setSaved(true);
      setTimeout(() => { setSaved(false); setShowModal(false); }, 1000);
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter((p: any) =>
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects = projects.filter((p: any) =>
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.type || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-gray-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {activeTab === 'products' ? 'Inventory' : activeTab === 'portfolio' ? 'Portfolio' : 'Orders'}
          </h1>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">
            {activeTab === 'products' ? 'Catalog Management' : activeTab === 'portfolio' ? 'Project Showcase' : 'Purchase Inquiries'}
          </p>
        </div>
        {activeTab !== 'orders' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
          >
            <Plus size={16} /> New {activeTab === 'products' ? 'Item' : 'Project'}
          </button>
        )}
      </div>

      <div className="flex p-1 bg-white/5 border border-white/5 rounded-xl w-fit">
        {[
          { id: 'products', label: 'Products', icon: Package },
          { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
          { id: 'orders', label: 'Orders', icon: Zap },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <tab.icon size={12} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Filter database..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'products' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#151B2D] text-gray-500 font-bold uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Brand / Spec</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((p: any) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-900 border border-white/5" />
                        <div>
                          <div className="font-bold text-gray-200">{p.name}</div>
                          <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">{p.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-300">{p.brand || 'Generic'}</div>
                      <div className="text-[9px] text-gray-500 font-mono italic">{p.capacity}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'portfolio' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#151B2D] text-gray-500 font-bold uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Metrics</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((p: any) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-900 border border-white/5" />
                        <div>
                          <div className="font-bold text-white">{p.title}</div>
                          <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-1"><MapPin size={10} /> {p.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-amber-500 font-black uppercase tracking-widest text-[9px]">{p.type}</div>
                      <div className="text-[10px] text-gray-400 font-bold italic">{p.capacity}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'orders' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#151B2D] text-gray-500 font-bold uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">Requirement</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {productEnquiries.map((e: any) => (
                  <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{e.name}</div>
                      <div className="text-[10px] text-gray-600 font-mono">{e.date}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      <div className="line-clamp-1 italic text-[11px] font-medium">"{e.interest}"</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">Shop Lead</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-white">Add {activeTab === 'products' ? 'Product' : 'Project'}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-1">Direct Database Entry</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {saved ? (
                <div className="py-20 text-center animate-bounce">
                  <CheckCircle size={60} className="text-emerald-500 mx-auto mb-4" />
                  <div className="text-white font-black uppercase tracking-widest">Entry Synchronized</div>
                </div>
              ) : activeTab === 'products' ? (
                <>
                  {[
                    { label: 'Name', key: 'name', type: 'text' },
                    { label: 'Brand', key: 'brand', type: 'text' },
                    { label: 'Capacity', key: 'capacity', type: 'text' },
                    { label: 'Image URL', key: 'image', type: 'text' },
                    { label: 'Specs (one per line)', key: 'specifications', type: 'textarea' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea rows={3} value={(newProduct as any)[f.key]} onChange={e => setNewProduct(p => ({ ...p, [f.key]: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none resize-none font-medium" />
                      ) : (
                        <input type="text" value={(newProduct as any)[f.key]} onChange={e => setNewProduct(p => ({ ...p, [f.key]: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-bold" />
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {[
                    { label: 'Project Title', key: 'title', type: 'text' },
                    { label: 'Location', key: 'location', type: 'text' },
                    { label: 'Capacity', key: 'capacity', type: 'text' },
                    { label: 'Image URL', key: 'image', type: 'text' },
                    { label: 'Year', key: 'year', type: 'text' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">{f.label}</label>
                      <input type="text" value={(newProject as any)[f.key]} onChange={e => setNewProject(p => ({ ...p, [f.key]: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-bold" />
                    </div>
                  ))}
                </>
              )}
            </div>

            {!saved && (
              <div className="p-8 border-t border-white/5 flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 py-4 border border-white/5 rounded-xl text-xs font-black uppercase text-gray-500 hover:text-white transition-all">Cancel</button>
                <button onClick={activeTab === 'products' ? handleAddProduct : handleAddProject} disabled={saving} className="flex-1 py-4 bg-emerald-500 text-black rounded-xl text-xs font-black uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                  {saving ? 'Syncing...' : 'Confirm Entry'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPricingCatalog;

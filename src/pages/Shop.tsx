import { useState, useMemo } from 'react';
import { 
  Search, ShoppingCart, Star, Zap, CheckCircle, X, Plus, Minus, 
  User, MessageCircle, Grid3X3, List, Shield, Truck, Package, 
  Heart, ChevronRight, Info, TrendingUp, Sparkles, Filter
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  'All', 
  'Solar Panels', 
  'Solar Inverters', 
  'Solar Batteries', 
  'Solar Pumps', 
  'Solar Street Lights', 
  'Solar Monitoring Systems',
  'Solar Combos',
  'Solar Services'
];

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  capacity: string;
  image: string;
  description: string;
  specifications?: string[];
}

const Shop = () => {
  const { products } = useData();
  const { cart, addToCart, removeFromCart, updateQty, cartOpen, setCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Logic: Filtered products
  const filtered = useMemo(() => {
    return products.filter((p: Product) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Logic: Smart Suggestions (Logically useful)
  const suggestions = useMemo(() => {
    if (selectedCategory === 'All') return products.slice(0, 4);
    // If panels, suggest inverters & batteries
    if (selectedCategory === 'Solar Panels') {
      return products.filter((p: Product) => p.category === 'Solar Inverters' || p.category === 'Solar Batteries').slice(0, 4);
    }
    return products.filter((p: Product) => p.category !== selectedCategory).slice(0, 4);
  }, [products, selectedCategory]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const cartCount = cart.reduce((acc, c) => acc + c.qty, 0);

  const handleWhatsAppAction = (product: any, action: 'buy' | 'info') => {
    const text = action === 'buy' 
      ? `Hi! I'm interested in buying the ${product.name} (${product.capacity}). Can you share the best price and delivery time?`
      : `Hi! I need more technical details about ${product.name}. Does it come with installation support?`;
    window.open(`https://wa.me/917247391595?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* ─── PREMIUM HERO (Samsung-inspired Dynamic Design) ─── */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>
        
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={12} /> The Future is Solar
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter mb-6">
              Shop Smarter.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Save Brighter.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mb-8 leading-relaxed">
              Explore professional-grade solar components curated for performance, longevity, and maximum ROI.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-950 font-black rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl shadow-white/5"
              >
                Start Exploring
              </button>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-950 bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                    {i === 4 ? '+5k' : <User size={16} />}
                  </div>
                ))}
                <div className="pl-6 flex flex-col justify-center">
                  <div className="text-white font-bold text-sm">Trusted by Thousands</div>
                  <div className="text-emerald-500 text-xs font-black uppercase tracking-widest">Active Installs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOGICAL CATEGORY NABVAR (Sticky) ─── */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container py-4 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap border-2 ${
                  selectedCategory === cat
                    ? 'bg-gray-950 text-white border-gray-950 shadow-lg shadow-gray-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-gray-100 rounded-2xl text-gray-600 hover:bg-gray-200 transition-colors"
              title="Filters"
            >
              <Filter size={18} />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              title="Shopping Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-gray-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-gray-50 border-t border-gray-100 py-6 animate-fade-in">
            <div className="container grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Search Anything</h4>
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Panels, Brands, or IDs..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none text-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Pricing Range</h4>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500">Economy</span>
                  <input type="range" className="flex-1 accent-emerald-600" title="Price range selector" />
                  <span className="text-xs font-bold text-gray-500">Premium</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Brand Filter</h4>
                <div className="flex flex-wrap gap-2">
                  {['Adani', 'Luminous', 'Waaree', 'Microtek', 'Tata'].map(brand => (
                    <button key={brand} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-600 hover:border-emerald-400 transition-colors">
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="container py-12" id="shop-grid">
        {/* ─── CORE SHOPPING GRID ─── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-950 leading-tight">
              {selectedCategory === 'All' ? 'Everything in Stock' : `Premium ${selectedCategory}`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Showing {filtered.length} products found for your needs</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
              title="Grid View"
            >
              <Grid3X3 size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">No Matching Products</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find exactly what you were looking for. Try adjusting your filters or category.</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="px-6 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-colors">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {filtered.map((p: Product) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                viewMode={viewMode}
                onBuy={() => handleWhatsAppAction(p, 'buy')}
                onInfo={() => handleWhatsAppAction(p, 'info')}
                onAddToCart={() => addToCart(p, [])}
                inCart={cart.some(c => c.id === p.id)}
                isWishlisted={wishlist.includes(p.id)}
                onWishlist={() => toggleWishlist(p.id)}
              />
            ))}
          </div>
        )}

        {/* ─── LOGICAL UP-SELL/SUGGESTIONS (Unique Logical Utility) ─── */}
        {suggestions.length > 0 && (
          <section className="mt-24 pt-24 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest mb-3">
                  <TrendingUp size={12} /> Expert Recommendations
                </div>
                <h2 className="text-4xl font-black text-gray-900">Recommended Add-ons</h2>
                <p className="text-gray-500 text-lg mt-3">
                  Based on your interest in <span className="text-emerald-600 font-bold">{selectedCategory}</span>, these products ensure a complete and efficient solar ecosystem.
                </p>
              </div>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="group flex items-center gap-2 text-sm font-black text-gray-900 hover:text-emerald-600 transition-colors"
              >
                Explore More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestions.map((p: Product) => (
                <div key={p.id} className="group relative bg-gray-50 rounded-[32px] p-6 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100">
                  <div className="w-full aspect-square bg-white rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">{p.brand}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-4">{p.name}</h3>
                  <button 
                    onClick={() => { setSelectedCategory(p.category); document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-900 font-black text-xs rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                  >
                    View Options
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ─── TRUST REINFORCEMENT ─── */}
      <section className="bg-gray-950 py-24 mt-24 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              { icon: Shield, title: 'Authorized Distributor', desc: 'Every product comes with official brand warranty and test certificates.', color: 'text-emerald-400' },
              { icon: Package, title: 'Quality Inspection', desc: 'Each component is inspected for physical damage and performance before dispatch.', color: 'text-amber-400' },
              { icon: Truck, title: 'Secure Logistics', desc: 'Insured transit across Madhya Pradesh with specialized solar handling teams.', color: 'text-blue-400' },
            ].map(item => (
              <div key={item.title} className="group">
                <div className={`w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center mb-6 mx-auto md:mx-0 ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer and styles as before... */}
      {/* ... keeping the drawer logic from previous version but making it more premium ... */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 z-[160] bg-gray-950/80 backdrop-blur-md animate-fade-in" onClick={() => setCartOpen(false)} />
          <div className="fixed top-2 right-2 bottom-2 w-full max-w-md z-[170] bg-white rounded-[32px] shadow-2xl flex flex-col animate-slide-right overflow-hidden border border-gray-100">
            <div className="px-8 py-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-950">Draft Order</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cart.length} Components Selected</span>
                </div>
              </div>
              <button onClick={() => setCartOpen(false)} title="Close Cart" className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-950 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Logical Impact Card (Unique Utility) */}
            {cart.length > 0 && (
              <div className="px-8 mb-4">
                <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl shadow-emerald-900/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20"><TrendingUp size={48} /></div>
                  <div className="relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-emerald-300 mb-4">Estimated Monthly Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-black">₹{(cart.reduce((acc, c) => acc + (c.qty * 1200), 0)).toLocaleString()}</div>
                        <div className="text-[10px] uppercase font-bold text-emerald-300/80 mt-1">Savings Approx.</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black">{cart.reduce((acc, c) => acc + (c.qty * 90), 0)} kg</div>
                        <div className="text-[10px] uppercase font-bold text-emerald-300/80 mt-1">CO2 Avoided</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 scrollbar-none">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-6">
                    <ShoppingCart size={40} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">Cart is Empty</h3>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">Start building your solar system by adding components from our shop.</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="group relative flex gap-6 p-4 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-4/5 h-4/5 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{item.brand}</div>
                    <div className="font-black text-gray-950 text-sm leading-tight line-clamp-2 mb-2">{item.name}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center" title="Remove One">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-black text-gray-900 w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors flex items-center justify-center" title="Add More">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors" title="Remove Item">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 space-y-4">
                {/* Installation Upsell (Premium Logic) */}
                {!cart.some(c => c.name.includes('Installation')) && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100 flex items-center justify-between gap-4 group/upsell">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 group-hover/upsell:scale-110 transition-transform">
                        <Zap size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-900">Add Expert Installation</div>
                        <div className="text-[10px] text-gray-500 font-medium">Full setup & commissioning by certified team</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => addToCart({ id: 9999, name: 'Professional Installation Service', brand: 'Urja Vision', category: 'Service', capacity: 'Standard', image: 'https://cdn-icons-png.flaticon.com/512/3259/3259160.png' }, [])}
                      className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 font-bold text-[10px] rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                    >
                      Add +
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <Info size={18} className="text-amber-600 shrink-0" />
                  <p className="text-xs font-bold text-amber-700">Shipping calculated based on delivery location in MP.</p>
                </div>
                <button 
                  onClick={() => {
                    const text = `Hi! I want to confirm an order for:\n${cart.map(c => `- ${c.name} (Qty: ${c.qty})`).join('\n')}\nPlease share final quotation.`;
                    window.open(`https://wa.me/917247391595?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full py-5 bg-gray-950 text-white font-black rounded-3xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl"
                  title="Checkout via WhatsApp"
                >
                  <MessageCircle size={20} /> Checkout via WhatsApp
                </button>
                <div className="text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Response time: &lt; 2 Hours</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Sub-component for Product Card to keep main clean
const ProductCard = ({ product, viewMode, onBuy, onInfo, onAddToCart, inCart, isWishlisted, onWishlist }: any) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-6 flex gap-8 hover:shadow-2xl hover:-translate-y-1 transition-all group">
        <div className="w-56 h-48 bg-gray-50 rounded-[24px] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-white transition-colors duration-500 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 py-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{product.brand}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.category}</span>
          </div>
          <h3 className="text-xl font-black text-gray-950 mb-3 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 max-w-xl">{product.description}</p>
          <div className="flex flex-wrap gap-6 mb-2">
             <div className="flex items-center gap-2">
               <div className="p-1.5 bg-gray-100 rounded-lg text-emerald-600"><Zap size={14} /></div>
               <span className="text-xs font-black text-gray-950">{product.capacity}</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="p-1.5 bg-gray-100 rounded-lg text-amber-500"><Star size={14} /></div>
               <span className="text-xs font-black text-gray-950">4.9 Rating</span>
             </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center min-w-[180px]">
          <button onClick={onBuy} className="w-full py-3.5 bg-gray-950 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all text-xs" title="Buy via WhatsApp">
            Confirm Order
          </button>
          <button onClick={onAddToCart} className={`w-full py-3.5 border-2 font-black rounded-2xl transition-all text-xs ${inCart ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-900 hover:text-gray-900'}`} title="Add to Cart">
            {inCart ? 'View in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-[40px] border border-gray-100 p-2 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-square bg-gray-50 rounded-[34px] flex items-center justify-center group-hover:bg-white transition-colors duration-500 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-700" />
        
        {/* Wishlist Action */}
        <button 
          onClick={onWishlist}
          title="Save to Wishlist"
          className={`absolute top-5 right-5 w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Info Overlay */}
        <button 
          onClick={onInfo}
          title="Technical Details"
          className="absolute top-5 left-5 w-10 h-10 bg-white/90 rounded-2xl flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 shadow-lg"
        >
          <Info size={18} />
        </button>

        {/* Badge */}
        {inCart && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white shadow-xl rounded-full flex items-center gap-2 border border-gray-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest whitespace-nowrap animate-bounce-subtle">
            <CheckCircle size={14} /> Ready to Order
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-2 py-1 bg-emerald-50 rounded-lg">{product.brand}</span>
          <span className="text-[10px] font-black text-gray-300">|</span>
          <span className="text-xs font-black text-gray-950">{product.capacity}</span>
        </div>
        
        <h3 className="text-lg font-black text-gray-950 leading-tight mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto pt-6 border-t border-gray-50 grid grid-cols-2 gap-3">
          <button 
            onClick={onBuy}
            className="col-span-1 py-3.5 bg-gray-950 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-gray-200"
            title="Immediate Purchase"
          >
            Buy Now
          </button>
          <button 
            onClick={onAddToCart}
            className={`col-span-1 py-3.5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border-2 ${
              inCart ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-950 hover:text-gray-950'
            }`}
            title="Save for Later"
          >
            {inCart ? 'Added' : 'Add Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;

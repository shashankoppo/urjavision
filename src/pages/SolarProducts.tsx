import { useState } from 'react';
import { Search, ShoppingCart, Star, Zap, Shield, CheckCircle, X, Plus, Minus, Package, Phone, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';

// Upsell options per category
const UPSELL_MAP: Record<string, { label: string; desc: string; icon: string }[]> = {
  'Solar Panels': [
    { label: 'Professional Installation', desc: 'Certified in-home installation by expert technicians', icon: '🔧' },
    { label: '5-Year AMC Plan', desc: 'Annual maintenance & cleaning included', icon: '🛡️' },
    { label: 'Net Meter Registration', desc: 'We handle all grid connection paperwork', icon: '📋' },
  ],
  'Solar Inverters': [
    { label: 'Installation & Wiring', desc: 'Full inverter wiring & commissioning service', icon: '⚡' },
    { label: 'Battery Integration Setup', desc: 'Pair with battery system for backup power', icon: '🔋' },
    { label: 'Wi-Fi Monitoring Setup', desc: 'Remote app monitoring and alerts', icon: '📱' },
  ],
  'Solar Batteries': [
    { label: 'Battery Installation', desc: 'Safe, certified battery bank installation', icon: '🔧' },
    { label: 'BMS Configuration', desc: 'Battery Management System programming', icon: '⚙️' },
    { label: 'Extended 3-Year Warranty', desc: 'Additional coverage beyond manufacturer warranty', icon: '🛡️' },
  ],
  default: [
    { label: 'Professional Installation', desc: 'Expert installation by trained technicians', icon: '🔧' },
    { label: '1-Year AMC', desc: 'Annual maintenance & support plan', icon: '🛡️' },
    { label: 'Government Subsidy Help', desc: 'We handle all subsidy paperwork for you', icon: '📋' },
  ]
};

const CATEGORIES = ['All', 'Solar Panels', 'Solar Inverters', 'Solar Batteries', 'Solar Pumps', 'Solar Street Lights', 'Solar Monitoring Systems', 'Solar Mounting Structures', 'Solar DC Cables'];

const SolarProducts = () => {
  const { products: solarProducts } = useData();
  const { cart, addToCart, removeFromCart, updateQty, cartOpen, setCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [step, setStep] = useState<'detail' | 'upsell' | 'confirm'>('detail');

  const filtered = solarProducts.filter((p: any) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const openProduct = (product: any) => {
    setSelectedProduct(product);
    setSelectedAddOns([]);
    setStep('detail');
  };

  const closeModal = () => { setSelectedProduct(null); setStep('detail'); setSelectedAddOns([]); };

  const toggleAddOn = (label: string) => {
    setSelectedAddOns(prev => prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedAddOns);
    setStep('confirm');
    setTimeout(() => { closeModal(); }, 1800);
  };

  const upsells = selectedProduct
    ? (UPSELL_MAP[selectedProduct.category as keyof typeof UPSELL_MAP] || UPSELL_MAP['default'])
    : [];

  const cartCount = cart.reduce((acc, c) => acc + c.qty, 0);

  return (
    <div className="products-page">
      {/* ─────────────────── HERO ─────────────────── */}
      <section className="products-hero relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Solar Products"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 products-hero-grad" />
        </div>
        <div className="container relative z-10 py-20 md:py-28 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-5">
            <Zap size={12} /> Premium Solar Products
          </div>
          <h1 className="text-white mb-4 max-w-3xl mx-auto">
            Power Your Future with the Best Solar
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Top-tier solar panels, inverters & batteries — backed by manufacturer warranties, expert installation & government subsidy support.
          </p>
          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['✅ Genuine Products', '🏆 Top Brands', '📋 Subsidy Help', '🛡️ 5-Year Support'].map(pill => (
              <span key={pill} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── FILTER BAR ─────────────────── */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-shrink-0 w-full sm:w-56">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-sm transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Category pills — horizontally scrollable */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex-shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 text-gray-900 text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────── PRODUCTS GRID ─────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">{filtered.length} products available</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-gray-700">No products found</h3>
              <p className="text-gray-400 mt-2 text-sm">Try a different search or category</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-5 btn-primary text-sm px-6 py-2.5">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product: any, i: number) => {
                const inCart = cart.some(c => c.id === product.id);
                return (
                  <div
                    key={product.id}
                    className={`product-card group animate-fade-up delay-${(i % 4 + 1) * 100}`}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden rounded-t-2xl flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-sm">
                        {product.category}
                      </span>
                      {inCart && (
                        <span className="absolute top-3 right-3 w-6 h-6 bg-amber-400 text-gray-900 font-black text-[10px] rounded-full flex items-center justify-center shadow-sm">
                          ✓
                        </span>
                      )}
                      <button
                        onClick={() => openProduct(product)}
                        className="absolute bottom-2.5 right-2.5 bg-white/90 hover:bg-white text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0"
                      >
                        Quick View
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">{product.brand}</div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="font-black text-emerald-600 text-xs mb-2">{product.capacity}</div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, idx) => <Star key={idx} size={10} className="text-amber-400 fill-amber-400" />)}
                        <span className="text-[10px] text-gray-400 ml-1">4.8</span>
                      </div>

                      {/* Top 2 specs */}
                      <div className="flex flex-col gap-1 mb-4 flex-1">
                        {(product.specifications || []).slice(0, 2).map((spec: string) => (
                          <div key={spec} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                            <CheckCircle size={9} className="text-emerald-500 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <button
                          onClick={() => openProduct(product)}
                          className="py-2 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => inCart ? setCartOpen(true) : openProduct(product)}
                          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${inCart
                            ? 'bg-amber-400 text-gray-900 hover:bg-amber-500'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20'}`}
                        >
                          <ShoppingCart size={11} />
                          {inCart ? 'In Cart' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────── TRUST SECTION ─────────────────── */}
      <section className="section-padding-sm bg-white border-t border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'Genuine Products', desc: 'Direct from authorized distributors', color: 'text-emerald-600 bg-emerald-50' },
              { icon: Star, title: 'Top Brands Only', desc: 'Adani, Vikram, Luminous & more', color: 'text-amber-600 bg-amber-50' },
              { icon: CheckCircle, title: 'Subsidy Assistance', desc: 'All paperwork handled by us', color: 'text-blue-600 bg-blue-50' },
              { icon: Zap, title: '24/7 AMC Support', desc: 'Annual maintenance & emergency calls', color: 'text-purple-600 bg-purple-50' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── PRODUCT MODAL ─────────────────── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Product image header */}
            <div className="relative h-52 flex-shrink-0">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">{selectedProduct.category}</span>
                <h3 className="text-white font-black mt-1 text-xl leading-tight drop-shadow">{selectedProduct.name}</h3>
              </div>
            </div>

            <div className="p-6">
              {step === 'confirm' ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl mb-4">✓</div>
                  <h3 className="font-black text-gray-900 text-xl mb-1">Added to Cart!</h3>
                  <p className="text-gray-500 text-sm">Our team will contact you with a custom quote.</p>
                </div>
              ) : step === 'detail' ? (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs font-black text-amber-600 uppercase tracking-widest mb-0.5">{selectedProduct.brand}</div>
                      <div className="font-black text-emerald-600">{selectedProduct.capacity}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{selectedProduct.description}</p>

                  <div className="mb-5">
                    <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><CheckCircle size={15} className="text-emerald-500" /> Specifications</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {(selectedProduct.specifications || []).map((spec: string) => (
                        <div key={spec} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2">
                          <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                          <span className="text-sm text-gray-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStep('upsell')}
                      className="py-3 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                    <a
                      href="tel:+917247391595"
                      className="py-3 border-2 border-emerald-200 text-emerald-700 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone size={15} /> Call Now
                    </a>
                  </div>
                </>
              ) : (
                /* UPSELL STEP */
                <>
                  <div className="mb-4">
                    <h3 className="font-black text-gray-900 text-lg mb-0.5">Enhance Your Purchase</h3>
                    <p className="text-sm text-gray-500">Add professional services to maximize your solar ROI</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {upsells.map(item => (
                      <label
                        key={item.label}
                        className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedAddOns.includes(item.label)
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 accent-emerald-600 w-4 h-4 shrink-0"
                          checked={selectedAddOns.includes(item.label)}
                          onChange={() => toggleAddOn(item.label)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-bold text-gray-900 text-sm">{item.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                        {selectedAddOns.includes(item.label) && (
                          <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Suggested combo */}
                  <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Package size={14} className="text-amber-600" />
                      <span className="text-xs font-black text-amber-800 uppercase tracking-wide">💡 Recommended Bundle</span>
                    </div>
                    <p className="text-xs text-amber-700">Customers who buy this product also get <strong>Installation + AMC Plan</strong> — our most popular combination for guaranteed ROI within 4 years.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStep('detail')}
                      className="py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="py-3 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Confirm & Add
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── CART DRAWER ─────────────────── */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md z-[170] bg-white shadow-2xl flex flex-col animate-slide-right">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
              <div className="flex items-center gap-3">
                <ShoppingCart size={22} />
                <div>
                  <div className="font-black text-lg">Your Cart</div>
                  <div className="text-emerald-200 text-xs">{cart.length} item{cart.length !== 1 ? 's' : ''} · Custom quote on request</div>
                </div>
              </div>
              <button onClick={() => setCartOpen(false)} title="Close cart" className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={48} className="text-gray-200 mb-4" />
                  <h3 className="text-gray-700 font-bold mb-1">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm">Browse products and add them here</p>
                  <button onClick={() => setCartOpen(false)} className="mt-5 btn-primary text-sm px-6 py-2.5">Browse Products</button>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-16 h-14 object-cover rounded-xl shrink-0 border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm leading-snug truncate">{item.name}</div>
                    <div className="text-xs text-emerald-600 font-bold">{item.capacity}</div>
                    {item.addOns.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.addOns.map(a => (
                          <span key={a} className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">+{a.split(' ')[0]}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-lg bg-gray-200 hover:bg-red-100 flex items-center justify-center transition-colors" title="Decrease">
                        <Minus size={11} />
                      </button>
                      <span className="text-sm font-bold text-gray-900 w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-lg bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors" title="Increase">
                        <Plus size={11} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} title="Remove" className="ml-auto p-1 text-gray-300 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTAs */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Zap size={14} className="text-amber-500 shrink-0" />
                  <span>Pricing is custom — our expert will call you with the <strong>best quote</strong> within 2 hours.</span>
                </div>
                <a
                  href="tel:+917247391595"
                  className="w-full btn-primary text-sm py-3 flex items-center justify-center gap-2"
                >
                  <Phone size={16} /> Call for Quote — +91 72473 91595
                </a>
                <a
                  href={`https://wa.me/917247391595?text=${encodeURIComponent('Hi, I want a quote for: ' + cart.map(c => c.name + (c.addOns.length ? ' (+ ' + c.addOns.join(', ') + ')' : '')).join(', '))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-sm font-bold transition-colors shadow-md shadow-green-500/20"
                >
                  <MessageCircle size={16} /> WhatsApp Quote Request
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SolarProducts;

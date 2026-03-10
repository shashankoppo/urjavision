import { useState } from 'react';
import { Search, Filter, ShoppingCart, ChevronDown, Star, Zap, Shield, CheckCircle } from 'lucide-react';
import { solarProducts } from '../utils/data';
import { PRODUCT_CATEGORIES } from '../utils/constants';

const SolarProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const categories = ['All', ...PRODUCT_CATEGORIES];

  const filtered = solarProducts.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-hero text-white section-padding overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Solar Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <Zap size={12} /> Our Product Range
          </div>
          <h1 className="text-white mb-4">Premium Solar Products</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Carefully curated, top-tier solar panels, inverters, batteries, and accessories — all backed by manufacturer warranties.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white sticky top-16 z-30 shadow-sm border-b border-gray-100">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 md:max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-sm transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-sm text-gray-400 md:ml-auto flex-shrink-0">
              {filtered.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3>No products found</h3>
              <p className="text-gray-500 mt-2">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <div key={product.id} className={`card group animate-fade-up delay-${(i % 4 + 1) * 100}`}>
                  <div className="img-overlay h-48">
                    <img src={product.image} alt={product.name} />
                    <span className="absolute top-3 left-3 z-10 badge badge-green">{product.category}</span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0"
                    >
                      Quick View
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">{product.brand}</div>
                    <h3 className="font-bold text-gray-900 mb-1 text-base leading-snug group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                    <div className="font-black text-emerald-600 text-sm mb-2">{product.capacity}</div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                    {/* Mini specs */}
                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                      {product.specifications.slice(0, 2).map((spec: string) => (
                        <span key={spec} className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded-lg text-center truncate">
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={11} className="star-filled fill-amber-400" />)}
                      <span className="text-xs text-gray-400 ml-1">(4.8)</span>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full btn-primary text-sm py-2.5"
                    >
                      <ShoppingCart size={14} /> Request Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">Why Choose Us</div>
            <h2>Buy with Confidence</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Genuine Products', desc: 'Direct from authorized distributors — 100% authentic', color: 'icon-wrapper-green' },
              { icon: Star, title: 'Best Brands', desc: 'Top-rated solar brands backed by global R&D', color: 'icon-wrapper-amber' },
              { icon: CheckCircle, title: 'Subsidy Assistance', desc: 'We handle all paperwork for govt. subsidies', color: 'icon-wrapper-green' },
              { icon: Zap, title: 'AMC & Support', desc: '24/7 maintenance and after-sales support', color: 'icon-wrapper-amber' },
            ].map((item) => (
              <div key={item.title} className="card p-6 text-center">
                <div className={`icon-wrapper ${item.color} mx-auto mb-4`}>
                  <item.icon size={24} />
                </div>
                <h4 className="mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60 transition-colors"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <span className="absolute bottom-3 left-3 badge badge-green">{selectedProduct.category}</span>
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">{selectedProduct.brand}</div>
              <h3 className="mb-1">{selectedProduct.name}</h3>
              <div className="font-black text-emerald-600 text-lg mb-3">{selectedProduct.capacity}</div>
              <p className="text-sm text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="mb-5">
                <h5 className="font-bold text-gray-900 mb-2 text-sm">Specifications:</h5>
                <ul className="space-y-1.5">
                  {selectedProduct.specifications.map((spec: string) => (
                    <li key={spec} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" /> {spec}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3">
                <a
                  href="tel:+917247391595"
                  className="flex-1 btn-primary py-3 text-sm"
                >
                  <ShoppingCart size={15} /> Request Quote
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarProducts;

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Filter,
  Grid3X3,
  Heart,
  Info,
  List,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  X,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  'All',
  'Solar Panels',
  'Solar Inverters',
  'Solar Batteries',
  'Solar Mounting Structures',
  'Solar Pumps',
  'Solar Monitoring Systems',
  'Solar Street Lights'
] as const;

type Category = typeof CATEGORIES[number];

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

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  inCart: boolean;
  isWishlisted: boolean;
  onWishlist: () => void;
  onBuy: () => void;
  onInfo: () => void;
  onAddToCart: () => void;
}

const ProductCard = ({
  product,
  viewMode,
  inCart,
  isWishlisted,
  onWishlist,
  onBuy,
  onInfo,
  onAddToCart
}: ProductCardProps) => {
  const specs = (product.specifications ?? []).slice(0, 3);

  if (viewMode === 'list') {
    return (
      <article className="rounded-[32px] border border-[var(--border-soft)] bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative overflow-hidden rounded-[24px] bg-[var(--bg-soft)] lg:h-56 lg:w-64">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            <button
              onClick={onWishlist}
              className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full ${
                isWishlisted ? 'bg-[var(--brand-red)] text-white' : 'bg-white/90 text-[var(--text-muted)]'
              }`}
              title="Toggle wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[rgba(34,197,94,0.10)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
                {product.brand}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{product.category}</span>
            </div>
            <h3 className="mt-4 text-2xl font-black tracking-[-0.03em]">{product.name}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">{product.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-soft)] px-4 py-2 text-sm font-bold text-[var(--text-primary)]">
                <Zap size={15} className="text-[var(--brand-red)]" />
                {product.capacity}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-soft)] px-4 py-2 text-sm font-bold text-[var(--text-primary)]">
                <Star size={15} className="text-[var(--warm-gold)]" />
                Buyer-ready listing
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {specs.map((spec) => (
                <span key={spec} className="rounded-full border border-[var(--border-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={onBuy} className="btn-primary">
                Request Quote
              </button>
              <button onClick={onAddToCart} className="btn-outline-dark">
                {inCart ? 'Added To Draft Order' : 'Add To Draft Order'}
              </button>
              <button onClick={onInfo} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-red)]">
                <Info size={16} />
                Ask Details
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-white shadow-[0_16px_36px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_56px_rgba(15,23,42,0.10)]">
      <div className="relative overflow-hidden bg-[var(--bg-soft)]">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/38 to-transparent" />
        <button
          onClick={onWishlist}
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg ${
            isWishlisted ? 'bg-[var(--brand-red)] text-white' : 'bg-white/92 text-[var(--text-muted)]'
          }`}
          title="Toggle wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        {inCart && (
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
            <BadgeCheck size={14} />
            In draft order
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[rgba(34,197,94,0.10)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            {product.brand}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{product.category}</span>
        </div>

        <h3 className="mt-4 text-2xl font-black tracking-[-0.03em]">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{product.description}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--bg-soft)] px-4 py-2 text-sm font-bold text-[var(--text-primary)]">
          <Zap size={15} className="text-[var(--brand-red)]" />
          {product.capacity}
        </div>

        <div className="mt-5 space-y-2">
          {specs.map((spec) => (
            <div key={spec} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand-green)]" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={onBuy} className="btn-primary w-full">
            Quote
          </button>
          <button onClick={onAddToCart} className="btn-outline-dark w-full">
            {inCart ? 'Added' : 'Draft'}
          </button>
        </div>

        <button onClick={onInfo} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-red)]">
          Ask technical details
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
};

const Shop = () => {
  const { products } = useData();
  const { cart, addToCart, removeFromCart, updateQty, cartOpen, setCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-hero-copy', {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });

      gsap.from('.shop-metric', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from('.shop-section-card', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.2
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.capacity.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [products, searchQuery, selectedCategory]);

  const recommendedProducts = useMemo(() => {
    if (selectedCategory === 'Solar Panels') {
      return products.filter((product: Product) => ['Solar Inverters', 'Solar Batteries'].includes(product.category)).slice(0, 3);
    }

    if (selectedCategory === 'All') {
      return products.slice(0, 3);
    }

    return products.filter((product: Product) => product.category !== selectedCategory).slice(0, 3);
  }, [products, selectedCategory]);

  const categoryStats = useMemo(() => {
    const count = filteredProducts.length;
    const brands = new Set(filteredProducts.map((product: Product) => product.brand)).size;
    const withWarranty = filteredProducts.filter((product: Product) =>
      (product.specifications ?? []).some((spec) => spec.toLowerCase().includes('warranty'))
    ).length;

    return { count, brands, withWarranty };
  }, [filteredProducts]);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartSavings = cart.reduce((total, item) => total + item.qty * 1200, 0);

  const toggleWishlist = (id: number) => {
    setWishlist((current) => (current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]));
  };

  const handleWhatsAppAction = (product: Product, mode: 'quote' | 'details') => {
    const message =
      mode === 'quote'
        ? `Hi! I want a quotation for ${product.name} (${product.capacity}). Please share price, delivery time, and installation support.`
        : `Hi! I need technical details for ${product.name} (${product.capacity}). Please share suitability, warranty, and installation guidance.`;

    window.open(`https://wa.me/917247391595?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[var(--bg-cream)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-[linear-gradient(135deg,#112113_0%,#172033_48%,#3b1f12_100%)] text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-16 top-10 h-80 w-80 rounded-full bg-[rgba(34,197,94,0.14)] blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[rgba(249,115,22,0.18)] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="shop-hero-copy inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--warm-gold)] backdrop-blur">
                <Sparkles size={14} />
                Premium solar store
              </div>
              <h1 className="shop-hero-copy mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.05em] text-white md:text-7xl">
                A cleaner, sharper solar shopping experience for serious buyers.
              </h1>
              <p className="shop-hero-copy mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                Explore panels, inverters, batteries, structures, and solar accessories in a storefront designed to feel credible, commercial, and easy to act on.
              </p>
              <div className="shop-hero-copy mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Explore Products
                </button>
                <button onClick={() => setCartOpen(true)} className="btn-warm">
                  Open Draft Order
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="shop-metric overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative overflow-hidden rounded-[24px]">
                    <img
                      src="https://images.pexels.com/photos/17762230/pexels-photo-17762230.jpeg?auto=compress&cs=tinysrgb&w=1000"
                      alt="Rooftop solar installation for Indian homes"
                      className="h-full min-h-[250px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-red)]">
                        Ghar aur rooftop focus
                      </div>
                      <div className="mt-3 max-w-xs text-2xl font-black text-white">Visuals that feel closer to Indian rooftop buying.</div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <img
                        src="https://images.pexels.com/photos/9799994/pexels-photo-9799994.jpeg?auto=compress&cs=tinysrgb&w=1000"
                        alt="Commercial rooftop solar installation"
                        className="h-[150px] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-sm font-black text-white">Commercial solar for shops and business roofs</div>
                    </div>

                    <div className="rounded-[24px] bg-[rgba(255,255,255,0.12)] p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--warm-gold)]">Indian touch</div>
                      <div className="mt-4 space-y-3">
                        {[
                          'Bharat-first color language',
                          'Jabalpur and MP buyer context',
                          'Home, business, and farm use cases'
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-3 text-sm font-medium text-white/82">
                            <span className="mt-1 h-2 w-2 rounded-full bg-[var(--warm-gold)]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Curated categories', value: `${CATEGORIES.length - 1}+`, detail: 'Organized for faster product discovery' },
                  { label: 'Buyer support', value: 'Quote-first', detail: 'Ideal for B2B and project procurement' },
                  { label: 'Visual clarity', value: 'Pro cards', detail: 'Larger images and cleaner hierarchy' },
                  { label: 'Execution help', value: 'Available', detail: 'Installation and project guidance on request' }
                ].map((item) => (
                  <div key={item.label} className="shop-metric rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">{item.label}</div>
                    <div className="mt-3 text-3xl font-black text-white">{item.value}</div>
                    <div className="mt-2 text-sm leading-6 text-white/68">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-[var(--border-soft)] bg-white/88 backdrop-blur-xl">
        <div className="container py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                    selectedCategory === category
                      ? 'bg-[linear-gradient(135deg,#172033,#ea580c)] text-white shadow-[0_12px_24px_rgba(23,32,51,0.16)]'
                      : 'border border-[var(--border-soft)] bg-[var(--bg-soft)] text-[var(--text-secondary)] hover:border-[rgba(234,88,12,0.20)] hover:text-[var(--brand-red)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative min-w-[260px] flex-1 lg:flex-none">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by product, brand, capacity"
                  className="w-full rounded-full border border-[var(--border-soft)] bg-[var(--bg-soft)] py-3 pl-11 pr-4 text-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters((visible) => !visible)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-soft)] text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-red)]"
                title="Toggle filters"
              >
                <Filter size={18} />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#15803d,#22c55e)] text-white shadow-[0_14px_26px_rgba(34,197,94,0.26)]"
                title="Open draft order"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--warm-gold)] text-[10px] font-black text-[var(--text-primary)]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-4 rounded-[28px] border border-[var(--border-soft)] bg-[var(--bg-soft)] p-5 md:grid-cols-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Search focus</div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Try capacity terms like `545W`, `5kW`, `150Ah`, or category names for faster filtering.</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Current selection</div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{selectedCategory === 'All' ? 'Browsing all categories' : `Browsing ${selectedCategory}`}</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Suggested workflow</div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Shortlist products, add them to draft order, then confirm on WhatsApp for a final quotation.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="container py-10 md:py-14" id="shop-grid">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="shop-section-card h-fit rounded-[32px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">Store analysis</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Professional product discovery, now less cluttered.</h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              The shop now uses stronger spacing, bigger image zones, cleaner metadata, and a quote-first buying path that fits solar procurement better than a generic e-commerce layout.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: 'Products visible', value: categoryStats.count },
                { label: 'Brands in view', value: categoryStats.brands },
                { label: 'Warranty listed', value: categoryStats.withWarranty }
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] bg-[var(--bg-soft)] p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">{item.label}</div>
                  <div className="mt-2 text-3xl font-black text-[var(--text-primary)]">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {[
                'Larger product images for better visual trust',
                'Simpler card actions for quote and cart intent',
                'Draft order drawer for project-style buying'
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm font-medium text-[var(--text-primary)]">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="shop-section-card">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {selectedCategory === 'All' ? 'All products' : selectedCategory}
                </div>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  {selectedCategory === 'All' ? 'Solar products with a cleaner premium layout' : `${selectedCategory} done in a more professional way`}
                </h2>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Showing {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'} with a clearer product hierarchy and stronger visual rhythm.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white p-1.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-[var(--bg-soft)] text-[var(--brand-red)]' : 'text-[var(--text-muted)]'
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-[var(--bg-soft)] text-[var(--brand-red)]' : 'text-[var(--text-muted)]'
                  }`}
                  title="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-[var(--border-strong)] bg-white p-14 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--text-muted)]">
                  <Package size={34} />
                </div>
                <h3 className="mt-6 text-2xl font-black">No matching products found</h3>
                <p className="mx-auto mt-3 max-w-md text-[var(--text-secondary)]">
                  Try a broader search, change the category, or clear the filter and start again.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="btn-primary mt-6"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'flex flex-col gap-5'}>
                {filteredProducts.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    inCart={cart.some((item) => item.id === product.id)}
                    isWishlisted={wishlist.includes(product.id)}
                    onWishlist={() => toggleWishlist(product.id)}
                    onBuy={() => handleWhatsAppAction(product, 'quote')}
                    onInfo={() => handleWhatsAppAction(product, 'details')}
                    onAddToCart={() => addToCart(product, [])}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {recommendedProducts.length > 0 && (
          <section className="shop-section-card mt-16 rounded-[36px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,#ffffff_0%,#fff7ed_100%)] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-red)]">
                  <Sparkles size={14} />
                  Recommended next
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Suggested add-ons for a more complete solar setup.</h2>
                <p className="mt-3 text-[var(--text-secondary)]">
                  Based on what you are viewing, these products are strong supporting choices for a more practical and complete system.
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory('All')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-red)]"
              >
                Explore all categories
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {recommendedProducts.map((product: Product) => (
                <div key={product.id} className="rounded-[28px] border border-[var(--border-soft)] bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
                  <div className="overflow-hidden rounded-[22px] bg-[var(--bg-soft)]">
                    <img src={product.image} alt={product.name} className="h-52 w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">{product.category}</div>
                  <h3 className="mt-2 text-xl font-black">{product.name}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{product.description}</p>
                  <button
                    onClick={() => {
                      setSelectedCategory(product.category as Category);
                      document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-outline-dark mt-5 w-full"
                  >
                    View Similar Products
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="shop-section-card mt-16 rounded-[36px] bg-[linear-gradient(135deg,#172033_0%,#1c2e1f_52%,#3b2418_100%)] p-8 text-white shadow-[0_30px_70px_rgba(15,23,42,0.14)] md:p-10">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Warranty-friendly sourcing',
                desc: 'Products are presented with specification-first details to help buyers shortlist with more confidence.'
              },
              {
                icon: Truck,
                title: 'Better delivery discussion',
                desc: 'The quote-first path makes it easier to confirm location, logistics, and installation support before checkout.'
              },
              {
                icon: Zap,
                title: 'Project-style buying flow',
                desc: 'A draft order works better than a generic cart for solar procurement and bundled commercial requirements.'
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--warm-gold)]">
                  <item.icon size={24} />
                </div>
                <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {cartOpen && (
        <>
          <div className="fixed inset-0 z-[160] bg-black/55 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="fixed bottom-2 right-2 top-2 z-[170] flex w-full max-w-md flex-col overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
            <div className="border-b border-[var(--border-soft)] px-7 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-red)]">Draft order</div>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Solar shortlist</h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{cartCount} item{cartCount === 1 ? '' : 's'} selected for quotation.</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--text-secondary)]"
                  title="Close cart"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {cart.length > 0 && (
              <div className="px-7 pb-3 pt-5">
                <div className="rounded-[28px] bg-[linear-gradient(135deg,#172033_0%,#15803d_100%)] p-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Quick impact view</div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-black">Rs {cartSavings.toLocaleString()}</div>
                      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">Approx monthly savings</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black">{cart.reduce((total, item) => total + item.qty * 90, 0)} kg</div>
                      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">Approx CO2 offset</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-7 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--text-muted)]">
                    <ShoppingCart size={36} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black">No products added yet</h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-secondary)]">
                    Add products to build a professional draft order before requesting a final quotation.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--bg-soft)] p-4">
                      <div className="flex gap-4">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[20px] bg-white">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">{item.brand}</div>
                          <div className="mt-1 text-sm font-black leading-6 text-[var(--text-primary)]">{item.name}</div>
                          <div className="mt-2 text-xs font-semibold text-[var(--text-secondary)]">{item.capacity}</div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white p-1">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-soft)]"
                                title="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-black">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-soft)]"
                                title="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold text-[var(--brand-red)]">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[var(--border-soft)] p-7">
                <div className="mb-4 rounded-[22px] border border-[rgba(249,115,22,0.18)] bg-[rgba(249,115,22,0.08)] p-4 text-sm font-medium text-[var(--text-primary)]">
                  Final pricing and delivery are confirmed over WhatsApp so installation scope, location, and volume requirements can be handled properly.
                </div>
                <button
                  onClick={() => {
                    const message = `Hi! I want a final quotation for this solar order:\n${cart
                      .map((item) => `- ${item.name} (${item.capacity}) x ${item.qty}`)
                      .join('\n')}`;
                    window.open(`https://wa.me/917247391595?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="btn-primary w-full"
                >
                  <MessageCircle size={18} />
                  Confirm on WhatsApp
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;

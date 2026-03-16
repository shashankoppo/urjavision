import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Zap, Sun, Leaf, TrendingUp, CheckCircle, Star,
  Home as HomeIcon, Building2, Factory, Settings, MessageCircle,
  Award, Shield, Clock, ChevronRight, IndianRupee
} from 'lucide-react';
import { SERVICES, STATS, SOLAR_PACKAGES, TESTIMONIALS } from '../utils/constants';
import { solarProducts, solarProjects, blogArticles } from '../utils/data';
import { getWhatsAppLink, calculateSolarSystem } from '../utils/helpers';
import { COMPANY_INFO } from '../utils/constants';
import Logo from '../components/Logo';

interface HomeProps {
  onNavigate?: (path: string) => void;
}

// Intersection observer hook
const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

const serviceIcons: Record<string, React.ElementType> = {
  Home: HomeIcon, Building2, Factory, FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={24} height={24}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ), Construction: Building2, Settings
};

const Home = ({ onNavigate }: HomeProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { ref: statsRef } = useInView();
  const [showVideo, setShowVideo] = useState(false);
  const [settings, setSettings] = useState<any>({
    hero_title: 'The New Era of Solar Intelligence',
    hero_subtitle: 'Architecting luxury-grade solar infrastructure for homes, industries, and a sustainable legacy across Central India.',
    hero_banner: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1920'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.hero_title) setSettings(data);
      })
      .catch(err => console.error('Failed to fetch settings', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const whatsappLink = getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I would like a free solar consultation.');

  return (
    <div className="bg-[#0A0F1E]">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0F1E] noise-overlay">
        {/* Cinematic Video/Image Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/80 via-[#0A0F1E]/40 to-[#0A0F1E] z-10" />
          <img
            src={settings.hero_banner}
            alt="Solar Horizon"
            className="w-full h-full object-cover scale-110 opacity-60"
          />
        </div>

        {/* Global Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="glow-orb w-[600px] h-[600px] -top-20 -left-20 bg-emerald-500/10" />
          <div className="glow-orb w-[500px] h-[500px] top-1/2 -right-20 bg-amber-500/10" />
        </div>

        <div className="container relative z-20 pt-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Pioneering Energy Independence</span>
            </div>
            
            <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-fade-up delay-100">
              <span className="mega-gradient-text uppercase tracking-tighter">{settings.hero_title}</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 animate-fade-up delay-200">
              {settings.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-up delay-300">
              <button 
                onClick={() => onNavigate?.('/calculator')}
                className="group relative px-10 py-5 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                  Design Your System <ArrowRight size={20} />
                </span>
              </button>

              <button 
                onClick={() => onNavigate?.('/contact')}
                className="px-10 py-5 glass-morphism text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/20"
              >
                Free Site Survey
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-20 py-8 glass-morphism border-t border-white/5">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Energy Capacity', value: '45.2', unit: 'MW+' },
              { label: 'Live Projects', value: '850', unit: '+' },
              { label: 'CO2 Offset', value: '12', unit: 'K Tons' },
              { label: 'Uptime Precision', value: '98.5', unit: '%' },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-white text-3xl font-black flex items-baseline justify-center md:justify-start gap-1">
                  {s.value}<span className="text-emerald-500 text-sm font-black">{s.unit}</span>
                </div>
                <div className="text-gray-500 text-[9px] uppercase font-black tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-3xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowVideo(false)} 
              className="absolute top-3 right-3 z-10 text-white/70 hover:text-white bg-black/40 rounded-full p-1.5"
              title="Close Video"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              allow="autoplay; fullscreen"
              title="Solar Energy Overview"
            />
          </div>
        </div>
      )}

      {/* ================================================
          WHY SOLAR — BENEFITS STRIP
          ================================================ */}
      <section className="bg-gray-50 section-padding">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto w-fit">
              <Sun size={12} /> Why Go Solar?
            </div>
            <h2>The Smart Energy Choice for India</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              With rising electricity costs and abundant sunshine, solar is the most profitable investment you can make in 2024.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Up to 90% Savings', desc: 'Dramatically cut electricity bills and eliminate power outages', color: 'icon-wrapper-green' },
              { icon: Sun, title: '25-Year Warranty', desc: 'Premium panels guaranteed to perform for 25+ years', color: 'icon-wrapper-amber' },
              { icon: Leaf, title: 'Zero Carbon Footprint', desc: 'Green energy that contributes to a sustainable India', color: 'icon-wrapper-green' },
              { icon: Zap, title: '4-5 Year ROI', desc: 'Your system pays for itself in 4-5 years, then pure profit', color: 'icon-wrapper-amber' },
            ].map((b, i) => (
              <div key={b.title} className={`card p-6 text-center animate-fade-up delay-${(i + 1) * 100}`}>
                <div className={`icon-wrapper ${b.color} mx-auto mb-5 w-14 h-14`}>
                  <b.icon size={26} />
                </div>
                <h4 className="mb-2">{b.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          STATS BAR
          ================================================ */}
      <section ref={statsRef} className="bg-gradient-primary section-padding-sm">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.id} className={`card-stat text-center p-6 animate-scale-in delay-${i * 100}`}>
                <div className="text-4xl md:text-5xl font-black text-white mb-1 font-outfit">
                  {stat.value}
                </div>
                <div className="text-emerald-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          SERVICES SECTION
          ================================================ */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto w-fit">
              <Zap size={12} /> Our Services
            </div>
            <h2>Complete Solar Solutions</h2>
            <p className="mt-4 max-w-xl mx-auto">
              From residential rooftops to large utility-scale plants — we handle everything end-to-end.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = serviceIcons[service.icon] || Zap;
              return (
                <div key={service.id} className={`card-premium p-7 group cursor-pointer animate-fade-up delay-${(i % 3 + 1) * 100}`}>
                  <div className="icon-wrapper icon-wrapper-green w-12 h-12 mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-700 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                  <button
                    onClick={() => onNavigate?.('/solar-solutions')}
                    className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold hover:gap-3 transition-all group/btn"
                  >
                    Explore <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================
          FEATURED PRODUCTS
          ================================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-tag">Solar Products</div>
              <h2>Premium Quality Products</h2>
            </div>
            <button
              onClick={() => onNavigate?.('/solar-products')}
              className="btn-outline-green text-sm px-5 py-2.5 flex-shrink-0"
            >
              View All Products <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solarProducts.slice(0, 4).map((product, i) => (
              <div key={product.id} className={`card group animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="img-overlay h-48">
                  <img src={product.image} alt={product.name} />
                  <span className="absolute top-3 left-3 z-10 badge badge-green">{product.category}</span>
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">{product.brand}</div>
                  <h4 className="font-bold text-gray-900 mb-1 text-base leading-snug">{product.name}</h4>
                  <div className="font-black text-emerald-600 text-sm mb-2">{product.capacity}</div>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                  <button
                    onClick={() => onNavigate?.('/solar-products')}
                    className="w-full btn-ghost text-sm py-2"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          PRICING / PACKAGES
          ================================================ */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto w-fit">
              <Award size={12} /> Solar Packages
            </div>
            <h2>Choose Your Perfect Package</h2>
            <p className="mt-4 max-w-xl mx-auto">
              Transparent, all-inclusive pricing. No hidden costs, no surprises — just pure solar savings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SOLAR_PACKAGES.map((pkg, index) => {
              const isFeatured = index === 1;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl p-7 transition-all duration-300 ${isFeatured
                      ? 'bg-gradient-primary text-white shadow-2xl shadow-emerald-200 scale-105 border-0'
                      : 'bg-white card'
                    }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="badge badge-featured px-5 py-2 text-sm shadow-lg">⭐ Most Popular</span>
                    </div>
                  )}

                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${isFeatured ? 'text-emerald-200' : 'text-emerald-600'}`}>
                    {pkg.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-black ${isFeatured ? 'text-white' : 'text-gray-900'} font-outfit`}>
                      {pkg.price}
                    </span>
                  </div>
                  <div className={`text-sm mb-6 ${isFeatured ? 'text-emerald-200' : 'text-gray-500'}`}>
                    Complete System (Before Subsidy)
                  </div>

                  <div className={`rounded-xl p-4 mb-6 ${isFeatured ? 'bg-white/10' : 'bg-gray-50'}`}>
                    {[
                      { label: 'Capacity', val: pkg.capacity },
                      { label: 'Daily Generation', val: pkg.generation },
                      { label: 'Monthly Savings', val: pkg.savings },
                      { label: 'ROI Period', val: pkg.roi },
                    ].map((row) => (
                      <div key={row.label} className={`flex justify-between text-sm py-1.5 border-b last:border-0 ${isFeatured ? 'border-white/10' : 'border-gray-200'}`}>
                        <span className={isFeatured ? 'text-emerald-200' : 'text-gray-500'}>{row.label}</span>
                        <span className={`font-bold ${isFeatured ? 'text-white' : 'text-gray-800'}`}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-7">
                    {pkg.components.map((comp) => (
                      <li key={comp} className={`flex items-start gap-2 text-sm ${isFeatured ? 'text-white/90' : 'text-gray-600'}`}>
                        <CheckCircle size={15} className={`flex-shrink-0 mt-0.5 ${isFeatured ? 'text-amber-300' : 'text-emerald-500'}`} />
                        {comp}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onNavigate?.('/contact')}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${isFeatured
                        ? 'bg-white text-emerald-700 hover:bg-amber-50 hover:-translate-y-1 shadow-lg'
                        : 'btn-primary'
                      }`}
                  >
                    Get This Package <ArrowRight size={15} className="inline ml-1" />
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            Government subsidy up to 40% available. Prices are before subsidy.{' '}
            <button onClick={() => onNavigate?.('/government-schemes')} className="text-emerald-600 font-semibold hover:underline">
              Check your subsidy →
            </button>
          </p>
        </div>
      </section>

      {/* ================================================
          SOLAR CALCULATOR
          ================================================ */}
      <section className="section-padding bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="section-tag !bg-white/10 !text-white !border-white/20 w-fit mb-4">
                <Zap size={12} /> Solar Calculator
              </div>
              <h2 className="text-white mb-4">Calculate Your Solar Savings</h2>
              <p className="text-white/80 mb-6">
                Enter your monthly electricity bill and get an instant estimate of the solar system size, investment, and expected savings.
              </p>
              {['No commitment required', 'Instant calculation', 'Includes subsidy estimate'].map((p) => (
                <div key={p} className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <CheckCircle size={16} className="text-emerald-400" /> {p}
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl">
              <SolarCalculatorInline />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          PROJECTS
          ================================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-tag">Featured Projects</div>
              <h2>Successful Installations</h2>
            </div>
            <button
              onClick={() => onNavigate?.('/solar-projects')}
              className="btn-outline-green text-sm px-5 py-2.5 flex-shrink-0"
            >
              View All Projects <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solarProjects.slice(0, 3).map((project, i) => (
              <div key={project.id} className={`card group overflow-hidden animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="img-overlay h-52">
                  <img src={project.image} alt={project.title} />
                  <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end">
                    <span className="badge badge-green mb-2 w-fit">{project.type}</span>
                    <h4 className="text-white font-bold">{project.title}</h4>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-4 text-xs font-semibold text-gray-500 mb-3">
                    <span>📍 {project.location}</span>
                    <span>⚡ {project.capacity}</span>
                    <span>📅 {project.year}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          TESTIMONIALS
          ================================================ */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <Star size={12} /> Testimonials
            </div>
            <h2>What Our Customers Say</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-10 text-center animate-scale-in">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="star-filled fill-amber-400" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                "{TESTIMONIALS[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={TESTIMONIALS[currentTestimonial].image}
                  alt={TESTIMONIALS[currentTestimonial].name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-emerald-100"
                />
                <div className="text-left">
                  <div className="font-bold text-gray-900">{TESTIMONIALS[currentTestimonial].name}</div>
                  <div className="text-sm text-emerald-600 font-medium">📍 {TESTIMONIALS[currentTestimonial].location}</div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${i === currentTestimonial ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'}`}
                    title={`View testimonial ${i + 1}`}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          BLOG / KNOWLEDGE
          ================================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-tag">Knowledge Hub</div>
              <h2>Solar Insights & Tips</h2>
            </div>
            <button
              onClick={() => onNavigate?.('/knowledge-hub')}
              className="btn-outline-green text-sm px-5 py-2.5 flex-shrink-0"
              title="View all articles from the Knowledge Hub"
            >
              All Articles <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogArticles.slice(0, 4).map((blog, i) => (
              <div key={blog.id} className={`card group animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="img-overlay h-44">
                  <img src={blog.image} alt={blog.title} />
                  <span className="absolute top-3 left-3 z-10 badge badge-green">{blog.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Clock size={11} /> {blog.readTime}
                    <span>·</span>
                    <span>{new Date(blog.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          TRUST BADGES
          ================================================ */}
      <section className="section-padding-sm bg-white border-t border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'ISO Certified', desc: 'Quality assured processes', color: 'text-emerald-600' },
              { icon: Award, title: 'Govt. Approved', desc: 'MNRE registered company', color: 'text-amber-600' },
              { icon: CheckCircle, title: 'Subsidy Experts', desc: 'PM Kusum & rooftop schemes', color: 'text-emerald-600' },
              { icon: Clock, title: '24/7 Support', desc: 'Always there for you', color: 'text-amber-600' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon size={28} className={item.color} />
                <div>
                  <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          FINAL CTA
          ================================================ */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-white text-4xl md:text-5xl mb-4 animate-fade-up">
              Ready to Go Solar?
            </h2>
            <p className="text-white/85 text-lg mb-10 animate-fade-up delay-100">
              Get a free site survey &amp; consultation. Our solar experts will design the perfect system for your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
              <button
                onClick={() => onNavigate?.('/contact')}
                className="bg-white text-emerald-700 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 hover:-translate-y-1 transition-all shadow-xl text-base"
              >
                Schedule Free Consultation
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl text-base"
              >
                <MessageCircle size={18} />
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Inline Solar Calculator Component
const SolarCalculatorInline = () => {
  const [bill, setBill] = useState('');
  const [category, setCategory] = useState<'Residential' | 'Commercial' | 'Enterprise'>('Residential');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const b = parseFloat(bill);
    if (!b || b <= 0) return;
    const r = calculateSolarSystem(b, category);
    setResult(r);
  };

  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-1">Savings Calculator</h3>
      <p className="text-sm text-gray-500 mb-4">Madhya Pradesh Tariffs · {category}</p>
      
      {/* Category Selection */}
      <div className="flex gap-2 mb-4 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
        {(['Residential', 'Commercial', 'Enterprise'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setResult(null); }}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
              category === cat 
                ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-5">
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder={`Monthly Bill (e.g. ${category === 'Residential' ? '3000' : '15000'})`}
          className="input-field flex-1 text-sm font-semibold placeholder:font-normal"
        />
        <span className="flex items-center text-gray-500 font-bold bg-gray-50 px-4 rounded-xl border border-gray-200">₹</span>
      </div>
      
      <button
        onClick={calculate}
        disabled={!bill || parseFloat(bill) <= 0}
        className="w-full btn-primary mb-5 py-3 shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none"
      >
        Calculate Savings
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-3 animate-fade-up">
          {[
            { label: 'System Size', val: result.systemSize, color: 'text-emerald-700 font-black' },
            { label: 'After Subsidy', val: result.estimatedCost, color: 'text-gray-900 font-bold' },
            { label: 'Yearly Savings', val: result.yearlySavings, color: 'text-emerald-700 font-black' },
            { label: 'ROI Period', val: result.roi, color: 'text-amber-600 font-black' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:border-emerald-200 transition-colors">
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">{item.label}</div>
              <div className={`text-base ${item.color}`}>{item.val}</div>
            </div>
          ))}
          <div className="col-span-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100 text-center shadow-inner">
            <span className="text-xs text-emerald-700 font-medium">Monthly savings after install: </span>
            <span className="font-black text-emerald-700 text-lg"> {result.monthlySavings}/mo</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

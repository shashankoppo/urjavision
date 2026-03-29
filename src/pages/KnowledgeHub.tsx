import { blogArticles } from '../utils/data';
import { Clock, BookOpen, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const categories = ['All', 'Pricing', 'Government Schemes', 'Benefits', 'Savings', 'Technology', 'Installation'];

const KnowledgeHub = () => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = blogArticles.filter((a) => {
    const matchCat = cat === 'All' || a.category === cat;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden h-[450px] flex md:items-center">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="container relative z-10 pt-16 md:pt-0 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <BookOpen size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Knowledge Hub</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Solar Energy <span className="mega-gradient-text">Guide & Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Expert articles, guides, and news to help you understand solar energy, government schemes, and make informed decisions.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto mt-10 relative animate-fade-up delay-300">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white/20 text-sm font-bold shadow-2xl backdrop-blur-md transition-all"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="container py-3.5">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${cat === c ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20 min-h-[50vh]">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 text-lg font-medium">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((article, i) => (
                <div key={article.id} className={`card-premium group animate-fade-up overflow-hidden`} style={{ animationDelay: `${(i % 4 + 1) * 100}ms` }}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
                    <span className="absolute top-4 left-4 z-20 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-400 shadow-xl">{article.category}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-4 bg-gray-50 inline-flex px-3 py-1.5 rounded-lg border border-gray-100">
                      <Clock size={12} className="text-emerald-500" /> {article.readTime}
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 className="font-black text-gray-900 text-lg leading-snug mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6 font-medium">{article.excerpt}</p>
                    <button className="flex items-center gap-2 text-emerald-600 text-sm font-black hover:gap-3 transition-all rounded-xl p-2 -ml-2 hover:bg-emerald-50">
                      Read More <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeHub;

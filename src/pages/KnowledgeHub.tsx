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
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <BookOpen size={12} /> Knowledge Hub
          </div>
          <h1 className="text-white mb-4">Solar Energy Guide & Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Expert articles, guides, and news to help you understand solar energy, government schemes, and make informed decisions.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-medium shadow-xl"
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
      <section className="section-padding bg-gray-50">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">📚</div>
              <h3>No articles found</h3>
              <p className="text-gray-500 mt-2">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((article, i) => (
                <div key={article.id} className={`card group animate-fade-up delay-${(i % 4 + 1) * 100}`}>
                  <div className="img-overlay h-44">
                    <img src={article.image} alt={article.title} />
                    <span className="absolute top-3 left-3 z-10 badge badge-green">{article.category}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Clock size={11} /> {article.readTime}
                      <span>·</span>
                      <span>{new Date(article.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">{article.excerpt}</p>
                    <button className="flex items-center gap-1 text-emerald-600 text-xs font-bold hover:gap-2 transition-all">
                      Read More <ChevronRight size={13} />
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

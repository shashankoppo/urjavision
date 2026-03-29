import { useData } from '../context/DataContext';
import { MapPin, Zap, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

const types = ['All', 'Commercial', 'Residential', 'Educational', 'Agriculture', 'Healthcare', 'Hospitality'];

const SolarProjects = () => {
  const { projects: solarProjects } = useData();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? solarProjects : solarProjects.filter((p: any) => p.type === filter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <img
            src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Solar Projects"
            className="w-full h-full object-cover scale-105 opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container relative z-10 text-center pt-10 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <Zap size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Our Portfolio</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Our <span className="mega-gradient-text">Solar Installations</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            From 5kW residential rooftops to 100kW industrial plants — explore our diverse portfolio of successful solar projects across Madhya Pradesh.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={15} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-1 items-center">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${filter === t
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-400 ml-auto hidden sm:block bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">{filtered.length} Projects</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project: any, i: number) => (
              <div key={project.id} className={`card-premium group overflow-hidden animate-fade-up`} style={{ animationDelay: `${(i % 3 + 1) * 100}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full mb-3 w-fit shadow-lg">{project.type}</span>
                    <h3 className="text-white font-black text-xl leading-tight group-hover:text-amber-400 transition-colors">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-7 right-6 w-14 h-14 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border border-gray-100 group-hover:-translate-y-2 transition-transform">
                    <span className="text-emerald-600 font-black text-sm">{project.capacity}</span>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Size</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-[11px] font-bold tracking-wide text-gray-500 mb-4 mt-2">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100"><MapPin size={12} className="text-emerald-500" /> {project.location}</span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100"><Calendar size={12} className="text-emerald-500" /> {project.year}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 glass-white rounded-[32px] border border-gray-100 shadow-2xl shadow-emerald-900/5">
              <div className="text-5xl mb-4 animate-bounce">🔍</div>
              <h3 className="text-gray-900 font-bold mb-2">No projects found in this category</h3>
              <p className="text-gray-500 text-sm mb-6">Try selecting a different filter above.</p>
              <button onClick={() => setFilter('All')} className="btn-primary text-sm px-6 py-3 font-bold shadow-lg">View All Projects</button>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding-sm bg-gradient-primary relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[100px] pointer-events-none animate-orb-float" style={{ animationDelay: '3s' }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            {[
              { val: '500+', label: 'Projects Completed' },
              { val: '5MW+', label: 'Total Capacity' },
              { val: '10+', label: 'Districts Covered' },
              { val: '₹2Cr+', label: 'Annual Savings Generated' },
            ].map((s, i) => (
              <div key={s.label} className="glass-morphism rounded-[32px] p-6 text-center shadow-2xl border border-white/10 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-emerald-200 mb-2 drop-shadow-sm font-outfit">{s.val}</div>
                <div className="text-emerald-100 font-bold text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarProjects;

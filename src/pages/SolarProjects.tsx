import { solarProjects } from '../utils/data';
import { MapPin, Zap, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

const types = ['All', 'Commercial', 'Residential', 'Educational', 'Agriculture', 'Healthcare', 'Hospitality'];

const SolarProjects = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? solarProjects : solarProjects.filter((p) => p.type === filter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Solar Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <Zap size={12} /> Portfolio
          </div>
          <h1 className="text-white mb-4">Our Solar Installations</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            From 5kW residential rooftops to 100kW industrial plants — explore our diverse portfolio of successful solar projects across Madhya Pradesh.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={15} className="text-gray-400 flex-shrink-0" />
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === t
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {t}
              </button>
            ))}
            <span className="text-xs text-gray-400 ml-auto">{filtered.length} projects</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div key={project.id} className={`card group overflow-hidden animate-fade-up delay-${(i % 3 + 1) * 100}`}>
                <div className="img-overlay h-56">
                  <img src={project.image} alt={project.title} />
                  <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end">
                    <span className="badge badge-green mb-2 w-fit">{project.type}</span>
                    <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {project.location}</span>
                    <span className="flex items-center gap-1"><Zap size={11} /> {project.capacity}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {project.year}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <h3>No projects in this category</h3>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding-sm bg-gradient-primary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '500+', label: 'Projects Completed' },
              { val: '5MW+', label: 'Total Capacity' },
              { val: '10+', label: 'Districts Covered' },
              { val: '₹2Cr+', label: 'Annual Savings for Customers' },
            ].map((s) => (
              <div key={s.label} className="card-stat p-5">
                <div className="text-3xl font-black text-white" style={{ fontFamily: 'Outfit' }}>{s.val}</div>
                <div className="text-emerald-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarProjects;

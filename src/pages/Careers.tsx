import { jobPositions } from '../utils/data';
import { MapPin, Briefcase, Clock, CheckCircle, Users, Zap, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container relative z-10 text-center pt-10 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <Briefcase size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Careers</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Join the <span className="mega-gradient-text">Solar Revolution</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Be part of a purpose-driven team powering clean energy across Madhya Pradesh. We're growing fast and looking for passionate talent.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding-sm bg-white border-b border-gray-100 relative z-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Meaningful Work', desc: 'Build a greener India every day', color: 'from-amber-400 to-orange-500 shadow-amber-900/20' },
              { icon: Heart, title: 'Great Culture', desc: 'Collaborative, inclusive team', color: 'from-emerald-500 to-green-600 shadow-emerald-900/20' },
              { icon: Users, title: 'Fast Growth', desc: 'Growing company, growing careers', color: 'from-blue-500 to-indigo-600 shadow-blue-900/20' },
              { icon: CheckCircle, title: 'Good Benefits', desc: 'Competitive pay + growth opps', color: 'from-purple-500 to-fuchsia-600 shadow-purple-900/20' },
            ].map((item, i) => (
              <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all bg-gray-50/50 group animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br text-white shadow-lg ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <div className="font-black text-gray-900 text-sm mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 font-medium leading-relaxed max-w-[150px]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">Open Positions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Current Openings</h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {jobPositions.map((job, i) => (
              <div key={job.id} className={`card-premium p-6 sm:p-8 cursor-pointer group animate-fade-up`} style={{ animationDelay: `${(i % 5 + 1) * 100}ms` }} onClick={() => setSelectedJob(job)}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full">{job.department}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">{job.type}</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-bold bg-gray-50 px-4 py-2 rounded-xl inline-flex border border-gray-100">
                      <span className="flex items-center gap-1.5"><MapPin size={12} className="text-emerald-500" /> {job.location}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full my-auto" />
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-amber-500" /> {job.experience}</span>
                    </div>
                  </div>
                  <button className="btn-primary flex items-center justify-center gap-2 text-sm py-4 px-8 flex-shrink-0 md:self-center shadow-lg shadow-emerald-500/20 w-full md:w-auto mt-4 md:mt-0">
                    Apply Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-7 animate-scale-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedJob.title}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="badge badge-green">{selectedJob.department}</span>
                  <span className="badge badge-amber">{selectedJob.type}</span>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-600" title="Close">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex gap-3 text-xs font-semibold text-gray-500 mb-4">
              <span className="flex items-center gap-1"><MapPin size={11} /> {selectedJob.location}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {selectedJob.experience}</span>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{selectedJob.description}</p>

            <div className="mb-6">
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Requirements:</div>
              <ul className="space-y-2">
                {selectedJob.requirements.map((r: string) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <a href="mailto:careers@urjavision.com" className="flex-1 btn-primary py-3 text-sm">Apply Now</a>
              <button onClick={() => setSelectedJob(null)} className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-gray-300 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-primary text-center relative overflow-hidden z-20">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 glass-morphism rounded-[40px] p-12 md:p-20 border border-white/10 shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-white mb-6 text-4xl md:text-5xl font-black tracking-tight">Don't see your role?</h2>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            We're always looking for passionate people. Send us your CV and we'll keep you in mind for future openings.
          </p>
          <a href="mailto:careers@urjavision.com" className="btn-primary bg-white text-emerald-900 border-none hover:bg-emerald-50 px-10 py-4 text-lg font-black shadow-xl shadow-white/10 inline-block">
            Send Your CV
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;

import { jobPositions } from '../utils/data';
import { MapPin, Briefcase, Clock, CheckCircle, Users, Zap, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <Briefcase size={12} /> Careers
          </div>
          <h1 className="text-white mb-4">Join the Solar Revolution</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Be part of a purpose-driven team powering clean energy across Madhya Pradesh. We're growing fast and looking for passionate talent.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding-sm bg-gray-50 border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Meaningful Work', desc: 'Build a greener India every day' },
              { icon: Heart, title: 'Great Culture', desc: 'Collaborative, inclusive team' },
              { icon: Users, title: 'Fast Growth', desc: 'Growing company, growing careers' },
              { icon: CheckCircle, title: 'Good Benefits', desc: 'Competitive pay + growth opportunities' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <item.icon size={28} className="text-emerald-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">Open Positions</div>
            <h2>Current Job Openings</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {jobPositions.map((job, i) => (
              <div key={job.id} className={`card p-6 cursor-pointer animate-fade-up delay-${(i % 2 + 1) * 100}`} onClick={() => setSelectedJob(job)}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="badge badge-green">{job.department}</span>
                      <span className="badge badge-amber">{job.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 font-semibold">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {job.experience}</span>
                    </div>
                  </div>
                  <button className="btn-primary text-sm py-2.5 px-5 flex-shrink-0 md:self-center">
                    View & Apply <ArrowRight size={14} />
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
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-600">
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
      <section className="section-padding bg-gradient-primary text-center">
        <div className="container">
          <h2 className="text-white mb-4">Don't see your role?</h2>
          <p className="text-white/85 mb-6 max-w-md mx-auto">
            We're always looking for passionate people. Send us your CV and we'll keep you in mind for future openings.
          </p>
          <a href="mailto:careers@urjavision.com" className="btn-secondary px-8 py-4 text-base inline-block">
            Send Your CV
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;

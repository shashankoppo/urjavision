import { trainingCourses } from '../utils/data';
import { CheckCircle, Clock, Award, Users, BookOpen, Zap, Phone } from 'lucide-react';

const TrainingInternship = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden h-[400px] flex items-center">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <BookOpen size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Training & Internship</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Build a Career in <span className="mega-gradient-text">Solar Energy</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Gain industry-recognized certifications and hands-on experience with India's fastest-growing energy sector.
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4 animate-fade-up">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">Our Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight animate-fade-up delay-100">Training Courses & Internships</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trainingCourses.map((course, i) => (
              <div key={course.id} className={`card-premium p-8 animate-fade-up`} style={{ animationDelay: `${(i % 2 + 1) * 100}ms` }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-bold bg-gray-50 px-4 py-2 rounded-xl inline-flex border border-gray-100">
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-emerald-500" /> {course.duration}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full my-auto" />
                      <span className="flex items-center gap-1.5"><Users size={12} className="text-amber-500" /> {course.mode}</span>
                    </div>
                  </div>
                  <div className="text-right bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
                    <div className="text-2xl font-black text-emerald-700" style={{ fontFamily: 'Outfit' }}>{course.fees}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70">Course Fee</div>
                  </div>
                </div>

                <p className="text-gray-500 text-base mb-6 leading-relaxed font-medium">{course.description}</p>

                <div className="mb-8">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Topics Covered</div>
                  <ul className="grid grid-cols-2 gap-3">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm font-bold text-gray-700">
                        <Zap size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" /> 
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                    <Award size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-black text-gray-900">{course.certification}</span>
                </div>

                <a href="tel:+917247391595" className="w-full btn-primary flex items-center justify-center gap-2 text-sm py-4 shadow-xl shadow-emerald-500/20">
                  <Phone size={16} /> Enroll Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-primary text-center relative overflow-hidden z-20">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 glass-morphism rounded-[40px] p-12 md:p-20 border border-white/10 shadow-2xl max-w-6xl mx-auto">
          <h2 className="text-white mb-12 text-4xl md:text-5xl font-black tracking-tight">Why Train with Urja Vision?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Govt. Approved Certs', desc: 'Certificates recognized by MNRE and industry' },
              { icon: Zap, title: 'Live Project Training', desc: 'Work on real solar installations' },
              { icon: Users, title: 'Job Placement', desc: 'Assistance with job placement after certification' },
              { icon: BookOpen, title: 'Expert Instructors', desc: 'Learn from certified solar engineers with 10+ years exp.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon size={28} className="text-amber-400" />
                </div>
                <div className="font-black text-white text-lg mb-3">{item.title}</div>
                <div className="text-emerald-100/70 text-sm leading-relaxed font-medium">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingInternship;

import { trainingCourses } from '../utils/data';
import { CheckCircle, Clock, Award, Users, BookOpen, Zap, Phone } from 'lucide-react';

const TrainingInternship = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <BookOpen size={12} /> Training & Internship
          </div>
          <h1 className="text-white mb-4">Build a Career in Solar Energy</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Gain industry-recognized certifications and hands-on experience with India's fastest-growing energy sector.
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">Our Programs</div>
            <h2>Training Courses & Internships</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {trainingCourses.map((course, i) => (
              <div key={course.id} className={`card p-7 animate-fade-up delay-${(i % 2 + 1) * 100}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                    <div className="flex gap-3 text-xs text-gray-500 font-semibold">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {course.mode}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-700" style={{ fontFamily: 'Outfit' }}>{course.fees}</div>
                    <div className="text-xs text-gray-400">Course Fee</div>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{course.description}</p>

                <div className="mb-5">
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Topics Covered:</div>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <Zap size={11} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-50 rounded-xl">
                  <Award size={16} className="text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">{course.certification}</span>
                </div>

                <a href="tel:+917247391595" className="w-full btn-primary text-sm py-3">
                  <Phone size={14} /> Enroll Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-primary text-center">
        <div className="container">
          <h2 className="text-white mb-10">Why Train with Urja Vision?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Award, title: 'Govt. Approved Certs', desc: 'Certificates recognized by MNRE and industry' },
              { icon: Zap, title: 'Live Project Training', desc: 'Work on real solar installations' },
              { icon: Users, title: 'Job Placement', desc: 'Assistance with job placement after certification' },
              { icon: BookOpen, title: 'Expert Instructors', desc: 'Learn from certified solar engineers with 10+ years exp.' },
            ].map((item) => (
              <div key={item.title} className="glass-dark rounded-xl p-5">
                <item.icon size={24} className="text-amber-400 mx-auto mb-3" />
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-white/60 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingInternship;

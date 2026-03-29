import { CheckCircle, Users, Award, Sun, Building2, Leaf, Target, Heart, Zap } from 'lucide-react';
import { STATS } from '../utils/constants';

const teamMembers = [
  {
    name: 'Rajiv Sharma',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    exp: '15+ Years in Renewable Energy'
  },
  {
    name: 'Priya Verma',
    role: 'Head of Engineering',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    exp: '10+ Years in Solar Design'
  },
  {
    name: 'Amit Patel',
    role: 'Director of Sales',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    exp: '12+ Years in Business Development'
  }
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        {/* Cinematic glow orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <img
            src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About Urja Vision"
            className="w-full h-full object-cover scale-105 opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
              <Sun size={14} className="text-amber-400" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Our Story</span>
            </div>
            <h1 className="text-white mb-6 text-5xl md:text-6xl font-black tracking-tighter animate-fade-up delay-100">
              Powering <span className="mega-gradient-text">Madhya Pradesh</span> with Solar
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed animate-fade-up delay-200">
              We are Urja Vision Technologies Private Limited — a passionate team of solar energy experts dedicated to making clean, affordable solar power accessible to every home, farm, and business.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 section-padding-sm relative z-20 -mt-10">
        <div className="container">
          <div className="glass-white rounded-[32px] border border-gray-100 p-8 md:p-12 shadow-2xl shadow-emerald-900/5 backdrop-blur-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
              {STATS.map((stat) => (
                <div key={stat.id} className="text-center px-4">
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-green-400 mb-2 font-outfit drop-shadow-sm">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-black">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Subtle mesh */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-100 shadow-sm">
                Our Genesis
              </div>
              <h2 className="mb-6 text-4xl md:text-5xl tracking-tight font-black text-gray-900">From a Vision to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">500+ Solar Installations</span></h2>
              <div className="space-y-5 text-gray-600 font-medium leading-relaxed">
                <p>
                  Founded in Jabalpur, Madhya Pradesh, Urja Vision Technologies was born from a simple belief: every Indian family deserves access to clean, affordable energy. We started with a mission to make solar power accessible and understandable.
                </p>
                <p>
                  Today, with over 500 successful installations, 5MW+ of total installed capacity, and 1,000+ happy customers across Madhya Pradesh, we are proud to be the region's most trusted solar energy partner.
                </p>
                <p>
                  From Jabalpur to Katni, Mandla to Seoni — our certified engineers, transparent pricing, and end-to-end support have earned us the trust of homes, schools, hospitals, farms, and factories alike.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  'MNRE Registered',
                  'ISO 9001 Certified',
                  'Govt. Approved',
                  'PM Kusum Empaneled',
                ].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" /> {cert}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up delay-200">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 blur-3xl transform rotate-6 scale-105 rounded-[40px]" />
              <div className="rounded-[40px] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img
                  src="https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Urja Vision solar installations"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Floating Stat Badges */}
              <div className="absolute -bottom-8 -left-8 glass-white p-6 rounded-3xl shadow-2xl shadow-emerald-900/10 border border-white z-20 w-44 text-center backdrop-blur-xl animate-float">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 font-outfit">15+</div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Years of Experience</div>
              </div>
              <div className="absolute -top-8 -right-8 glass-white p-6 rounded-3xl shadow-2xl shadow-amber-900/10 border border-white z-20 w-48 text-center backdrop-blur-xl animate-float-delayed">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 font-outfit">1000+</div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        {/* Soft radial background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag mx-auto w-fit mb-4">Our Foundation</div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Mission, Vision & Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                gradient: 'from-emerald-50 to-green-100 text-emerald-600',
                text: 'To make solar energy accessible, affordable, and understandable for every Indian — from urban homes to rural farms.',
              },
              {
                icon: Sun,
                title: 'Our Vision',
                gradient: 'from-amber-50 to-amber-100 text-amber-600',
                text: 'A solar-powered Madhya Pradesh — where every rooftop generates clean energy and every farmer has free irrigation.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                gradient: 'from-blue-50 to-sky-100 text-blue-600',
                text: 'Transparency in pricing, excellence in quality, integrity in service — we treat every customer like family.',
              },
            ].map((item, i) => (
              <div key={item.title} className="card-premium p-8 text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} mx-auto mb-6 flex items-center justify-center shadow-inner`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Partner */}
      <section className="section-padding bg-[#020617] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-[0.05] pointer-events-none mix-blend-screen animate-pulse">
          <Zap size={400} className="text-emerald-500" />
        </div>
        
        {/* Cinematic glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto glass-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
            
            <div className="md:w-[40%] bg-gradient-to-br from-[#064E3B] to-[#022c22] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=800')] opacity-10 mix-blend-overlay object-cover" />
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-xl border border-white/20 shadow-inner relative z-10">
                <Zap size={36} className="text-emerald-400" />
              </div>
              <div className="text-white font-black text-3xl mb-2 relative z-10">ELSxGlobal</div>
              <div className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] relative z-10">Technical Advisory Board</div>
            </div>
            
            <div className="flex-1 p-10 md:p-14 relative z-10">
              <h3 className="text-3xl font-black text-white mb-5 tracking-tight">Unmatched Technical Advisory</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Urja Vision is proud to be strategically powered by <span className="font-bold text-emerald-400">ELSxGlobal</span> (A Division of Evolucentsphere Pvt Ltd). Our technical partnership ensures that every solar installation is engineered with the highest precision, incorporating the latest in AI-driven energy optimization and structural integrity standards.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="text-emerald-400 font-black text-2xl mb-1">AI-Ready</div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Smart Monitoring Integration</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="text-emerald-400 font-black text-2xl mb-1">Tier-1</div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Engineering Certification</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white relative">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-4 border border-emerald-100">
              <Users size={14} /> Leadership Series
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Meet the Experts</h2>
            <p className="mt-4 max-w-lg mx-auto text-gray-500 font-medium text-lg leading-relaxed">
              Our certified solar professionals bring decades of combined experience in renewable energy engineering and deployment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={member.name} className={`card-premium p-8 text-center animate-fade-up group`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-emerald-50 shadow-2xl relative">
                  <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="font-black text-xl text-gray-900 mb-1">{member.name}</h4>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500 font-bold text-sm tracking-wide mb-3">{member.role}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 py-2 px-4 rounded-lg inline-block">{member.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[100px] pointer-events-none animate-orb-float" style={{ animationDelay: '3s' }} />
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">Why Urja Vision?</h2>
            <p className="text-emerald-100/80 mt-4 text-lg hidden md:block">The reasons our customers trust us again and again.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Award, title: 'MNRE & Govt. Approved', desc: 'Officially empaneled by central and state governments' },
              { icon: Leaf, title: 'Eco-First Approach', desc: 'We choose sustainable products and practices' },
              { icon: Building2, title: 'All Segment Expertise', desc: 'Residential, commercial, industrial & agriculture' },
              { icon: CheckCircle, title: 'Transparent Pricing', desc: 'No hidden fees. Quote = final cost.' },
              { icon: Users, title: 'After-Sales Support', desc: 'Dedicated team for maintenance and queries' },
              { icon: Sun, title: 'Subsidy Management', desc: 'We file all govt. subsidy paperwork for you' },
            ].map((item) => (
              <div key={item.title} className="glass-morphism rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-colors cursor-default border border-white/10 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  <item.icon size={22} className="text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-[15px] mb-1.5">{item.title}</div>
                  <div className="text-emerald-100/70 text-xs leading-relaxed font-medium">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

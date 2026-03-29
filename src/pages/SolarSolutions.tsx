import { Home as HomeIcon, Building2, Factory, Settings, FileText, Zap, CheckCircle, ArrowRight, Sun, Phone, Mail } from 'lucide-react';


const solutionDetails = [
  {
    icon: HomeIcon,
    title: 'Residential Solar Installation',
    desc: 'Turn your rooftop into a power plant. With subsidies up to 40% from the government, a home solar system is the smartest investment you can make.',
    features: ['Bill savings up to 90%', '3kW to 10kW systems', 'Subsidy available', '25-year panel warranty', 'Net metering support'],
    image: 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Building2,
    title: 'Commercial Solar Solutions',
    desc: 'Reduce your business electricity bills dramatically. Perfect for offices, hospitals, schools, hotels, and shopping complexes.',
    features: ['10kW to 100kW systems', 'Achieve ROI in 3-4 years', 'Power Purchase Agreements', 'Smart energy monitoring', 'Priority maintenance'],
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Factory,
    title: 'Industrial Solar Power Plants',
    desc: 'Large-scale solar installations for factories, manufacturing units, and industrial complexes — cutting energy costs at scale.',
    features: ['100kW to MW-scale plants', 'Custom EPC solutions', 'Grid tie + storage options', 'Advanced monitoring', 'O&M contracts available'],
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

const SolarSolutions = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-orb-float" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/95" />
          <img src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="w-full h-full object-cover scale-105 opacity-20 mix-blend-overlay" />
        </div>
        <div className="container relative z-10 text-center pt-10 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/10 mb-6 animate-fade-up">
            <Sun size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Solar Solutions</span>
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black tracking-tighter animate-fade-up delay-100">
            Complete Solar Solutions <span className="mega-gradient-text">for Every Need</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            From 2kW residential rooftops to 1MW industrial plants — we design, install and maintain solar systems tailored to your specific requirements and budget.
          </p>
        </div>
      </section>

      {/* Detailed Solutions */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-40 right-[-100px] w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-40 left-[-100px] w-80 h-80 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="container relative z-10">
          <div className="space-y-24">
            {solutionDetails.map((sol, i) => (
              <div key={sol.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? '' : ''}`}>
                <div className={`animate-fade-up ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/20">
                    <sol.icon size={28} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">{sol.title}</h2>
                  <p className="text-gray-500 mb-8 text-lg leading-relaxed">{sol.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {sol.features.map((f) => (
                      <li key={f} className="flex items-center gap-4 text-gray-700 font-bold bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                          <CheckCircle size={16} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="tel:+917247391595" className="btn-primary inline-flex text-base py-4 px-8 shadow-xl shadow-emerald-500/20">
                    Get Free Consultation <ArrowRight size={18} />
                  </a>
                </div>
                <div className={`relative animate-fade-up delay-100 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-amber-400 rounded-3xl translate-x-4 translate-y-4 opacity-20 blur-xl" />
                  <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-gray-100">
                    <img src={sol.image} alt={sol.title} className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-gray-50 dark-mesh-bg relative z-20">
        <div className="absolute inset-0 bg-white/95" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">More Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Beyond Installation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'Solar Consultancy', desc: 'Feasibility study, site assessment, financial modeling, and ROI analysis before you invest a single rupee.', color: 'from-amber-400 to-orange-500' },
              { icon: Zap, title: 'Solar EPC Projects', desc: 'Complete Engineering, Procurement & Construction for large commercial and industrial solar projects.', color: 'from-blue-500 to-indigo-600' },
              { icon: Settings, title: 'AMC & Maintenance', desc: 'Regular cleaning, performance monitoring, and preventive maintenance to keep your system at peak output.', color: 'from-purple-500 to-fuchsia-600' },
            ].map((s, i) => (
              <div key={s.title} className="card-premium p-8 group animate-fade-up" style={{ animationDelay: `${(i % 3 + 1) * 100}ms` }}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br text-white shadow-lg ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-primary text-center relative overflow-hidden z-20">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 glass-morphism rounded-[40px] p-12 md:p-20 border border-white/10 shadow-2xl max-w-5xl mx-auto">
          <h2 className="text-white mb-6 text-4xl md:text-5xl font-black tracking-tight">Start Your Solar Journey Today</h2>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Get a free site survey, customized system design, and transparent quote — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="tel:+917247391595" className="btn-primary py-4 px-10 text-lg shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group">
              <Phone size={20} className="group-hover:animate-bounce" /> Call for Free Survey
            </a>
            <a href="mailto:info@urjavision.com" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 backdrop-blur-sm">
              <Mail size={20} /> Email for Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarSolutions;

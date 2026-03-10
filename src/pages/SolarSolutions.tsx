import { Home as HomeIcon, Building2, Factory, Settings, FileText, Zap, CheckCircle, ArrowRight, Sun } from 'lucide-react';
import { SERVICES } from '../utils/constants';

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
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <Sun size={12} /> Solar Solutions
          </div>
          <h1 className="text-white mb-4">Complete Solar Solutions for Every Need</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            From 2kW residential rooftops to 1MW industrial plants — we design, install and maintain solar systems tailored to your specific requirements and budget.
          </p>
        </div>
      </section>

      {/* Detailed Solutions */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="space-y-16">
            {solutionDetails.map((sol, i) => (
              <div key={sol.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="icon-wrapper icon-wrapper-green mb-5 w-12 h-12">
                    <sol.icon size={22} />
                  </div>
                  <h2 className="mb-4">{sol.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{sol.desc}</p>
                  <ul className="space-y-2.5 mb-7">
                    {sol.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-gray-700">
                        <CheckCircle size={17} className="text-emerald-500 flex-shrink-0" />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="tel:+917247391595" className="btn-primary inline-flex">
                    Get Free Consultation <ArrowRight size={16} />
                  </a>
                </div>
                <div className={`rounded-2xl overflow-hidden shadow-xl ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img src={sol.image} alt={sol.title} className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">More Services</div>
            <h2>Beyond Installation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: 'Solar Consultancy', desc: 'Feasibility study, site assessment, financial modeling, and ROI analysis before you invest a single rupee.' },
              { icon: Zap, title: 'Solar EPC Projects', desc: 'Complete Engineering, Procurement & Construction for large commercial and industrial solar projects.' },
              { icon: Settings, title: 'AMC & Maintenance', desc: 'Regular cleaning, performance monitoring, and preventive maintenance to keep your system at peak output.' },
            ].map((s) => (
              <div key={s.title} className="card p-6">
                <div className="icon-wrapper icon-wrapper-amber mb-4 w-11 h-11">
                  <s.icon size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-primary text-center relative overflow-hidden">
        <div className="container relative z-10">
          <h2 className="text-white mb-4">Start Your Solar Journey Today</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">Get a free site survey, customized system design, and transparent quote — no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917247391595" className="btn-secondary px-8 py-4 text-base">Call for Free Survey</a>
            <a href="mailto:info@urjavision.com" className="btn-outline px-8 py-4 text-base">Email for Quote</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarSolutions;

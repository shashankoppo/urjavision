import { CheckCircle, Users, Award, Sun, Building2, Leaf, Target, Heart } from 'lucide-react';
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
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About Urja Vision"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="section-tag !bg-white/10 !text-white !border-white/20 mb-4">
              <Sun size={12} /> About Us
            </div>
            <h1 className="text-white mb-4">Powering Madhya Pradesh with Solar Energy</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              We are Urja Vision Technologies Private Limited — a passionate team of solar energy experts dedicated to making clean, affordable solar power accessible to every home, farm, and business in Madhya Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 section-padding-sm border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-black text-emerald-700 mb-1" style={{ fontFamily: 'Outfit' }}>{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag mb-4">Our Story</div>
              <h2 className="mb-5">From a Vision to 500+ Solar Installations</h2>
              <div className="space-y-4 text-gray-600">
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
                  'MNRE Registered Company',
                  'ISO 9001 Certified',
                  'Govt. Approved Installer',
                  'PM Kusum Empaneled',
                ].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" /> {cert}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Urja Vision solar installations"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 card p-5 shadow-xl w-40 text-center">
                <div className="text-3xl font-black text-emerald-700" style={{ fontFamily: 'Outfit' }}>15+</div>
                <div className="text-xs text-gray-500 font-medium">Years of Experience</div>
              </div>
              <div className="absolute -top-6 -right-6 card p-5 shadow-xl w-44 text-center">
                <div className="text-3xl font-black text-amber-600" style={{ fontFamily: 'Outfit' }}>1000+</div>
                <div className="text-xs text-gray-500 font-medium">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">Our Foundation</div>
            <h2>Mission, Vision & Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                color: 'icon-wrapper-green',
                text: 'To make solar energy accessible, affordable, and understandable for every Indian — from urban homes to rural farms.',
              },
              {
                icon: Sun,
                title: 'Our Vision',
                color: 'icon-wrapper-amber',
                text: 'A solar-powered Madhya Pradesh — where every rooftop generates clean energy and every farmer has free irrigation.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                color: 'icon-wrapper-green',
                text: 'Transparency in pricing, excellence in quality, integrity in service — we treat every customer like family.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 text-center">
                <div className={`icon-wrapper ${item.color} mx-auto mb-5`}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <Users size={12} /> Our Team
            </div>
            <h2>Meet the Experts</h2>
            <p className="mt-3 max-w-lg mx-auto text-gray-500">
              Our certified solar professionals bring decades of combined experience in renewable energy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={member.name} className={`card p-6 text-center animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-emerald-100 shadow-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-900">{member.name}</h4>
                <div className="text-emerald-600 text-sm font-semibold mb-1">{member.role}</div>
                <div className="text-xs text-gray-400">{member.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-white">Why Urja Vision?</h2>
            <p className="text-emerald-100 mt-3">The reasons our customers trust us again and again</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Award, title: 'MNRE & Govt. Approved', desc: 'Officially empaneled by central and state governments' },
              { icon: Leaf, title: 'Eco-First Approach', desc: 'We choose sustainable products and practices' },
              { icon: Building2, title: 'All Segment Expertise', desc: 'Residential, commercial, industrial & agriculture' },
              { icon: CheckCircle, title: 'Transparent Pricing', desc: 'No hidden fees. Quote = final cost.' },
              { icon: Users, title: 'After-Sales Support', desc: 'Dedicated team for maintenance and queries' },
              { icon: Sun, title: 'Subsidy Management', desc: 'We file all govt. subsidy paperwork for you' },
            ].map((item) => (
              <div key={item.title} className="glass-dark rounded-xl p-5 flex items-start gap-3">
                <item.icon size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                  <div className="text-white/60 text-xs leading-relaxed">{item.desc}</div>
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

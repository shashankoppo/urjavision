import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  Calculator,
  CheckCircle2,
  Clock3,
  Home as HomeIcon,
  Landmark,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Sprout,
  SunMedium,
  TrendingUp,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { COMPANY_INFO, SOLAR_PACKAGES, TESTIMONIALS } from '../utils/constants';
import { solarProjects } from '../utils/data';
import { calculateSolarSystem } from '../utils/helpers';

interface HomeProps {
  onNavigate?: (path: string) => void;
}

const buyerSegments = [
  {
    title: 'Ghar Ke Liye',
    subtitle: 'Rooftop solar for families',
    description: 'Lower monthly bills, faster subsidy guidance, and clean power for homes, villas, and apartments.',
    icon: HomeIcon,
    points: ['PM Surya Ghar support', 'Suitable for 1BHK to bungalows', 'Neat installation with net metering help']
  },
  {
    title: 'Business Ke Liye',
    subtitle: 'Commercial savings that scale',
    description: 'Cut operating costs for showrooms, schools, hotels, hospitals, factories, and office campuses.',
    icon: Building2,
    points: ['Lower per-unit power cost', 'Better ROI for high monthly bills', 'Performance-first engineering and AMC']
  },
  {
    title: 'Kisanon Ke Liye',
    subtitle: 'Solar for farms and pumps',
    description: 'Practical solar systems for irrigation, agriculture loads, and PM Kusum-aligned opportunities.',
    icon: Sprout,
    points: ['Pump and farm electrification support', 'Reduced diesel and grid dependence', 'District-level on-ground execution']
  }
];

const processSteps = [
  { title: 'Site Survey', description: 'Rooftop or load assessment with shade check and practical sizing.' },
  { title: 'Proposal & Savings Plan', description: 'Clear quotation with system size, subsidy path, and expected payback.' },
  { title: 'Installation & Net Metering', description: 'End-to-end execution with wiring, structure, safety, and approvals.' },
  { title: 'Monitoring & Support', description: 'After-sales guidance so your system keeps delivering year after year.' }
];

const trustHighlights = [
  { label: 'Local Presence', value: 'Jabalpur based team' },
  { label: 'Buyer Focus', value: 'Homes, shops, schools, factories' },
  { label: 'Commercial Mindset', value: 'Savings-led system planning' }
];

const Home = ({ onNavigate }: HomeProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(headlineRef.current, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          delay: 0.15
        })
        .from(
          subtextRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          },
          '-=0.6'
        )
        .from(
          '.hero-cta-btn',
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
          },
          '-=0.45'
        );
    }, heroRef);

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[var(--bg-cream)] text-[var(--text-primary)]">
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[var(--border-soft)] bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.18),_transparent_28%),linear-gradient(180deg,#fffdf8_0%,#fff6ea_100%)] pt-16 pb-20 md:pt-20 md:pb-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[rgba(22,163,74,0.10)] blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[rgba(249,115,22,0.15)] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-[rgba(14,165,233,0.10)] blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-[rgba(249,115,22,0.18)] bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                <span className="inline-flex items-center gap-2 text-[var(--accent-saffron)]">
                  <SunMedium size={14} />
                  India-first solar brand
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-[var(--border-strong)] sm:block" />
                <span>Madhya Pradesh homes, buyers and businesses</span>
              </div>

              <h1
                ref={headlineRef}
                className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl"
              >
                Solar that feels right for Indian buyers,
                <span className="block bg-gradient-to-r from-[var(--accent-saffron)] via-[var(--brand-red)] to-[var(--brand-green)] bg-clip-text text-transparent">
                  and works hard for Indian businesses.
                </span>
              </h1>

              <p
                ref={subtextRef}
                className="mt-7 max-w-3xl text-lg font-medium leading-8 text-[var(--text-secondary)] md:text-xl"
              >
                {COMPANY_INFO.brandName} helps families, shop owners, institutions, factories, and farmers switch to dependable solar with practical pricing, subsidy guidance, and local execution from survey to service.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => onNavigate?.('/calculator')}
                  className="hero-cta-btn btn-primary"
                >
                  Check Your Solar Savings
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate?.('/contact')}
                  className="hero-cta-btn btn-warm"
                >
                  Book Free Site Visit
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {trustHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-[var(--border-soft)] bg-white/80 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.label}</div>
                    <div className="mt-2 text-base font-bold text-[var(--text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-[linear-gradient(180deg,#0f172a_0%,#1f2937_100%)] p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.20)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Typical buyer snapshot</div>
                    <h2 className="mt-3 text-3xl font-black leading-tight text-white">5kW rooftop for a family home</h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 text-[var(--accent-saffron)]">
                    <Zap size={26} />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Monthly bill target</div>
                    <div className="mt-2 text-3xl font-black">Rs 6,000+</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Ideal for</div>
                    <div className="mt-2 text-2xl font-black">3 to 4 BHK homes</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Potential savings</div>
                    <div className="mt-2 text-3xl font-black text-[var(--warm-gold)]">Up to 80 to 90%</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Support included</div>
                    <div className="mt-2 text-2xl font-black">Survey, install, subsidy help</div>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] border border-[rgba(249,115,22,0.35)] bg-[linear-gradient(135deg,rgba(249,115,22,0.18),rgba(34,197,94,0.14))] p-5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-white/90">
                    <ShieldCheck size={18} className="text-[var(--warm-gold)]" />
                    Clean installation. Clear quotation. Strong after-sales support.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-white py-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: '500+', label: 'Solar installations' },
              { value: '5 MW+', label: 'Capacity delivered' },
              { value: '1000+', label: 'Happy customers' },
              { value: '15+', label: 'Years of experience' }
            ].map((item) => (
              <div key={item.label}>
                <div className="text-3xl font-black text-[var(--text-primary)] md:text-4xl">{item.value}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <div className="section-kicker">Designed for real buyers</div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
              One solar brand, three strong buying journeys.
            </h2>
            <p className="mt-5 text-lg text-[var(--text-secondary)]">
              Whether you want to reduce home electricity bills, improve business margins, or power agricultural operations, the experience should feel local, practical, and easy to trust.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {buyerSegments.map((segment) => (
              <div
                key={segment.title}
                className="rounded-[28px] border border-[var(--border-soft)] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(34,197,94,0.14))] text-[var(--brand-green)]">
                  <segment.icon size={28} />
                </div>
                <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">{segment.subtitle}</div>
                <h3 className="mt-3 text-2xl font-black">{segment.title}</h3>
                <p className="mt-4 text-[var(--text-secondary)]">{segment.description}</p>
                <div className="mt-6 space-y-3">
                  {segment.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm font-medium text-[var(--text-primary)]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-[var(--border-soft)] bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="section-kicker">Why buyers convert</div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Strong financial logic with a very Indian service approach.
              </h2>
              <p className="mt-5 text-lg text-[var(--text-secondary)]">
                People do not just buy panels. They buy confidence in pricing, subsidy understanding, proper installation, and support after commissioning.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  icon: Landmark,
                  title: 'Subsidy-aligned planning',
                  description: 'Residential buyers get better clarity on PM Surya Ghar and paperwork expectations.'
                },
                {
                  icon: BadgeIndianRupee,
                  title: 'Commercial ROI focus',
                  description: 'Shops, schools, and factories care about savings, payback, and uptime, so that is how we frame proposals.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Cleaner execution',
                  description: 'Thoughtful layout, proper structure, safe wiring, and customer-friendly handover improve trust instantly.'
                },
                {
                  icon: Leaf,
                  title: 'Long-term value',
                  description: 'The system keeps paying back through lower bills, higher resilience, and lower dependence on tariff increases.'
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-soft)] text-[var(--brand-red)]">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="section-kicker">Popular packages</div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Simple package thinking for faster decisions.
              </h2>
            </div>
            <button
              onClick={() => onNavigate?.('/solar-packages')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-red)]"
            >
              View all packages
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {SOLAR_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-[28px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,#ffffff_0%,#fff8ef_100%)] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="inline-flex rounded-full bg-[rgba(34,197,94,0.10)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
                  {pkg.capacity}
                </div>
                <h3 className="mt-5 text-2xl font-black">{pkg.name}</h3>
                <div className="mt-3 text-3xl font-black text-[var(--brand-red)]">{pkg.price}</div>
                <div className="mt-2 text-sm font-medium text-[var(--text-secondary)]">Estimated savings: {pkg.savings}</div>
                <div className="mt-2 text-sm font-medium text-[var(--text-secondary)]">Typical payback: {pkg.roi}</div>
                <div className="mt-6 space-y-3">
                  {pkg.components.slice(0, 4).map((component) => (
                    <div key={component} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
                      <span>{component}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-[var(--border-soft)] bg-[var(--bg-soft)]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="section-kicker">How we work</div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Clear process. Less confusion. Better confidence before you buy.
              </h2>
              <p className="mt-5 text-lg text-[var(--text-secondary)]">
                This is especially important for Indian consumers, where the final decision depends on price clarity, local support, and confidence that the team will stay available after installation.
              </p>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-5 rounded-[24px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-red),var(--accent-saffron))] text-base font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{step.title}</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="section-kicker">Recent work</div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Commercial and residential projects that look believable, not generic.
              </h2>
            </div>
            <button
              onClick={() => onNavigate?.('/solar-projects')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-red)]"
            >
              Explore projects
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {solarProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
                    {project.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black">{project.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium text-[var(--text-secondary)]">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      {project.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Zap size={16} />
                      {project.capacity}
                    </span>
                  </div>
                  <p className="mt-4 text-[var(--text-secondary)]">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(135deg,#12311e_0%,#0f172a_55%,#1e293b_100%)] text-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="section-kicker text-white/65">Buyer calculator</div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
                Start with your electricity bill and see what solar could change.
              </h2>
              <p className="mt-5 text-lg text-white/75">
                This quick estimate is useful for homeowners, retail businesses, institutions, and commercial buyers who want a practical starting point before speaking with sales.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Calculator, text: 'Estimate system size from your current bill' },
                  { icon: TrendingUp, text: 'Understand yearly savings and long-term returns' },
                  { icon: Clock3, text: 'Get a faster shortlist before site survey' }
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm font-semibold text-white/90">
                    <item.icon size={18} className="text-[var(--warm-gold)]" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-6 text-[var(--text-primary)] shadow-[0_28px_80px_rgba(0,0,0,0.22)] md:p-10">
              <SolarCalculatorInline />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-[32px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,#fffaf2_0%,#ffffff_100%)] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:p-10">
              <Quote size={54} className="text-[var(--accent-saffron)]/60" />
              <p className="mt-6 text-2xl font-black leading-snug tracking-[-0.03em] text-[var(--text-primary)] md:text-3xl">
                "{TESTIMONIALS[currentTestimonial].text}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={TESTIMONIALS[currentTestimonial].image}
                  alt={TESTIMONIALS[currentTestimonial].name}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-[rgba(249,115,22,0.15)]"
                />
                <div>
                  <div className="text-lg font-black">{TESTIMONIALS[currentTestimonial].name}</div>
                  <div className="text-sm font-semibold text-[var(--text-secondary)]">{TESTIMONIALS[currentTestimonial].location}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="section-kicker">Final push</div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                A stronger app direction for Indian consumers and commercial buyers.
              </h2>
              <p className="mt-5 text-lg text-[var(--text-secondary)]">
                The updated design now speaks more clearly to the real decision-makers in this market: households comparing bill reduction, businesses checking ROI, and buyers who want local support before committing.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button onClick={() => onNavigate?.('/contact')} className="btn-primary">
                  Request Proposal
                </button>
                <button onClick={() => onNavigate?.('/solar-solutions')} className="btn-outline-dark">
                  Explore Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SolarCalculatorInline = () => {
  const [bill, setBill] = useState('');
  const [category, setCategory] = useState<'Residential' | 'Commercial' | 'Enterprise'>('Residential');
  const [result, setResult] = useState<ReturnType<typeof calculateSolarSystem> | null>(null);

  const calculate = () => {
    const parsedBill = parseFloat(bill);
    if (!parsedBill || parsedBill <= 0) {
      return;
    }

    setResult(calculateSolarSystem(parsedBill, category));
  };

  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(249,115,22,0.12)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
        <Calculator size={14} />
        Quick estimate
      </div>
      <h3 className="mt-5 text-3xl font-black tracking-[-0.03em]">Solar savings calculator</h3>
      <p className="mt-3 text-[var(--text-secondary)]">
        Enter your monthly electricity bill to get a practical estimate for system size and savings.
      </p>

      <div className="mt-8 flex gap-2 rounded-2xl bg-[var(--bg-soft)] p-2">
        {(['Residential', 'Commercial', 'Enterprise'] as const).map((item) => (
          <button
            key={item}
            onClick={() => {
              setCategory(item);
              setResult(null);
            }}
            className={`flex-1 rounded-xl px-2 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
              category === item
                ? 'bg-white text-[var(--brand-red)] shadow-[0_8px_20px_rgba(15,23,42,0.08)]'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {!result ? (
        <div className="mt-8 animate-fade-in">
          <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Monthly electricity bill
          </label>
          <input
            type="number"
            value={bill}
            onChange={(event) => setBill(event.target.value)}
            placeholder="5000"
            className="w-full rounded-[22px] border border-[var(--border-soft)] bg-white px-5 py-4 text-2xl font-black text-[var(--text-primary)] shadow-[inset_0_2px_6px_rgba(15,23,42,0.03)]"
          />
          <button onClick={calculate} className="btn-primary mt-6 w-full">
            Analyze My Savings
          </button>
        </div>
      ) : (
        <div className="mt-8 animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-[var(--bg-soft)] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Recommended size</div>
              <div className="mt-2 text-3xl font-black">{result.sizeKw} kW</div>
            </div>
            <div className="rounded-[24px] bg-[rgba(34,197,94,0.10)] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-green)]">Yearly savings</div>
              <div className="mt-2 text-3xl font-black">{result.yearlySavings}</div>
            </div>
            <div className="rounded-[24px] bg-[rgba(249,115,22,0.10)] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">Estimated investment</div>
              <div className="mt-2 text-2xl font-black">{result.estimatedCost}</div>
            </div>
            <div className="rounded-[24px] bg-[rgba(14,165,233,0.10)] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">25-year benefit</div>
              <div className="mt-2 text-2xl font-black">{result.lifetimeSavings}</div>
            </div>
          </div>
          <button
            onClick={() => setResult(null)}
            className="mt-5 text-sm font-bold text-[var(--brand-red)]"
          >
            Recalculate
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

export const COMPANY_INFO = {
  name: 'Urja Vision Technologies Private Limited',
  brandName: 'URJA VISION',
  tagline: 'Practical Solar For Indian Homes And Businesses',
  address: {
    line1: '390/1 Premnagar',
    line2: 'Near Ram Mandir',
    line3: 'Gupteshwar',
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    pincode: '482001',
    country: 'India'
  },
  contact: {
    phone: '+91 72473 91595',
    email: 'info@urjavision.com',
    website: 'www.urjavision.com'
  },
  social: {
    facebook: 'https://facebook.com/urjavision',
    twitter: 'https://twitter.com/urjavision',
    linkedin: 'https://linkedin.com/company/urjavision',
    instagram: 'https://instagram.com/urjavision'
  }
};

export const NAVIGATION_MENU = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/solar-solutions' },
  { name: 'Projects', path: '/solar-projects' },
  { name: 'Contact', path: '/contact' }
];

export const SERVICES = [
  {
    id: 1,
    title: 'Residential Solar Installation',
    description: 'Rooftop systems for homes with end-to-end installation and maintenance.',
    icon: 'Home'
  },
  {
    id: 2,
    title: 'Commercial Solar Solutions',
    description: 'Solar systems for offices, hospitals, schools, hotels, and retail spaces.',
    icon: 'Building2'
  },
  {
    id: 3,
    title: 'Industrial Solar Power Plants',
    description: 'Large-scale solar installations for factories and industrial loads.',
    icon: 'Factory'
  },
  {
    id: 4,
    title: 'Solar Consultancy',
    description: 'Solar feasibility studies, proposal support, and project planning.',
    icon: 'FileText'
  },
  {
    id: 5,
    title: 'Solar EPC Projects',
    description: 'Engineering, procurement, and construction with local execution support.',
    icon: 'Construction'
  },
  {
    id: 6,
    title: 'Solar Maintenance',
    description: 'Monitoring, preventive maintenance, and performance support.',
    icon: 'Settings'
  }
];

export const PRODUCT_CATEGORIES = [
  'Solar Panels',
  'Solar Inverters',
  'Solar Batteries',
  'Solar Mounting Structures',
  'Solar DC Cables',
  'Solar Monitoring Systems',
  'Solar Pumps',
  'Solar Street Lights'
];

export const SOLAR_PACKAGES = [
  {
    id: 1,
    name: '2kW Home Solar Package',
    capacity: '2 kW',
    generation: '8-10 units/day',
    price: 'Rs 1,20,000',
    savings: 'Rs 3,000-4,000/month',
    roi: '4-5 years',
    components: [
      '2kW Solar Panels',
      '2kW Solar Inverter',
      'Mounting Structure',
      'DC Cables & Accessories',
      'Installation & Commissioning'
    ]
  },
  {
    id: 2,
    name: '5kW Smart Solar Package',
    capacity: '5 kW',
    generation: '20-25 units/day',
    price: 'Rs 2,50,000',
    savings: 'Rs 7,000-9,000/month',
    roi: '4-5 years',
    components: [
      '5kW Solar Panels',
      '5kW Smart Inverter with Monitoring',
      'Mounting Structure',
      'DC Cables & Accessories',
      'Installation & Commissioning',
      'Mobile App Monitoring'
    ]
  },
  {
    id: 3,
    name: '10kW Commercial Solar Package',
    capacity: '10 kW',
    generation: '40-50 units/day',
    price: 'Rs 4,50,000',
    savings: 'Rs 15,000-20,000/month',
    roi: '3-4 years',
    components: [
      '10kW Solar Panels',
      '10kW Commercial Inverter',
      'Heavy Duty Mounting Structure',
      'DC Cables & Accessories',
      'Installation & Commissioning',
      'Advanced Monitoring System',
      '5 Year Extended Warranty'
    ]
  }
];

export const GOVERNMENT_SCHEMES = [
  {
    id: 1,
    name: 'PM Kusum Yojana',
    description: 'Subsidy support for farmers to install solar pumps and grid-connected systems.',
    subsidy: 'Up to 60% subsidy',
    eligibility: 'Farmers and farmer cooperatives',
    benefits: ['Reduced electricity bills', 'Additional income from solar power', 'Sustainable irrigation']
  },
  {
    id: 2,
    name: 'Solar Rooftop Subsidy',
    description: 'Central government subsidy for residential rooftop solar installations.',
    subsidy: '40% for up to 3kW, 20% for 3-10kW',
    eligibility: 'Residential consumers',
    benefits: ['Lower installation cost', 'Reduced electricity bills', 'Environmental benefits']
  },
  {
    id: 3,
    name: 'Agriculture Solar Pump Scheme',
    description: 'State government subsidy support for solar irrigation pumps in Madhya Pradesh.',
    subsidy: 'Up to 90% subsidy',
    eligibility: 'Farmers in Madhya Pradesh',
    benefits: ['Free irrigation', 'Reduced diesel costs', 'Increased crop yield']
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Jabalpur',
    rating: 5,
    text: 'Excellent service. My 5kW solar system has reduced my electricity bill by around 80 percent. The team explained everything clearly and completed the installation smoothly.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 2,
    name: 'Sunita Sharma',
    location: 'Katni',
    rating: 5,
    text: 'They guided me properly on subsidy and system sizing. The installation looks neat, and the performance has been better than we expected.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    location: 'Mandla',
    rating: 5,
    text: 'We installed a 10kW system for our factory. The commercial savings are visible and their after-sales response has been dependable.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const STATS = [
  { id: 1, value: '500+', label: 'Solar Installations' },
  { id: 2, value: '5 MW+', label: 'Total Capacity Installed' },
  { id: 3, value: '1000+', label: 'Happy Customers' },
  { id: 4, value: '15+', label: 'Years Experience' }
];

export const SOLAR_BENEFITS = [
  'Reduce electricity bills by up to 90%',
  'Get government subsidies up to 40%',
  'Increase property value',
  '25-year solar panel warranty',
  'Low maintenance costs',
  'Contribute to clean energy'
];

export const SEO_KEYWORDS = [
  'Solar Company in Jabalpur',
  'Solar EPC Company MP',
  'Rooftop Solar Installation',
  'Urja VisionTechnologies Pvt. Ltd.'
];

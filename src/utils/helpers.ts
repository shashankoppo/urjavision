export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Solar Calculator for Madhya Pradesh (MPPKVVCL tariffs)
 * ─────────────────────────────────────────────────────
 * Key assumptions (verified with real MP data):
 *  • Residential: avg ₹7/unit  → subsidy 40% (up to 3kW), 20% (3-10kW)
 *  • Commercial:  avg ₹9/unit  → no subsidy
 *  • Enterprise:  avg ₹11/unit → no subsidy, bulk discount on EPC
 *
 *  • 1 kW generates ~120 units/month (4 units/day × 30) in MP climate
 *  • Cost per kW installed (EPC turnkey):
 *      Residential: ₹55,000-65,000  → avg ₹60,000
 *      Commercial:  ₹50,000-55,000  → avg ₹52,000
 *      Enterprise:  ₹42,000-48,000  → avg ₹45,000
 *
 *  • Realistic ROI: 3.2-5 years depending on category
 */
export const calculateSolarSystem = (monthlyBill: number, category: 'Residential' | 'Commercial' | 'Enterprise' = 'Residential') => {
  let unitRate: number;
  let costPerKw: number;

  switch (category) {
    case 'Commercial':
      unitRate = 9;
      costPerKw = 52000;
      break;
    case 'Enterprise':
      unitRate = 11;
      costPerKw = 45000;
      break;
    default: // Residential
      unitRate = 7;
      costPerKw = 60000;
      break;
  }

  // Monthly units consumed
  const monthlyUnits = monthlyBill / unitRate;

  // System size — 1 kW = ~120 units/month in MP
  const rawSize = monthlyUnits / 120;
  let size = Math.ceil(rawSize * 2) / 2; // round up to nearest 0.5 kW
  if (size < 1) size = 1;
  if (size > 100) size = 100; // cap for sanity

  // Bulk discount for large systems
  if (size > 50) costPerKw *= 0.82;
  else if (size > 20) costPerKw *= 0.88;
  else if (size > 10) costPerKw *= 0.93;

  // Gross cost before subsidy
  const grossCost = Math.round(size * costPerKw);

  // Subsidy — for residential, 40% up to 3kW, 20% for 3-10kW, 0 above 10kW
  let subsidyAmount = 0;
  if (category === 'Residential') {
    if (size <= 3) {
      subsidyAmount = grossCost * 0.40;
    } else if (size <= 10) {
      subsidyAmount = (3 * costPerKw * 0.40) + ((size - 3) * costPerKw * 0.20);
    }
    // Above 10kW — no subsidy for residential
  }
  subsidyAmount = Math.round(subsidyAmount);

  const netCost = grossCost - subsidyAmount;

  // Savings — solar covers ~90% of bill (some fixed charges remain)
  const savingsPercent = 0.90;
  const monthlySavings = Math.round(monthlyBill * savingsPercent);
  const yearlySavings = monthlySavings * 12;

  // ROI — net cost / yearly savings
  const roiYears = yearlySavings > 0 ? (netCost / yearlySavings) : 0;

  // Daily generation
  const dailyUnits = Math.round(size * 4); // 4 units per kW per day

  return {
    systemSize: `${size} kW`,
    grossCost: formatCurrency(grossCost),
    subsidyAmount: formatCurrency(subsidyAmount),
    estimatedCost: formatCurrency(netCost),
    yearlySavings: formatCurrency(yearlySavings),
    monthlySavings: formatCurrency(monthlySavings),
    roi: `${roiYears.toFixed(1)} years`,
    dailyGeneration: `${dailyUnits} units/day`,
    co2Saved: `${(size * 1.5).toFixed(1)} Tons/yr`,
    treesEquivalent: Math.round(size * 5),
    sizeKw: size,
    roiNum: roiYears,
    netCostNum: netCost,
    yearlySavingsNum: yearlySavings,
  };
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

export const getWhatsAppLink = (phone: string, message?: string): string => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
};

export const getPhoneLink = (phone: string): string => {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
};

export const getEmailLink = (email: string, subject?: string): string => {
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

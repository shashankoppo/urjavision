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

export const calculateSolarSystem = (monthlyBill: number) => {
  const avgUnitsPerDay = monthlyBill / 7;
  const systemSize = Math.ceil((avgUnitsPerDay * 1.2) / 4);
  const estimatedCost = systemSize * 60000;
  const yearlySavings = monthlyBill * 12 * 0.8;
  const roi = (estimatedCost / yearlySavings).toFixed(1);

  return {
    systemSize: `${systemSize} kW`,
    estimatedCost: formatCurrency(estimatedCost),
    yearlySavings: formatCurrency(yearlySavings),
    roi: `${roi} years`,
    dailyGeneration: `${avgUnitsPerDay.toFixed(0)} units`
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

import { Phone, Mail } from 'lucide-react';

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showIcons?: boolean;
}

const CTASection = ({
  title,
  subtitle,
  primaryButtonText = 'Call Now',
  secondaryButtonText = 'Get Quote',
  onPrimaryClick,
  onSecondaryClick,
  showIcons = true
}: CTASectionProps) => {
  return (
    <div className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #064E3B 0%, #047857 25%, #059669 50%, #10B981 75%, #34D399 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-flow 8s ease infinite',
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-white/85 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onPrimaryClick}
            className="group relative overflow-hidden flex items-center gap-2 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-[1.03]"
            style={{ 
              background: 'linear-gradient(135deg, #D97706, #F59E0B, #FBBF24)',
              boxShadow: '0 8px 30px rgba(245,158,11,0.3)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            {showIcons && <Phone size={20} className="relative z-10 text-gray-900" />}
            <span className="relative z-10 text-gray-900">{primaryButtonText}</span>
          </button>
          <button
            onClick={onSecondaryClick}
            className="glass-morphism text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all border border-white/30 hover:border-white/50 flex items-center gap-2"
          >
            {showIcons && <Mail size={20} />}
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;

import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  showButtons?: boolean;
}

const HeroSection = ({
  title,
  subtitle,
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage = 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1600',
  showButtons = true
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient overlays — multiple layers for depth */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(3,7,18,0.6) 0%, rgba(3,7,18,0.3) 40%, rgba(3,7,18,0.7) 100%)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 20% 80%, rgba(5,150,105,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 50%)'
      }} />

      {/* Animated glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] -top-20 -left-20 bg-emerald-500/10" />
        <div className="glow-orb w-[300px] h-[300px] bottom-10 right-10 bg-amber-500/8" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="mega-gradient-text">{title}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200/90 leading-relaxed">
            {subtitle}
          </p>
          {showButtons && (
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onPrimaryClick}
                className="group relative overflow-hidden flex items-center gap-2 font-bold px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
                style={{ 
                  background: 'linear-gradient(135deg, #D97706, #F59E0B, #FBBF24)',
                  boxShadow: '0 8px 30px rgba(245,158,11,0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10 text-gray-900">{primaryButtonText}</span>
                <ArrowRight size={20} className="relative z-10 text-gray-900 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onSecondaryClick}
                className="glass-morphism text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all border border-white/20 hover:border-white/40"
              >
                {secondaryButtonText}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{
        background: 'linear-gradient(to top, rgba(3,7,18,1) 0%, transparent 100%)'
      }} />
    </div>
  );
};

export default HeroSection;

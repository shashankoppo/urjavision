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
    <div className="relative h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 gradient-hero" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {subtitle}
          </p>
          {showButtons && (
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onPrimaryClick}
                className="btn-secondary flex items-center gap-2"
              >
                {primaryButtonText}
                <ArrowRight size={20} />
              </button>
              <button
                onClick={onSecondaryClick}
                className="btn-outline bg-white text-[#1E8449] hover:bg-gray-100 border-white"
              >
                {secondaryButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

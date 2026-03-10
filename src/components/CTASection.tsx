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
    <div className="bg-gradient-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onPrimaryClick}
            className="btn-secondary flex items-center gap-2"
          >
            {showIcons && <Phone size={20} />}
            {primaryButtonText}
          </button>
          <button
            onClick={onSecondaryClick}
            className="btn-outline bg-white text-[#1E8449] hover:bg-gray-100 border-white flex items-center gap-2"
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

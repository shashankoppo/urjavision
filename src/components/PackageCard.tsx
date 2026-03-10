import { Check, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  name: string;
  capacity: string;
  generation: string;
  price: string;
  savings: string;
  roi: string;
  components: string[];
  featured?: boolean;
  onSelect?: () => void;
}

const PackageCard = ({
  name,
  capacity,
  generation,
  price,
  savings,
  roi,
  components,
  featured = false,
  onSelect
}: PackageCardProps) => {
  return (
    <div
      className={`card-premium p-8 relative transition-all duration-500 ${
        featured
          ? 'bg-gradient-to-br from-[#FFC300]/10 to-[#FFD700]/5 border-2 border-[#FFC300] scale-105 shadow-2xl'
          : 'bg-white'
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-secondary text-[#1F1F1F] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-[#1F1F1F] mb-2">{name}</h3>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-5xl font-black bg-gradient-secondary bg-clip-text text-transparent">
          {price.split('₹')[1]}
        </span>
        <span className="text-[#1F1F1F] font-semibold">₹/System</span>
      </div>

      <div className="space-y-4 mb-8 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">Capacity</span>
          <span className="font-bold text-[#1E8449]">{capacity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">Daily Generation</span>
          <span className="font-bold text-[#1E8449]">{generation}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">Monthly Savings</span>
          <span className="font-bold text-[#FFC300] text-lg">{savings}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">ROI Period</span>
          <span className="font-bold text-[#1F1F1F]">{roi}</span>
        </div>
      </div>

      <div className="border-t-2 border-gray-100 pt-6 mb-8">
        <h4 className="font-bold text-[#1F1F1F] mb-4 uppercase tracking-wider text-sm">What's Included:</h4>
        <ul className="space-y-3">
          {components.map((component, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700 gap-3">
              <Check size={20} className="text-[#1E8449] flex-shrink-0 mt-0" />
              <span className="font-medium">{component}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onSelect}
        className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all group ${
          featured
            ? 'btn-secondary hover:shadow-xl hover:gap-4'
            : 'btn-primary hover:gap-4'
        }`}
      >
        Get Quote
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default PackageCard;

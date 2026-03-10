import { useState } from 'react';
import { ShoppingCart, ChevronDown } from 'lucide-react';

interface ProductCardProps {
  name: string;
  category: string;
  capacity: string;
  brand?: string;
  description: string;
  specifications: string[];
  image: string;
  onRequestQuote?: () => void;
}

const ProductCard = ({
  name,
  category,
  capacity,
  brand = 'Premium',
  description,
  specifications,
  image,
  onRequestQuote
}: ProductCardProps) => {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <div className="card-premium bg-white group">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <span className="absolute top-3 right-3 text-xs font-bold text-white bg-gradient-primary px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-[#1E8449] uppercase tracking-wider mb-1">
              {brand}
            </p>
            <h3 className="text-lg font-bold text-[#1F1F1F]">{name}</h3>
          </div>
        </div>

        <p className="text-sm font-bold text-[#FFC300] mb-3 tracking-wider">{capacity}</p>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className="flex items-center gap-2 text-sm font-semibold text-[#1E8449] mb-3 hover:gap-3 transition-all"
        >
          Specs
          <ChevronDown size={16} className={`transition-transform ${showSpecs ? 'rotate-180' : ''}`} />
        </button>

        {showSpecs && (
          <ul className="space-y-2 mb-5 pb-5 border-b border-gray-200">
            {specifications.map((spec, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-[#1E8449] font-bold mt-1">▸</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onRequestQuote}
          className="w-full btn-primary flex items-center justify-center gap-2 font-semibold hover:gap-3 transition-all group"
        >
          <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

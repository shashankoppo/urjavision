import { Star, MapPin } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const TestimonialCard = ({ name, location, rating, text, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg card-shadow">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="text-lg font-bold text-[#1F1F1F]">{name}</h4>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={index < rating ? 'fill-[#FFC300] text-[#FFC300]' : 'text-gray-300'}
          />
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
};

export default TestimonialCard;

import * as Icons from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
}

const ServiceCard = ({ title, description, icon, onClick }: ServiceCardProps) => {
  const IconComponent = (Icons as any)[icon] || Icons.Zap;

  return (
    <div
      className="card-premium bg-white p-8 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-solar-glow rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
        <div className="relative w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
          <IconComponent className="text-white" size={40} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#1F1F1F] mb-3 group-hover:text-[#1E8449] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center text-[#1E8449] font-semibold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
        Learn More
        <Icons.ArrowRight size={18} className="ml-2" />
      </div>
    </div>
  );
};

export default ServiceCard;

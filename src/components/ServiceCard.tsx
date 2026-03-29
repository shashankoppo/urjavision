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
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.2), rgba(245,158,11,0.1))' }}
        />
        <div 
          className="relative w-20 h-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500"
          style={{ 
            background: 'linear-gradient(135deg, #047857, #059669, #10B981)',
            boxShadow: '0 8px 24px rgba(5,150,105,0.25)'
          }}
        >
          <IconComponent className="text-white" size={40} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-700 group-hover:to-emerald-500 group-hover:bg-clip-text transition-all">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
      <div className="mt-6 flex items-center font-semibold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
        Learn More
        <Icons.ArrowRight size={18} className="ml-2 text-emerald-600" />
      </div>
    </div>
  );
};

export default ServiceCard;

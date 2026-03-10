import * as Icons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const IconComponent = (Icons as any)[icon] || Icons.Check;

  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <IconComponent className="text-white" size={24} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-[#1F1F1F] mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

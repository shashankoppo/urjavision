import { MapPin, Zap, Calendar } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  location: string;
  capacity: string;
  type: string;
  description: string;
  image: string;
  year: string;
}

const ProjectCard = ({
  title,
  location,
  capacity,
  type,
  description,
  image,
  year
}: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg card-shadow overflow-hidden">
      <div className="h-56 overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-white bg-[#1E8449] px-3 py-1 rounded-full">
          {type}
        </span>
        <h3 className="text-xl font-bold text-[#1F1F1F] mt-3 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="text-[#1E8449] mr-2" />
            {location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Zap size={16} className="text-[#FFC300] mr-2" />
            {capacity} Installed
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="text-[#1E8449] mr-2" />
            Completed in {year}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

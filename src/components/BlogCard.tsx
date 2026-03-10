import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  onClick?: () => void;
}

const BlogCard = ({
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  image,
  onClick
}: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg card-shadow overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="h-48 overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-[#1E8449] bg-[#1E8449]/10 px-3 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-xl font-bold text-[#1F1F1F] mt-3 mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">By {author}</span>
          <button className="text-[#1E8449] hover:text-[#FFC300] transition flex items-center gap-1 text-sm font-semibold">
            Read More
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

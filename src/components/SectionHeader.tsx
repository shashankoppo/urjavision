interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = ({ title, subtitle, centered = true }: SectionHeaderProps) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-4xl font-bold text-[#1F1F1F] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`w-24 h-1 bg-gradient-primary mt-4 ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};

export default SectionHeader;

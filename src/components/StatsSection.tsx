interface Stat {
  id: number;
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="bg-gradient-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

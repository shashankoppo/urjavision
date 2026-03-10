import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
}

const SectionWrapper = ({ children, className = '', background = 'white' }: SectionWrapperProps) => {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-primary'
  };

  return (
    <section className={`section-padding ${bgClasses[background]} ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;

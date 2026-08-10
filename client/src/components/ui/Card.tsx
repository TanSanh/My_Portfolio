import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div
      className={`
        bg-gradient-card
        rounded-2xl
        border border-white/5
        p-6
        ${hover ? 'hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

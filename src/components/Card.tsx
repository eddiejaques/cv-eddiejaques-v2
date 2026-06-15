import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  compact?: boolean;
  className?: string;
}

export default function Card({ children, compact = false, className = '' }: CardProps) {
  const padding = compact ? 'p-6' : 'p-8';
  return (
    <div
      className={`bg-surface border border-border rounded-DEFAULT shadow-sm hover:shadow-md transition-all duration-300 ${padding} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

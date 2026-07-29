import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'gradient';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-5 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

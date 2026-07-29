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
  variant = 'glass',
  glow = false,
  ...props
}) => {
  const variants = {
    glass: 'glass-card rounded-2xl p-5',
    solid: 'bg-slate-900/80 border border-slate-800 rounded-2xl p-5',
    gradient: 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-indigo-500/20 rounded-2xl p-5',
  };

  return (
    <div
      className={cn(
        variants[variant],
        glow && 'shadow-[0_0_25px_-5px_rgba(79,70,229,0.25)] border-indigo-500/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

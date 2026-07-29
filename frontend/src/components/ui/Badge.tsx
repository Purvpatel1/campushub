import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'slate' | 'cyan';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
  title?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'indigo',
  size = 'md',
  className,
  dot = false,
  title,
}) => {
  const variants = {
    emerald: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40',
    amber: 'bg-amber-950/40 text-amber-400 border-amber-800/40',
    rose: 'bg-rose-950/40 text-rose-400 border-rose-800/40',
    indigo: 'bg-indigo-950/50 text-indigo-300 border-indigo-800/50',
    cyan: 'bg-cyan-950/40 text-cyan-400 border-cyan-800/40',
    slate: 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50',
  };

  const dotColors = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    indigo: 'bg-indigo-400',
    cyan: 'bg-cyan-400',
    slate: 'bg-zinc-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-0.5 font-medium',
  };

  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border transition-colors select-none font-mono',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};

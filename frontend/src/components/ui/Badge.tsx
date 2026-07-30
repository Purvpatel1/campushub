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
    emerald: 'bg-zinc-900 text-emerald-400 border-zinc-800',
    amber: 'bg-zinc-900 text-amber-400 border-zinc-800',
    rose: 'bg-zinc-900 text-rose-400 border-zinc-800',
    indigo: 'bg-zinc-900 text-indigo-400 border-zinc-800',
    cyan: 'bg-zinc-900 text-cyan-400 border-zinc-800',
    slate: 'bg-zinc-900 text-zinc-400 border-zinc-800',
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
        'inline-flex items-center gap-1.5 rounded border font-mono select-none',
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

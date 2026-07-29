import React from 'react';
import { cn } from '@/utils/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  roleBadge?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  roleBadge,
  className,
}) => {
  const getInitials = (nameStr: string) => {
    return nameStr
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-slate-700/60', sizes[size], className)}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-indigo-500 to-violet-700 text-white font-semibold flex items-center justify-center border border-indigo-400/30 shadow-md shadow-indigo-500/10 select-none',
            sizes[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {roleBadge && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"
          title={`Active: ${roleBadge}`}
        />
      )}
    </div>
  );
};

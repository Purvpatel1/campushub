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
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs font-semibold',
    lg: 'w-11 h-11 text-sm font-semibold',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-zinc-800', sizes[size], className)}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700/60 flex items-center justify-center select-none font-mono',
            sizes[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {roleBadge && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-zinc-950 rounded-full"
          title={`Active: ${roleBadge}`}
        />
      )}
    </div>
  );
};

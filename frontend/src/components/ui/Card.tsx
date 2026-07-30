import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-zinc-900/60 border border-zinc-800 rounded-lg p-5 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

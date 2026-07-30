import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md min-h-[44px] md:min-h-0';

  const variants = {
    primary: 'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold border border-zinc-200',
    secondary: 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800',
    outline: 'border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300',
    ghost: 'bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100',
    danger: 'bg-zinc-900 hover:bg-rose-950 text-rose-400 border border-rose-900/60',
  };

  const sizes = {
    sm: 'text-xs px-3 py-2 md:py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2.5 md:py-2 gap-2',
    lg: 'text-sm px-5 py-3 md:py-2.5 gap-2',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 md:w-3.5 md:h-3.5 animate-spin text-current" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

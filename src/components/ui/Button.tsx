import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) { return clsx(inputs); }

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const baseStr = [
  "inline-flex items-center justify-center font-semibold tracking-wide",
  "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  "border-2 border-transparent"
].join(' ');

const vMap = {
  primary:   "bg-[#B1262A] text-white border-[#B1262A] hover:bg-[#8E1D20] hover:border-[#8E1D20] shadow-sm active:scale-[0.98]",
  secondary: "bg-transparent text-[#141518] border-[#1F7A3F] hover:bg-[#1F7A3F] hover:text-white active:scale-[0.98]",
  ghost:     "bg-transparent text-[#141518] border-transparent hover:bg-black/5",
  outline:   "bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/60",
  danger:    "bg-[#8E1D20] text-white border-[#8E1D20] hover:bg-[#6E161A]",
};

const sMap = {
  sm: "h-8  px-4  text-xs  gap-1.5",
  md: "h-10 px-5  text-sm  gap-2",
  lg: "h-12 px-8  text-[15px] gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => (
    <button ref={ref} className={cn(baseStr, vMap[variant], sMap[size], className)} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent" /> : null}
      {children}
    </button>
  )
);
Button.displayName = 'Button';

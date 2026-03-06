import { HTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
function cn(...inputs: ClassValue[]) { return clsx(inputs); }

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { variant?: 'default' | 'success' | 'danger' | 'warning' | 'outline'; }

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = 'default', ...props }, ref) => {
  const base = "inline-flex items-center px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-colors";
  const vMap = {
    default: "bg-[#141518] text-[#F3F3F1]",
    success: "bg-[#1F7A3F] text-white",
    danger:  "bg-[#B1262A] text-white",
    warning: "bg-[#c8a45d] text-[#141518]",
    outline: "text-[#141518] border border-[#141518]",
  };
  return <span ref={ref} className={cn(base, vMap[variant], className)} {...props} />;
});
Badge.displayName = 'Badge';

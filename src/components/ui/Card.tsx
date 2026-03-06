import { HTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
function cn(...inputs: ClassValue[]) { return clsx(inputs); }

export interface CardProps extends HTMLAttributes<HTMLDivElement> { variant?: 'default' | 'premium' | 'flat'; }

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = 'default', ...props }, ref) => {
  const vMap = {
    default: "bg-white border border-[#E2E0DB] shadow-[0_2px_12px_rgba(0,0,0,0.07)]",
    premium: "bg-[#1C1E22] text-[#F3F3F1] border border-white/[0.08] shadow-xl relative overflow-hidden",
    flat:    "bg-[#F3F3F1]",
  };
  return <div ref={ref} className={cn(vMap[variant], "transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.13)]", className)} {...props} />;
});
Card.displayName = 'Card';

import { ReactNode, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

export interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; }

export function Modal({ isOpen, onClose, title, children, size = 'md', className }: ModalProps) {
  const { t } = useTranslation(); const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) { document.addEventListener('keydown', handleEsc); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', handleEsc); document.body.style.overflow = 'unset'; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sMap = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className={clsx('relative w-full bg-[#F7F4EF] shadow-2xl p-6 border border-[#E8E0D2] animate-slide-in-up', sMap[size], className)} role="dialog" aria-modal="true">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E8E0D2]">
          <h3 className="text-xl font-bold text-[#1A1410]">{title}</h3>
          <button onClick={onClose} className="p-2 text-[#A7ABB3] hover:text-[#0B0D10] transition-colors hover:bg-[#E8E0D2]" aria-label={t('common.close')}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto max-h-[70vh] pr-2 rtl:pl-2 rtl:pr-0">
          {children}
        </div>
      </div>
    </div>
  );
}

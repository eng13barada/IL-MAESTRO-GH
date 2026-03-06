import { useState, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface Tab { id: string; label: string; content?: ReactNode; }
export interface TabsProps { tabs: Tab[]; defaultTab?: string; onChange?: (id: string) => void; className?: string; }

export function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0].id);
  const handleTabClick = (id: string) => { setActive(id); onChange?.(id); };

  return (
    <div className={clsx('w-full', className)}>
      <div className="flex space-x-4 border-b border-[#E8E0D2] overflow-x-auto rtl:space-x-reverse no-scrollbar mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              'px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors',
              active === tab.id ? 'border-[#C8A45D] text-[#0B0D10]' : 'border-transparent text-[#A7ABB3] hover:text-[#0B0D10] hover:border-[#E8E0D2]'
            )}
            role="tab"
            aria-selected={active === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content w-full focus:outline-none" role="tabpanel">
        {tabs.find(t => t.id === active)?.content}
      </div>
    </div>
  );
}

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

export interface Column<T> { key: string; header: string; cell: (item: T) => ReactNode; align?: 'left' | 'center' | 'right'; }
export interface TableProps<T> { data: T[]; columns: Column<T>[]; className?: string; rowClassName?: (item: T) => string; }

export function Table<T extends { id: string }>({ data, columns, className, rowClassName }: TableProps<T>) {
  const { t } = useTranslation();
  if (data.length === 0) return <div className="p-8 text-center text-[#A7ABB3] bg-white border border-[#E8E0D2]">{t('common.no_results')}</div>;

  return (
    <div className={clsx('w-full overflow-x-auto border border-[#E8E0D2] bg-white', className)}>
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="bg-[#F7F4EF] text-[#A7ABB3] text-xs uppercase border-b border-[#E8E0D2]">
          <tr>
            {columns.map(col => (
              <th key={col.key} scope="col" className={clsx('px-6 py-4 font-semibold whitespace-nowrap', `text-${col.align || 'left'} rtl:text-${col.align === 'left' ? 'right' : 'left'}`)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E0D2]">
          {data.map((row) => (
            <tr key={row.id} className={clsx('hover:bg-[#F7F4EF]/50 transition-colors', rowClassName?.(row))}>
              {columns.map(col => (
                <td key={`${row.id}-${col.key}`} className={clsx('px-6 py-4', `text-${col.align || 'left'} rtl:text-${col.align === 'left' ? 'right' : 'left'}`)}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

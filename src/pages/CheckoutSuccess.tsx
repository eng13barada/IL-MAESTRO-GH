import { useTranslation } from 'react-i18next';
import { useCommerceStore } from '@/stores/useCommerceStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatSar } from '@/lib/money';
import { ImageFactory } from '@/lib/imageFactory';
import { CheckCircle2, Download, Printer } from 'lucide-react';
import { useEffect } from 'react';

export function CheckoutSuccess() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id');
  const { orders } = useCommerceStore();
  
  const order = orders.find(o => o.id === id);

  useEffect(() => {
    if (!id || !order) nav('/');
  }, [id, order, nav]);

  if (!order) return null;

  const isAr = i18n.language === 'ar';
  const fmt = (v: number) => isAr ? formatSar(v) : `SAR ${v.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-16 flex items-center justify-center">
      <div className="container px-4 mx-auto max-w-2xl text-center">
        <CheckCircle2 className="w-24 h-24 mx-auto mb-8 text-[#2E6B4C]" />
        <h1 className="text-4xl font-extrabold text-[#0B0D10] mb-4">{t('checkout.success_title')}</h1>
        <p className="text-[#A7ABB3] mb-8">{t('book.booking_confirmed')}</p>

        <Card className="text-left bg-white p-8 shadow-xl border-[#E8E0D2] mb-8 relative overflow-hidden rtl:text-right">
           <img src={ImageFactory.generateHeroTexture(55)} alt="" className="absolute inset-0 z-0 opacity-5 mix-blend-multiply w-full h-full object-cover" />
           <div className="relative z-10">
              <div className="flex justify-between items-start border-b border-[#E8E0D2] pb-6 mb-6">
                 <div><div className="font-bold text-xl mb-1 flex items-center gap-2"><div className="w-8 h-8 bg-[#0B0D10] text-[#C8A45D] flex items-center justify-center font-bold text-sm tracking-wider rounded-sm">IM</div>IL MAESTRO</div><p className="text-[#A7ABB3] text-sm">Riyadh, Saudi Arabia</p></div>
                 <div className="text-right rtl:text-left"><p className="text-[#C8A45D] text-xs font-bold uppercase tracking-wider mb-1">{t('checkout.invoice_num')}</p><h4 className="text-lg font-mono font-bold">{order.id}</h4><p className="text-[#A7ABB3] text-sm">{new Date(order.date).toLocaleDateString()}</p></div>
              </div>

              <div className="space-y-4 mb-6">
                 {order.items.map(i => (
                   <div key={i.id} className="flex justify-between items-center text-sm border-b border-[#E8E0D2]/50 pb-2"><span className="font-medium text-[#1A1410]">{isAr?i.nameAr:i.nameEn} (x{i.quantity})</span><span className="font-mono text-[#A7ABB3]">{fmt(i.price * i.quantity)}</span></div>
                 ))}
              </div>

              <div className="w-full max-w-xs ml-auto rtl:mr-auto rtl:ml-0 space-y-2 text-sm bg-[#F7F4EF] p-4 rounded-md border border-[#E8E0D2]">
                 <div className="flex justify-between text-[#A7ABB3]"><span>{t('cart.subtotal')}</span><span className="font-medium">{fmt(order.subtotal)}</span></div>
                 {order.discount > 0 && <div className="flex justify-between text-[#C8A45D]"><span>{t('cart.discount')}</span><span className="font-medium">-{fmt(order.discount)}</span></div>}
                 <div className="flex justify-between text-[#A7ABB3]"><span>{t('cart.vat')}</span><span className="font-medium">{fmt(order.vat)}</span></div>
                 <div className="border-t border-[#E8E0D2] pt-2 mt-2 flex justify-between font-bold text-lg text-[#0B0D10]"><span>{t('cart.total')}</span><span>{fmt(order.total)}</span></div>
              </div>
           </div>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
           <Button variant="outline" className="gap-2" onClick={() => window.print()}><Printer className="w-5 h-5"/> Print Invoice</Button>
           <Button variant="primary" onClick={() => nav('/customer')}>{t('checkout.go_dashboard')}</Button>
        </div>
      </div>
    </div>
  );
}

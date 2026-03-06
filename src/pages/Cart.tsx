import { useTranslation } from 'react-i18next';
import { useCommerceStore } from '@/stores/useCommerceStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatSar, formatSarEn } from '@/lib/money';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Cart() {
  const { t, i18n } = useTranslation();
  const { cart, removeItem, updateQuantity, applyPromo, getTotals, promoCode, discountAmount } = useCommerceStore();
  const totals = getTotals();
  const [promo, setPromo] = useState('');
  const [promoError, setPromoError] = useState(false);

  const handleApplyPromo = () => {
    if (applyPromo(promo)) setPromoError(false);
    else setPromoError(true);
  };

  const isAr = i18n.language === 'ar';
  const fmt = (v: number) => isAr ? formatSar(v) : formatSarEn(v);

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-16">
      <div className="container px-4 mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold text-[#0B0D10] mb-8 flex items-center gap-3"><ShoppingBag className="w-8 h-8 text-[#C8A45D]"/> {t('cart.title')}</h1>
        
        {cart.length === 0 ? (
          <Card className="p-16 text-center text-[#A7ABB3]">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <p className="text-xl font-medium">{t('cart.empty')}</p>
            <Link to="/services"><Button variant="secondary" className="mt-8">{t('home.explore')}</Button></Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <Card key={item.id} className="p-4 flex items-center justify-between shadow-sm bg-white">
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1 text-[#1A1410]">{isAr ? item.nameAr : item.nameEn}</h3>
                    <p className="text-sm font-medium text-[#C8A45D]">{fmt(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4 ml-4 rtl:mr-4 rtl:ml-0">
                     <div className="flex items-center border border-[#E8E0D2] rounded-md overflow-hidden bg-[#F7F4EF]">
                       <button className="px-3 py-1 bg-white hover:bg-[#E8E0D2] transition-colors" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                       <span className="px-4 py-1 font-bold text-sm min-w-[2rem] text-center">{item.quantity}</span>
                       <button className="px-3 py-1 bg-white hover:bg-[#E8E0D2] transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                     </div>
                     <button onClick={() => removeItem(item.id)} className="p-2 text-[#A7ABB3] hover:text-[#B84A3A] transition-colors bg-[#F7F4EF] rounded-full hover:bg-white"><Trash2 className="w-5 h-5"/></button>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <Card className="p-6 bg-[#1A1410] text-[#F7F4EF] sticky top-24 shadow-xl border-[#C8A45D]/20 border-t-4 border-t-[#C8A45D]">
                <h3 className="text-xl font-bold mb-6">{t('cart.title')}</h3>
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between"><span className="text-[#A7ABB3]">{t('cart.subtotal')}</span><span className="font-bold">{fmt(totals.subtotal)}</span></div>
                  {promoCode && <div className="flex justify-between text-[#C8A45D]"><span className="flex items-center gap-1">{t('cart.discount')} ({promoCode})</span><span className="font-bold">-{fmt(totals.discount)}</span></div>}
                  <div className="flex justify-between"><span className="text-[#A7ABB3]">{t('cart.vat')}</span><span className="font-medium opacity-80">{fmt(totals.vat)}</span></div>
                </div>
                <div className="border-t border-[#E8E0D2]/10 pt-4 mb-8 flex justify-between items-center text-lg">
                  <span className="font-bold">{t('cart.total')}</span><span className="font-extrabold text-[#C8A45D] text-2xl">{fmt(totals.total)}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex gap-2">
                    <input type="text" value={promo} onChange={e => setPromo(e.target.value)} placeholder={t('cart.promo')} className="flex-grow bg-[#0B0D10] border border-[#E8E0D2]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#C8A45D] uppercase text-[#F7F4EF] placeholder:text-white/20 uppercase" />
                    <Button variant="secondary" size="sm" onClick={handleApplyPromo}>{t('cart.apply')}</Button>
                  </div>
                  {promoError && <p className="text-xs text-[#B84A3A]">Invalid promo code</p>}
                </div>

                <Link to="/checkout"><Button className="w-full text-base py-6 shadow-md" variant="primary">{t('cart.checkout')}</Button></Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

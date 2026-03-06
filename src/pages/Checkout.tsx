import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCommerceStore } from '@/stores/useCommerceStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatSar } from '@/lib/money';
import { CreditCard, Wallet, Apple } from 'lucide-react';

export function Checkout() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const { checkout, getTotals, cart } = useCommerceStore();
  const [method, setMethod] = useState('mada');
  const totals = getTotals();

  if (cart.length === 0) {
    nav('/cart'); return null;
  }

  const handlePay = () => {
    const invId = checkout('c1');
    nav(`/checkout/success?id=${invId}`);
  };

  const isAr = i18n.language === 'ar';
  const meths = [
    { id: 'mada', l: 'MADA', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'visa', l: 'Visa / Mastercard', icon: <Wallet className="w-6 h-6" /> },
    { id: 'apple', l: 'Apple Pay', icon: <Apple className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[#0B0D10] mb-8">{t('checkout.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-[#1A1410]">1. {t('checkout.name')}</h3>
              <div className="space-y-4">
                <input type="text" placeholder={t('checkout.name')} className="w-full border border-[#E8E0D2] rounded-md px-4 py-2 bg-[#F7F4EF] focus:border-[#C8A45D] outline-none" defaultValue="Khalid Al Saud" />
                <input type="tel" placeholder={t('checkout.phone')} className="w-full border border-[#E8E0D2] rounded-md px-4 py-2 bg-[#F7F4EF] focus:border-[#C8A45D] outline-none" defaultValue="+966 50 000 0000" />
                <input type="email" placeholder={t('checkout.email')} className="w-full border border-[#E8E0D2] rounded-md px-4 py-2 bg-[#F7F4EF] focus:border-[#C8A45D] outline-none" defaultValue="khalid@demo.sa" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-[#1A1410]">2. {t('checkout.payment')}</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {meths.map(m => (
                  <button key={m.id} onClick={() => setMethod(m.id)} className={`flex flex-col items-center gap-2 p-3 rounded-md border-2 transition-all ${method === m.id ? 'border-[#C8A45D] bg-[#1A1410] text-[#F7F4EF]' : 'border-[#E8E0D2] text-[#A7ABB3] hover:border-[#1A1410] hover:text-[#1A1410]'}`}>
                    {m.icon}
                    <span className="text-xs font-bold">{m.l}</span>
                  </button>
                ))}
              </div>
              
              {method !== 'apple' && (
                <div className="space-y-4">
                  <input type="text" placeholder="Card Number (Demo)" className="w-full border border-[#E8E0D2] rounded-md px-4 py-3 font-mono bg-[#F7F4EF] text-center tracking-widest text-[#A7ABB3]" defaultValue="XXXX XXXX XXXX XXXX" disabled />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="w-full border border-[#E8E0D2] rounded-md px-4 py-3 font-mono bg-[#F7F4EF] text-center text-[#A7ABB3]" defaultValue="12/28" disabled />
                    <input type="text" placeholder="CVV" className="w-full border border-[#E8E0D2] rounded-md px-4 py-3 font-mono bg-[#F7F4EF] text-center text-[#A7ABB3]" defaultValue="123" disabled />
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div>
             <Card className="p-6 bg-[#1A1410] text-[#F7F4EF] shadow-xl sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-[#C8A45D]">{t('cart.title')}</h3>
                <div className="space-y-4 mb-6 text-sm divide-y divide-white/5 rtl:divide-x-reverse">
                  {cart.map(c => (
                     <div key={c.id} className="flex justify-between items-start py-2">
                        <div><span className="font-bold mb-1 block">{isAr?c.nameAr:c.nameEn}</span><span className="text-xs text-[#A7ABB3]">Qty: {c.quantity}</span></div>
                        <span className="font-medium opacity-90">{formatSar(c.price * c.quantity)}</span>
                     </div>
                  ))}
                </div>
                <div className="border-t border-white/20 pt-4 mb-8 flex justify-between items-center text-lg">
                  <span className="font-bold">{t('cart.total')}</span><span className="font-extrabold text-[#C8A45D] text-2xl">{isAr?formatSar(totals.total):`SAR ${totals.total}`}</span>
                </div>
                <Button className="w-full text-base py-6 disabled:opacity-50" onClick={handlePay} variant="primary">{t('checkout.pay_now')}</Button>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

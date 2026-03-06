import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/stores/useBookingStore';
import { useCustomerStore } from '@/stores/useCustomerStore';
import { useCommerceStore } from '@/stores/useCommerceStore';
import { useNavigate } from 'react-router-dom';
import { BRANCHES, BARBERS, SERVICES } from '@/data/demoDb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ChevronRight, ChevronLeft, MapPin, Scissors, CalendarCheck } from 'lucide-react';

export function Book() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const { step, setStep, branchId, setBranch, barberId, setBarber, serviceIds, toggleService, date, time, setDateTime, reset } = useBookingStore();
  const { getCustomer } = useCustomerStore();
  const { addItem } = useCommerceStore();
  const c = getCustomer();

  const isAr = i18n.language === 'ar';
  const steps = [ t('book.step1'), t('book.step2'), t('book.step3'), t('book.step4'), t('book.step5') ];

  const branch = BRANCHES.find(b => b.id === branchId);
  const barber = BARBERS.find(b => b.id === barberId);
  const selServices = SERVICES.filter(s => serviceIds.includes(s.id));
  const totPrice = selServices.reduce((acc, s) => acc + s.price, 0);
  const totDur = selServices.reduce((acc, s) => acc + s.duration, 0);

  const confirm = () => {
    selServices.forEach(s => addItem({ id: s.id, type: 'service', nameEn: s.nameEn, nameAr: s.nameAr, price: s.price }));
    nav('/cart');
    reset();
  };

  const fakeDates = [ '2026-03-07', '2026-03-08', '2026-03-09' ];
  const fakeTimes = [ '10:00 AM', '11:00 AM', '2:00 PM', '4:30 PM', '6:00 PM' ];

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[#0B0D10] mb-8 text-center">{t('book.title')}</h1>
        
        {/* Stepper */}
        <div className="mb-12 flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-[#E8E0D2] -z-10 -translate-y-1/2"></div>
          {steps.map((label, idx) => {
            const num = idx + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${active ? 'bg-[#0B0D10] border-[#0B0D10] text-[#F7F4EF]' : done ? 'bg-[#C8A45D] border-[#C8A45D] text-[#0B0D10]' : 'bg-[#F7F4EF] border-[#E8E0D2] text-[#A7ABB3]'}`}>
                  {done ? <CheckCircle2 className="w-5 h-5" /> : num}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${active ? 'text-[#0B0D10]' : 'text-[#A7ABB3]'}`}>{label}</span>
              </div>
            );
          })}
        </div>

        <Card className="p-6 md:p-10 shadow-xl border-[#E8E0D2]">
          {step === 1 && (
            <div><h3 className="text-2xl font-bold mb-6">{t('book.select_branch')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BRANCHES.map(b => (
                  <Card key={b.id} onClick={() => setBranch(b.id)} className="p-4 cursor-pointer hover:border-[#C8A45D] hover:shadow-md transition-all border-2 border-transparent bg-[#F7F4EF]">
                    <h4 className="font-bold text-lg mb-1 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#C8A45D]"/> {isAr ? b.nameAr : b.nameEn}</h4>
                    <p className="text-sm text-[#A7ABB3]">{b.city} • {b.hours}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div><h3 className="text-2xl font-bold mb-6">{t('book.select_barber')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BARBERS.filter(b => b.branchId === branchId).map(b => (
                  <Card key={b.id} onClick={() => setBarber(b.id)} className="p-4 cursor-pointer hover:border-[#C8A45D] hover:shadow-md transition-all border-2 border-transparent flex items-center gap-4 bg-[#F7F4EF]">
                     <div className="w-12 h-12 bg-[#0B0D10] text-[#F7F4EF] rounded-full flex items-center justify-center font-bold text-lg">{b.nameEn[0]}</div>
                     <div><h4 className="font-bold">{isAr ? b.nameAr : b.nameEn}</h4><p className="text-xs text-[#A7ABB3]">{b.spec.join(', ')}</p></div>
                  </Card>
                ))}
              </div>
              <div className="mt-8"><Button variant="ghost" onClick={() => setStep(1)}><ChevronLeft className="w-4 h-4 mr-2 rtl:ml-2"/> {t('common.back')}</Button></div>
            </div>
          )}

          {step === 3 && (
            <div><h3 className="text-2xl font-bold mb-6">{t('book.select_services')}</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 rtl:pl-2 rtl:pr-0">
                {SERVICES.map(s => {
                  const sel = serviceIds.includes(s.id);
                  return (
                    <Card key={s.id} onClick={() => toggleService(s.id)} className={`p-4 cursor-pointer transition-all border-2 flex items-center justify-between ${sel ? 'border-[#C8A45D] bg-[#F7F4EF] shadow-md' : 'border-[#E8E0D2] bg-white'}`}>
                      <div><h4 className="font-bold">{isAr ? s.nameAr : s.nameEn}</h4><p className="text-sm text-[#A7ABB3]">{s.duration} {t('common.min')}</p></div>
                      <div className="font-bold text-[#C8A45D]">{s.price} {t('common.sar')}</div>
                    </Card>
                  )
                })}
              </div>
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-[#E8E0D2]">
                <Button variant="ghost" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4 mr-2 flex"/> {t('common.back')}</Button>
                <div className="text-right rtl:text-left"><p className="text-sm text-[#A7ABB3] mb-1">{t('book.total_price')}: <strong className="text-lg text-[#0B0D10]">{totPrice} {t('common.sar')}</strong></p>
                <Button onClick={() => setStep(4)} disabled={serviceIds.length === 0}>{t('common.next')} <ChevronRight className="w-4 h-4 ml-2 rtl:mr-2"/></Button></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div><h3 className="text-2xl font-bold mb-6">{t('book.select_datetime')}</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {fakeDates.map(d => (
                   <Button key={d} variant={date === d ? 'primary' : 'outline'} className="flex flex-col h-auto py-3 gap-1" onClick={() => setDateTime(d, time || fakeTimes[0])}>
                     <span className="text-xs uppercase opacity-80">{new Date(d).toLocaleDateString(isAr?'ar-SA':'en-US', {weekday:'short'})}</span>
                     <span className="font-bold">{new Date(d).getDate()}</span>
                   </Button>
                ))}
              </div>
              {date && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                  {fakeTimes.map(t_ => (
                    <Button key={t_} variant={time === t_ ? 'primary' : 'outline'} size="sm" onClick={() => setDateTime(date, t_)}>{t_}</Button>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-between items-center">
                <Button variant="ghost" onClick={() => setStep(3)}><ChevronLeft className="w-4 h-4 mr-2"/> {t('common.back')}</Button>
                <Button onClick={() => setStep(5)} disabled={!date || !time}>{t('common.next')} <ChevronRight className="w-4 h-4 ml-2"/></Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div><h3 className="text-2xl font-bold mb-8 text-center">{t('book.review')}</h3>
              <div className="bg-[#1A1410] text-[#F7F4EF] p-8 rounded-xl shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-[#C8A45D] opacity-10"><Scissors className="w-40 h-40"/></div>
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div><p className="text-[#C8A45D] text-xs font-bold uppercase tracking-wider mb-1">{t('book.step1')}</p><h4 className="text-xl font-bold">{branch ? (isAr?branch.nameAr:branch.nameEn) : ''}</h4></div>
                    <div className="text-right rtl:text-left"><p className="text-[#C8A45D] text-xs font-bold uppercase tracking-wider mb-1">{t('book.step2')}</p><h4 className="text-xl font-bold">{barber ? (isAr?barber.nameAr:barber.nameEn) : ''}</h4></div>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div><p className="text-[#C8A45D] text-xs font-bold uppercase tracking-wider mb-1">{t('book.step4')}</p><div className="flex items-center gap-2"><CalendarCheck className="w-5 h-5 text-[#A7ABB3]"/><span className="font-bold">{date} • {time}</span></div></div>
                  </div>
                  <div><p className="text-[#C8A45D] text-xs font-bold uppercase tracking-wider mb-2">{t('book.step3')}</p>
                    <ul className="space-y-2 mb-4">
                      {selServices.map(s => (
                        <li key={s.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2"><span>{isAr?s.nameAr:s.nameEn}</span><span className="font-mono text-[#A7ABB3]">{s.price} {t('common.sar')}</span></li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-[#A7ABB3] text-sm">{t('book.total_duration')}: {totDur} {t('common.min')}</span>
                       <span className="text-2xl font-bold text-[#C8A45D]">{totPrice} {t('common.sar')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => setStep(4)}><ChevronLeft className="w-4 h-4 mr-2 rtl:ml-2"/> {t('common.back')}</Button>
                <Button size="lg" onClick={confirm} className="shadow-xl bg-[#C8A45D] text-[#0B0D10] hover:bg-[#E6C98A]">{t('common.add_cart')}</Button>
              </div>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
}

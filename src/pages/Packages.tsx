import { useTranslation } from 'react-i18next';
import { PRICING } from '@/config/brand';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatSar } from '@/lib/money';
import { Check, ShieldCheck, UserPlus, Info } from 'lucide-react';
import { useCommerceStore } from '@/stores/useCommerceStore';

export function Packages() {
  const { t, i18n } = useTranslation();
  const { addItem } = useCommerceStore();
  const isAr = i18n.language === 'ar';

  const pkgs = [
    {
      id: 'p_essential', nameEn: 'Essentials Package', nameAr: 'الباقة الأساسية', price: PRICING.packages.essentials, val: isAr ? '٣ أشهر' : '3 months',
      descEn: 'Perfect for regular maintenance', descAr: 'مثالية للصيانة الدورية المنتظمة',
      incEn: ['4 Classic Haircuts', '1 Beard Sculpting', 'Priority Booking', 'Valid for 3 months'],
      incAr: ['٤ قصات كلاسيكية', '١ تحديد لحية', 'أولوية في الحجز', 'صالحة لمدة ٣ أشهر'],
      color: '#141518',
    },
    {
      id: 'p_executive', nameEn: 'Executive Master', nameAr: 'ماستر التنفيذية', price: PRICING.packages.executive, val: isAr ? 'سنة واحدة' : '1 year',
      descEn: 'The full Maestro signature experience', descAr: 'تجربة مايسترو المتكاملة والمميزة',
      incEn: ['8 Maestro Cuts', '4 Hot Towel Shaves', '2 Signature Rituals', 'Valid for 1 year', 'Free Drink per Visit'],
      incAr: ['٨ قصات مايسترو', '٤ حلاقات فوطة ساخنة', '٢ جلسات طقوس', 'صالحة لمدة سنة', 'مشروب مجاني في كل زيارة'],
      color: '#B1262A', popular: true,
    },
    {
      id: 'p_vip', nameEn: 'VIP Platinum', nameAr: 'بلاتينيوم VIP', price: 2500, val: isAr ? 'سنة واحدة' : '1 year',
      descEn: 'Unlimited luxury grooming', descAr: 'عناية فاخرة غير محدودة',
      incEn: ['Unlimited Cuts & Shaves', 'Monthly Luxury Facial', 'VIP Room Access', 'Dedicated Master Barber', 'Valid for 1 year'],
      incAr: ['قص وحلاقة غير محدودة', 'تنظيف بشرة ملكي شهرياً', 'دخول غرفة VIP', 'حلاق خبير مخصص', 'صالحة لمدة سنة'],
      color: '#141518',
    },
    {
      id: 'p_junior', nameEn: 'IL Giovane (Junior)', nameAr: 'باقة الأبناء (إل جيوفاني)', price: 200, val: isAr ? '٦ أشهر' : '6 months',
      descEn: 'Special package for kids and students', descAr: 'باقة مخصصة للأبناء وطلاب المدارس تحت حساب ولي الأمر',
      incEn: ['5 Kids/Student Haircuts', 'Linked to Parent Account', 'Valid for 6 months', 'Complimentary Styling'],
      incAr: ['٥ قصات أطفال/طلاب', 'مرتبطة بحساب ولي الأمر', 'صالحة لمدة ٦ أشهر', 'تصفيف مجاني'],
      color: '#1F7A3F', badge: 'Family', badgeAr: 'عائلي'
    }
  ];

  return (
    <div className="min-h-screen pb-24" style={{background:'#F3F3F1', fontFamily:'var(--font-arabic)'}}>
      
      {/* ── HERO ── */}
      <section className="bg-[#141518] border-b border-[#B1262A] pt-24 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-1.5 h-full bg-gradient-to-b from-[#1F7A3F] via-white/20 to-[#B1262A]"/>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>
          {t('packages.title')}
        </h1>
        <p className="text-lg md:text-xl text-[#A7ABB3] max-w-2xl mx-auto font-medium">
          {t('packages.subtitle')}
        </p>
      </section>

      {/* ── PACKAGES GRID ── */}
      <div className="container px-4 mx-auto max-w-6xl -mt-10 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {pkgs.map((p, i) => (
               <Card key={p.id} className={`p-8 border-t-4 shadow-xl flex flex-col h-full bg-white transition-all transform hover:-translate-y-2 hover:shadow-2xl relative ${p.popular ? 'border-t-[#B1262A] ring-2 ring-[#B1262A]/20 scale-105 xl:z-10 bg-gradient-to-b from-white to-[#F3F3F1]' : `border-t-[${p.color}]`}`} style={{borderColor: p.popular ? '#B1262A' : p.color}}>
                  
                  {p.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B1262A] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 shadow-md z-20">
                      {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                    </div>
                  )}

                  {p.badge && (
                     <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1 border shadow-sm" style={{color: p.color, borderColor: p.color, backgroundColor: p.color + '10'}}>
                        {isAr ? p.badgeAr : p.badge}
                     </div>
                  )}

                  <div className="pb-6 mb-6 border-b border-[#E2E0DB]">
                     <h3 className="font-black text-xl text-[#141518] mb-2 pr-8 rtl:pr-0 rtl:pl-8" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>{isAr ? p.nameAr : p.nameEn}</h3>
                     <p className="text-xs text-[#A7ABB3] font-medium min-h-[32px]">{isAr ? p.descAr : p.descEn}</p>
                     
                     <div className="mt-4 flex flex-col">
                        <span className="text-3xl font-black tracking-tight" style={{color: p.color, fontFamily:'Montserrat,sans-serif'}}>
                           {formatSar(p.price)}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#A7ABB3] tracking-wider mt-1">
                           / {p.val}
                        </span>
                     </div>
                  </div>

                  <ul className="space-y-4 flex-grow mb-8">
                     {(isAr ? p.incAr : p.incEn).map((it, idx) => (
                        <li key={idx} className="flex items-start text-sm font-medium text-[#141518]">
                           <span className="w-5 h-5 min-w-[20px] bg-[#F3F3F1] flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 mt-0.5" style={{color: p.color}}>
                              <Check className="w-3.5 h-3.5 stroke-[3]"/>
                           </span>
                           <span className="leading-snug">{it}</span>
                        </li>
                     ))}
                  </ul>

                  {p.id === 'p_junior' && (
                     <div className="bg-[#1F7A3F]/10 border border-[#1F7A3F]/20 rounded-md p-3 mb-6 flex items-start gap-2">
                        <UserPlus className="w-4 h-4 text-[#1F7A3F] shrink-0 mt-0.5"/>
                        <p className="text-[11px] text-[#141518] font-semibold leading-relaxed">
                           {isAr ? 'يتم إضافة المشتركين تحت حساب ولي الأمر لسهولة الإدارة ومشاركة الرصيد.' : 'Subscribers are added under the parent account for simplified management.'}
                        </p>
                     </div>
                  )}

                  <Button 
                     className="w-full font-bold shadow-md" 
                     variant={p.popular ? 'primary' : 'outline'}
                     style={!p.popular ? {borderColor: '#141518', color: '#141518'} : {border: 'none'}}
                     onClick={()=>addItem({id: p.id, type: 'package', nameAr: p.nameAr, nameEn: p.nameEn, price: p.price})}
                  >
                     {t('common.add_cart')}
                  </Button>
               </Card>
            ))}
         </div>

         {/* Trust Indicators */}
         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center border-t border-[#E2E0DB] pt-12">
            <div className="flex flex-col items-center">
               <ShieldCheck className="w-8 h-8 text-[#1F7A3F] mb-3"/>
               <h4 className="font-bold text-sm text-[#141518] mb-1">{isAr ? 'أمان وسهولة' : 'Safe & Simple'}</h4>
               <p className="text-xs text-[#A7ABB3]">{isAr ? 'إدارة مرنة لجميع باقاتك عبر لوحة التحكم' : 'Manage all packages via your dashboard'}</p>
            </div>
            <div className="flex flex-col items-center">
               <ShieldCheck className="w-8 h-8 text-[#B1262A] mb-3"/>
               <h4 className="font-bold text-sm text-[#141518] mb-1">{isAr ? 'أولوية الحجز' : 'Priority Booking'}</h4>
               <p className="text-xs text-[#A7ABB3]">{isAr ? 'مواعيد مضمونة لحاملي الباقات المتقدمة' : 'Guaranteed slots for premium package holders'}</p>
            </div>
            <div className="flex flex-col items-center">
               <Info className="w-8 h-8 text-[#141518] mb-3"/>
               <h4 className="font-bold text-sm text-[#141518] mb-1">{isAr ? 'صلاحية ممتدة' : 'Extended Validity'}</h4>
               <p className="text-xs text-[#A7ABB3]">{isAr ? 'إمكانية ترحيل الرصيد غير المستخدم' : 'Ability to roll over unused balances'}</p>
            </div>
         </div>
      </div>
    </div>
  );
}

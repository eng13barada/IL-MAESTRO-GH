import { useTranslation } from 'react-i18next';
import { PRICING } from '@/config/brand';
import { formatSar } from '@/lib/money';
import { CheckCircle2, Shield, Star, Gem, Sparkles } from 'lucide-react';

const KF = "'Noto Kufi Arabic', 'Montserrat', sans-serif";

export function Memberships() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const tiers = [
    {
      id: 'silver', price: PRICING.memberships.silver,
      nameEn: 'Silver', nameAr: 'فضية',
      Icon: Shield,
      bg: 'linear-gradient(160deg, rgba(12,22,16,0.96) 0%, rgba(6,14,10,0.99) 100%)',
      accent: '#1F7A3F',
      textAccent: '#5ECC82',
      glow: 'rgba(31,122,63,0.25)',
      borderGlow: 'rgba(31,122,63,0.35)',
      benefitsEn: ['1 Maestro Cut / month', '15% off retail products', 'Priority booking (48h)', 'Complimentary hot towel wrap', 'Welcome drink on first visit'],
      benefitsAr: ['قصة مايسترو واحدة شهرياً','خصم ١٥٪ على المنتجات','أولوية الحجز (٤٨ ساعة)','فوطة ساخنة مجانية','مشروب ترحيب في الزيارة الأولى'],
    },
    {
      id: 'gold', price: PRICING.memberships.gold,
      nameEn: 'Prestige', nameAr: 'بريستيج',
      Icon: Star,
      bg: 'linear-gradient(160deg, rgba(14,10,24,0.96) 0%, rgba(8,6,16,0.99) 100%)',
      accent: '#C8A45D',
      textAccent: '#E8C97A',
      glow: 'rgba(200,164,93,0.25)',
      borderGlow: 'rgba(200,164,93,0.40)',
      isPopular: true,
      benefitsEn: ['2 Maestro Cuts / month', '1 Signature Ritual / month', '20% off retail products', 'Priority booking (24h)', 'Guest welcome drink always', 'Birthday exclusive surprise'],
      benefitsAr: ['قصتان مايسترو شهرياً','جلسة طقوس توقيعية شهرياً','خصم ٢٠٪ على المنتجات','أولوية الحجز (٢٤ ساعة)','مشروب ترحيب دائماً','مفاجأة حصرية في عيد ميلادك'],
    },
    {
      id: 'black', price: PRICING.memberships.black,
      nameEn: 'Maestro Black', nameAr: 'مايسترو بلاك',
      Icon: Gem,
      bg: 'linear-gradient(160deg, rgba(20,6,8,0.96) 0%, rgba(10,3,4,0.99) 100%)',
      accent: '#B1262A',
      textAccent: '#FF8A8E',
      glow: 'rgba(177,38,42,0.25)',
      borderGlow: 'rgba(177,38,42,0.40)',
      benefitsEn: ['Unlimited Cuts (Fair Use)', 'Unlimited Beard Shaves', '1 Signature Ritual / month', 'Free beverages — always', 'VIP Concierge booking', 'Exclusive member events', 'Personal style consultant'],
      benefitsAr: ['قصات غير محدودة (استخدام عادل)','حلاقة ذقن غير محدودة','جلسة طقوس شهرية','مشروبات مجانية — دائماً','خدمة حجز VIP','فعاليات حصرية للأعضاء','مستشار أسلوب شخصي'],
    }
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{background:'linear-gradient(160deg,#050608 0%,#08060c 50%,#06080f 100%)'}}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/6 w-72 h-72 rounded-full opacity-[0.035]" style={{background:'#1F7A3F',filter:'blur(100px)'}} />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full opacity-[0.035]" style={{background:'#B1262A',filter:'blur(90px)'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-[0.025]" style={{background:'#C8A45D',filter:'blur(110px)'}} />
      </div>

      {/* Header */}
      <div className="shrink-0 pt-7 pb-5 text-center relative z-10" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3 h-3" style={{color:'#C8A45D'}} />
          <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{color:'#C8A45D',fontFamily:KF}}>
            {isAr ? 'عضويات إيل مايسترو' : 'IL MAESTRO MEMBERSHIPS'}
          </span>
          <Sparkles className="w-3 h-3" style={{color:'#C8A45D'}} />
        </div>
        <h1 className="text-3xl font-black text-white" style={{fontFamily:KF}}>{t('memberships.title')}</h1>
        <p className="mt-1.5 text-sm max-w-md mx-auto" style={{color:'rgba(255,255,255,0.42)', fontFamily:KF}}>
          {t('memberships.subtitle')}
        </p>
      </div>

      {/* 3 tier glassmorphic cards */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 relative z-10 overflow-hidden">
        {tiers.map((tier, idx) => {
          const benefits = isAr ? tier.benefitsAr : tier.benefitsEn;
          return (
            <div
              key={tier.id}
              className="relative flex flex-col overflow-hidden group"
              style={{
                background: tier.bg,
                borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                borderTop: `2px solid ${tier.isPopular ? tier.accent : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Glass frost layer */}
              <div className="absolute inset-0" style={{
                backdropFilter: 'blur(1px)',
                WebkitBackdropFilter: 'blur(1px)',
                background: 'rgba(255,255,255,0.012)',
              }} />

              {/* Ambient glow blob */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none transition-opacity duration-700 opacity-[0.08] group-hover:opacity-[0.15]" style={{background:tier.accent,filter:'blur(80px)'}} />

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 group-hover:opacity-100 opacity-30" style={{background:`linear-gradient(to right, transparent, ${tier.accent}, transparent)`}} />

              {/* Popular badge */}
              {tier.isPopular && (
                <div className="absolute top-4 end-4 z-20 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5" style={{
                  background: tier.accent,
                  color: '#0B0D10',
                  fontFamily: KF,
                }}>
                  {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-7 lg:p-8">
                {/* Tier header */}
                <div className="mb-5">
                  <div className="w-12 h-12 flex items-center justify-center mb-4" style={{
                    background: `${tier.accent}15`,
                    border: `1px solid ${tier.accent}35`,
                    color: tier.accent,
                  }}>
                    <tier.Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1" style={{fontFamily:KF}}>
                    {isAr ? tier.nameAr : tier.nameEn}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mt-3">
                    <span className="text-4xl font-black" style={{color:tier.textAccent, fontFamily:'Montserrat,sans-serif'}}>
                      {formatSar(tier.price).split(' ')[0]}
                    </span>
                    <span className="text-xs" style={{color:'rgba(255,255,255,0.35)', fontFamily:KF}}>
                      {t('common.sar')} / {t('memberships.per_month')}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px mb-5 opacity-20" style={{background: tier.accent}} />

                {/* Benefits */}
                <ul className="space-y-3 flex-1 mb-6 overflow-auto">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{color:tier.accent}} />
                      <span style={{color:'rgba(255,255,255,0.72)', fontFamily:KF}}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="w-full font-black py-3.5 text-sm tracking-wide mt-auto transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    fontFamily: KF,
                    background: tier.id === 'black' ? tier.accent : 'transparent',
                    border: `1.5px solid ${tier.accent}`,
                    color: tier.id === 'black' ? '#ffffff' : tier.textAccent,
                  }}
                >
                  {t('memberships.join')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

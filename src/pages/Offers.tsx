import { useTranslation } from 'react-i18next';
import { Copy, Scissors, Gift, Star, CalendarDays, CheckCircle2, Zap } from 'lucide-react';
import { useState } from 'react';

const KF = "'Noto Kufi Arabic', 'Montserrat', sans-serif";

export function Offers() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [copied, setCopied] = useState<string | null>(null);

  const offers = [
    {
      id: 'o1', icon: <Gift className="w-9 h-9"/>,
      titleEn: 'Welcome to Maestro', titleAr: 'مرحباً بك في مايسترو',
      tagEn: '30% OFF', tagAr: '٣٠٪ خصم',
      descEn: 'Your first premium service at 30% off. Experience the Italian difference from the very first visit.',
      descAr: 'خصم ٣٠٪ على أول خدمة فاخرة. عش فارق اللمسة الإيطالية من أول زيارة.',
      code: 'VIP30', expiry: '2026-12-31',
      accent: '#B1262A',
      glow: 'rgba(177,38,42,0.22)',
      bg: 'linear-gradient(145deg, rgba(30,6,8,0.92) 0%, rgba(15,3,4,0.98) 100%)',
      borderGlow: 'rgba(177,38,42,0.4)',
    },
    {
      id: 'o2', icon: <Scissors className="w-9 h-9"/>,
      titleEn: 'Combo Special', titleAr: 'باقة التوفير المميزة',
      tagEn: 'FREE ADD-ON', tagAr: 'إضافة مجانية',
      descEn: 'Free Black Mask or Head Massage with any Hair & Beard combo. Upgrade your ritual.',
      descAr: 'قناع الفحم أو مساج الرأس مجاناً مع باقة الشعر واللحية. ارقَ بطقوسك.',
      code: 'COMBO10', expiry: '2026-06-30',
      accent: '#1F7A3F',
      glow: 'rgba(31,122,63,0.22)',
      bg: 'linear-gradient(145deg, rgba(6,20,10,0.92) 0%, rgba(3,12,6,0.98) 100%)',
      borderGlow: 'rgba(31,122,63,0.4)',
    },
    {
      id: 'o3', icon: <CalendarDays className="w-9 h-9"/>,
      titleEn: 'Morning Routine', titleAr: 'الروتين الصباحي',
      tagEn: '20% OFF', tagAr: '٢٠٪ خصم',
      descEn: 'All services booked 10 AM – 1 PM on weekdays. Start your day with Maestro precision.',
      descAr: 'جميع الخدمات من ١٠ ص حتى ١ ظ أيام الأسبوع. ابدأ يومك بدقة مايسترو.',
      code: 'MORNING20', expiry: '2026-05-15',
      accent: '#C8A45D',
      glow: 'rgba(200,164,93,0.22)',
      bg: 'linear-gradient(145deg, rgba(18,14,6,0.92) 0%, rgba(10,8,3,0.98) 100%)',
      borderGlow: 'rgba(200,164,93,0.4)',
    },
    {
      id: 'o4', icon: <Star className="w-9 h-9"/>,
      titleEn: 'Grooming Gift', titleAr: 'هدية العناية',
      tagEn: '15% OFF', tagAr: '١٥٪ خصم',
      descEn: 'Buy any in-store premium product and enjoy 15% off your next appointment.',
      descAr: 'اشترِ أي منتج فاخر في الفرع واستمتع بخصم ١٥٪ على موعدك القادم.',
      code: 'RETAIL15', expiry: '2026-08-01',
      accent: '#E8E0D2',
      glow: 'rgba(232,224,210,0.15)',
      bg: 'linear-gradient(145deg, rgba(16,10,20,0.92) 0%, rgba(8,5,12,0.98) 100%)',
      borderGlow: 'rgba(232,224,210,0.35)',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{background:'linear-gradient(160deg,#050608 0%,#0a060c 50%,#060810 100%)'}}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.04]" style={{background:'#1F7A3F',filter:'blur(120px)'}} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.04]" style={{background:'#B1262A',filter:'blur(100px)'}} />
      </div>

      {/* Header strip */}
      <div className="shrink-0 pt-7 pb-5 text-center relative z-10" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-3 h-3" style={{color:'#1F7A3F'}} />
          <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{color:'#1F7A3F',fontFamily:KF}}>{t('common.exclusive')}</span>
          <Zap className="w-3 h-3" style={{color:'#1F7A3F'}} />
        </div>
        <h1 className="text-3xl font-black text-white" style={{fontFamily:KF}}>{t('offers.title')}</h1>
        <p className="mt-1.5 text-sm max-w-md mx-auto" style={{color:'rgba(255,255,255,0.42)', fontFamily:KF}}>
          {isAr ? 'عروض موسمية حصرية لعملاء إيل مايسترو' : 'Exclusive seasonal promotions for IL MAESTRO clients'}
        </p>
      </div>

      {/* 4 glassmorphic cards — equal columns, full height */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 relative z-10 overflow-hidden">
        {offers.map((o, idx) => (
          <div
            key={o.id}
            className="relative flex flex-col overflow-hidden group cursor-default"
            style={{
              background: o.bg,
              borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            {/* Glass frost layer */}
            <div className="absolute inset-0" style={{
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              background: 'rgba(255,255,255,0.015)',
            }} />

            {/* Accent glow — bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500" style={{background:`linear-gradient(to right, transparent, ${o.accent}, transparent)`, opacity: 0.5}} />

            {/* Hover lateral glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
              background: `radial-gradient(ellipse at 50% 120%, ${o.glow} 0%, transparent 70%)`,
            }} />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 group-hover:h-[3px]" style={{background: o.accent}} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-6 md:p-7 lg:p-8">
              {/* Tag */}
              <div className="inline-flex self-start mb-5 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em]" style={{
                background: `${o.accent}18`,
                border: `1px solid ${o.accent}40`,
                color: o.accent,
                fontFamily: KF,
              }}>
                {isAr ? o.tagAr : o.tagEn}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center mb-5" style={{
                background: `${o.accent}12`,
                border: `1px solid ${o.accent}30`,
                color: o.accent,
              }}>
                {o.icon}
              </div>

              <h3 className="font-black text-xl text-white mb-3 leading-snug" style={{fontFamily:KF}}>
                {isAr ? o.titleAr : o.titleEn}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{color:'rgba(255,255,255,0.50)', fontFamily:KF}}>
                {isAr ? o.descAr : o.descEn}
              </p>

              {/* Code block — glassmorphic */}
              <div className="mt-6 p-4" style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${o.borderGlow}`,
                backdropFilter: 'blur(12px)',
              }}>
                <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-2" style={{color:o.accent, fontFamily:KF}}>
                  {t('offers.code')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 font-mono font-black text-center text-lg tracking-widest text-white py-1.5" style={{borderBottom:`1px solid ${o.accent}50`}}>
                    {o.code}
                  </div>
                  <button
                    className="shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{color: o.accent, border:`1px solid ${o.accent}40`, background:`${o.accent}10`}}
                    onClick={() => handleCopy(o.code)}
                  >
                    {copied === o.code ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[10px] mt-2 font-mono" style={{color:'rgba(255,255,255,0.28)'}}>
                  {t('offers.valid_till')}: {new Date(o.expiry).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ImageFactory } from '@/lib/imageFactory';
import { Star, Scissors, Phone } from 'lucide-react';
import { SERVICES, BARBERS } from '@/data/demoDb';
import { formatSar } from '@/lib/money';
import DesktopOnly from '@/components/responsive/DesktopOnly';
import MobileOnly from '@/components/responsive/MobileOnly';

export function Home() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF]">
      {/* ═══════════════════════════════════════════════════════
          MOBILE ONLY LAYOUT (< md)
      ═══════════════════════════════════════════════════════ */}
      <MobileOnly>
        <div className="bg-[#111111] text-white font-sans">
          {/* 1. M-HERO */}
          <section className="relative pt-32 pb-16 px-5 flex flex-col justify-center min-h-[85vh] bg-[#111] overflow-hidden border-b-2 border-[#DA291C]">
            <img src="/images/hero-barbershop.jpg" alt="Hero" className="absolute inset-0 z-0 w-full h-full object-cover opacity-30 grayscale" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#111] via-[#111]/90 to-transparent" />
            <div className="relative z-10 w-full">
              <h1 className="text-[42px] xs:text-[50px] font-black text-white leading-[1.05] mb-8 uppercase tracking-tighter" style={{ fontFamily: isAr ? "'Noto Kufi Arabic', sans-serif" : "'Montserrat', sans-serif" }}>
                {isAr ? 'حلاقة إيطالية.' : 'WE WILL KEEP YOU AN'}<br/>
                <span className="text-[#FFFFFF]">{isAr ? 'بمظهر لا تشوبه شائبة.' : 'IMPECCABLE LOOK'}</span>
              </h1>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-[#DA291C]" />
                <div className="h-1 w-4 bg-white" />
                <div className="h-1 w-8 bg-[#009246]" />
              </div>
              <p className="text-[#888] text-[10px] font-bold uppercase tracking-widest mb-6 border-l-2 rtl:border-r-2 rtl:border-l-0 border-[#009246] pl-3 rtl:pr-3 rtl:pl-0">
                {isAr ? 'الرياض العليا - المملكة العربية السعودية' : 'Riyadh Olaya, Saudi Arabia'}
              </p>
              <div className="flex items-center gap-2 text-white font-black text-lg">
                <Phone className="w-5 h-5 text-[#DA291C]" />
                <span dir="ltr">+966 50 123 4567</span>
              </div>
            </div>
          </section>

          {/* 2. M-INTRO / STATS */}
          <section className="py-20 px-5 bg-[#161616] relative overflow-hidden">
            <div className="absolute top-10 left-0 w-full pointer-events-none overflow-hidden opacity-[0.03]">
              <span className="text-[100px] font-black text-white uppercase tracking-tighter whitespace-nowrap select-none">BARBERCROP</span>
            </div>
            <div className="relative z-10">
              <div className="flex flex-col gap-5 mb-10">
                <h2 className="text-2xl font-black text-white uppercase leading-snug tracking-tight">
                  {isAr ? 'صالون حلاقة احترافي للرجال فقط' : 'PROFESSIONAL BARBERSHOP FOR MEN ONLY'}
                </h2>
                <div className="w-12 h-1 bg-[#009246]" />
                <p className="text-[#999] text-[13px] leading-relaxed">
                  {isAr 
                  ? 'أسسنا إيل مايسترو كاستجابة للحاجة الماسة إلى خدمات عناية رجالية تجمع بين الدقة الأوروبية الصارمة وكرم الضيافة السعودي الأصيل. نستخدم أفضل المنتجات والأدوات لضمان الخروج بأفضل مظهر.' 
                  : 'We merge strict European precision with authentic Saudi hospitality. We use the finest equipment to guarantee you leave looking your absolute best.'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8 mb-10">
                <div>
                  <h4 className="text-white font-black text-2xl mb-1">
                    {isAr ? 'تأسس' : 'SINCE'} <span className="text-[#DA291C]">2015</span>
                  </h4>
                  <p className="text-[#777] text-[10px] leading-relaxed mt-2 uppercase tracking-wide">{isAr ? 'خبرة عريقة في فنون الحلاقة.' : 'Deep expertise in men\'s grooming.'}</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl mb-1">
                    <span className="text-[#009246]">1000+</span> {isAr ? 'عميل' : 'CLIENTS'}
                  </h4>
                  <p className="text-[#777] text-[10px] leading-relaxed mt-2 uppercase tracking-wide">{isAr ? 'ثقة مستمرة في خدماتنا.' : 'Continuous trust in our services.'}</p>
                </div>
              </div>
              
              <Link to="/about">
                <button className="bg-[#DA291C] hover:bg-[#B71C1C] text-white text-[11px] font-black uppercase tracking-widest px-8 py-3.5 transition-colors">
                  {t('common.details')}
                </button>
              </Link>
            </div>
          </section>

          {/* 3. M-SERVICES GRID */}
          <section className="py-20 px-5 bg-[#111] relative overflow-hidden">
            <div className="absolute top-20 right-0 pointer-events-none opacity-[0.03]">
              <span className="text-[100px] font-black text-white uppercase tracking-tighter whitespace-nowrap">SERVICES</span>
            </div>
            <div className="relative z-10 mb-12">
              <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-tight">{isAr ? 'ما نقدمه' : 'WHAT WE PROVIDE'}</h2>
              <div className="w-12 h-1 bg-[#DA291C] mb-6" />
              <p className="text-[#999] text-[13px] leading-relaxed">
                {t('home.services_sub')}
              </p>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 gap-10">
              {SERVICES.slice(0, 4).map((s) => (
                <div key={s.id} className="group flex flex-col items-start border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3 mb-2 w-full">
                    <Scissors className="w-5 h-5 text-[#DA291C] shrink-0" />
                    <h3 className="font-black text-white uppercase text-[15px] tracking-widest leading-none mt-1">{isAr ? s.nameAr : s.nameEn}</h3>
                  </div>
                  <p className="text-[#777] text-[12px] leading-relaxed mb-3 pr-4 rtl:pr-0 rtl:pl-4">{isAr ? s.descAr : s.descEn}</p>
                  <div className="text-[#DA291C] text-[11px] font-black uppercase tracking-widest">
                    {isAr ? 'تبدأ من ' : 'FROM '} {formatSar(s.price)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative z-10 mt-8 flex justify-center">
              <Link to="/services" className="text-white text-[11px] font-black uppercase tracking-widest border-b border-[#009246] pb-1 hover:text-[#009246] transition-colors">
                {t('common.view_all')}
              </Link>
            </div>
          </section>

          {/* 4. M-BANNER (WAITING & HOURS) */}
          <section className="bg-[#161616] overflow-hidden">
            <div className="relative py-20 px-5 flex flex-col justify-center bg-[#111]">
              <img src="/images/hero-barbershop.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-screen" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-[#111]/20" />
              <div className="relative z-10 text-center">
                <h2 className="text-[26px] font-black text-white uppercase mb-6 leading-tight tracking-tight px-4 border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#009246]">
                  {isAr ? 'فريق من المحترفين\nبانتظارك' : 'TEAM OF PROFESSIONALS\nIS WAITING FOR YOU'}
                </h2>
                <Link to="/book">
                  <button className="bg-[#DA291C] hover:bg-[#B71C1C] text-white text-[11px] font-black uppercase tracking-widest px-8 py-3.5 transition-colors">
                    {t('home.book_now')}
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="py-16 px-5 relative bg-[#0a0a0a]">
               <div className="absolute top-0 right-0 w-1/2 h-1 bg-[#DA291C]" />
               <h2 className="text-2xl font-black text-white uppercase mb-8 tracking-tight">{isAr ? 'أوقات العمل الخاصة' : 'SPECIAL OPENING HOURS'}</h2>
               <div className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-widest">
                 <div className="flex justify-between border-b border-white/5 pb-3">
                   <span className="text-[#777]">{isAr ? 'السبت - الخميس' : 'SAT - THU'}</span>
                   <span className="text-white">10:00 AM - 11:00 PM</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-3">
                   <span className="text-[#777]">{isAr ? 'الجمعة' : 'FRIDAY'}</span>
                   <span className="text-white">02:00 PM - 11:00 PM</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-3">
                   <span className="text-[#DA291C]">{isAr ? 'الأحد' : 'SUNDAY'}</span>
                   <span className="text-white">{isAr ? 'مغلق' : 'CLOSED'}</span>
                 </div>
               </div>
            </div>
          </section>

          {/* 5. M-BLOG/BARBERS MAPPING */}
          <section className="py-20 px-5 bg-[#111] relative overflow-hidden">
            <div className="absolute top-10 left-0 pointer-events-none opacity-[0.03]">
              <span className="text-[100px] font-black text-white uppercase tracking-tighter mix-blend-overlay">POSTS</span>
            </div>
            <div className="relative z-10 mb-12">
              <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-tight">{isAr ? 'فريقنا' : 'OUR EXPERTS'}</h2>
              <div className="w-12 h-1 bg-[#009246]" />
            </div>
            <div className="relative z-10 flex flex-col gap-10">
              {BARBERS.slice(0, 3).map((b, i) => (
                <Link key={b.id} to="/barbers" className="group block border-b border-white/5 pb-8">
                  <div className="aspect-[16/9] relative mb-4 overflow-hidden bg-[#161616]">
                    <img src={ImageFactory.generateAvatar(i+50, 'IM')} alt="" className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h3 className="font-black text-[15px] text-white uppercase tracking-wide mb-2 leading-tight">{isAr ? b.nameAr : b.nameEn}</h3>
                  <p className="text-[10px] font-black text-[#DA291C] uppercase tracking-widest">{isAr ? b.roleAr : b.roleEn}</p>
                </Link>
              ))}
            </div>
            
            <div className="relative z-10 flex justify-center mt-2 border-t border-white/5 pt-10">
              <Link to="/barbers" className="bg-transparent border border-[#DA291C] hover:bg-[#DA291C] text-white text-[11px] font-black uppercase tracking-widest px-8 py-3.5 transition-colors">
                {t('common.view_all')}
              </Link>
            </div>
          </section>
        </div>
      </MobileOnly>

      {/* ═══════════════════════════════════════════════════════
          DESKTOP ONLY LAYOUT (≥ md) — 100% UNCHANGED
      ═══════════════════════════════════════════════════════ */}
      <DesktopOnly>
        <div className="bg-[#111111] text-white font-sans overflow-x-hidden">
          {/* 1. D-HERO */}
          <section className="relative min-h-[90vh] flex items-center bg-[#111] border-b-4 border-[#DA291C] overflow-hidden">
            <img src="/images/hero-barbershop.jpg" alt="Hero" className="absolute top-0 right-0 w-[60%] h-full object-cover opacity-30 grayscale" style={{ maskImage: 'linear-gradient(to right, transparent, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }} />
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-0.5 w-16 bg-[#009246]" />
                  <div className="h-0.5 w-8 bg-white" />
                  <div className="h-0.5 w-24 bg-[#DA291C]" />
                </div>
                
                <h1 className="text-5xl lg:text-[70px] font-black text-white leading-[1.05] mb-12 uppercase tracking-tighter" style={{ fontFamily: isAr ? "'Noto Kufi Arabic', sans-serif" : "'Montserrat', sans-serif" }}>
                  {isAr ? 'حلاقة إيطالية.' : 'WE WILL KEEP YOU AN'}<br/>
                  <span className="text-[#FFFFFF]">{isAr ? 'بمظهر لا تشوبه شائبة.' : 'IMPECCABLE LOOK'}</span>
                </h1>
                
                <div className="flex flex-col gap-2 mt-8 border-l-2 rtl:border-r-2 rtl:border-l-0 border-[#009246] pl-4 rtl:pr-4 rtl:pl-0">
                  <p className="text-[#888] text-sm font-bold uppercase tracking-widest">
                    {isAr ? 'الرياض العليا - المملكة العربية السعودية' : 'Riyadh Olaya, Saudi Arabia'}
                  </p>
                  <div className="flex items-center gap-3 text-white font-black text-xl mt-2">
                    <Phone className="w-5 h-5 text-[#DA291C]" />
                    <span dir="ltr">+966 50 123 4567</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. D-INTRO / STATS */}
          <section className="py-32 relative bg-[#161616] overflow-hidden">
            <div className="absolute top-20 left-10 pointer-events-none opacity-[0.02] select-none">
              <span className="text-[180px] font-black text-white uppercase tracking-tighter whitespace-nowrap">IL MAESTRO</span>
            </div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5">
                  <h2 className="text-4xl font-black text-white uppercase leading-tight tracking-tight mb-6">
                    {isAr ? 'صالون حلاقة احترافي للرجال فقط' : 'PROFESSIONAL BARBERSHOP FOR MEN ONLY'}
                  </h2>
                  <div className="w-20 h-1 bg-[#009246]" />
                </div>
                
                <div className="lg:col-span-7">
                  <p className="text-[#999] text-base leading-relaxed mb-12 max-w-2xl">
                    {isAr 
                    ? 'أسسنا إيل مايسترو كاستجابة للحاجة الماسة إلى خدمات عناية رجالية تجمع بين الدقة الأوروبية الصارمة وكرم الضيافة السعودي الأصيل. نستخدم أفضل المنتجات والأدوات لضمان الخروج بأفضل مظهر.' 
                    : 'We merge strict European precision with authentic Saudi hospitality. We use the finest equipment to guarantee you leave looking your absolute best.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10 mb-10">
                    <div>
                      <h4 className="text-white font-black text-2xl mb-2">
                        {isAr ? 'تأسس' : 'SINCE'} <span className="text-[#DA291C]">2015</span>
                      </h4>
                      <p className="text-[#777] text-xs leading-relaxed uppercase tracking-wide">{isAr ? 'خبرة عريقة في فنون الحلاقة.' : 'Deep expertise in men\'s grooming.'}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-black text-2xl mb-2">
                        <span className="text-[#009246]">1000+</span> {isAr ? 'عميل' : 'CLIENTS'}
                      </h4>
                      <p className="text-[#777] text-xs leading-relaxed uppercase tracking-wide">{isAr ? 'ثقة مستمرة في خدماتنا.' : 'Continuous trust in our services.'}</p>
                    </div>
                  </div>
                  
                  <Link to="/about">
                    <button className="bg-[#DA291C] hover:bg-[#B71C1C] text-white text-xs font-black uppercase tracking-widest px-10 py-4 transition-colors">
                      {t('common.details')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 3. D-SERVICES GRID */}
          <section className="py-32 relative bg-[#111] overflow-hidden">
            <div className="absolute top-32 right-10 pointer-events-none opacity-[0.02] select-none">
              <span className="text-[180px] font-black text-white uppercase tracking-tighter whitespace-nowrap">SERVICES</span>
            </div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="mb-20 max-w-2xl">
                <h2 className="text-4xl font-black text-white uppercase mb-6 tracking-tight">{isAr ? 'ما نقدمه' : 'WHAT WE PROVIDE'}</h2>
                <div className="w-20 h-1 bg-[#DA291C] mb-8" />
                <p className="text-[#999] text-base leading-relaxed">
                  {t('home.services_sub')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
                {SERVICES.slice(0, 6).map((s) => (
                  <div key={s.id} className="group flex flex-col items-start border-b border-white/5 pb-8">
                    <div className="flex items-center gap-4 mb-4 w-full">
                      <Scissors className="w-6 h-6 text-[#DA291C] shrink-0" />
                      <h3 className="font-black text-white uppercase text-base tracking-widest leading-none mt-1 group-hover:text-[#009246] transition-colors">{isAr ? s.nameAr : s.nameEn}</h3>
                    </div>
                    <p className="text-[#777] text-sm leading-relaxed mb-6 pr-4 rtl:pr-0 rtl:pl-4 min-h-[60px]">{isAr ? s.descAr : s.descEn}</p>
                    <div className="text-[#DA291C] text-xs font-black uppercase tracking-widest mt-auto">
                      {isAr ? 'تبدأ من ' : 'FROM '} {formatSar(s.price)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 flex justify-center">
                <Link to="/services" className="text-white text-xs font-black uppercase tracking-widest border-b-2 border-[#009246] pb-1 hover:text-[#009246] transition-colors">
                  {t('common.view_all')}
                </Link>
              </div>
            </div>
          </section>

          {/* 4. D-BANNER (WAITING & HOURS) */}
          <section className="bg-[#161616] flex flex-col lg:flex-row overflow-hidden border-y border-white/5">
            <div className="lg:w-7/12 py-32 px-10 xl:px-24 flex flex-col justify-center bg-[#111] relative isolate">
              <img src="/images/hero-barbershop.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-screen -z-10" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-[#111]/20 -z-10" />
              
              <div className="relative z-10 max-w-xl">
                <h2 className="text-4xl font-black text-white uppercase mb-8 leading-tight tracking-tight pl-6 rtl:pr-6 rtl:pl-0 border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#009246]">
                  {isAr ? 'فريق من المحترفين\nبانتظارك' : 'TEAM OF PROFESSIONALS\nIS WAITING FOR YOU'}
                </h2>
                <p className="text-[#999] text-base leading-relaxed mb-10 pl-6 rtl:pr-6 rtl:pl-0">
                  {isAr ? "ارتق بروتين عنايتك بلمسة مايسترو الاحترافية. احجز موعدك الآن واستمتع بتجربة لا تضاهى." : "Elevate your routine. Step into the chair and let the craft speak for itself. Book your appointment now for an unmatched experience."}
                </p>
                <Link to="/book" className="ml-6 rtl:mr-6 rtl:ml-0 inline-block">
                  <button className="bg-[#DA291C] hover:bg-[#B71C1C] text-white text-xs font-black uppercase tracking-widest px-10 py-4 transition-colors shadow-lg">
                    {t('home.book_now')}
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-5/12 py-32 px-10 xl:px-24 relative bg-[#0a0a0a] flex flex-col justify-center border-l border-white/5">
               <div className="absolute top-0 right-0 w-1/2 h-1 bg-[#DA291C]" />
               <div className="max-w-md w-full">
                 <h2 className="text-3xl font-black text-white uppercase mb-12 tracking-tight">{isAr ? 'أوقات العمل' : 'SPECIAL OPENING HOURS'}</h2>
                 <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest">
                   <div className="flex justify-between border-b border-white/5 pb-4">
                     <span className="text-[#777]">{isAr ? 'السبت - الخميس' : 'SAT - THU'}</span>
                     <span className="text-white">10:00 AM - 11:00 PM</span>
                   </div>
                   <div className="flex justify-between border-b border-white/5 pb-4">
                     <span className="text-[#777]">{isAr ? 'الجمعة' : 'FRIDAY'}</span>
                     <span className="text-white">02:00 PM - 11:00 PM</span>
                   </div>
                   <div className="flex justify-between border-b border-white/5 pb-4">
                     <span className="text-[#DA291C]">{isAr ? 'الأحد' : 'SUNDAY'}</span>
                     <span className="text-white">{isAr ? 'مغلق' : 'CLOSED'}</span>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          {/* 5. D-TEAM/BARBERS MAPPING */}
          <section className="py-32 relative bg-[#111] overflow-hidden border-b-[8px] border-[#009246]">
            <div className="absolute top-20 left-10 pointer-events-none opacity-[0.02] select-none">
              <span className="text-[180px] font-black text-white uppercase tracking-tighter">EXPERTS</span>
            </div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="mb-20">
                <h2 className="text-4xl font-black text-white uppercase mb-6 tracking-tight">{isAr ? 'خبرائنا' : 'OUR EXPERTS'}</h2>
                <div className="w-20 h-1 bg-[#009246]" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {BARBERS.slice(0, 4).map((b, i) => (
                  <Link key={b.id} to="/barbers" className="group block">
                    <div className="aspect-[3/4] relative mb-6 overflow-hidden bg-[#161616]">
                      <img src={ImageFactory.generateAvatar(i+50, 'IM')} alt="" className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111] to-transparent opacity-80" />
                    </div>
                    <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 leading-tight group-hover:text-[#DA291C] transition-colors">{isAr ? b.nameAr : b.nameEn}</h3>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                        <p className="text-xs font-black text-[#009246] uppercase tracking-widest">{isAr ? b.roleAr : b.roleEn}</p>
                        <div className="flex items-center gap-1 text-white text-xs font-black">
                            <Star className="w-3 h-3 text-[#DA291C] fill-current" />
                            {b.rating}
                        </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-16 flex justify-center border-t border-white/5 pt-16">
                <Link to="/barbers" className="bg-transparent border-2 border-[#DA291C] hover:bg-[#DA291C] text-white text-xs font-black uppercase tracking-widest px-10 py-4 transition-colors">
                  {t('common.view_all')}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </DesktopOnly>
    </div>
  );
}


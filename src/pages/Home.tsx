import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ImageFactory } from '@/lib/imageFactory';
import { Star, ShieldCheck, Clock, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Award, Scissors, Users } from 'lucide-react';
import { SERVICES, BARBERS } from '@/data/demoDb';
import { formatSar } from '@/lib/money';

export function Home() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  
  const logoUrl = ImageFactory.generateLogo('#C8A45D');  // using allowed type, color overridden via CSS filter
  
  // Hero Background Images - These are no longer used for the hero section background
  // const heroTex = ImageFactory.generateHeroTexture(44);
  // const bgImg1 = ImageFactory.generateServiceCard(11, 'hair');
  // const bgImg2 = ImageFactory.generateBeforeAfter(22, false);
  // const bgImg3 = ImageFactory.generateAvatar(33, 'MA');
  // const bgImg4 = ImageFactory.generateServiceCard(44, 'beard');

  const pillars = [
    { k: 'craft', icon: <Star className="w-8 h-8 text-[#1F7A3F]" />, titleEn: 'Maestro Craft', titleAr: 'حرفة مايسترو', descEn: 'Master-level technique with consistent, premium outcomes.', descAr: 'تقنية عالية الجودة مع نتائج متسقة ومتميزة.' },
    { k: 'luxury', icon: <ShieldCheck className="w-8 h-8 text-[#1F7A3F]" />, titleEn: 'Quiet Luxury', titleAr: 'فخامة هادئة', descEn: 'A calm space designed for the modern gentleman.', descAr: 'مساحة هادئة مصممة للرجل العصري.' },
    { k: 'hospitality', icon: <Clock className="w-8 h-8 text-[#1F7A3F]" />, titleEn: 'Saudi Hospitality', titleAr: 'كرم سعودي', descEn: 'Respectful service ritual, generosity, and punctuality.', descAr: 'خدمة راقية، كرم وضيافة، ودقة في المواعيد.' },
    { k: 'system', icon: <MapPin className="w-8 h-8 text-[#1F7A3F]" />, titleEn: 'Seamless System', titleAr: 'نظام متكامل', descEn: 'Digital operations ensuring perfection across all branches.', descAr: 'إدارة رقمية تضمن الجودة الفائقة في جميع الفروع.' },
  ];

  const stats = [
    { v: '25,000+', l: t('home.stats_visits') },
    { v: '24', l: t('home.stats_barbers') },
    { v: '5', l: t('home.stats_branches') },
    { v: '4.9', l: t('home.stats_rating') },
  ];
  
  const process = [
    { num: '01', title: isAr ? 'الاستقبال' : 'Reception', desc: isAr ? 'ضيافة سعودية أصيلة، تبدأ بالقهوة والأجواء الهادئة.' : 'Authentic Saudi hospitality, starting with coffee and a calm ambiance.' },
    { num: '02', title: isAr ? 'الاستشارة' : 'Consultation', desc: isAr ? 'تحليل لملامحك وتحديد الأسلوب الأنسب لتعزيز جاذبيتك.' : 'Analyzing your features and determining the best style for your look.' },
    { num: '03', title: isAr ? 'التنفيذ' : 'Execution', desc: isAr ? 'دقة إيطالية وحرفة متقنة بشفرات حادة ومنتجات فاخرة.' : 'Italian precision and masterful craft with sharp tools and premium products.' },
    { num: '04', title: isAr ? 'اللمسة الأخيرة' : 'Finishing Touch', desc: isAr ? 'تصفيف، عطور راقية، ونصائح شخصية للعناية اليومية.' : 'Styling, fine fragrances, and personal grooming advice.' }
  ];

  const testimonials = [
    { name: isAr ? 'سليمان الرشيد' : 'Sulaiman Al Rashid', text: isAr ? 'لم أختبر دقة وعناية كهذه من قبل. الحجز الرقمي سلس للغاية.' : 'I have never experienced such precision and care. Digital booking is seamless.', rating: 5 },
    { name: isAr ? 'John Davis' : 'John Davis', text: isAr ? 'أفضل حلاقة وتجربة ضيافة في الرياض بلا منازع.' : 'Easily the best haircut and hospitality experience in Riyadh.', rating: 5 },
    { name: isAr ? 'عبدالله محمد' : 'Abdullah M.', text: isAr ? 'الخدمة تليق بفنادق الخمس نجوم. لا غنى عن عضوية النادي.' : 'Service fit for 5-star hotels. The club membership is essential.', rating: 5 }
  ];

  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF]">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0B0D10]" />
        {/* Real hero image */}
        <img src="/images/hero-barbershop.jpg" alt="IL MAESTRO" className="absolute inset-0 z-[1] w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/40 to-transparent" />
        {/* Italian tricolor vertical accent */}
        <div className="absolute left-0 inset-y-0 z-[3] w-[3px]" style={{background:'linear-gradient(to bottom, #1F7A3F, transparent, #B1262A)'}} />
        
        <div className="container relative z-[4] px-4 text-center mt-16 animate-fade-in-up">
          <Badge variant="danger" className="mb-6 uppercase tracking-widest px-6 py-2 text-xs font-bold">
            {t('common.demo_mode')}
          </Badge>
          
          <img src={logoUrl} alt="IL MAESTRO Logo" className="w-24 h-24 mx-auto mb-8 drop-shadow-2xl" />
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60 mb-6 drop-shadow-2xl max-w-5xl mx-auto tracking-tight">
            {t('home.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#6ee09a] mb-12 max-w-3xl mx-auto font-bold tracking-wide drop-shadow-md">
            {t('home.hero_sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/book"><Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[240px] pulse-red shadow-2xl h-14 text-lg">{t('home.book_now')}</Button></Link>
            <Link to="/services"><Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[240px] text-white border-white/30 hover:bg-white/10 hover:border-white h-14 text-lg backdrop-blur-sm transition-all">{t('home.explore')}</Button></Link>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="py-10 bg-gradient-to-b from-[#1A1410] to-[#0B0D10] text-[#F7F4EF] border-b border-[#C8A45D]/20 relative z-30 shadow-2xl">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10 rtl:divide-x-reverse">
            {stats.map((s, i) => (
              <div key={i} className="text-center group hover:-translate-y-1 transition-transform">
                <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-t from-[#C8A45D] to-[#E8E0D2] mb-2 font-latin tracking-tighter drop-shadow-lg">{s.v}</div>
                <div className="text-xs text-[#A7ABB3] font-bold uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR STORY Snippet (New) */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="absolute right-0 top-0 w-1/3 h-full bg-[#F7F4EF] rounded-l-full blur-3xl opacity-50 transform translate-x-1/2"></div>
         <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
               <Badge className="bg-[#1A1410] text-[#C8A45D] mb-6 uppercase tracking-widest">{isAr ? 'القصة' : 'The Story'}</Badge>
               <h2 className="text-4xl md:text-5xl font-black text-[#0B0D10] mb-6 leading-tight">
                  {isAr ? 'حيث يلتقي الشغف' : 'Where Passion Meets'} <br/><span className="text-[#C8A45D]">{isAr ? 'بالكمال.' : 'Perfection.'}</span>
               </h2>
               <p className="text-lg text-[#A7ABB3] leading-relaxed mb-8">
                  {isAr 
                  ? 'أسسنا إيل مايسترو كاستجابة للحاجة الماسة إلى خدمات عناية رجالية تجمع بين الدقة الأوروبية الصارمة وكرم الضيافة السعودي الأصيل. نستخدم أفضل المنتجات والأدوات لضمان الخروج بأفضل مظهر.' 
                  : 'We founded IL MAESTRO in response to the pressing need for male grooming that merges strict European precision with authentic Saudi hospitality. We use the finest equipment to guarantee you leave looking your absolute best.'}
               </p>
               <Link to="/about"><Button variant="outline" className="font-bold gap-2">{t('about.story_title')} <Arrow className="w-4 h-4" /></Button></Link>
            </div>
            <div className="relative">
               <div className="aspect-square bg-gradient-to-br from-[#0B0D10] to-[#1A1410] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src={ImageFactory.generateHeroTexture(9)} alt="" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <LogoIcon />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. PILLARS SECTION */}
      <section className="py-24 bg-[#F7F4EF] border-y border-[#E8E0D2]">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0B0D10] mb-4">{t('home.pillars_title')}</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <Card key={i} className="p-8 text-center bg-white group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-transparent hover:border-[#C8A45D]/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#C8A45D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-20 h-20 mx-auto bg-[#1A1410] group-hover:bg-[#C8A45D] flex items-center justify-center mb-8 shadow-xl transition-colors duration-500 rotate-3 group-hover:-rotate-3">
                  <div className="text-[#C8A45D] group-hover:text-white transition-colors duration-500">{p.icon}</div>
                </div>
                <h3 className="text-xl font-black mb-3 text-[#1A1410] relative z-10">{isAr ? p.titleAr : p.titleEn}</h3>
                <p className="text-[#A7ABB3] leading-relaxed text-sm font-medium relative z-10">{isAr ? p.descAr : p.descEn}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE MAESTRO PROTOCOL (New) */}
      <section className="py-24 bg-[#0B0D10] text-[#F7F4EF] relative overflow-hidden">
         <img src="/images/hero-barbershop.jpg" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" alt="" />
         <div className="container px-4 mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  {isAr ? 'بروتوكول مايسترو' : 'The Maestro Protocol'}
               </h2>
               <p className="text-[#A7ABB3] max-w-2xl mx-auto text-lg leading-relaxed">{isAr ? 'خطوات منهجية تضمن لك تجربة متكاملة واستثنائية في كل مرة.' : 'Systematic steps guaranteeing an integrated and exceptional experience every time.'}</p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-4 relative">
               <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#C8A45D]/50 to-transparent -translate-y-1/2 z-0"></div>
               {process.map((p, i) => (
                  <div key={i} className="flex-1 relative z-10 text-center group cursor-default">
                     <div className="w-16 h-16 mx-auto bg-[#1A1410] border-4 border-[#0B0D10] rounded-full flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:bg-[#C8A45D] transition-all duration-300">
                        <span className="font-bold text-[#C8A45D] group-hover:text-white font-latin">{p.num}</span>
                     </div>
                     <h3 className="text-xl font-bold mb-3 text-white">{p.title}</h3>
                     <p className="text-sm text-[#A7ABB3] px-4 group-hover:text-[#E8E0D2] transition-colors">{p.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. EXPANDED SERVICES (9 Services) */}
      <section className="py-32 bg-white relative">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <Badge className="bg-[#1A1410] text-[#C8A45D] mb-4 uppercase">{t('home.services_title')}</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B0D10] mb-4">{isAr ? 'خدماتنا الاستثنائية' : 'Exceptional Services'}</h2>
              <p className="text-xl text-[#A7ABB3] font-medium">{t('home.services_sub')}</p>
            </div>
            <Link to="/services" className="mt-6 md:mt-0 px-6 py-3 rounded-full bg-[#F7F4EF] text-[#1A1410] font-bold flex items-center gap-2 hover:bg-[#E8E0D2] hover:gap-4 transition-all shadow-sm">
              {t('common.view_all')} <Arrow className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {SERVICES.slice(0, 9).map((s, i) => (
              <Link key={s.id} to="/services" className="group block h-full">
                <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border border-[#E8E0D2] hover:border-[#C8A45D] h-full flex flex-col group-hover:-translate-y-2">
                  <div className="h-48 overflow-hidden relative bg-[#1A1410]">
                    <img src={ImageFactory.generateServiceCard(i + 15, s.cat)} alt="" className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4"><Badge className="bg-white text-[#0B0D10] font-bold shadow-lg">{isAr ? formatSar(s.price) : `SAR ${s.price}`}</Badge></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative bg-white">
                     <div className="absolute top-0 right-8 rtl:right-auto rtl:left-8 -mt-6 w-12 h-12 bg-[#F7F4EF] flex items-center justify-center border-4 border-white shadow-sm text-[#C8A45D]">
                        <Scissors className="w-5 h-5"/>
                     </div>
                     <h3 className="font-extrabold text-2xl mb-3 text-[#1A1410] group-hover:text-[#C8A45D] transition-colors">{isAr ? s.nameAr : s.nameEn}</h3>
                     <p className="text-[15px] text-[#A7ABB3] leading-relaxed mb-6 flex-grow">{isAr ? s.descAr : s.descEn}</p>
                     <div className="text-sm font-bold text-[#A7ABB3] flex items-center gap-2 bg-[#F7F4EF] w-max px-3 py-1.5"><Clock className="w-4 h-4 text-[#C8A45D]"/> {s.duration} {t('common.min')}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EXPANDED BARBERS (8 Barbers) */}
      <section className="py-32 bg-[#1A1410] text-[#F7F4EF] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0B0D10] via-[#C8A45D] to-[#0B0D10]" />
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <div className="max-w-2xl">
               <Badge className="bg-[#C8A45D] text-white mb-4 uppercase shadow-lg shadow-[#C8A45D]/20">{t('home.barbers_title')}</Badge>
               <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{isAr ? 'نخبة من كبار الحلاقين' : 'An Elite Assembly'}</h2>
               <p className="text-xl text-[#A7ABB3] font-medium">{t('home.barbers_sub')}</p>
             </div>
             <Link to="/barbers" className="mt-8 md:mt-0 px-8 py-4 border border-white/20 text-white font-bold flex items-center gap-2 hover:bg-white hover:text-[#1A1410] hover:border-white transition-all">
                {t('common.view_all')} <Arrow className="w-5 h-5" />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[...BARBERS, ...BARBERS].slice(0, 8).map((b, i) => (
               <Link key={`${b.id}-${i}`} to={`/barbers`} className="group">
                  <div className="aspect-[3/4] overflow-hidden relative mb-6 shadow-2xl bg-[#0B0D10]">
                     <img src={ImageFactory.generateAvatar(i+50, 'IM')} alt="" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                     <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 right-6 rtl:right-auto flex justify-between items-end">
                        <div>
                           <h3 className="font-bold text-2xl text-white group-hover:text-[#C8A45D] transition-colors mb-1">{isAr ? b.nameAr : b.nameEn}</h3>
                           <p className="text-sm font-medium text-[#A7ABB3]">{isAr ? b.roleAr : b.roleEn}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white backdrop-blur-md shadow-xl text-[#1A1410]">
                           <Star className="w-4 h-4 fill-current text-[#C8A45D] -mt-1"/>
                           <span className="text-sm font-black leading-none">{b.rating}</span>
                        </div>
                     </div>
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </section>
      
      {/* 8. GALLERY PREVIEW (New) */}
      <section className="py-24 bg-[#0B0D10] hidden lg:block overflow-hidden relative border-t border-white/5">
         <div className="container px-4 mx-auto mb-16 text-center">
            <h2 className="text-4xl font-black text-white mb-4">{isAr ? 'عالم مايسترو' : 'The Maestro World'}</h2>
            <p className="text-[#A7ABB3] text-lg">{isAr ? 'لمحة بصرية عن أسلوب حياتنا' : 'A visual glimpse into our lifestyle'}</p>
         </div>
         <div className="flex w-[150%] gap-4 animate-scroll px-4">
            {[10, 20, 30, 40, 50, 60].map((seed) => (
               <div key={seed} className="w-96 overflow-hidden aspect-[4/3] relative group shadow-2xl bg-[#1A1410]">
                  <img src={ImageFactory.generateHeroTexture(seed)} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 mix-blend-color-dodge" alt=""/>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
               </div>
            ))}
         </div>
      </section>

      {/* 9. MEMBERSHIPS + OFFERS + BRANCHES — Unified Dark Block */}
      <section className="bg-[#0B0D10] border-t border-white/5">
         <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
               
               {/* Memberships */}
               <div className="p-12">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-1 h-8 bg-[#C8A45D]" />
                     <Award className="w-5 h-5 text-[#C8A45D]" />
                     <span className="font-black uppercase tracking-widest text-xs text-[#C8A45D]">{t('memberships.title')}</span>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">{t('home.memberships_title')}</h2>
                  <p className="text-[#A7ABB3] mb-8 leading-relaxed">{t('home.memberships_sub')}</p>
                  <div className="border border-[#C8A45D]/20 p-6 bg-[#111318] mb-6">
                     <p className="text-[#C8A45D] font-black text-xs uppercase tracking-widest mb-4">VIP | Black</p>
                     <h3 className="font-black text-2xl text-white mb-6">The Executive Class</h3>
                     <ul className="space-y-3 mb-8">
                        {(isAr ? ['خدمات غير محدودة', 'أولوية الحجز', 'صالة الانتظار الحصرية'] : ['Unlimited premium services', 'Guaranteed priority booking', 'Exclusive lounge access']).map((b,i) => (
                           <li key={i} className="flex items-center gap-3 text-sm text-[#A7ABB3]"><CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0"/>{b}</li>
                        ))}
                     </ul>
                     <Link to="/memberships"><Button variant="secondary" className="w-full font-black">{t('common.details')}</Button></Link>
                  </div>
               </div>

               {/* Offers */}
               <div className="p-12">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-1 h-8 bg-[#C8A45D]" />
                     <Scissors className="w-5 h-5 text-[#C8A45D]" />
                     <span className="font-black uppercase tracking-widest text-xs text-[#C8A45D]">{t('offers.title')}</span>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">{t('home.offers_preview_title')}</h2>
                  <p className="text-[#A7ABB3] mb-8 leading-relaxed">{t('home.offers_preview_sub')}</p>
                  <div className="space-y-3">
                     {[{code:'VIP30', title: isAr ? 'خصم ٣٠٪ على أول زيارة' : '30% Off First Visit', color:'#B84A3A'},
                       {code:'COMBO10', title: isAr ? 'ماساج مجاني مع الكومبو' : 'Free Massage with Combo', color:'#C8A45D'},
                       {code:'MORNING20', title: isAr ? 'خصم ٢٠٪ صباحاً' : '20% Morning Discount', color:'#2E6B4C'}].map(o => (
                        <Link key={o.code} to="/offers" className="block">
                           <div className="flex items-center gap-4 p-4 border border-white/5 hover:border-[#C8A45D]/30 hover:bg-[#111318] transition-all group">
                              <div className="w-2 h-8 shrink-0" style={{backgroundColor: o.color}} />
                              <div className="flex-grow">
                                 <p className="font-bold text-white text-sm group-hover:text-[#C8A45D] transition-colors">{o.title}</p>
                                 <p className="text-xs text-[#A7ABB3] font-mono">{o.code}</p>
                              </div>
                              <Arrow className="w-4 h-4 text-[#A7ABB3] group-hover:text-[#C8A45D]" />
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>

               {/* Branches */}
               <div className="p-12">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-1 h-8 bg-[#C8A45D]" />
                     <MapPin className="w-5 h-5 text-[#C8A45D]" />
                     <span className="font-black uppercase tracking-widest text-xs text-[#C8A45D]">{t('branches.title')}</span>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">{t('home.branches_title')}</h2>
                  <p className="text-[#A7ABB3] mb-8 leading-relaxed">5 {isAr ? 'فروع فاخرة في الرياض وجدة والدمام' : 'Luxury locations across the Kingdom'}</p>
                  <div className="grid grid-cols-1 gap-3 mb-8">
                     {[{cityEn:'Riyadh Olaya', cityAr:'الرياض — العليا'},{cityEn:'Riyadh Hittin', cityAr:'الرياض — حطين'},{cityEn:'Jeddah Al Rawdah', cityAr:'جدة — الروضة'},{cityEn:'Dammam Corniche', cityAr:'الدمام — الكورنيش'}].map((b,i)=>(
                        <Link key={i} to="/branches" className="flex items-center gap-3 p-3 border border-white/5 hover:border-[#C8A45D]/30 hover:bg-[#111318] transition-all group text-sm">
                           <span className="text-[#C8A45D] font-black text-xs">0{i+1}</span>
                           <span className="text-[#A7ABB3] group-hover:text-white transition-colors font-bold">{isAr ? b.cityAr : b.cityEn}</span>
                        </Link>
                     ))}
                  </div>
                  <Link to="/branches"><Button variant="outline" className="w-full font-black text-white border-white/20 hover:bg-white/5">{t('common.view_all')}</Button></Link>
               </div>
            </div>
         </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 bg-white border-y border-[#E8E0D2]">
         <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
               <Users className="w-12 h-12 text-[#C8A45D] mx-auto mb-4" />
               <h2 className="text-4xl font-black text-[#0B0D10] mb-4">{t('home.testimonials_title')}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {testimonials.map((test, i) => (
                  <Card key={i} className="p-10 bg-[#F7F4EF] border-transparent relative group hover:shadow-xl transition-shadow">
                     <div className="text-6xl text-[#C8A45D] opacity-20 absolute top-4 left-6 font-serif">"</div>
                     <div className="flex gap-1 mb-6 relative z-10">
                        {Array.from({length: test.rating}).map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current text-[#C8A45D]" />)}
                     </div>
                     <p className="text-[#1A1410] font-medium text-lg italic leading-relaxed mb-8 relative z-10">"{test.text}"</p>
                     <p className="font-bold text-[#0B0D10] relative z-10">{test.name}</p>
                  </Card>
               ))}
            </div>
         </div>
      </section>

      {/* 11. ENHANCED CTA SECTION */}
      <section className="py-32 relative overflow-hidden bg-[#0B0D10] border-t-[8px] border-[#C8A45D]">
        <div className="absolute inset-0 z-0">
           <img src="/images/hero-barbershop.jpg" alt="" className="w-full h-full object-cover mix-blend-color-dodge opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
        </div>
        <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl">
          <Badge className="bg-white/10 text-[#C8A45D] border-white/20 backdrop-blur-md mb-8 px-6 py-2 text-sm font-bold tracking-widest uppercase">The Next Level</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
              Experience <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B1262A] via-[#E8E0D2] to-[#B1262A] animate-pulse">
                IL MAESTRO
              </span>
          </h2>
          <p className="text-2xl md:text-3xl text-white mb-10 max-w-3xl mx-auto font-black leading-snug tracking-tight">
            Elevate your routine. Step into the chair and let the craft speak for itself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/book"><Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[240px] pulse-oro text-xl h-16 shadow-2xl shadow-[#C8A45D]/40">{t('home.book_now')} <Arrow className="w-6 h-6 ml-2 rtl:ml-0 rtl:mr-2" /></Button></Link>
             <Link to="/branches"><Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[240px] text-white border-white/30 hover:bg-white/10 h-16 text-lg">{t('common.view_all')} <MapPin className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple Logo Component for abstract use
function LogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-32 h-32 opacity-20">
      <path d="M20 80 L20 20 L35 20 L35 80 Z" fill="#C8A45D" />
      <path d="M45 80 L45 20 L60 50 L75 20 L75 80 L65 80 L65 40 L60 50 L55 40 L55 80 Z" fill="#C8A45D" />
    </svg>
  );
}

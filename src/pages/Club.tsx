import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, TrendingUp, HandCoins, Building2, Crown, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageFactory } from '@/lib/imageFactory';

export function Club() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const steps = [
    {
       icon: <Building2 className="w-8 h-8 text-[#141518]" />,
       titleEn: '1. Discovery & Alignment', titleAr: '١. الاستكشاف والمواءمة الاستراتيجية',
       descEn: 'Understand the IL MAESTRO ecosystem, our proprietary 10-step service protocol, and the robust financial model that systematically de-risks your initial capital outlay.',
       descAr: 'تعرف على بيئة عمل إيل مايسترو، بروتوكولاتنا الـ ١٠ الصارمة، والنموذج المالي القوي الذي يحد بشكل منهجي من مخاطر رأس المال المبدئي الخاص بك.',
    },
    {
       icon: <TrendingUp className="w-8 h-8 text-[#141518]" />,
       titleEn: '2. Location Feasibility', titleAr: '٢. دراسة الجدوى واختيار الموقع',
       descEn: 'Leverage our location intelligence. We rigorously analyze foot traffic patterns, demographic fit, and lease term structures to project a highly reliable 3-year ROI pipeline.',
       descAr: 'استفد من ذكاء المواقع لدينا. نقوم بتحليل معدلات الزحام، والملاءمة الديموغرافية، وهياكل التأجير لضمان مسار آمن وواضح لاسترداد الاستثمار خلال ٣ إلى ٤ سنوات.',
    },
    {
       icon: <ShieldCheck className="w-8 h-8 text-[#141518]" />,
       titleEn: '3. Turnkey Execution', titleAr: '٣. التنفيذ التسليمي الشامل (Turnkey)',
       descEn: 'We oversee the complete interior rollout, specialized hardware installation, and seamless integration of our digital commerce and CRM systems for zero operational friction.',
       descAr: 'نقوم بالإشراف الكامل على التجهيزات المعمارية، وتوريد المعدات المتخصصة، وربط أنظمة الدفع والجداول الرقمية (CRM) لضمان إطلاق خالٍ من الاحتكاك التشغيلي.',
    },
    {
       icon: <HandCoins className="w-8 h-8 text-[#141518]" />,
       titleEn: '4. Sustained Scaling', titleAr: '٤. التشغيل والتوسع المستدام',
       descEn: 'Through continuous academy staff training and centralized brand-level marketing, we ensure maximum utilization rates and sustained monthly recurring revenue (MRR) growth.',
       descAr: 'من خلال أكاديميتنا المتخصصة والتسويق المركزي للعلامة التجارية، نضمن تحقيق أقصى معدلات إشغال للكراسي ونمواً مستداماً في العوائد الشهرية المتكررة (MRR).',
    }
  ];

  const highlightsEn = ['Proprietary Training Academy', 'Centralized Tech Stack', 'Vendor Supply Chain Power', 'High Customer LTV'];
  const highlightsAr = ['أكاديمية تدريب داخلية حصرية', 'بنية تقنية وإدارية مركزية', 'قوة تفاوض مع الموردين', 'قيمة مستدامة للعميل (LTV)'];

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F3F1]" style={{fontFamily:'var(--font-arabic)'}}>
      {/* ── HERO ── */}
      <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden border-b-[6px] border-[#B1262A]">
        <div className="absolute inset-0 bg-[#141518]" />
        <img src={ImageFactory.generateHeroTexture(21)} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-[#141518]/80 to-transparent" />
        
        {/* Tricolor corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B1262A]/20 to-transparent pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#1F7A3F]/20 to-transparent pointer-events-none"/>

        <div className="container relative z-10 px-6 text-center">
           <Badge variant="outline" className="text-white border-white/20 mb-6 uppercase tracking-widest shadow-lg bg-white/5 backdrop-blur-md px-6 py-2">
             IL MAESTRO Investment Club
           </Badge>
           <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl" style={{fontFamily:'Noto Kufi Arabic,Montserrat,sans-serif'}}>
             {isAr ? 'شارك في بناء الصدارة' : 'Own The Standard'}
           </h1>
           <p className="text-lg md:text-xl text-[#A7ABB3] max-w-3xl mx-auto font-medium leading-relaxed">
             {isAr ? 'شراكة مع نموذج أثبت كفاءته. نحن نعيد تشكيل مفهوم العناية بالرجل إلى مؤسسة قابلة للتوسع السريع وتعمل بتقنيات متقدمة تضمن استقرار العوائد.' : 'Partner with a proven model. We are systematically redefining male grooming into a highly scalable, tech-enabled enterprise.'}
           </p>
        </div>
      </section>

      {/* ── CONCEPT & THESIS ── */}
      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-28 items-center">
              
              <div className="lg:col-span-7">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-[2px] bg-[#B1262A]" />
                    <span className="text-[#B1262A] font-bold uppercase tracking-widest text-xs">{isAr ? 'الفكرة الاستثمارية' : 'The Investment Concept'}</span>
                 </div>
                 <h2 className="text-3xl lg:text-4xl font-black text-[#141518] mb-8 leading-tight" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>
                    {isAr ? 'نقلة نوعية من "صالون" إلى هيكل مؤسساتي كامل.' : 'A quantum leap from a "barbershop" to a corporate structure.'}
                 </h2>
                 <p className="text-[#141518]/70 leading-relaxed mb-8 font-medium text-lg">
                    {isAr 
                    ? 'إيل مايسترو ليس مجرد مساحة للحلاقة؛ إنه نموذج عمل يدمج الضيافة الفندقية عالية المستوى مع صرامة العمليات التقنية. لقد قمنا بتصميم نظامنا لتقليل الاعتماد المطلق على المهارة الفنية لموظف واحد (De-skilling the risk)، وتحويل الخدمة إلى سلسلة من البروتوكولات المؤسسية الدقيقة المؤتمتة.' 
                    : 'IL MAESTRO is not a barbershop; it is a hospitality-driven business model governed by precise digital operations. We have systematically de-skilled the risk out of the service industry, turning haircuts into a corporate protocol.'}
                 </p>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {(isAr ? highlightsAr : highlightsEn).map((h, i) => (
                       <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#1F7A3F] shrink-0 mt-0.5" />
                          <span className="font-bold text-sm text-[#141518]">{h}</span>
                       </div>
                    ))}
                 </div>

                 <div className="flex shadow-md rounded-xl overflow-hidden border border-[#E2E0DB]">
                    <div className="p-6 bg-white flex-1 text-center border-r border-[#E2E0DB] rtl:border-r-0 rtl:border-l">
                       <div className="text-4xl font-extrabold text-[#B1262A] mb-1 font-mono">34%</div>
                       <div className="uppercase tracking-widest text-[11px] font-bold text-[#A7ABB3]">{isAr ? 'هامش الربح التشغيلي (تقديري)' : 'Op. Margin (Est.)'}</div>
                    </div>
                    <div className="p-6 bg-[#F3F3F1] flex-1 text-center">
                       <div className="text-4xl font-extrabold text-[#141518] mb-1 font-mono">18mo</div>
                       <div className="uppercase tracking-widest text-[11px] font-bold text-[#A7ABB3]">{isAr ? 'فترة استرداد رأس المال' : 'Payback Period'}</div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-5 relative">
                 <div className="absolute inset-0 bg-[#B1262A] translate-x-3 translate-y-3 rounded-[10px] hidden lg:block" />
                 <Card className="p-10 bg-[#141518] text-[#F3F3F1] border border-white/10 rounded-[10px] relative z-10 shadow-2xl">
                    <Crown className="w-14 h-14 text-[#B1262A] mb-8" />
                    <h3 className="text-2xl font-black mb-4" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>{isAr ? 'عضوية النادي الماسية' : 'Exclusive Diamond Access'}</h3>
                    <p className="text-sm text-white/60 mb-8 leading-relaxed">
                       {isAr ? 'المستثمرون في جولاتنا التوسعية يحصلون على عضوية النادي الماسية مدى الحياة. يشمل ذلك أولوية مطلقة في خدمات الفروع، وصول مفتوح لتقارير أداء ومقاييس الفرع الحية (Telemetrics)، ومقعد دائم في المجلس الاستشاري الاستراتيجي.' : 'Investors in our expansion rounds receive lifetime Diamond membership, unfiltered API access to live branch telemetrics, VIP hospitality at all locations, and a dedicated seat on the regional advisory board.'}
                    </p>
                    <Link to="/admin"><Button variant="primary" className="w-full justify-between items-center group h-14 text-sm tracking-wide">{isAr ? 'مشاهدة لوحة قياس الأداء الحية' : 'View Live Telemetrics'} <ArrowRight className="w-5 h-5 rtl:rotate-180"/></Button></Link>
                 </Card>
              </div>
           </div>

           {/* ── ROADMAP STEPS ── */}
           <div className="mb-14">
              <div className="flex items-center justify-between border-b-2 border-[#141518] pb-4 mb-10">
                 <h2 className="text-3xl font-black text-[#141518]" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>{isAr ? 'خارطة الطريق للاستثمار (De-risking)' : 'The De-risking Roadmap'}</h2>
                 <Badge variant="outline" className="hidden sm:inline-flex bg-white px-4 border-[#E2E0DB]">{isAr ? '٤ مراحل رئيسية' : '4 Core Phases'}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {steps.map((s, i) => (
                    <Card key={i} className="p-8 bg-white hover:shadow-2xl transition-all duration-300 border border-[#E2E0DB] relative overflow-hidden group flex flex-col h-full rounded-[10px]">
                       <div className="absolute top-0 left-0 w-full h-1 bg-[#B1262A] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
                       <div className="w-14 h-14 rounded-full bg-[#F3F3F1] flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {s.icon}
                       </div>
                       <h3 className="font-black text-xl mb-4 text-[#141518]" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>{isAr ? s.titleAr : s.titleEn}</h3>
                       <p className="text-sm text-[#A7ABB3] leading-relaxed flex-grow">{isAr ? s.descAr : s.descEn}</p>
                    </Card>
                 ))}
              </div>
           </div>
           
           {/* CTA Box */}
           <div className="bg-[#141518] rounded-[10px] p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-[#B1262A] opacity-10 rounded-full blur-3xl"/>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#1F7A3F] opacity-10 rounded-full blur-3xl"/>
             <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 relative z-10" style={{fontFamily:'Noto Kufi Arabic,Cairo,sans-serif'}}>{isAr ? 'جاهز للمناقشة؟' : 'Ready to talk?'}</h2>
             <p className="text-[#A7ABB3] max-w-xl mx-auto mb-8 relative z-10">{isAr ? 'تواصل مع فريق تطوير الأعمال لدينا لتحديد موعد لعرض النموذج المالي التفصيلي.' : 'Connect with our business development team to schedule a detailed financial model review.'}</p>
             <a href="mailto:architect.malmousa@gmail.com" className="relative z-10 inline-flex">
                <Button variant="primary" size="lg" className="px-10 h-14 bg-[#1F7A3F] border-[#1F7A3F] hover:bg-[#165a2e] hover:border-[#165a2e] shadow-lg shadow-[#1F7A3F]/30">{isAr ? 'اطلب العرض الفني والمالي' : 'Request Pitch Deck'}</Button>
             </a>
           </div>

        </div>
      </section>
    </div>
  );
}

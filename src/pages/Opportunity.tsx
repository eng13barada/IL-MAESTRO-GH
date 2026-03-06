import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Building2, Users, Rocket, Target, CheckCircle2, TrendingUp, 
  Wallet, Smartphone, Briefcase, Check
} from 'lucide-react';

export function Opportunity() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeDimension, setActiveDimension] = useState(0);

  const dimensions = [
    {
      id: 'finance',
      titleAr: 'البعد المالي', titleEn: 'Financial Dimension',
      goalAr: 'تمويل مستقر وتوسع استراتيجي', goalEn: 'Stable funding & strategic expansion',
      leaderAr: 'المستثمر', leaderEn: 'Investor',
      outputsAr: ['هيكلة رأس المال', 'حوكمة مالية', 'نموذج الربحية التقديري'],
      outputsEn: ['Capital struct.', 'Financial governance', 'Proj. profitability model']
    },
    {
      id: 'ops',
      titleAr: 'البعد التشغيلي', titleEn: 'Operational Dimension',
      goalAr: 'جودة استثنائية ومعايير حلاقة إيطالية', goalEn: 'Exceptional quality & Italian standards',
      leaderAr: 'مروان ناجي', leaderEn: 'Marwan Naji',
      outputsAr: ['توظيف وتدريب', 'ضبط جودة الخدمات', 'إدارة الفرع اليومية'],
      outputsEn: ['Hiring & training', 'Service QA', 'Daily branch management']
    },
    {
      id: 'brand',
      titleAr: 'بعد العلامة والنمو', titleEn: 'Brand & Growth',
      goalAr: 'هوية قوية وجذب عملاء مستمر', goalEn: 'Strong identity & continuous acquisition',
      leaderAr: 'الشريك الاستراتيجي', leaderEn: 'Strategic Partner',
      outputsAr: ['استراتيجية العلامة', 'تسويق ومحتوى', 'إدارة تجربة العميل'],
      outputsEn: ['Brand strategy', 'Marketing & content', 'CX management']
    },
    {
      id: 'digital',
      titleAr: 'البعد الرقمي', titleEn: 'Digital Dimension',
      goalAr: 'أتمتة التشغيل، الولاء، وتحليل البيانات', goalEn: 'Automation, loyalty & data analytics',
      leaderAr: 'الشريك الاستراتيجي', leaderEn: 'Strategic Partner',
      outputsAr: ['نظام الحجز', 'محفظة العميل', 'لوحات قياس الأداء (KPIs)'],
      outputsEn: ['Booking system', 'Client wallet', 'Performance dashboards']
    }
  ];

  const raci = [
    { taskAr: 'اختيار الموقع والتجهيز', taskEn: 'Site Selection & Fit-out', inv: 'A/I', mar: 'C', me: 'R' },
    { taskAr: 'بناء الفريق والتوظيف', taskEn: 'Team Building & Hiring', inv: 'I', mar: 'R', me: 'C' },
    { taskAr: 'تدريب الحلاقين (Academy)', taskEn: 'Barber Training (Academy)', inv: 'I', mar: 'R/A', me: 'C' },
    { taskAr: 'تشغيل الفرع والمعايير (SOP)', taskEn: 'Branch Ops & Standards (SOP)', inv: 'I', mar: 'R/A', me: 'C' },
    { taskAr: 'التسعير والباقات والعضويات', taskEn: 'Pricing, Packages & Memberships', inv: 'A', mar: 'C', me: 'R' },
    { taskAr: 'التسويق والمحتوى والعروض', taskEn: 'Marketing, Content & Offers', inv: 'I', mar: 'C', me: 'R/A' },
    { taskAr: 'إدارة تجربة العميل (Journey)', taskEn: 'CX Management (Journey)', inv: 'I', mar: 'C', me: 'R/A' },
    { taskAr: 'التحليلات والتقارير (KPIs)', taskEn: 'Analytics & Reporting (KPIs)', inv: 'I', mar: 'C', me: 'R/A' },
    { taskAr: 'الشراكات B2B', taskEn: 'B2B Partnerships', inv: 'C/I', mar: 'I', me: 'R/A' },
    { taskAr: 'التوسع وفتح الفروع', taskEn: 'Expansion & New Branches', inv: 'R/A', mar: 'C', me: 'C' }
  ];

  const methodology = [
    { 
      titleAr: 'تعريف العلامة', titleEn: 'Brand Definition',
      doAr: 'تطوير الهوية والنغمة واسم الخدمات', doEn: 'Develop identity, tone, and service names',
      delivAr: 'Brand Playbook', delivEn: 'Brand Playbook',
      kpiAr: 'تماسك الهوية البصرية بنسبة 100%', kpiEn: '100% Visual identity consistency'
    },
    { 
      titleAr: 'تصميم رحلة العميل', titleEn: 'Customer Journey',
      doAr: 'تخطيط نقاط الاتصال من الحجز إلى المغادرة', doEn: 'Map touchpoints from booking to exit',
      delivAr: 'Service Standards Cards', delivEn: 'Service Standards Cards',
      kpiAr: 'معدل رضا العملاء (CSAT) > 90%', kpiEn: 'CSAT > 90%'
    },
    { 
      titleAr: 'نظام تشغيل الفروع', titleEn: 'Branch Playbook',
      doAr: 'توثيق إجراءات العمل وضبط الجودة', doEn: 'Document SOPs and quality control',
      delivAr: 'SOP Manuals', delivEn: 'SOP Manuals',
      kpiAr: 'امتثال العمليات > 95%', kpiEn: 'Ops compliance > 95%'
    },
    { 
      titleAr: 'المنتج الرقمي', titleEn: 'Digital Product',
      doAr: 'أتمتة الحجز وعضويات الولاء', doEn: 'Automate bookings and loyalty programs',
      delivAr: 'Customer App / Portal', delivEn: 'Customer App / Portal',
      kpiAr: 'نسبة الحجوزات الرقمية > 80%', kpiEn: 'Digital bookings > 80%'
    },
    { 
      titleAr: 'النمو والتسويق', titleEn: 'Growth Engine',
      doAr: 'إدارة الحملات وعروض B2B', doEn: 'Campaign management and B2B offers',
      delivAr: 'Monthly Offer Calendar', delivEn: 'Monthly Offer Calendar',
      kpiAr: 'تكلفة الاستحواذ (CAC) مستهدفة', kpiEn: 'Target CAC achieved'
    },
    { 
      titleAr: 'القياس والتحسين', titleEn: 'Analytics',
      doAr: 'رصد المؤشرات وبناء تقارير الأداء', doEn: 'Monitor KPIs and build reports',
      delivAr: 'Weekly KPI Dashboard', delivEn: 'Weekly KPI Dashboard',
      kpiAr: 'تقليل التسرب بنسبة 15%', kpiEn: 'Churn reduction by 15%'
    }
  ];

  return (
    <div className="min-h-screen py-0" style={{background:'#F3F3F1', fontFamily: 'var(--font-arabic)'}}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{background:'#1F7A3F',filter:'blur(160px)'}} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{background:'#B1262A',filter:'blur(140px)'}} />
        <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:'linear-gradient(rgba(200,164,93,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(200,164,93,0.4) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-16 space-y-20 relative z-10">
        
        {/* SECTION 1: Hero */}
        <section className="relative overflow-hidden" style={{background:'rgba(255,255,255,0.65)',border:'1px solid rgba(255,255,255,0.9)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',boxShadow:'0 4px 32px rgba(0,0,0,0.06)'}}>
          {/* Tricolor top bar */}
          <div className="h-[3px]" style={{background:'linear-gradient(to right,#155C28 33.3%,#E8E4DC 33.3% 66.6%,#7A161A 66.6%)'}} />
          <div className="relative z-10 p-10 md:p-16 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-2" style={{background:'rgba(200,164,93,0.12)',border:'1px solid rgba(200,164,93,0.4)'}}>
              <span className="w-2 h-2 rounded-full" style={{background:'#C8A45D'}} />
              <span className="text-[11px] font-black uppercase tracking-[0.25em]" style={{color:'#8B6E2A'}}>{isAr ? 'وثيقة الشراكة الاستراتيجية' : 'Strategic Partnership Document'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight" style={{color:'#141518',lineHeight:1.05}}>
              {isAr ? 'أبعاد الفرصة' : 'The Opportunity Dimensions'}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed font-medium" style={{color:'#3A3D45'}}>
              {isAr 
                ? 'شراكة ثلاثية لبناء علامة صالونات رجالية فاخرة قابلة للتوسع—من السعودية إلى أوروبا—بمنهج تشغيلي ونظام رقمي يعظّم الاتساق والربحية.'
                : "A trilateral partnership to build a scalable luxury men's grooming brand—from Saudi Arabia to Europe—powered by an operational playbook and digital ecosystem maximizing consistency and profitability."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 pt-8 text-right" style={{border:'1px solid rgba(255,255,255,0.08)'}}>
              {[
                {icon:<TrendingUp className="w-8 h-8"/>, ar:'استثمار قابل للقياس', en:'Measurable Investment', color:'#C8A45D'},
                {icon:<Users className="w-8 h-8"/>, ar:'تشغيل احترافي', en:'Pro Operations', color:'#1F7A3F'},
                {icon:<Rocket className="w-8 h-8"/>, ar:'علامة + رقمي + نمو', en:'Brand + Digital + Growth', color:'#B1262A'},
              ].map((item, i) => (
                <div key={i} className="p-7 flex flex-col items-center text-center group" style={{borderRight: i<2 ? '1px solid rgba(255,255,255,0.07)' : 'none', background:'rgba(255,255,255,0.02)'}}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4" style={{color:item.color,background:`${item.color}15`,border:`1px solid ${item.color}30`}}>{item.icon}</div>
                  <h3 className="font-bold text-base" style={{color:'rgba(255,255,255,0.9)'}}>{isAr ? item.ar : item.en}</h3>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 font-black text-sm tracking-wide text-white" style={{background:'#7A161A'}}>
                {isAr ? 'ابدأ بخطواتنا الثلاث' : 'Start with 3 Steps'}
              </button>
              <button className="px-8 py-4 font-black text-sm tracking-wide" style={{border:'1px solid rgba(255,255,255,0.25)',color:'rgba(255,255,255,0.85)',background:'rgba(255,255,255,0.04)'}}>
                {isAr ? 'عرض الأدوار والمسؤوليات' : 'View Roles & Responsibilities'}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Partner Cards */}
        <section>
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-12" style={{background:'rgba(255,255,255,0.15)'}} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{color:'rgba(255,255,255,0.45)'}}>{isAr ? 'الأطراف' : 'Partners'}</span>
              <div className="h-px w-12" style={{background:'rgba(255,255,255,0.15)'}} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-widest" style={{color:'#ffffff'}}>{isAr ? 'الأطراف الثلاثة' : 'The Three Pillars'}</h2>
            <div className="w-16 h-[3px] mx-auto mt-4" style={{background:'#B1262A'}} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Investor */}
            <div className="flex flex-col p-8" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',backdropFilter:'blur(8px)'}}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-5 px-3 py-1.5 self-start" style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.6)'}}>{ isAr ? 'المستثمر' : 'Investor'}</div>
              <Building2 className="w-10 h-10 mb-5" style={{color:'rgba(255,255,255,0.85)'}} />
              <h3 className="text-lg font-black mb-4" style={{color:'#ffffff'}}>{isAr ? 'تمويل + حوكمة + توسع' : 'Funding + Governance + Expansion'}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{color:'rgba(255,255,255,0.55)'}}>
                {isAr ? 'التركيز على العائد المستقر وبناء استثمار يمكن تكرار نجاحه عبر فروع متعددة بأعلى درجات الحوكمة المالية.' : 'Focus on stable returns and building an investment that can be replicated across multiple branches with high financial governance.'}
              </p>
              <div className="pt-4" style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                <span className="text-[10px] font-black uppercase tracking-wider" style={{color:'#B1262A'}}>{ isAr ? 'الهدف' : 'Goal'}</span>
                <p className="font-bold text-sm mt-1" style={{color:'rgba(255,255,255,0.85)'}}>{isAr ? 'عائد مستقر ونموذج قابل للتكرار' : 'Stable ROI & Replicable Model'}</p>
              </div>
            </div>
            {/* Marwan */}
            <div className="flex flex-col p-8" style={{background:'rgba(177,38,42,0.08)',border:'1px solid rgba(177,38,42,0.25)',backdropFilter:'blur(8px)'}}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-5 px-3 py-1.5 self-start" style={{background:'rgba(177,38,42,0.15)',color:'#FF8A8E'}}>{ isAr ? 'الحلاق المحترف — مروان ناجي' : 'Master Barber — Marwan Naji'}</div>
              <Briefcase className="w-10 h-10 mb-5" style={{color:'#FF8A8E'}} />
              <h3 className="text-lg font-black mb-4" style={{color:'#ffffff'}}>{isAr ? 'تشغيل + تدريب + جودة' : 'Ops + Training + Quality'}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{color:'rgba(255,255,255,0.55)'}}>
                {isAr ? 'مدير الفرع الأول والمشغل الرئيسي. التركيز على بناء فريق وتدريبه وفق معايير صارمة وضمان جودة الحلاقة يومياً.' : 'Branch manager and core operator. Focus on team building, rigorous training, and daily haircut quality assurance.'}
              </p>
              <div className="pt-4" style={{borderTop:'1px solid rgba(177,38,42,0.2)'}}>
                <span className="text-[10px] font-black uppercase tracking-wider" style={{color:'#B1262A'}}>{ isAr ? 'الهدف' : 'Goal'}</span>
                <p className="font-bold text-sm mt-1" style={{color:'rgba(255,255,255,0.85)'}}>{isAr ? 'سمعة قوية وتوسع وصولاً لإيطاليا' : 'Strong reputation & Italy expansion'}</p>
              </div>
            </div>
            {/* Mohammed Al-Moussa */}
            <div className="flex flex-col p-8" style={{background:'linear-gradient(145deg,rgba(200,164,93,0.08),rgba(200,164,93,0.03))',border:'1px solid rgba(200,164,93,0.3)',backdropFilter:'blur(8px)'}}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-5 px-3 py-1.5 self-start" style={{background:'rgba(200,164,93,0.15)',color:'#C8A45D'}}>
                {isAr ? 'المعماري: محمد الموسى' : 'Mohammed Al-Moussa — Architect'}
              </div>
              <Target className="w-10 h-10 mb-5" style={{color:'#C8A45D'}} />
              <h3 className="text-lg font-black mb-4" style={{color:'#ffffff'}}>{isAr ? 'استراتيجية + نظام رقمي + نمو' : 'Strategy + Digital System + Growth'}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{color:'rgba(255,255,255,0.55)'}}>
                {isAr ? 'المعماري المؤسس لهوية إيل مايسترو وبانٍ نظامها الرقمي. يصمم تجربة العميل والنظام الرقمي للحجوزات والولاء، التسويق، وصناعة الـ Playbook الذي يحول الفكرة إلى نموذج أعمال متكامل.' : 'Brand architect and digital system builder for IL MAESTRO. Designs CX, digital booking/loyalty systems, marketing, and the Playbook turning the idea into a complete business model.'}
              </p>
              <div className="pt-4" style={{borderTop:'1px solid rgba(200,164,93,0.2)'}}>
                <span className="text-[10px] font-black uppercase tracking-wider" style={{color:'#C8A45D'}}>{isAr ? 'الوعد' : 'Promise'}</span>
                <p className="font-bold text-sm mt-1" style={{color:'rgba(255,255,255,0.85)'}}>{isAr ? 'منهج تشغيلي ونموذج قابل للتوسع' : 'Operational Playbook & Scalability'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Market Logic */}
        <section className="overflow-hidden" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',backdropFilter:'blur(8px)',display:'flex',flexDirection:'column'}}>
          <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 md:p-14" style={{borderBottom:'none',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest" style={{color:'#ffffff'}}>{isAr ? 'لماذا هذه الفرصة الآن؟' : 'Why This Opportunity Now?'}</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{background:'rgba(31,122,63,0.15)',border:'1px solid rgba(31,122,63,0.3)'}}>
                  <Check className="w-4 h-4" style={{color:'#5ECC82'}} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{color:'rgba(255,255,255,0.9)'}}>{isAr ? 'ولاء وتكرار زيارة مرتفع' : 'High loyalty & visit frequency'}</h4>
                  <p className="text-xs" style={{color:'rgba(255,255,255,0.50)'}}>{isAr ? 'الرجال يزورون الصالون دورياً (قص/لحية)، مما يضمن تدفقاً نقدياً مستمراً.' : 'Men visit regularly (hair/beard), ensuring steady cash flow.'}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{background:'rgba(31,122,63,0.15)',border:'1px solid rgba(31,122,63,0.3)'}}>
                  <Check className="w-4 h-4" style={{color:'#5ECC82'}} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{color:'rgba(255,255,255,0.9)'}}>{isAr ? 'فرصة لرفع متوسط التذكرة' : 'Opportunity to increase average ticket'}</h4>
                  <p className="text-xs" style={{color:'rgba(255,255,255,0.50)'}}>{isAr ? 'دمج الإضافات (عناية، مساج) وبرامج العضويات بسهولة.' : 'Easy integration of add-ons (grooming, massage) & memberships.'}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{background:'rgba(31,122,63,0.15)',border:'1px solid rgba(31,122,63,0.3)'}}>
                  <Check className="w-4 h-4" style={{color:'#5ECC82'}} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{color:'rgba(255,255,255,0.9)'}}>{isAr ? 'المعيارية بدلاً من الفردية' : 'Standardization over individuality'}</h4>
                  <p className="text-xs" style={{color:'rgba(255,255,255,0.50)'}}>{isAr ? 'تقليل الاعتماد على مهارة حلاق واحد بفضل نظام التشغيل الموثق.' : 'Reducing reliance on a single barber\'s skill via documented SOPs.'}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 p-10 md:p-14">
            <div className="p-5 mb-6" style={{background:'rgba(200,164,93,0.08)',border:'1px solid rgba(200,164,93,0.25)',borderLeft:'4px solid #C8A45D'}}>
              <p className="text-xs leading-relaxed font-bold">
                {isAr 
                  ? 'ملاحظة: الأرقام أدناه تقديرية لأغراض العرض فقط، وتتغير حسب المدينة والموقع والإيجار والرواتب والطاقة التشغيلية.'
                  : 'Note: Numbers below are estimates for presentation purposes and vary based on city, location, rent, salaries, and operational capacity.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#E2E0DB] p-5 text-center shadow-sm">
                <div className="text-2xl font-black text-[#141518] font-mono mb-1">2–4</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'زيارات شهرياً' : 'Visits/Month'}</div>
              </div>
              <div className="bg-white border border-[#E2E0DB] p-5 text-center shadow-sm">
                <div className="text-2xl font-black text-[#141518] font-mono mb-1">90–220</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'متوسط التذكرة (ر.س)' : 'Avg Ticket (SAR)'}</div>
              </div>
              <div className="bg-white border border-[#E2E0DB] p-5 text-center shadow-sm">
                <div className="text-2xl font-black text-[#1F7A3F] font-mono mb-1">55%–75%</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'هامش مبيعات مبدئي' : 'Est. Gross Margin'}</div>
              </div>
              <div className="bg-white border border-[#E2E0DB] p-5 text-center shadow-sm">
                <div className="text-2xl font-black text-[#B1262A] font-mono mb-1">12–25</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'نقطة التعادل (عميل/يوم)' : 'Break-even (Clients/Day)'}</div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* SECTION 4: 3D Partnership Model */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'أبعاد الشراكة الأربعة' : 'The Four Dimensions'}</h2>
            <div className="w-24 h-1 bg-[#1F7A3F] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {dimensions.map((dim, idx) => (
              <button 
                key={dim.id}
                onClick={() => setActiveDimension(idx)}
                className={`p-4 border text-center transition-all ${activeDimension === idx ? 'bg-[#141518] text-white border-[#141518]' : 'bg-white text-gray-500 border-[#E2E0DB] hover:bg-gray-50'}`}
              >
                <div className="font-bold text-sm">{isAr ? dim.titleAr : dim.titleEn}</div>
              </button>
            ))}
          </div>

          <Card className="bg-white border border-[#E2E0DB] p-8 shadow-sm">
            {dimensions[activeDimension] && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <Badge className="bg-[#F3F3F1] text-[#141518] mb-4 border border-[#E2E0DB]">
                    {isAr ? 'قائد البعد:' : 'Leader:'} {isAr ? dimensions[activeDimension].leaderAr : dimensions[activeDimension].leaderEn}
                  </Badge>
                  <h3 className="text-2xl font-black text-[#141518] mb-4">{isAr ? dimensions[activeDimension].titleAr : dimensions[activeDimension].titleEn}</h3>
                  <div className="bg-[#FAFAFA] p-4 border-l-4 border-[#B1262A]">
                    <span className="font-bold text-xs uppercase text-gray-500 block mb-1">{isAr ? 'الهدف الرئيسي' : 'Main Goal'}</span>
                    <span className="font-bold text-sm text-[#141518]">{isAr ? dimensions[activeDimension].goalAr : dimensions[activeDimension].goalEn}</span>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">{isAr ? 'المخرجات المتوقعة' : 'Expected Deliverables'}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(isAr ? dimensions[activeDimension].outputsAr : dimensions[activeDimension].outputsEn).map((out, i) => (
                      <div key={i} className="bg-white border border-[#E2E0DB] p-4 flex items-start gap-3 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#1F7A3F] shrink-0" />
                        <span className="text-sm font-bold text-[#141518] leading-snug">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* SECTION 5: RACI Table */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'توزيع الأدوار (RACI)' : 'Roles & Responsibilities (RACI)'}</h2>
            <div className="w-24 h-1 bg-[#141518] mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4 font-bold">R: Responsible &nbsp;|&nbsp; A: Accountable &nbsp;|&nbsp; C: Consulted &nbsp;|&nbsp; I: Informed</p>
          </div>
          
          <div className="overflow-x-auto border border-[#E2E0DB] bg-white shadow-sm">
            <table className="w-full text-left rtl:text-right text-sm">
              <thead className="bg-[#F3F3F1] border-b border-[#E2E0DB]">
                <tr>
                  <th className="p-4 font-black text-[#141518] uppercase">{isAr ? 'مسار العمل' : 'Workstream'}</th>
                  <th className="p-4 font-black text-[#141518] text-center">{isAr ? 'المستثمر' : 'Investor'}</th>
                  <th className="p-4 font-black text-[#141518] text-center">{isAr ? 'مروان ناجي' : 'Marwan Naji'}</th>
                  <th className="p-4 font-black text-[#141518] text-center">{isAr ? 'م. محمد الموسى' : 'M. Al-Moussa'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E0DB]">
                {raci.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-[#141518]">{isAr ? row.taskAr : row.taskEn}</td>
                    <td className="p-4 text-center font-mono font-bold text-gray-600">{row.inv}</td>
                    <td className="p-4 text-center font-mono font-bold text-gray-600">{row.mar}</td>
                    <td className="p-4 text-center font-mono font-bold text-[#B1262A] bg-[#B1262A]/5">{row.me}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: My Role Details */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'منهجية العلامة والتشغيل' : 'Brand & Ops Methodology'}</h2>
            <p className="font-bold text-gray-500">{isAr ? 'تفصيل دوري في بناء المشروع' : 'Detailed breakdown of my role'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodology.map((m, i) => (
              <Card key={i} className="bg-white border border-[#E2E0DB] p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F3F3F1] flex items-center justify-center font-black text-2xl text-gray-300 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                  0{i+1}
                </div>
                <h3 className="font-black text-lg mb-4 text-[#141518] relative z-10">{isAr ? m.titleAr : m.titleEn}</h3>
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">{isAr ? 'ماذا أفعل؟' : 'Action'}</span>
                    <p className="text-sm font-medium text-[#141518]">{isAr ? m.doAr : m.doEn}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">{isAr ? 'المخرجات' : 'Deliverable'}</span>
                    <Badge className="bg-transparent border border-[#141518] text-[#141518] font-mono shadow-none">{isAr ? m.delivAr : m.delivEn}</Badge>
                  </div>
                  <div className="bg-[#FAFAFA] p-3 border border-dashed border-[#E2E0DB]">
                    <span className="text-[10px] font-bold uppercase text-[#1F7A3F] block mb-1">KPI</span>
                    <p className="text-xs font-bold text-[#141518]">{isAr ? m.kpiAr : m.kpiEn}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 7: Revenue Model */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'نموذج الإيرادات' : 'Revenue Model'}</h2>
            <div className="w-24 h-1 bg-[#C8A45D] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { a: 'خدمات فردية الأساسية', e: 'Core Services' },
              { a: 'إضافات وعناية (Add-ons)', e: 'Grooming Add-ons' },
              { a: 'باقات مجمعة (Combos)', e: 'Service Packages' },
              { a: 'عضويات النادي الشهرية', e: 'Club Memberships' },
              { a: 'عقود الشركات (B2B)', e: 'B2B Contracts' },
              { a: 'فعاليات ومناسبات خارجية', e: 'Events & Pop-ups' }
            ].map((stream, i) => (
              <Card key={i} className="bg-white border-[#E2E0DB] p-4 text-center shadow-sm flex items-center justify-center min-h-[100px] hover:border-[#C8A45D] transition-colors">
                <span className="font-bold text-[#141518] text-sm md:text-base">{isAr ? stream.a : stream.e}</span>
              </Card>
            ))}
          </div>

          <Card className="bg-[#141518] text-white p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between border-transparent shadow-xl">
            <div className="md:w-1/3">
              <h3 className="text-xl font-bold mb-2">{isAr ? 'مزيج الخدمات (تقديري)' : 'Est. Service Mix'}</h3>
              <p className="text-xs text-gray-400">{isAr ? '* أرقام افتراضية لأغراض العرض' : '* Hypothetical numbers for presentation'}</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center">
              <div><div className="text-2xl font-black text-[#C8A45D] mb-1">45%</div><div className="text-xs font-bold uppercase tracking-widest">{isAr ? 'قص شعر' : 'Haircuts'}</div></div>
              <div><div className="text-2xl font-black text-[#C8A45D] mb-1">25%</div><div className="text-xs font-bold uppercase tracking-widest">{isAr ? 'تشذيب لحية' : 'Beard Trim'}</div></div>
              <div><div className="text-2xl font-black text-[#C8A45D] mb-1">20%</div><div className="text-xs font-bold uppercase tracking-widest">{isAr ? 'باقات' : 'Combos'}</div></div>
              <div><div className="text-2xl font-black text-[#C8A45D] mb-1">10%</div><div className="text-xs font-bold uppercase tracking-widest">{isAr ? 'إضافات' : 'Add-ons'}</div></div>
            </div>
          </Card>
        </section>

        {/* SECTION 8: Target Segments */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'الشرائح المستهدفة' : 'Target Segments'}</h2>
            <div className="w-24 h-1 bg-[#141518] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: '1', nAr: 'رجال الأعمال', nEn: 'Executives', motAr: 'كفاءة الوقت والفخامة', motEn: 'Time efficiency & luxury', offAr: 'اشتراكات VIP', offEn: 'VIP Memberships', chAr: 'أبراج الأعمال، LinkedIn', chEn: 'Business towers, LinkedIn' },
              { id: '2', nAr: 'الشباب الجامعي', nEn: 'Young Adults', motAr: 'الترند والستايل الحديث', motEn: 'Trends & modern fade styles', offAr: 'باقات مخفضة أوقات الصباح', offEn: 'Morning off-peak discounts', chAr: 'TikTok, Instagram', chEn: 'TikTok, Instagram' },
              { id: '3', nAr: 'العملاء المتكررون', nEn: 'Loyalists', motAr: 'الثبات على الجودة ونفس الحلاق', motEn: 'Consistency & same barber', offAr: 'برنامج النقاط والمحفظة', offEn: 'Points & Digital Wallet', chAr: 'رسائل WhatsApp، التطبيق', chEn: 'WhatsApp, App App' },
              { id: '4', nAr: 'الشركات (B2B)', nEn: 'Corporate (B2B)', motAr: 'مزايا للموظفين', motEn: 'Employee perks', offAr: 'عقود سنوية وتخفيضات', offEn: 'Annual contracts', chAr: 'إدارات الموارد البشرية', chEn: 'HR Departments' },
              { id: '5', nAr: 'زوار المناسبات', nEn: 'Event Goers', motAr: 'الجاهزية السريعة واللوك المثالي', motEn: 'Quick readiness & perfect look', offAr: 'باقات الكومبو والمساج السريع', offEn: 'Combo & quick groom', chAr: 'قصات Pop-ups بالفعاليات', chEn: 'Event pop-ups' },
            ].map(seg => (
              <Card key={seg.id} className="bg-white border-[#E2E0DB] p-6 shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#F3F3F1] flex items-center justify-center font-black text-lg text-[#B1262A] mb-4 border border-[#E2E0DB] shrink-0">{seg.id}</div>
                <h3 className="font-bold text-sm mb-4 text-[#141518]">{isAr ? seg.nAr : seg.nEn}</h3>
                
                <div className="flex flex-col gap-3 w-full">
                  <div className="bg-[#FAFAFA] border border-[#E2E0DB] p-2">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase mb-1">{isAr ? 'الدافع' : 'Motivation'}</span>
                    <span className="text-xs font-bold text-[#141518]">{isAr ? seg.motAr : seg.motEn}</span>
                  </div>
                  <div className="bg-[#FAFAFA] border border-[#E2E0DB] p-2">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase mb-1">{isAr ? 'العرض' : 'Offer'}</span>
                    <span className="text-xs font-bold text-[#141518]">{isAr ? seg.offAr : seg.offEn}</span>
                  </div>
                  <div className="bg-[#F3F3F1] p-2">
                    <span className="text-[9px] font-bold text-[#1F7A3F] block uppercase mb-1">{isAr ? 'القناة' : 'Channel'}</span>
                    <span className="text-xs font-bold text-[#1F7A3F]">{isAr ? seg.chAr : seg.chEn}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 9: Tech & Ideas */}
        <section className="bg-white border border-[#E2E0DB] p-8 md:p-12 shadow-sm">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'التقنيات والأفكار الداعمة' : 'Supportive Tech & Ideas'}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { i: <Smartphone />, a: 'حجز مرن وذكي', e: 'Smart Flexible Booking' },
              { i: <Users />, a: 'CRM وتقسيم العملاء', e: 'CRM & Segmentation' },
              { i: <Wallet />, a: 'محفظة ونقاط ولاء', e: 'Wallet & Loyalty Points' },
              { i: <Building2 />, a: 'تدريب داخلي (Academy)', e: 'Internal Academy' },
              { i: <Target />, a: 'عروض ديناميكية', e: 'Dynamic Offers' },
              { i: <CheckCircle2 />, a: 'تصنيف جودة Maestro Score', e: 'Maestro Score QA' },
              { i: <TrendingUp />, a: 'لوحات إدارة الأداء', e: 'KPI Dashboards' },
              { i: <Briefcase />, a: 'سجل قصات العميل المصور', e: 'Visual Cut History' }
            ].map((idea, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3 group px-2">
                <div className="w-14 h-14 bg-[#F3F3F1] border border-[#E2E0DB] flex items-center justify-center text-[#141518] group-hover:bg-[#141518] group-hover:text-white transition-colors duration-300">
                  {idea.i}
                </div>
                <h4 className="font-bold text-sm text-[#141518] leading-snug max-w-[140px]">{isAr ? idea.a : idea.e}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: B2B Partnerships */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'فرص الشراكات (B2B)' : 'B2B Partnerships'}</h2>
            <div className="w-24 h-1 bg-[#B1262A] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: isAr ? 'فنادق 5 نجوم' : '5-Star Hotels', off: isAr ? 'خدمة غرف فاخرة للضيوف' : 'Luxury room service grooming', rev: isAr ? 'نسبة مشاركة أرباح' : 'Revenue sharing', kpi: isAr ? 'اتفاقيتين سنويتين' : '2 agreements/year' },
              { t: isAr ? 'أندية رياضية' : 'Premium Gyms', off: isAr ? 'أسعار خاصة للمشتركين' : 'Special rates for members', rev: isAr ? 'تدفق عملاء جديد' : 'New client acquisition', kpi: isAr ? 'بطاقات هدايا' : 'Gift card conversions' },
              { t: isAr ? 'شركات وعلامات' : 'Corporate HQs', off: isAr ? 'استقطاع راتب للموظفين' : 'Payroll deduction perks', rev: isAr ? 'اشتراك سنوي للشركة' : 'Annual corporate sub', kpi: isAr ? '30 موظف مسجل/عقد' : '30 staff/contract' },
              { t: isAr ? 'مجمعات سكنية' : 'Compounds', off: isAr ? 'خدمة حلاقة Pop-up داخلية' : 'Internal pop-up grooming', rev: isAr ? 'رسوم ثابتة + خدمة' : 'Flat rate + per service', kpi: isAr ? 'زيارة شهرياً للمجمع' : '1 visit/month/compound' },
              { t: isAr ? 'جامعات خاصة' : 'Private Universities', off: isAr ? 'خصم مخصص للطلاب' : 'Targeted student discount', rev: isAr ? 'بناء ولاء مبكر للعلامة' : 'Early brand loyalty', kpi: isAr ? '15% من زوار الأوف-بيك' : '15% of off-peak visits' },
              { t: isAr ? 'فعاليات ومؤتمرات' : 'Events & Conferences', off: isAr ? 'ركن حلاقة وتجهيز للحدث' : 'Event grooming station', rev: isAr ? 'تسويق + رسوم تواجد' : 'Marketing exposure + fees', kpi: isAr ? '3 فعاليات كبرى/سنة' : '3 major events/year' },
            ].map((b2b, idx) => (
              <Card key={idx} className="bg-white border-[#E2E0DB] p-6 shadow-sm group hover:border-[#B1262A] transition-colors relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-[#F3F3F1] rounded-none rotate-45 group-hover:bg-[#B1262A] transition-colors"></div>
                <h3 className="font-black text-lg mb-4 text-[#141518] relative z-10">{b2b.t}</h3>
                <div className="space-y-3 relative z-10">
                  <div className="flex border-b border-[#E2E0DB] pb-2">
                    <span className="w-24 text-[10px] font-bold text-gray-500 uppercase">{isAr ? 'ماذا نقدم؟' : 'Offer'}</span>
                    <span className="text-xs font-bold text-[#141518] flex-1">{b2b.off}</span>
                  </div>
                  <div className="flex border-b border-[#E2E0DB] pb-2">
                    <span className="w-24 text-[10px] font-bold text-gray-500 uppercase">{isAr ? 'كيف نربح؟' : 'Revenue'}</span>
                    <span className="text-xs font-bold text-[#141518] flex-1">{b2b.rev}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[10px] font-bold text-[#1F7A3F] uppercase">KPI</span>
                    <span className="text-xs font-bold text-[#1F7A3F] flex-1">{b2b.kpi}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 11: 5-Year Roadmap */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#141518] mb-4 uppercase tracking-widest">{isAr ? 'خارطة طريق 5 سنوات' : '5-Year Roadmap'}</h2>
            <div className="w-24 h-1 bg-[#1F7A3F] mx-auto"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-4">
              {[
                { y: 'Year 1', br: isAr ? 'فرع 1' : '1 Branch', ops: isAr ? 'إثبات النموذج والـ Playbook' : 'Prove model & Playbook', mkt: isAr ? 'بناء الولاء والمراجعات' : 'Build loyalty & reviews', dig: isAr ? 'إطلاق النظام ومحفظة العميل' : 'Launch system & wallet', rev: '2.5M - 3.5M SAR' },
                { y: 'Year 2', br: isAr ? '2–3 فروع' : '2-3 Branches', ops: isAr ? 'توحيد التدريب للكوادر' : 'Standardize staff training', mkt: isAr ? 'تحسين معدل الإيراد/زيارة' : 'Optimize rev/visit', dig: isAr ? 'CRM متقدم وعروض' : 'Advanced CRM & offers', rev: '6M - 10M SAR' },
                { y: 'Year 3', br: isAr ? '4–6 فروع' : '4-6 Branches', ops: isAr ? 'توسيع الإدارة التشغيلية' : 'Expand ops management', mkt: isAr ? 'توسع B2B وعضويات قوية' : 'B2B & strong memberships', dig: isAr ? 'لوحات أداء مجمعة' : 'Consolidated dashboards', rev: '12M - 20M SAR' },
                { y: 'Year 4', br: isAr ? '7–10 فروع' : '7-10 Branches', ops: isAr ? 'أكاديمية مايسترو التدريبية' : 'Maestro Training Academy', mkt: isAr ? 'شراكات استراتيجية' : 'Strategic partnerships', dig: isAr ? 'تنبؤات سلوك العميل AI' : 'AI behavior predictions', rev: '25M - 35M SAR' },
                { y: 'Year 5', br: isAr ? '12–18 فرع' : '12-18 Branches', ops: isAr ? 'نموذج فرانشايز واشتراطاته' : 'Franchise model ready', mkt: isAr ? 'علامة وطنية رائدة' : 'Leading national brand', dig: isAr ? 'تطبيق شامل وحجوزات ذاتية' : 'Full app ecosystem', rev: '40M - 60M SAR' },
              ].map((yr, i) => (
                <div key={i} className="bg-white border border-[#E2E0DB] p-4 flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow">
                  <div className="sm:w-32 bg-[#141518] text-white p-4 flex flex-col items-center justify-center shrink-0">
                    <span className="font-black text-xl text-[#C8A45D]">{yr.y}</span>
                    <span className="text-xs font-bold mt-1">{yr.br}</span>
                  </div>
                  <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Ops</span><strong className="text-[#141518]">{yr.ops}</strong></div>
                    <div><span className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Growth</span><strong className="text-[#141518]">{yr.mkt}</strong></div>
                    <div><span className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Digital</span><strong className="text-[#141518]">{yr.dig}</strong></div>
                    <div><span className="block text-[10px] text-[#B1262A] uppercase font-bold mb-1">Est. Revenue</span><strong className="text-[#B1262A] tracking-wider">{yr.rev}</strong></div>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-400 font-bold">* {isAr ? 'الإيرادات نطاقات تقديرية افتراضية لعرض القدرة على التوسع' : 'Revenues are hypothetical ranges showing scalability potential'}</div>
            </div>

            <div className="lg:w-1/3">
              <Card className="bg-[#141518] text-white p-8 border-transparent shadow-xl sticky top-24">
                <Badge className="bg-[#1F7A3F] text-white mb-6 w-fit">{isAr ? 'الرؤية المستقبلية' : 'Future Vision'}</Badge>
                <h3 className="text-2xl font-black mb-4 text-[#F3F3F1]">Italy Dream Bridge 🇮🇹</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 border-b border-white/10 pb-6">
                  {isAr 
                    ? 'التحضير لافتتاح أول فرع تجريبي في إيطاليا لمروان يتطلب إثبات نجاح النموذج محلياً.' 
                    : 'Preparing the first pilot branch in Italy for Marwan requires proving local success first.'}
                </p>
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#C8A45D] mb-4">{isAr ? 'شروط الانتقال' : 'Transition Criteria'}</h4>
                <ul className="space-y-4">
                  {[
                    isAr ? 'تثبيت معيار الجودة (Maestro Score > 90%)' : 'Stable QA (Maestro Score > 90%)',
                    isAr ? 'أكاديمية قادرة على تخريج بدلاء بنفس الكفاءة' : 'Academy producing equal-skill barbers',
                    isAr ? 'دليل تشغيل موثق يعمل بدون المؤسس' : 'Documented SOP running independently',
                    isAr ? 'ربحية مستقرة لمدة 18 شهراً متتالية' : '18-month stable local profitability',
                    isAr ? 'نجاح تجربة Pop-up صيفية مسبقة في إيطاليا' : 'Successful summer pop-up in Italy'
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#1F7A3F] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300 font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 12: CTA Panel */}
        <section className="pb-16">
          <Card className="bg-gradient-to-br from-[#141518] to-[#1a1c21] text-white p-10 md:p-14 border border-[#C8A45D]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A45D]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#C8A45D]">{isAr ? '3 خطوات بسيطة للبدء هذا الأسبوع' : '3 Simple Steps to Start This Week'}</h2>
              <p className="text-lg text-gray-400">{isAr ? 'تحويل الفكرة إلى مشروع قابل للتنفيذ فوراً' : 'Turning the concept into an immediately actionable project'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
              <div className="bg-white/5 border border-white/10 p-6 shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#141518] flex items-center justify-center font-black text-[#C8A45D] border border-white/20">1</div>
                  <h3 className="font-bold text-lg">{isAr ? 'المستثمر' : 'Investor'}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {isAr 
                    ? 'اعتماد ميزانية تأسيسية مبدئية، والموافقة على نموذج الحوكمة البسيط ومؤشرات قياس أول 90 يوم.' 
                    : 'Approve initial setup CAPEX, simple governance model, and 90-day KPIs.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#B1262A] flex items-center justify-center font-black text-white border border-[#B1262A]">2</div>
                  <h3 className="font-bold text-lg">{isAr ? 'مروان ناجي' : 'Marwan'}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {isAr 
                    ? 'تحديد قائمة مهارات الفريق، معايير التوظيف، خطة تدريب مكثفة لأول أسبوعين للفرع الأول، وتثبيت قائمة الخدمات.' 
                    : 'Define team skills list, hiring specs, intensive 2-week training for first branch, and finalize services list.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-[#C8A45D] flex items-center justify-center font-black text-[#141518]">3</div>
                  <h3 className="font-bold text-lg">{isAr ? 'المعماري: محمد الموسى' : 'Mohammed Al-Moussa'}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed relative z-10">
                  {isAr 
                    ? 'تسليم حزمة (Brand + Playbook + Digital Demo + KPI Dashboard) متكاملة وجاهزة للعمل خلال 10–21 يوماً.' 
                    : 'Deliver the full (Brand + Playbook + Digital Demo + Dashboard) package ready for execution in 10-21 days.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button size="lg" className="bg-[#C8A45D] hover:bg-[#b08f4c] text-[#141518] font-bold py-6 px-8 text-sm md:text-base">
                {isAr ? 'جدولة اجتماع 60 دقيقة' : 'Schedule 60-min Meeting'}
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 font-bold py-6 px-8 text-sm md:text-base">
                {isAr ? 'عرض نموذج اتفاق مبدئي (LOI)' : 'View Initial LOI Draft'}
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 font-bold py-6 px-8 text-sm md:text-base hidden md:flex">
                {isAr ? 'فتح قائمة مهام التأسيس' : 'Open Setup Checklist'}
              </Button>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}

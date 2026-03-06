import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminStore } from '@/stores/useAdminStore';
import { BRANCHES, BARBERS } from '@/data/demoDb';
import { formatSar, formatSarEn } from '@/lib/money';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, CalendarDays, Percent, ShieldCheck, Download, PackageOpen, UserCog, Wallet, Lightbulb } from 'lucide-react';
import { downloadAdminReportPDF } from '@/lib/adminReportPdf';

// Fixed data outside component to avoid Math.random() during render
const BRANCH_UTIL = [62, 71, 85, 78, 90, 67];
const BARBER_REVENUES = [22400, 18900, 15200, 28700, 19500, 24100, 31000, 17800, 12600, 29400];

export function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const { branchId, setBranch } = useAdminStore();
  const [_activeTab, setActiveTab] = useState('overview');

  const isAr = i18n.language === 'ar';
  const fmt = (v: number) => isAr ? formatSar(v) : formatSarEn(v);

  const mData = [
    { d: '01/03', v: 4500 }, { d: '02/03', v: 5200 }, { d: '03/03', v: 3800 },
    { d: '04/03', v: 6100 }, { d: '05/03', v: 5900 }, { d: '06/03', v: 7200 }, { d: '07/03', v: 8100 }
  ];

  const bData = useMemo(() =>
    BRANCHES.map((b, i) => ({ name: isAr ? b.nameAr : b.nameEn, util: BRANCH_UTIL[i] })),
  [isAr]);

  const generatePDF = () => {
    const reportData = {
      totalRevenue: 285000,
      totalBookings: 1850,
      avgOccupancy: 82,
      totalExpenses: 85000,
      profitMargin: 35,
      branches: BRANCHES.map((b, i) => ({
        name: isAr ? b.nameAr : b.nameEn,
        revenue: [42000, 38500, 51000, 28000, 47500, 33000][i],
        expenses: [12000, 11000, 14000, 9000, 13500, 10000][i],
        occupancy: BRANCH_UTIL[i],
      }))
    };
    downloadAdminReportPDF(reportData, isAr ? 'ar' : 'en');
  };

  const InsightCard = ({ title, items, icon: Icon }: { title: string; items: string[]; icon: React.ElementType }) => (
    <Card className="bg-[#1F7A3F]/5 border border-[#1F7A3F]/20 p-5 mt-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-[#1F7A3F] opacity-5 rounded-full blur-3xl" />
      <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full">
        <div className="bg-[#1F7A3F] flex items-center justify-center rounded-lg w-12 h-12 shrink-0 shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="w-full text-left rtl:text-right">
          <h4 className="font-bold text-[#1F7A3F] text-sm uppercase tracking-wide mb-3">{title}</h4>
          <ul className="space-y-2">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="text-sm font-medium text-[#141518] flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A3F] mt-1.5 mr-2 rtl:mr-0 rtl:ml-2 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );

  const OverviewTab = (
    <div className="space-y-6 mt-6 animate-fade-in">
       <div className="flex flex-col items-center mb-8 border-b border-[#E8E0D2] pb-5">
          <h2 className="text-2xl font-bold text-[#141518] mb-4">{t('admin.overview')}</h2>
          <select value={branchId} onChange={e => setBranch(e.target.value)} title="Branch selector" className="bg-white border-2 border-[#141518] px-4 py-2 text-sm font-bold focus:outline-none focus:border-[#1F7A3F] shadow-sm">
             <option value="all">{t('common.all_branches')}</option>
             {BRANCHES.map(b => <option key={b.id} value={b.id}>{isAr?b.nameAr:b.nameEn}</option>)}
          </select>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
           {l: isAr ? 'إجمالي الإيرادات' : 'Total Revenue', v: fmt(285000), i: <TrendingUp/>, c: '#1F7A3F', border: '#1F7A3F', sub: isAr?'+٨٪ عن الشهر الماضي':'+8% vs last month'},
           {l: isAr ? 'حجوزات الشهر' : 'Monthly Bookings', v: '1,850', i: <CalendarDays/>, c: '#141518', border: '#141518', sub: isAr?'معدل كل ٤٨ دقيقة':'Every 48 min avg'},
           {l: isAr ? 'متوسط الإشغال' : 'Avg Occupancy', v: '82%', i: <Percent/>, c: '#7A161A', border: '#7A161A', sub: isAr?'أعلى: ٩٠٪ — طريق الملك':'Peak: 90% King Rd'},
           {l: isAr ? 'إجمالي الأعضاء' : 'Total Members', v: '3,450', i: <Users/>, c: '#141518', border: '#E8E0D2', sub: isAr?'+١٢٪ اشتراكات جديدة':'+12% new subs'},
           {l: isAr ? 'صافي الأرباح' : 'Net Profit', v: fmt(200000), i: <TrendingUp/>, c: '#1F7A3F', border: '#1F7A3F', sub: isAr?'هامش ٣٥٪':'35% margin'},
           {l: isAr ? 'LTV متوسط' : 'Avg LTV', v: fmt(1850), i: <Users/>, c: '#7A161A', border: '#7A161A', sub: isAr?'تكلفة اكتساب CAC=42':'CAC = 42 SAR'},
        ].map((k, i) => (
           <Card key={i} className="p-5 bg-white shadow-sm flex flex-col justify-between border-t-4" style={{borderTopColor: k.border}}>
              <div>
                <p className="text-xs text-[#4A4E58] font-black mb-1 uppercase tracking-wider">{k.l}</p>
                <div className="text-2xl font-black" style={{color: k.c}}>{k.v}</div>
              </div>
              <p className="text-[10px] text-[#4A4E58] font-bold mt-2 border-t border-[#F3F3F1] pt-2">{k.sub}</p>
           </Card>
        ))}
       </div>

       <InsightCard
         title={isAr ? 'خيارات التحسين المقترحة للمبيعات' : 'Suggested Revenue Improvements'}
         icon={Lightbulb}
         items={isAr ? [
           'توسيع نطاق حملة بطاقات الهدايا (Gift Cards) لرفع مبيعات الباقات بنسبة 12٪.',
           'تنشيط العملاء الخاملين في فرع العليا بخصم خاص أيام منتصف الأسبوع.',
           'إضافة خدمة الاستشوار والفرد لقائمة الباقات في الفروع الجديدة نظراً لزيادة الطلب.'
         ] : [
           'Expand Gift Cards campaign to boost package sales by 12%.',
           'Activate dormant clients in Olaya branch with mid-week special discounts.',
           'Bundle Blow-dry & Straightening into new branch packages to meet rising demand.'
         ]}
       />

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-white shadow-sm">
             <h3 className="font-bold mb-6 text-lg">{isAr ? 'اتجاه الإيرادات — 7 أيام' : '7-Day Revenue Trend'}</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={mData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E0D2"/>
                      <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{fill: '#A7ABB3', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#A7ABB3', fontSize: 12}} tickFormatter={(v)=>`${v/1000}k`} />
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Area type="monotone" dataKey="v" stroke="#C8A45D" strokeWidth={3} fill="#C8A45D" fillOpacity={0.1} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </Card>
           <Card className="p-6 bg-white shadow-sm border border-[#E8E0D2]">
              <h3 className="font-bold mb-4 text-base text-[#141518]">{isAr ? 'نسبة إشغال الفروع الستة' : '6 Branches Utilization (%)'}</h3>
              <div className="space-y-3">
                {bData.map((d, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#141518] truncate max-w-[120px]">{d.name}</span>
                      <span className="text-xs font-black text-[#141518]" style={{color: d.util >= 85 ? '#1F7A3F' : d.util >= 70 ? '#B8860B' : '#7A161A'}}>{d.util}%</span>
                    </div>
                    <div className="h-2 bg-[#F3F3F1] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{width: `${d.util}%`, background: d.util >= 85 ? '#1F7A3F' : d.util >= 70 ? '#B8860B' : '#7A161A'}} />
                    </div>
                  </div>
                ))}
              </div>
           </Card>
       </div>
    </div>
  );

  const InventoryTab = (
    <div className="space-y-6 mt-6 animate-fade-in text-sm">
       <Card className="overflow-hidden bg-white shadow-sm border border-[#E8E0D2]">
          <div className="p-5 border-b border-[#E8E0D2] flex justify-between items-center bg-[#F7F4EF]/50">
             <h3 className="font-bold text-[#141518] flex items-center gap-2">
               <PackageOpen className="w-5 h-5 text-[#C8A45D]" /> {isAr ? 'مراقبة المخزون الموحد' : 'Unified Inventory Monitor'}
             </h3>
          </div>
          <table className="w-full text-left rtl:text-right">
             <thead className="bg-[#141518] text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">{isAr ? 'الصنف' : 'Item'}</th>
                  <th className="px-6 py-4">{isAr ? 'الفرع' : 'Branch'}</th>
                  <th className="px-6 py-4">{isAr ? 'الكمية' : 'Stock'}</th>
                  <th className="px-6 py-4 text-right rtl:text-left">{isAr ? 'الحالة' : 'Status'}</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[#E8E0D2]">
                {[
                  { itemAr: 'شامبو ديفينز الإيطالي', itemEn: 'Davines Shampoo', branchAr: 'الرياض — العليا', branchEn: 'Riyadh Olaya', qty: 15, status: 'low' as const },
                  { itemAr: 'شمع الأنف والأذن', itemEn: 'Nose Waxing Kit', branchAr: 'جدة — الروضة', branchEn: 'Jeddah Al Rawdah', qty: 85, status: 'ok' as const },
                  { itemAr: 'مناشف قطنية فاخرة', itemEn: 'Premium Towels', branchAr: 'الرياض — حطين', branchEn: 'Riyadh Hittin', qty: 200, status: 'ok' as const },
                  { itemAr: 'أمواس حلاقة يابانية', itemEn: 'Feather Blades', branchAr: 'الدمام — الكورنيش', branchEn: 'Dammam Corniche', qty: 5, status: 'critical' as const },
                  { itemAr: 'صبغات Kemon الإيطالية', itemEn: 'Kemon Hair Dyes', branchAr: 'الخبر — الواجهة', branchEn: 'Khobar Waterfront', qty: 42, status: 'low' as const },
                  { itemAr: 'كريم الحلاقة الفاخر', itemEn: 'Luxury Shaving Cream', branchAr: 'الرياض — طريق الملك', branchEn: 'Riyadh King Road', qty: 96, status: 'ok' as const },
                ].map((inv, idx) => (
                   <tr key={idx} className="hover:bg-[#F7F4EF]/50">
                      <td className="px-6 py-4 font-bold">{isAr ? inv.itemAr : inv.itemEn}</td>
                      <td className="px-6 py-4 text-[#A7ABB3]">{isAr ? inv.branchAr : inv.branchEn}</td>
                      <td className="px-6 py-4 font-mono">{inv.qty} {isAr ? 'وحدة' : 'Units'}</td>
                      <td className="px-6 py-4 text-right rtl:text-left">
                         <Badge variant={inv.status === 'ok' ? 'success' : inv.status === 'low' ? 'warning' : 'danger'} className="uppercase">
                            {inv.status === 'ok' ? (isAr ? 'آمن' : 'Safe') : inv.status === 'low' ? (isAr ? 'منخفض' : 'Low') : (isAr ? 'حرج' : 'Critical')}
                         </Badge>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </Card>
       <InsightCard
         title={isAr ? 'خيارات التحسين المقترحة للمخزون' : 'Suggested Inventory Improvements'}
         icon={PackageOpen}
         items={isAr ? [
           'سرعة توريد "أمواس حلاقة يابانية" لفرع كورنيش الدمام لتفادي الانقطاع التام.',
           'إعادة التفاوض مع موردي الشمع لتقليل التكلفة بنسبة 15٪ بناءً على مسحوبات الربع الأخير.',
           'نقل كميات إضافية من شامبو ديفينز من المستودع المركزي لفروع الرياض.'
         ] : [
           'Expedite supply of Feather Blades to Dammam Corniche to prevent a complete stock-out.',
           'Renegotiate wax supplier rates for 15% discount based on last-quarter volumes.',
           'Transfer surplus Davines shampoo from central warehouse to Riyadh branches.'
         ]}
       />
    </div>
  );

  const HRTab = (
    <div className="space-y-6 mt-6 animate-fade-in text-sm">
       <Card className="overflow-hidden bg-white shadow-sm border border-[#E8E0D2]">
           <div className="p-5 border-b border-[#E8E0D2] flex justify-between items-center bg-[#F7F4EF]/50">
             <h3 className="font-bold text-[#141518] flex items-center gap-2">
               <UserCog className="w-5 h-5 text-[#C8A45D]" /> {isAr ? 'إدارة الكفاءات والموارد البشرية' : 'HR & Talent Management'}
             </h3>
          </div>
          <table className="w-full text-left rtl:text-right">
             <thead className="bg-[#141518] text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">{isAr ? 'الموظف' : 'Employee'}</th>
                  <th className="px-6 py-4">{isAr ? 'الفرع' : 'Branch'}</th>
                  <th className="px-6 py-4">{isAr ? 'التقييم' : 'Rating'}</th>
                  <th className="px-6 py-4 text-right rtl:text-left">{isAr ? 'الإيراد المحقق' : 'Revenue Gen'}</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[#E8E0D2]">
                {BARBERS.slice(0, 8).map((b, i) => (
                   <tr key={b.id} className="hover:bg-[#F7F4EF]/50">
                      <td className="px-6 py-4 font-bold">
                        <div className="text-[#141518]">{isAr ? b.nameAr : b.nameEn}</div>
                        <div className="text-[10px] text-[#A7ABB3]">{isAr ? b.roleAr : b.roleEn}</div>
                      </td>
                      <td className="px-6 py-4 text-[#A7ABB3]">{isAr ? BRANCHES.find(br=>br.id===b.branchId)?.nameAr : BRANCHES.find(br=>br.id===b.branchId)?.nameEn}</td>
                      <td className="px-6 py-4"><Badge variant={b.rating>=4.8?'success':b.rating>=4.5?'default':'warning'}>{b.rating} / 5.0</Badge></td>
                      <td className="px-6 py-4 font-mono font-bold text-right rtl:text-left">{fmt(BARBER_REVENUES[i])}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </Card>
       <InsightCard
         title={isAr ? 'خيارات التحسين المقترحة للموارد البشرية' : 'Suggested HR Improvements'}
         icon={UserCog}
         items={isAr ? [
           'زيادة نسبة الحافز للحلاق (سعد ن.) بنسبة 2% للحفاظ على استقراره نظراً لتحقيق أعلى إيرادات وتقييم 5.0.',
           'جدولة دورة تدريبية لخدمة الفرد والاستشوار لموظفي فرع حطين لمواكبة الطلب المتزايد.',
           'نقل مهام الإدارة التشغيلية لفرع الواجهة البحرية للمدير الفني لرفع نسبة الاحتفاظ بالعملاء.'
         ] : [
           'Increase incentive for Master Barber Saad N. by 2% given his 5.0 rating and top revenue.',
           'Schedule Blow-dry & Straightening training for Hittin branch to meet rising demand.',
           'Shift ops management of Waterfront branch to the Artistic Director to improve client retention.'
         ]}
       />
    </div>
  );

  const expenseChartData = [
    { name: isAr?'العليا':'Olaya',    payroll: 30, rent: 25, supply: 10 },
    { name: isAr?'حطين':'Hittin',    payroll: 35, rent: 30, supply: 12 },
    { name: isAr?'الروضة':'Al Rawdah', payroll: 25, rent: 20, supply: 8  },
    { name: isAr?'الكورنيش':'Corniche', payroll: 20, rent: 18, supply: 7  },
    { name: isAr?'طريق الملك':'King Road', payroll: 33, rent: 28, supply: 11 },
    { name: isAr?'الواجهة':'Waterfront', payroll: 28, rent: 22, supply: 9  },
  ];

  const ExpensesTab = (
    <div className="mt-6 animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 content-start">
       <div className="lg:col-span-2 space-y-6">
         <Card className="p-6 bg-white shadow-sm">
             <h3 className="font-bold mb-6 text-lg flex items-center gap-2">
               <Wallet className="w-5 h-5 text-[#B1262A]" /> {isAr ? 'المصاريف التشغيلية (OPEX)' : 'Operational Expenses (OPEX)'}
             </h3>
             <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={expenseChartData} layout="vertical" margin={{left: 30}}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8E0D2"/>
                      <XAxis type="number" tickFormatter={(v)=>`${v}k`} tick={{fill: '#A7ABB3', fontSize: 10}}/>
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#1A1410', fontSize: 11, fontWeight: 500}} width={80} />
                      <Tooltip cursor={{fill: '#F7F4EF'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="payroll" stackId="a" fill="#141518" name={isAr ? 'الرواتب' : 'Payroll'} />
                      <Bar dataKey="rent"    stackId="a" fill="#B1262A" name={isAr ? 'الإيجار' : 'Rent'} />
                      <Bar dataKey="supply"  stackId="a" fill="#C8A45D" name={isAr ? 'المواد' : 'Supplies'} radius={[0, 4, 4, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </Card>
          <InsightCard
             title={isAr ? 'خيارات التحسين المقترحة للمصاريف' : 'Suggested OPEX Improvements'}
             icon={Wallet}
             items={isAr ? [
               'تقليل استهلاك الكهرباء في فرع الكورنيش والروضة بتفعيل نظام التكييف الذكي (-5,000 ريال شهرياً).',
               'إعادة هيكلة رواتب موظفي الاستقبال وربط 10٪ منها بأهداف المبيعات المتقاطعة (Cross-selling).',
               'التوجه للشراء المجمع لمواد الحلاقة لجميع الفروع لتقليص التكاليف بنسبة 8٪.'
             ] : [
               'Reduce electricity at Corniche & Al Rawdah via smart AC protocols (−5,000 SAR/mo).',
               'Restructure receptionist base salaries, linking 10% to cross-selling targets.',
               'Proceed with Bulk Ordering for all consumables to shrink supply costs by 8%.'
             ]}
           />
       </div>

       <Card className="lg:col-span-1 p-8 bg-[#1A1410] text-white shadow-xl relative overflow-hidden flex flex-col justify-center border-t-4 border-[#C8A45D]">
          <div className="absolute right-0 bottom-0 opacity-10"><ShieldCheck className="w-64 h-64 text-[#C8A45D]" /></div>
          <div className="relative z-10 flex flex-col gap-8 text-center sm:text-left sm:rtl:text-right">
             <div className="border-b border-white/10 pb-6">
               <p className="text-[#A7ABB3] text-sm font-bold uppercase tracking-wider mb-2">{isAr?'إجمالي التكاليف الشهرية':'Total Monthly Costs'}</p>
               <h4 className="text-4xl font-black text-[#B1262A]">{fmt(185000)}</h4>
             </div>
             <div className="border-b border-white/10 pb-6">
               <p className="text-[#A7ABB3] text-sm font-bold uppercase tracking-wider mb-2">{isAr?'هامش الربح الإجمالي':'Gross Profit Margin'}</p>
               <h4 className="text-4xl font-black text-[#2E6B4C]">35.4%</h4>
             </div>
             <div>
               <p className="text-[#A7ABB3] text-sm font-bold uppercase tracking-wider mb-2">{isAr?'تكلفة الاستحواذ على العميل':'CAC (Avg)'}</p>
               <h4 className="text-3xl font-black text-white">{fmt(42)}</h4>
             </div>
          </div>
       </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-12">
      <div className="container px-4 mx-auto max-w-7xl">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-[#E8E0D2] pb-6">
            <div>
              <Badge variant="outline" className="mb-3 border-[#C8A45D] bg-[#C8A45D]/10 text-[#141518] uppercase tracking-widest px-3">{t('admin.demo_notice')}</Badge>
              <h1 className="text-3xl md:text-4xl font-black text-[#141518] tracking-tight">{t('admin.title')}</h1>
            </div>
            <Button
              onClick={generatePDF}
              variant="primary"
              className="bg-[#141518] hover:bg-[#B1262A] text-white font-bold tracking-wide shadow-lg border-none shrink-0"
            >
              <Download className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {isAr ? 'تحميل التقرير الشامل (PDF)' : 'Download Full Report (PDF)'}
            </Button>
         </div>

         <Tabs
           tabs={[
             { id: 'overview',  label: t('admin.overview'),                    content: OverviewTab  },
             { id: 'inventory', label: isAr?'إدارة المخزون':'Inventory',       content: InventoryTab },
             { id: 'hr',        label: isAr?'الموارد البشرية':'HR Management', content: HRTab        },
             { id: 'expenses',  label: isAr?'المصاريف التشغيلية':'OPEX',       content: ExpensesTab  },
           ]}
           defaultTab="overview"
           onChange={setActiveTab}
         />
      </div>
    </div>
  );
}

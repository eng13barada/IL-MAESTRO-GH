import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCommerceStore } from "@/stores/useCommerceStore";
import { ImageFactory } from "@/lib/imageFactory";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatSar } from "@/lib/money";
import { Crown, CalendarClock, Download, Sparkles, ReceiptText, Phone, Mail, User, Scissors, Tag, Music, Coffee, Droplets, Wind, Star, ChevronRight, Zap, Heart, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { downloadStyleCardPDF } from "@/lib/styleCardPdf";

const KF = "'Noto Kufi Arabic', 'Cairo', sans-serif";

const CLIENT = {
  nameAr: "م. محمد الموسى",
  nameEn: "Eng. Mohammed Al Mousa",
  phone: "0567705504",
  email: "architect.malmousa@gmail.com",
  age: 36,
  tier: "Black",
  points: 2340,
  styleAr: "خليجي وشرق أوسطي",
  styleEn: "Gulf & Middle Eastern",
  requestAr: "ترتيب الشعر مدرج من الجوانب  دقن مدرجة بشكل حرف V  طويلة من الأسفل  بدون تحديد  الموس فقط لتحديد الشنب وداخل الصفر",
  requestEn: "Side fade taper  V-shaped beard gradient  long at the bottom  no outline  razor only for mustache definition and inner zero area",
};

const STYLE_SPECS = [
  { iconBg: "#B1262A", labelAr: "قصة الشعر", labelEn: "Haircut", valueAr: "تدرج جانبي ناعم (Skin Fade)", valueEn: "Skin Fade Side Taper", detailAr: "الشعر يبدأ قصيرا جدا من الجانبين ويتدرج للأعلى بسلاسة مما يمنح وجهك حدة وأناقة.", detailEn: "Hair starts very short on the sides, fading smoothly upward for sharp, elegant definition." },
  { iconBg: "#1F7A3F", labelAr: "اللحية", labelEn: "Beard", valueAr: "دقن مدرجة V  موس حاد", valueEn: "V-Fade Precision  Straight Razor", detailAr: "حرف V الأنيق يطيل ملامح الوجه ويمنح شخصيتك حضورا قويا.", detailEn: "The elegant V-shape elongates facial features and gives your presence authority." },
  { iconBg: "#141518", labelAr: "الشارب", labelEn: "Mustache", valueAr: "موس فقط  بدون تحديد", valueEn: "Razor only  no defined edge", detailAr: "الشارب يعالج بالموس فقط من الداخل مع الحفاظ على طابعه الطبيعي.", detailEn: "Treated with razor only along the inner zero area, preserving its natural character." },
  { iconBg: "#B1262A", labelAr: "التشطيب", labelEn: "Finishing", valueAr: "بدون تحديد خارجي", valueEn: "No outer outline", detailAr: "الخطوط الناعمة تعكس ذوقا رفيعا لمن يفهم الفرق.", detailEn: "Soft edges reflect refined taste  for those who know the difference." },
];

const MOST_CHOSEN = {
  titleAr: "قصة مايسترو + ذقن V", titleEn: "Maestro Cut + V-Beard",
  countAr: " من آخر  زيارات", countEn: "3 of last 4 visits",
  services: [{ ar: "قصة الشعر الخليجية", en: "Gulf Haircut", price: 65 }, { ar: "تشكيل اللحية V", en: "V-Beard Shape", price: 40 }],
  totalPrice: 105,
  upsells: [
    { ar: "حمام رأس بالفوطة الساخنة", en: "Hot Towel Head Bath", price: 35, reasonAr: "يتمم تجربة الاسترخاء بعد القصة", reasonEn: "Completes the relaxation after your cut" },
    { ar: "كريم الترطيب اللحية", en: "Beard Moisturizing Cream", price: 20, reasonAr: "ضروري للحفاظ على تدرج الـ V", reasonEn: "Essential to maintain the V-fade shape" },
  ],
  exclusiveOffer: { discountAr: "خصم  عند اختيار الباقة كاملة", discountEn: "18% off when full package selected", code: "MOSTCHOSEN18" },
};

const DEFAULT_PREFS = {
  scent: { ar: "عود الملكي", en: "Royal Oud" },
  cream: { ar: "كريم الأرغان", en: "Argan Beard Cream" },
  music: { ar: "جاز هادئ", en: "Soft Jazz" },
  drink: { ar: "قهوة عربية بلا هيل", en: "Arabic Coffee  No Cardamom" },
};

export function CustomerDashboard() {
  const { t, i18n } = useTranslation();
  const { orders } = useCommerceStore();
  const isAr = i18n.language === "ar";
  const [activeTab, setActiveTab] = useState<"bookings" | "gallery" | "wallet" | "style">("bookings");
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [editingPref, setEditingPref] = useState<string | null>(null);
  const [prefInput, setPrefInput] = useState("");

  const gallery = [
    { id: "v1", date: "//", dateEn: "2026-02-15", tags: [{ ar: "تدرج ناعم", en: "Skin Fade" }, { ar: "لحية V", en: "V-Beard" }], branch: { ar: "الرياض - العليا", en: "Riyadh Olaya" }, barber: "عمر سالم", imgB: ImageFactory.generateBeforeAfter(1, true), imgA: ImageFactory.generateBeforeAfter(1, false) },
    { id: "v2", date: "//", dateEn: "2026-01-20", tags: [{ ar: "أسلوب خليجي", en: "Gulf Style" }, { ar: "طقوس فاخرة", en: "Ritual" }], branch: { ar: "الرياض - حطين", en: "Riyadh Hittin" }, barber: "طارق محمد", imgB: ImageFactory.generateBeforeAfter(2, true), imgA: ImageFactory.generateBeforeAfter(2, false) },
    { id: "v3", date: "//", dateEn: "2025-12-10", tags: [{ ar: "تدرج كلاسيك", en: "Taper" }, { ar: "لحية V", en: "Beard V" }], branch: { ar: "الرياض - العليا", en: "Riyadh Olaya" }, barber: "عمر سالم", imgB: ImageFactory.generateBeforeAfter(3, true), imgA: ImageFactory.generateBeforeAfter(3, false) },
    { id: "v4", date: "//", dateEn: "2025-11-05", tags: [{ ar: "كلاسيك أنيق", en: "Classic" }, { ar: "فوطة ساخنة", en: "Hot Towel" }], branch: { ar: "جدة - الروضة", en: "Jeddah Al Rawdah" }, barber: "أحمد خالد", imgB: ImageFactory.generateBeforeAfter(4, true), imgA: ImageFactory.generateBeforeAfter(4, false) },
  ];

  const tabs = [
    { id: "bookings" as const, label: isAr ? "المواعيد" : "Appointments" },
    { id: "gallery" as const, label: isAr ? "معرضي" : "My Gallery" },
    { id: "wallet" as const, label: isAr ? "المحفظة" : "Wallet" },
    { id: "style" as const, label: isAr ? "بطاقة الأسلوب" : "Style Card" },
  ];

  const prefFields = [
    { key: "scent", icon: <Wind className="w-5 h-5" />, labelAr: "الرائحة المفضلة", labelEn: "Preferred Scent", border: "#1F7A3F" },
    { key: "cream", icon: <Droplets className="w-5 h-5" />, labelAr: "الكريم المفضل", labelEn: "Preferred Cream", border: "#B1262A" },
    { key: "music", icon: <Music className="w-5 h-5" />, labelAr: "الموسيقى المفضلة", labelEn: "Preferred Music", border: "#141518" },
    { key: "drink", icon: <Coffee className="w-5 h-5" />, labelAr: "المشروب المفضل", labelEn: "Preferred Drink", border: "#1F7A3F" },
  ];

  const handleSavePref = (key: string) => {
    setPrefs(p => ({ ...p, [key]: { ar: prefInput, en: prefInput } }));
    setEditingPref(null);
    setPrefInput("");
  };

  const pdfPayload = {
    name: isAr ? CLIENT.nameAr : CLIENT.nameEn,
    phone: CLIENT.phone, email: CLIENT.email, age: CLIENT.age,
    style: isAr ? CLIENT.styleAr : CLIENT.styleEn,
    request: isAr ? CLIENT.requestAr : CLIENT.requestEn,
    totalVisits: gallery.length, loyaltyPoints: CLIENT.points,
    memberTier: CLIENT.tier,
    topServices: ["قصة الشعر الخليجية", "تشكيل اللحية V", "حمام رأس بفوطة", "طقوس فاخرة"],
    lastVisitDate: gallery[0]?.dateEn || "",
    favBranch: isAr ? "الرياض - العليا" : "Riyadh Olaya",
    profileImage: "/images/client/profile-1.jpg",
    preferences: {
      scent: isAr ? prefs.scent.ar : prefs.scent.en,
      cream: isAr ? prefs.cream.ar : prefs.cream.en,
      music: isAr ? prefs.music.ar : prefs.music.en,
      drink: isAr ? prefs.drink.ar : prefs.drink.en,
    },
  };

  return (
    <div className="min-h-screen bg-[#F3F3F1] text-[#141518] py-10" style={{ fontFamily: KF }}>
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="mb-6 px-4 py-2 bg-[#B1262A]/10 border border-[#B1262A]/30 text-[#B1262A] flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <span className="w-2 h-2 bg-[#B1262A] animate-pulse" />
          {t("customer.demo_notice")}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* SIDEBAR */}
          <div className="space-y-4">
            <Card className="p-0 bg-white border border-[#E2E0DB] shadow-sm overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#B1262A]" />
              <div className="h-28 relative overflow-hidden bg-[#141518]">
                <img src="/images/client/profile-1.jpg" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 rtl:right-4 rtl:left-auto">
                  <Badge className="bg-[#B1262A] text-white border-none text-[10px] font-black tracking-widest">{CLIENT.tier} MEMBER</Badge>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex items-end gap-3 mb-4 -mt-8">
                  <div className="w-16 h-16 border-4 border-white shadow-xl overflow-hidden shrink-0">
                    <img src="/images/client/profile-1.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="pb-1">
                    <h2 className="text-base font-black text-[#141518] leading-tight">{isAr ? CLIENT.nameAr : CLIENT.nameEn}</h2>
                    <p className="text-[11px] text-[#4A4E58]">{CLIENT.email}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-5 text-sm">
                  <div className="flex items-center gap-3 text-[#4A4E58]"><Phone className="w-4 h-4 text-[#B1262A]" /><span dir="ltr">{CLIENT.phone}</span></div>
                  <div className="flex items-center gap-3 text-[#4A4E58]"><User className="w-4 h-4 text-[#B1262A]" /><span>{CLIENT.age} {isAr ? "سنة" : "years"}</span></div>
                </div>
                <div className="bg-[#141518] p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-white/50 uppercase tracking-wider font-black mb-1">{isAr ? "نقاط الولاء" : "Loyalty Points"}</div>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: "Montserrat,sans-serif" }}>{CLIENT.points.toLocaleString()}</div>
                  </div>
                  <Crown className="w-8 h-8 text-[#B1262A]" />
                </div>
              </div>
            </Card>

            <Link to="/book" className="block">
              <button className="w-full py-4 font-black text-base text-white tracking-wide bg-[#B1262A] hover:bg-[#8E1D20] transition-colors" style={{ fontFamily: KF }}>
                {isAr ? " احجز موعدك الآن" : " Book Your Appointment"}
              </button>
            </Link>

            <Card className="p-0 bg-white border border-[#E2E0DB] overflow-hidden shadow-sm">
              <div className="h-20 relative overflow-hidden">
                <img src="/images/client/profile-2.jpg" alt="Style" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141518]/90 to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <h3 className="font-black text-sm text-white">{isAr ? "بطاقة الأسلوب المعتمدة" : "Approved Style Card"}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-xs border-b border-gray-100 pb-2">
                  <span className="text-[#4A4E58] font-bold">{isAr ? "النمط" : "Style"}</span>
                  <span className="font-black text-[#141518]">{isAr ? CLIENT.styleAr : CLIENT.styleEn}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#4A4E58] font-bold">{isAr ? "اللحية" : "Beard"}</span>
                  <span className="font-black text-[#141518]">V-Fade</span>
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-black text-white bg-[#141518] hover:bg-[#0B0D10] transition-colors" onClick={() => downloadStyleCardPDF(pdfPayload, isAr ? "ar" : "en")}>
                  <Download className="w-4 h-4" />{isAr ? "تصدير PDF" : "Export PDF"}
                </button>
              </div>
            </Card>
          </div>

          {/* MAIN CONTENT */}
          <div>
            <div className="flex overflow-x-auto gap-0 mb-6 border-b-2 border-[#E2E0DB]">
              {tabs.map(tb => (
                <button key={tb.id} onClick={() => setActiveTab(tb.id)}
                  className="px-5 py-3 text-sm font-black whitespace-nowrap transition-all border-b-2 -mb-0.5"
                  style={{ fontFamily: KF, color: activeTab === tb.id ? "#B1262A" : "#4A4E58", borderBottomColor: activeTab === tb.id ? "#B1262A" : "transparent", background: activeTab === tb.id ? "rgba(177,38,42,0.04)" : "transparent" }}>
                  {tb.label}
                </button>
              ))}
            </div>

            {activeTab === "bookings" && (
              <div className="space-y-6 animate-fade-in">
                {/* Upcoming */}
                <Card className="p-5 bg-white border border-[#B1262A]/25 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B1262A] flex items-center justify-center text-white shrink-0"><CalendarClock className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-black text-[#141518] mb-0.5">{isAr ? "موعدك القادم يا محمد" : "Your Upcoming Appointment"}</h3>
                      <p className="text-sm text-[#4A4E58]">{isAr ? "غدا  : م  الرياض - العليا  عمر سالم" : "Tomorrow  4:30 PM  Riyadh Olaya  Omar Salem"}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 font-black text-xs border border-[#E2E0DB] text-[#141518] hover:bg-[#F3F3F1] shrink-0">{isAr ? "إدارة" : "Manage"}</button>
                </Card>

                {/* Style Card Full Width */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B1262A]" />
                    <h3 className="font-black text-base text-[#141518]">{isAr ? "بطاقة أسلوبك المعتمدة" : "Your Approved Style Card"}</h3>
                    <Badge className="bg-[#141518] text-white border-none text-[9px] font-black">{isAr ? "محفوظة" : "SAVED"}</Badge>
                  </div>
                  <Card className="bg-[#141518] border-none overflow-hidden mb-4">
                    <div className="flex items-center gap-5 p-5">
                      <img src="/images/client/profile-2.jpg" alt="Client" className="w-20 h-20 object-cover shrink-0 border-2 border-[#B1262A]" />
                      <div>
                        <h4 className="font-black text-white text-base mb-1">{isAr ? CLIENT.nameAr : CLIENT.nameEn}</h4>
                        <p className="text-white/50 text-xs mb-2">{isAr ? `نمط: ${CLIENT.styleAr}` : `Style: ${CLIENT.styleEn}`}</p>
                        <p className="text-white/75 text-sm leading-relaxed">{isAr ? "هذه مواصفاتك الدقيقة المحفوظة لدى حلاقك. كل زيارة تبدأ من حيث توقفت آخر مرة." : "These are your precise saved specs. Every visit begins right where you left off."}</p>
                      </div>
                    </div>
                  </Card>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {STYLE_SPECS.map((spec, i) => (
                      <Card key={i} className="bg-white border border-[#E2E0DB] overflow-hidden hover:border-[#B1262A]/30 transition-colors">
                        <div className="h-1.5" style={{ background: spec.iconBg }} />
                        <div className="p-4">
                          <div className="text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: spec.iconBg }}>{isAr ? spec.labelAr : spec.labelEn}</div>
                          <div className="font-black text-[#141518] text-sm mb-2">{isAr ? spec.valueAr : spec.valueEn}</div>
                          <p className="text-[11px] text-[#4A4E58] leading-relaxed">{isAr ? spec.detailAr : spec.detailEn}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Card className="bg-[#141518] border-none p-5 mb-4">
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-3">{isAr ? "التعليمات الكاملة للحلاق" : "Full Barber Instructions"}</div>
                    <p className="text-white text-sm leading-relaxed">{isAr ? CLIENT.requestAr : CLIENT.requestEn}</p>
                  </Card>
                  <button className="w-full flex items-center justify-center gap-3 py-3.5 font-black text-sm text-white bg-[#1F7A3F] hover:bg-[#175F32] transition-colors" onClick={() => downloadStyleCardPDF(pdfPayload, isAr ? "ar" : "en")}>
                    <Download className="w-5 h-5" />{isAr ? "تحميل بطاقة الأسلوب كاملة (PDF)" : "Download Full Style Card (PDF)"}
                  </button>
                </div>

                {/* Client Preferences */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1 h-6 bg-[#1F7A3F]" />
                    <h3 className="font-black text-base text-[#141518]">{isAr ? "تفضيلاتك الشخصية" : "Your Personal Preferences"}</h3>
                    <Heart className="w-4 h-4 text-[#B1262A]" />
                  </div>
                  <p className="text-sm text-[#4A4E58] mb-4">{isAr ? "في كل زيارة نريد أن تشعر أننا نعرفك. هذه التفضيلات تستقبل بها في اليوم الأول." : "Every visit, we want you to feel known. These preferences welcome you from day one."}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {prefFields.map(pf => {
                      const val = prefs[pf.key as keyof typeof prefs];
                      return (
                        <Card key={pf.key} className="bg-white border overflow-hidden" style={{ borderColor: `${pf.border}35` }}>
                          <div className="h-1" style={{ background: pf.border }} />
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span style={{ color: pf.border }}>{pf.icon}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#4A4E58]">{isAr ? pf.labelAr : pf.labelEn}</span>
                            </div>
                            {editingPref === pf.key ? (
                              <div className="flex gap-2 items-center">
                                <input className="flex-1 text-sm border border-[#E2E0DB] px-2 py-1 text-[#141518] bg-white" value={prefInput} onChange={e => setPrefInput(e.target.value)} placeholder={isAr ? val.ar : val.en} autoFocus />
                                <button onClick={() => handleSavePref(pf.key)} className="text-xs font-black text-white px-2 py-1" style={{ background: pf.border }}>{isAr ? "حفظ" : "Save"}</button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <span className="font-black text-sm text-[#141518]">{isAr ? val.ar : val.en}</span>
                                <button onClick={() => { setEditingPref(pf.key); setPrefInput(isAr ? val.ar : val.en); }} className="text-[10px] text-[#4A4E58] hover:text-[#141518] font-bold transition-colors">{isAr ? "تعديل" : "Edit"}</button>
                              </div>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Most Chosen Package */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B1262A]" />
                    <h3 className="font-black text-base text-[#141518]">{isAr ? "باقتك الأكثر اختيارا" : "Your Most Chosen Package"}</h3>
                    <Star className="w-4 h-4 text-[#B1262A]" />
                  </div>
                  <Card className="bg-white border border-[#E2E0DB] overflow-hidden shadow-sm">
                    <div className="bg-[#141518] px-5 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">{isAr ? "الأكثر تكرارا من زياراتك" : "Most repeated from your visits"}</div>
                        <h4 className="font-black text-white text-base">{isAr ? MOST_CHOSEN.titleAr : MOST_CHOSEN.titleEn}</h4>
                        <p className="text-white/50 text-xs mt-1">{isAr ? MOST_CHOSEN.countAr : MOST_CHOSEN.countEn}</p>
                      </div>
                      <Tag className="w-8 h-8 text-[#B1262A]" />
                    </div>
                    <div className="p-5">
                      <div className="space-y-2 mb-5">
                        {MOST_CHOSEN.services.map((s, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-[#F3F3F1]">
                            <div className="flex items-center gap-2"><Scissors className="w-4 h-4 text-[#1F7A3F]" /><span className="font-bold text-sm text-[#141518]">{isAr ? s.ar : s.en}</span></div>
                            <span className="font-black text-sm text-[#141518]">{s.price} {isAr ? "ر.س" : "SAR"}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-black text-sm text-[#141518]">{isAr ? "الإجمالي" : "Total"}</span>
                          <span className="font-black text-lg text-[#B1262A]">{MOST_CHOSEN.totalPrice} {isAr ? "ر.س" : "SAR"}</span>
                        </div>
                      </div>
                      <div className="border border-[#1F7A3F]/20 p-4 mb-4" style={{ background: "rgba(31,122,63,0.04)" }}>
                        <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-[#1F7A3F]" /><span className="text-[10px] font-black uppercase tracking-widest text-[#1F7A3F]">{isAr ? "خدمات مقترحة تتمم تجربتك" : "Suggested add-ons to complete your experience"}</span></div>
                        <div className="space-y-3">
                          {MOST_CHOSEN.upsells.map((u, i) => (
                            <div key={i} className="flex items-center justify-between gap-3">
                              <div className="flex-1">
                                <div className="font-black text-sm text-[#141518]">{isAr ? u.ar : u.en}</div>
                                <div className="text-[11px] text-[#4A4E58]">{isAr ? u.reasonAr : u.reasonEn}</div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-sm font-black text-[#141518]">+{u.price} {isAr ? "ر.س" : "SAR"}</span>
                                <button className="text-[10px] font-black text-white px-2 py-1 bg-[#1F7A3F] hover:bg-[#175F32] transition-colors">{isAr ? "إضافة" : "Add"}</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-[#B1262A] p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1"><Gift className="w-4 h-4 text-white" /><span className="text-[10px] font-black uppercase tracking-widest text-white/70">{isAr ? "عرض حصري لك" : "Exclusive offer for you"}</span></div>
                          <p className="font-black text-white text-sm">{isAr ? MOST_CHOSEN.exclusiveOffer.discountAr : MOST_CHOSEN.exclusiveOffer.discountEn}</p>
                          <p className="font-mono text-white/70 text-xs mt-1">{isAr ? "كود:" : "Code:"} {MOST_CHOSEN.exclusiveOffer.code}</p>
                        </div>
                        <Link to="/book"><button className="shrink-0 px-5 py-3 font-black text-[#B1262A] text-sm bg-white hover:bg-[#F3F3F1] transition-colors">{isAr ? "احجز الآن" : "Book Now"}</button></Link>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Past Visits */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#141518]" />
                    <h3 className="font-black text-base text-[#141518]">{isAr ? "سجل زياراتك" : "Your Visit History"}</h3>
                  </div>
                  <div className="space-y-3">
                    {gallery.map(v => (
                      <Card key={v.id} className="p-4 bg-white border border-[#E2E0DB] flex items-center gap-4 hover:border-[#B1262A]/30 transition-colors shadow-sm">
                        <div className="w-14 h-14 overflow-hidden shrink-0 bg-[#F3F3F1]"><img src={v.imgA} alt="" className="w-full h-full object-cover opacity-80" /></div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-[#141518] mb-1">{isAr ? v.date : v.dateEn}</h4>
                          <p className="text-xs text-[#4A4E58] mb-2">{isAr ? v.branch.ar : v.branch.en}  {v.barber}</p>
                          <div className="flex gap-1 flex-wrap">{v.tags.map((tag, ti) => <span key={ti} className="text-[9px] font-bold uppercase px-2 py-0.5 bg-[#F3F3F1] text-[#B1262A] border border-[#B1262A]/20">{isAr ? tag.ar : tag.en}</span>)}</div>
                        </div>
                        <Link to="/book"><button className="text-xs font-black text-[#B1262A] flex items-center gap-1 hover:gap-2 transition-all shrink-0">{isAr ? "أعد الحجز" : "Rebook"} <ChevronRight className="w-3.5 h-3.5" /></button></Link>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="animate-fade-in">
                <p className="text-[#4A4E58] text-sm mb-6">{isAr ? "معرض قبل وبعد  كل زيارة موثقة بعين الحلاق" : "Before & After gallery  every visit documented"}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gallery.map(g => (
                    <Card key={g.id} className="overflow-hidden bg-white border border-[#E2E0DB] shadow-sm group">
                      <div className="flex h-48">
                        <div className="flex-1 relative border-r border-[#E2E0DB]">
                          <img src={g.imgB} alt="Before" className="w-full h-full object-cover contrast-125 opacity-90 transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto bg-[#141518]/90 text-white text-[10px] font-black px-2 py-0.5 tracking-wider">{isAr ? "قبل" : "BEFORE"}</div>
                        </div>
                        <div className="flex-1 relative">
                          <img src={g.imgA} alt="After" className="w-full h-full object-cover contrast-125 transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto bg-[#B1262A]/90 text-white text-[10px] font-black px-2 py-0.5 tracking-wider">{isAr ? "بعد" : "AFTER"}</div>
                        </div>
                      </div>
                      <div className="p-4 border-t border-[#E2E0DB]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#4A4E58] font-bold">{isAr ? g.date : g.dateEn}</span>
                          <span className="text-[10px] font-black text-[#141518] bg-[#F3F3F1] px-2 py-1 border border-[#E2E0DB]">{g.barber}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">{g.tags.map((tag, ti) => <Badge key={ti} className="bg-white text-[#1F7A3F] border-[#1F7A3F]/20 text-[10px] font-bold px-2 py-0">{isAr ? tag.ar : tag.en}</Badge>)}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wallet" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4"><ReceiptText className="w-5 h-5 text-[#B1262A]" /><h3 className="font-black text-base text-[#141518]">{isAr ? "سجل الطلبات" : "Order History"}</h3></div>
                {orders.length === 0 ? (
                  <div className="text-center py-14 bg-white border border-[#E2E0DB]">
                    <ReceiptText className="w-10 h-10 text-[#4A4E58]/30 mx-auto mb-3" />
                    <p className="text-[#4A4E58] text-sm font-bold">{isAr ? "لا توجد فواتير بعد" : "No transactions yet"}</p>
                  </div>
                ) : (
                  <div className="space-y-3">{orders.map(o => (
                    <Card key={o.id} className="p-4 bg-white border border-[#E2E0DB] flex justify-between items-center shadow-sm">
                      <div><h4 className="font-black text-xs uppercase font-mono text-[#141518] mb-1">{o.id}</h4><p className="text-xs text-[#4A4E58]">{new Date(o.date).toLocaleDateString()}</p></div>
                      <div className="flex items-center gap-4">
                        <div className="font-black text-[#141518] font-mono">{isAr ? formatSar(o.total) : `SAR ${o.total.toFixed(2)}`}</div>
                        <Link to={`/checkout/success?id=${o.id}`}><button className="h-8 px-3 border border-[#E2E0DB] text-[#141518] hover:bg-[#F3F3F1] font-black text-xs flex items-center gap-1"><Download className="w-3 h-3" /> {isAr ? "عرض" : "View"}</button></Link>
                      </div>
                    </Card>
                  ))}</div>
                )}
              </div>
            )}

            {activeTab === "style" && (
              <div className="animate-fade-in space-y-5">
                <Card className="bg-[#141518] border-none overflow-hidden">
                  <div className="flex items-center gap-5 p-6">
                    <img src="/images/client/profile-1.jpg" alt="Client" className="w-24 h-24 object-cover shrink-0 border-2 border-[#B1262A]" />
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">{isAr ? "بطاقة الأسلوب الرسمية" : "Official Style Card"}</div>
                      <h2 className="font-black text-white text-xl mb-1">{isAr ? CLIENT.nameAr : CLIENT.nameEn}</h2>
                      <p className="text-white/60 text-sm">{isAr ? `أسلوب: ${CLIENT.styleAr}` : `Style: ${CLIENT.styleEn}`}</p>
                      <div className="flex gap-3 mt-3">
                        <span className="text-[10px] font-black text-[#B1262A] bg-[#B1262A]/15 px-2 py-1">{CLIENT.tier} MEMBER</span>
                        <span className="text-[10px] font-black text-white/60 bg-white/5 px-2 py-1">{CLIENT.points.toLocaleString()} {isAr ? "نقطة" : "PTS"}</span>
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  {STYLE_SPECS.map((spec, i) => (
                    <Card key={i} className="bg-white border border-[#E2E0DB] overflow-hidden">
                      <div className="h-2" style={{ background: spec.iconBg }} />
                      <div className="p-5">
                        <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: spec.iconBg }}>{isAr ? spec.labelAr : spec.labelEn}</div>
                        <div className="font-black text-[#141518] text-sm mb-3">{isAr ? spec.valueAr : spec.valueEn}</div>
                        <p className="text-xs text-[#4A4E58] leading-relaxed border-t border-[#F3F3F1] pt-3">{isAr ? spec.detailAr : spec.detailEn}</p>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="bg-[#141518] border-none p-6">
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-3">{isAr ? "التعليمات الكاملة للحلاق" : "Complete Barber Instructions"}</div>
                  <p className="text-white text-sm leading-relaxed">{isAr ? CLIENT.requestAr : CLIENT.requestEn}</p>
                </Card>
                <button className="w-full flex items-center justify-center gap-3 py-4 font-black text-sm text-white bg-[#1F7A3F] hover:bg-[#175F32] transition-colors" onClick={() => downloadStyleCardPDF(pdfPayload, isAr ? "ar" : "en")}>
                  <Download className="w-5 h-5" />{isAr ? "تحميل بطاقة الأسلوب كاملة (PDF)" : "Download Full Style Card (PDF)"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

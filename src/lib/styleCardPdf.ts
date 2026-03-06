/**
 * Generate and download a single-page PDF "Style Card" with client data,
 * most-requested cut specs, and visit summary.
 *
 * Uses native Canvas API + jsPDF-free approach: render to a hidden iframe
 * containing styled HTML, then call window.print → Save as PDF.
 * No external dependencies.
 */

export interface StyleCardData {
  name: string;
  phone: string;
  email: string;
  age: number;
  style: string;
  request: string;
  totalVisits: number;
  loyaltyPoints: number;
  memberTier: string;
  topServices: string[];
  lastVisitDate: string;
  favBranch: string;
  profileImage?: string;
  preferences?: {
    scent: string;
    cream: string;
    music: string;
    drink: string;
  };
}

export function downloadStyleCardPDF(data: StyleCardData, lang: 'ar' | 'en' = 'ar') {
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const html = `
<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Style Card – ${data.name}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Montserrat:wght@400;700;900&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
@page { size: A4; margin: 0; }
body {
  width: 210mm; min-height: 297mm;
  font-family: 'Noto Kufi Arabic', 'Montserrat', sans-serif;
  background: #fff; color: #141518;
  padding: 0; direction: ${dir};
}

/* ── Header ── */
.header {
  background: #141518; color: #fff;
  padding: 28px 36px; display: flex;
  align-items: center; justify-content: space-between;
}
.header .brand { display: flex; align-items: center; gap: 14px; }
.header .logo { width: 44px; height: 44px; background: #B1262A; display: flex;
  align-items: center; justify-content: center; font-weight: 900; font-size: 16px;
  font-family: Montserrat, sans-serif; letter-spacing: 1px; color: #fff; }
.header .brand-name { font-weight: 900; font-size: 18px; letter-spacing: -0.5px;
  font-family: Montserrat, sans-serif; }
.header .subtitle { font-size: 11px; color: #A7ABB3; letter-spacing: 0.15em;
  text-transform: uppercase; font-weight: 700; }
.tricolor { height: 4px; background: linear-gradient(to right, #1F7A3F 33%, #fff 33%, #fff 66%, #B1262A 66%); }

/* ── Body ── */
.body { padding: 32px 36px; }

/* Section title */
.section-title {
  font-size: 10px; font-weight: 900; text-transform: uppercase;
  letter-spacing: 0.2em; color: #B1262A; margin-bottom: 12px;
  border-bottom: 2px solid #B1262A; padding-bottom: 4px;
  display: inline-block;
}

/* Profile block */
.profile { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
.profile .field { padding: 14px; background: #F3F3F1; border: 1px solid #E2E0DB; }
.profile .label { font-size: 9px; font-weight: 900; text-transform: uppercase;
  letter-spacing: 0.15em; color: #A7ABB3; margin-bottom: 4px; }
.profile .value { font-size: 14px; font-weight: 700; color: #141518; }

/* Specs block */
.specs { background: #141518; color: #fff; padding: 24px; margin-bottom: 28px; }
.specs .label { font-size: 9px; font-weight: 900; text-transform: uppercase;
  letter-spacing: 0.15em; color: #A7ABB3; margin-bottom: 8px; }
.specs .value { font-size: 13px; font-weight: 500; line-height: 1.7; color: #F3F3F1; }

/* Stats */
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
.stat { text-align: center; padding: 16px; border: 1px solid #E2E0DB; }
.stat .num { font-size: 28px; font-weight: 900; color: #B1262A; font-family: Montserrat, sans-serif; }
.stat .lbl { font-size: 9px; font-weight: 700; color: #A7ABB3; text-transform: uppercase;
  letter-spacing: 0.1em; margin-top: 4px; }

/* Services */
.services-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.service-tag { padding: 6px 14px; background: #F3F3F1; border: 1px solid #1F7A3F33;
  color: #1F7A3F; font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; }

/* Footer */
.footer {
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: 16px 36px; background: #F3F3F1;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 9px; color: #A7ABB3; border-top: 1px solid #E2E0DB;
}

@media print {
  body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}
</style>
</head>
<body>

<div class="header">
  <div class="brand">
    <div class="logo">IM</div>
    <div>
      <div class="brand-name">IL MAESTRO</div>
      <div class="subtitle">${isAr ? 'بطاقة أسلوب العميل' : 'Client Style Card'}</div>
    </div>
  </div>
  <div style="text-align:${isAr ? 'left' : 'right'}">
    <div style="font-size:11px;color:#A7ABB3;font-weight:700">${isAr ? 'تاريخ الإصدار' : 'Issued'}</div>
    <div style="font-size:13px;font-weight:900;font-family:Montserrat,sans-serif">${new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}</div>
  </div>
</div>
<div class="tricolor"></div>

<div class="body">

  <!-- Profile -->
  <div class="section-title">${isAr ? 'بيانات العميل' : 'Client Profile'}</div>
  <div class="profile">
    <div class="field">
      <div class="label">${isAr ? 'الاسم' : 'Name'}</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">${isAr ? 'الجوال' : 'Phone'}</div>
      <div class="value" dir="ltr">${data.phone}</div>
    </div>
    <div class="field">
      <div class="label">${isAr ? 'البريد' : 'Email'}</div>
      <div class="value" dir="ltr">${data.email}</div>
    </div>
    <div class="field">
      <div class="label">${isAr ? 'العمر' : 'Age'}</div>
      <div class="value">${data.age} ${isAr ? 'سنة' : 'years'}</div>
    </div>
  </div>

  <!-- Style & Technical Specs -->
  <div class="section-title">${isAr ? 'مواصفات القصة الفنية' : 'Technical Style Specs'}</div>
  <div class="profile" style="margin-bottom:16px">
    <div class="field">
      <div class="label">${isAr ? 'النمط العام' : 'Base Style'}</div>
      <div class="value">${data.style}</div>
    </div>
    <div class="field">
      <div class="label">${isAr ? 'الفرع المفضل' : 'Preferred Branch'}</div>
      <div class="value">${data.favBranch}</div>
    </div>
  </div>
  <div class="specs">
    <div class="label">${isAr ? 'الطلب المفضل — تعليمات تقنية محفوظة' : 'Preferred Request — Saved Technical Instructions'}</div>
    <div class="value">${data.request}</div>
  </div>

  <!-- Visit Summary Stats -->
  <div class="section-title">${isAr ? 'ملخص الزيارات' : 'Visit Summary'}</div>
  <div class="stats">
    <div class="stat">
      <div class="num">${data.totalVisits}</div>
      <div class="lbl">${isAr ? 'زيارات' : 'Visits'}</div>
    </div>
    <div class="stat">
      <div class="num">${data.loyaltyPoints}</div>
      <div class="lbl">${isAr ? 'نقاط' : 'Points'}</div>
    </div>
    <div class="stat">
      <div class="num">${data.memberTier}</div>
      <div class="lbl">${isAr ? 'المستوى' : 'Tier'}</div>
    </div>
    <div class="stat">
      <div class="num">${data.topServices.length}</div>
      <div class="lbl">${isAr ? 'خدمات مفضلة' : 'Top Services'}</div>
    </div>
  </div>

  <!-- Top Services -->
  <div class="section-title">${isAr ? 'الخدمات الأكثر طلباً' : 'Most Requested Services'}</div>
  <div class="services-list">
    ${data.topServices.map(s => `<span class="service-tag">${s}</span>`).join('')}
  </div>

  <!-- Preferences -->
  ${data.preferences ? `
  <div class="section-title">${isAr ? 'التفضيلات الشخصية' : 'Personal Preferences'}</div>
  <div class="profile" style="margin-bottom:28px">
    <div class="field"><div class="label">${isAr ? 'الرائحة' : 'Scent'}</div><div class="value">${data.preferences.scent}</div></div>
    <div class="field"><div class="label">${isAr ? 'الكريم' : 'Cream'}</div><div class="value">${data.preferences.cream}</div></div>
    <div class="field"><div class="label">${isAr ? 'الموسيقى' : 'Music'}</div><div class="value">${data.preferences.music}</div></div>
    <div class="field"><div class="label">${isAr ? 'المشروب' : 'Drink'}</div><div class="value">${data.preferences.drink}</div></div>
  </div>` : ''}

</div>

<div class="footer">
  <span>IL MAESTRO © ${new Date().getFullYear()}</span>
  <span>${isAr ? 'بطاقة أسلوب العميل — سرية' : 'Client Style Card — Confidential'}</span>
</div>

</body>
</html>`;

  // Open print dialog with the styled HTML
  const printWindow = window.open('', '_blank', 'width=800,height=1100');
  if (!printWindow) {
    alert(isAr ? 'يرجى السماح بالنوافذ المنبثقة لتنزيل البطاقة' : 'Please allow popups to download the style card');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  // Give fonts time to load
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 800);
}

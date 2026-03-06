// Admin Report PDF â€” 3-page structure (browser native print, no external deps)
export const downloadAdminReportPDF = (data: {
  totalRevenue: number;
  totalBookings: number;
  avgOccupancy: number;
  totalExpenses: number;
  profitMargin: number;
  branches: Array<{ name: string; revenue: number; expenses: number; occupancy: number }>;
}, lang: 'ar' | 'en' = 'en') => {
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const fmt = (v: number) => `${v.toLocaleString()} ${isAr ? 'Ø±ÙŠØ§Ù„' : 'SAR'}`;
  const date = new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-SA');
  const netProfit = data.totalRevenue - data.totalExpenses;

  const branchRows = data.branches.map((b, i) => {
    const net = b.revenue - b.expenses;
    const margin = Math.round((net / b.revenue) * 100);
    const statusColor = b.occupancy >= 85 ? '#1F7A3F' : b.occupancy >= 70 ? '#B8860B' : '#7A1F1F';
    const rank = ['â˜…â˜…â˜…â˜…â˜…','â˜…â˜…â˜…â˜…â˜†','â˜…â˜…â˜…â˜…â˜…','â˜…â˜…â˜…â˜†â˜†','â˜…â˜…â˜…â˜…â˜…','â˜…â˜…â˜…â˜…â˜†'][i] || 'â˜…â˜…â˜…â˜…â˜†';
    return `
    <tr>
      <td><strong>${b.name}</strong><br/><span style="font-size:10px;color:#A7ABB3">${rank}</span></td>
      <td style="color:#0B4D2A;font-weight:700">${fmt(b.revenue)}</td>
      <td style="color:#7A1F1F">${fmt(b.expenses)}</td>
      <td style="color:#141518;font-weight:700">${fmt(net)}</td>
      <td><span style="background:${margin>=35?'#dcfce7':margin>=25?'#fef9c3':'#fee2e2'};color:${margin>=35?'#166534':margin>=25?'#713f12':'#7f1d1d'};padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700">${margin}%</span></td>
      <td><span style="color:${statusColor};font-weight:700">${b.occupancy}%</span></td>
    </tr>`;
  }).join('');

  // branch detail cards for page 2
  const branchDetailCards = data.branches.map((b, i) => {
    const net = b.revenue - b.expenses;
    const margin = Math.round((net / b.revenue) * 100);
    const barbers = [4, 5, 3, 4, 5, 4][i] || 4;
    const avgTicket = Math.round(b.revenue / (b.occupancy * 20));
    const memberships = [124, 98, 152, 67, 186, 89][i] || 100;
    const challenges = isAr ? [
      'Ø¶ØºØ· ÙÙŠ Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø°Ø±ÙˆØ© Ù…Ø³Ø§Ø¡Ù‹ â€” ÙØ¬ÙˆØ© Ø¨Ø§Ù„Ø­Ø¬ÙˆØ²Ø§Øª ÙÙŠ Ø§Ù„ØµØ¨Ø§Ø­',
      'Ø¯ÙˆØ±Ø§Ù† Ø¹Ø§Ù„Ù Ù„Ù„Ù…ÙˆØ¸ÙÙŠÙ† â€” Ø®Ø·Ø© Ø§Ø­ØªÙØ§Ø¸ Ù…Ø·Ù„ÙˆØ¨Ø©',
      'Ù†Ù‚Øµ ÙÙŠ Ø§Ù„Ù…Ø®Ø²ÙˆÙ† Ø§Ù„Ù…ØªØ¬Ø¯Ø¯ â€” Ø¶Ø¹Ù Ø§Ù„ØªÙ†Ø³ÙŠÙ‚ Ù…Ø¹ Ø§Ù„Ù…Ø³ØªÙˆØ¯Ø¹',
      'Ø¥ÙŠØ¬Ø§Ø± Ù…Ø±ØªÙØ¹ Ù†Ø³Ø¨ÙŠØ§Ù‹ â€” ÙŠØ¶ØºØ· Ø¹Ù„Ù‰ Ù‡Ø§Ù…Ø´ Ø§Ù„Ø±Ø¨Ø­ Ø§Ù„ØµØ§ÙÙŠ',
      'ÙØ±ØµØ© ØªÙˆØ³Ø¹ â€” Ø§Ù„Ø·Ø§Ù‚Ø© Ø§Ù„Ø§Ø³ØªÙŠØ¹Ø§Ø¨ÙŠØ© Ø£Ø¹Ù„Ù‰ Ù…Ù† Ø§Ù„Ø¥Ø´ØºØ§Ù„ Ø§Ù„Ø­Ø§Ù„ÙŠ',
      'ØªÙ‚ÙŠÙŠÙ…Ø§Øª Ù…ØªØ°Ø¨Ø°Ø¨Ø© â€” ØªØ­ØªØ§Ø¬ Ø¨Ø±Ù†Ø§Ù…Ø¬ ÙˆÙ„Ø§Ø¡ Ù…Ø®ØµØµ',
    ][i] : [
      'Evening peak pressure â€” morning booking gap',
      'High staff turnover â€” retention plan needed',
      'Replenishment gaps â€” weak warehouse coordination',
      'High rent rate â€” compresses net margin',
      'Expansion opportunity â€” capacity exceeds current occupancy',
      'Variable ratings â€” needs a dedicated loyalty program',
    ][i];
    return `
    <div class="branch-card">
      <div class="branch-card-header">
        <div>
          <div class="branch-name">${b.name}</div>
          <div class="branch-sub">${isAr ? `${barbers} Ø­Ù„Ø§Ù‚ÙˆÙ† Ù†Ø´Ø·ÙˆÙ†` : `${barbers} Active Barbers`}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:28px;font-weight:900;color:#B1262A">${b.occupancy}%</div>
          <div style="font-size:9px;color:#A7ABB3;text-transform:uppercase">${isAr ? 'Ù†Ø³Ø¨Ø© Ø§Ù„Ø¥Ø´ØºØ§Ù„' : 'Occupancy'}</div>
        </div>
      </div>
      <div class="branch-stats">
        <div class="bstat"><div class="bstat-label">${isAr ? 'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª' : 'Revenue'}</div><div class="bstat-val green">${fmt(b.revenue)}</div></div>
        <div class="bstat"><div class="bstat-label">${isAr ? 'Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ' : 'Expenses'}</div><div class="bstat-val red">${fmt(b.expenses)}</div></div>
        <div class="bstat"><div class="bstat-label">${isAr ? 'ØµØ§ÙÙŠ Ø§Ù„Ø±Ø¨Ø­' : 'Net Profit'}</div><div class="bstat-val">${fmt(net)}</div></div>
        <div class="bstat"><div class="bstat-label">${isAr ? 'Ù‡Ø§Ù…Ø´ Ø§Ù„Ø±Ø¨Ø­' : 'Margin'}</div><div class="bstat-val">${margin}%</div></div>
        <div class="bstat"><div class="bstat-label">${isAr ? 'Ù…ØªÙˆØ³Ø· Ø§Ù„ÙØ§ØªÙˆØ±Ø©' : 'Avg Ticket'}</div><div class="bstat-val">${avgTicket} ${isAr ? 'Ø±.Ø³' : 'SAR'}</div></div>
        <div class="bstat"><div class="bstat-label">${isAr ? 'Ø§Ù„Ø£Ø¹Ø¶Ø§Ø¡' : 'Members'}</div><div class="bstat-val">${memberships}</div></div>
      </div>
      <div class="branch-challenge"><strong>${isAr ? 'âš  Ø§Ù„ØªØ­Ø¯ÙŠ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ:' : 'âš  Key Challenge:'}</strong> ${challenges}</div>
    </div>`;
  }).join('');

  const html = `
<!DOCTYPE html>
<html dir="${dir}" lang="${isAr ? 'ar' : 'en'}">
<head>
  <meta charset="UTF-8"/>
  <title>${isAr ? 'ØªÙ‚Ø±ÙŠØ± Ø¥ÙŠÙ„ Ù…Ø§ÙŠØ³ØªØ±Ùˆ Ø§Ù„Ø´Ø§Ù…Ù„' : 'IL MAESTRO Comprehensive Report'}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Montserrat:wght@400;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 18mm 15mm; }
    body { font-family: ${isAr ? "'Noto Kufi Arabic', Arial" : "'Montserrat', Arial"}, sans-serif; color: #141518; background: #fff; font-size: 12px; direction: ${dir}; }
    .page { page-break-after: always; padding: 0 0 30px 0; }
    .page:last-child { page-break-after: auto; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #B1262A; padding-bottom: 16px; margin-bottom: 24px; }
    .logo { font-size: 24px; font-weight: 900; letter-spacing: -1px; font-family: 'Montserrat', sans-serif; }
    .logo span { color: #B1262A; }
    .tricolor { height: 4px; background: linear-gradient(to right, #1F7A3F 33.3%, #ffffff 33.3% 66.6%, #B1262A 66.6%); margin-bottom: 24px; }
    .page-label { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #A7ABB3; margin-bottom: 6px; }
    h2 { font-size: 15px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #141518; margin: 24px 0 14px; border-${isAr ? 'right' : 'left'}: 4px solid #B1262A; padding-${isAr ? 'right' : 'left'}: 12px; }
    .summary-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 24px; }
    .stat-card { background: #F7F4EF; padding: 14px; border-top: 3px solid #141518; }
    .stat-label { font-size: 8px; text-transform: uppercase; letter-spacing: 1px; color: #A7ABB3; margin-bottom: 5px; font-weight: 700; }
    .stat-value { font-size: 16px; font-weight: 900; color: #141518; font-family: 'Montserrat', sans-serif; }
    .stat-card.red { border-top-color: #B1262A; } .stat-card.green { border-top-color: #1F7A3F; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 11px; }
    th { background: #141518; color: white; padding: 9px 12px; text-align: ${isAr ? 'right' : 'left'}; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; }
    td { padding: 9px 12px; border-bottom: 1px solid #E8E0D2; }
    tr:nth-child(even) td { background: #F7F4EF; }
    .branch-card { border: 1px solid #E8E0D2; margin-bottom: 16px; page-break-inside: avoid; }
    .branch-card-header { display: flex; justify-content: space-between; align-items: center; background: #141518; color: white; padding: 14px 18px; }
    .branch-name { font-size: 14px; font-weight: 900; color: white; }
    .branch-sub { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 2px; }
    .branch-stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; }
    .bstat { padding: 12px; border-right: 1px solid #E8E0D2; border-bottom: 1px solid #E8E0D2; }
    .bstat:last-child { border-right: none; }
    .bstat-label { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #A7ABB3; margin-bottom: 4px; }
    .bstat-val { font-size: 13px; font-weight: 900; color: #141518; } .bstat-val.green { color: #1F5C2E; } .bstat-val.red { color: #7A1F1F; }
    .branch-challenge { background: #FFF8E7; border-${isAr ? 'right' : 'left'}: 3px solid #B8860B; padding: 10px 14px; font-size: 11px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .kpi-card { background: #141518; color: white; padding: 16px; } 
    .kpi-label { font-size: 8px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5); margin-bottom: 6px; font-weight: 700; }
    .kpi-val { font-size: 20px; font-weight: 900; color: white; font-family: 'Montserrat', sans-serif; }
    .strategy-section { background: #F0FAF5; border: 1px solid #1F7A3F; padding: 18px; margin-bottom: 14px; }
    .strategy-title { color: #1F5C2E; font-size: 12px; font-weight: 900; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.08em; }
    .strategy-item { display: flex; gap: 8px; margin-bottom: 8px; font-size: 11px; align-items: flex-start; }
    .strategy-dot { width: 6px; height: 6px; border-radius: 50%; background: #1F7A3F; margin-top: 4px; flex-shrink: 0; }
    .footer { border-top: 1px solid #E8E0D2; padding-top: 12px; text-align: center; color: #A7ABB3; font-size: 9px; margin-top: 20px; }
    @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>

<!-- â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PAGE 1: NETWORK SUMMARY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<div class="page">
  <div class="header">
    <div class="logo">IL <span>MAESTRO</span></div>
    <div style="text-align:${isAr?'left':'right'}">
      <div style="font-size:10px;color:#A7ABB3;font-weight:700">${isAr?'ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø´Ø§Ù…Ù„':'Comprehensive Operations Report'}</div>
      <div style="font-size:12px;font-weight:900">${date}</div>
    </div>
  </div>
  <div class="tricolor"></div>

  <div class="page-label">${isAr?'Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰ â€” Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø´Ø¨ÙƒØ©':'Page 1 â€” Network Overview'}</div>
  <h2>${isAr ? 'Ù…Ù„Ø®Øµ Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø´Ø¨ÙƒØ© â€” Ù¦ ÙØ±ÙˆØ¹' : 'Network Performance Summary â€” 6 Branches'}</h2>

  <div class="summary-grid">
    <div class="stat-card green"><div class="stat-label">${isAr?'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª':'Total Revenue'}</div><div class="stat-value">${fmt(data.totalRevenue)}</div></div>
    <div class="stat-card"><div class="stat-label">${isAr?'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø­Ø¬ÙˆØ²Ø§Øª':'Total Bookings'}</div><div class="stat-value">${data.totalBookings.toLocaleString()}</div></div>
    <div class="stat-card"><div class="stat-label">${isAr?'Ù…ØªÙˆØ³Ø· Ø§Ù„Ø¥Ø´ØºØ§Ù„':'Avg Occupancy'}</div><div class="stat-value">${data.avgOccupancy}%</div></div>
    <div class="stat-card red"><div class="stat-label">${isAr?'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ':'Total Expenses'}</div><div class="stat-value">${fmt(data.totalExpenses)}</div></div>
    <div class="stat-card green"><div class="stat-label">${isAr?'ØµØ§ÙÙŠ Ø§Ù„Ø£Ø±Ø¨Ø§Ø­':'Net Profit'}</div><div class="stat-value">${fmt(netProfit)}</div></div>
  </div>

  <h2>${isAr?'Ù…Ù‚Ø§Ø±Ù†Ø© Ø£Ø¯Ø§Ø¡ Ø§Ù„ÙØ±ÙˆØ¹':'Branch Performance Comparison'}</h2>
  <table>
    <thead>
      <tr>
        <th>${isAr?'Ø§Ù„ÙØ±Ø¹':'Branch'}</th>
        <th>${isAr?'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª':'Revenue'}</th>
        <th>${isAr?'Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ':'Expenses'}</th>
        <th>${isAr?'ØµØ§ÙÙŠ Ø§Ù„Ø±Ø¨Ø­':'Net Profit'}</th>
        <th>${isAr?'Ù‡Ø§Ù…Ø´ Ø§Ù„Ø±Ø¨Ø­':'Margin'}</th>
        <th>${isAr?'Ø§Ù„Ø¥Ø´ØºØ§Ù„':'Occupancy'}</th>
      </tr>
    </thead>
    <tbody>${branchRows}</tbody>
  </table>

  <h2>${isAr?'Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ù…Ø³ØªØ«Ù…Ø± Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©':'Key Investor KPIs'}</h2>
  <div class="kpi-grid">
    <div class="kpi-card"><div class="kpi-label">${isAr?'Ù‡Ø§Ù…Ø´ Ø§Ù„Ø±Ø¨Ø­ Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ':'Gross Profit Margin'}</div><div class="kpi-val">${data.profitMargin}%</div></div>
    <div class="kpi-card"><div class="kpi-label">${isAr?'Ù‚ÙŠÙ…Ø© Ø¹Ù…Ø± Ø§Ù„Ø¹Ù…ÙŠÙ„ (LTV)':'Customer LTV'}</div><div class="kpi-val">${fmt(1850)}</div></div>
    <div class="kpi-card"><div class="kpi-label">${isAr?'ØªÙƒÙ„ÙØ© Ø§ÙƒØªØ³Ø§Ø¨ Ø¹Ù…ÙŠÙ„ (CAC)':'CAC (Avg)'}</div><div class="kpi-val">${fmt(42)}</div></div>
    <div class="kpi-card"><div class="kpi-label">${isAr?'Ø§Ù„Ø¹Ø§Ø¦Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø± (ROI)':'Projected ROI'}</div><div class="kpi-val">42%</div></div>
  </div>

  <div class="footer">IL MAESTRO Â© ${new Date().getFullYear()} â€” ${isAr?'ØªÙ‚Ø±ÙŠØ± Ø³Ø±ÙŠ â€” Ù„Ù„Ø¥Ø¯Ø§Ø±Ø© ÙÙ‚Ø·':'Confidential â€” Management Only'}</div>
</div>

<!-- â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PAGE 2: BRANCH-BY-BRANCH DETAIL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<div class="page">
  <div class="header">
    <div class="logo">IL <span>MAESTRO</span></div>
    <div style="text-align:${isAr?'left':'right'}">
      <div style="font-size:10px;color:#A7ABB3;font-weight:700">${isAr?'ØªÙØµÙŠÙ„ ÙƒÙ„ ÙØ±Ø¹':'Branch-by-Branch Detail'}</div>
      <div style="font-size:12px;font-weight:900">${date}</div>
    </div>
  </div>
  <div class="tricolor"></div>

  <div class="page-label">${isAr?'Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ© â€” Ù‚Ø±Ø§Ø¡Ø© ØªÙØµÙŠÙ„ÙŠØ© Ù„ÙƒÙ„ ÙØ±Ø¹':'Page 2 â€” Detailed Branch Analysis'}</div>
  <h2>${isAr?'Ø§Ù„ØªÙ‚Ø±ÙŠØ± Ø§Ù„ØªÙØµÙŠÙ„ÙŠ Ù„ÙƒÙ„ ÙØ±Ø¹':'Detailed Per-Branch Report'}</h2>

  ${branchDetailCards}

  <div class="footer">IL MAESTRO Â© ${new Date().getFullYear()} â€” ${isAr?'Ø§Ù„ØªÙ‚Ø±ÙŠØ± Ø§Ù„ØªÙØµÙŠÙ„ÙŠ Ù„Ù„ÙØ±ÙˆØ¹':'Detailed Branch Report'}</div>
</div>

<!-- â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PAGE 3: STATS & IMPROVEMENT STRATEGIES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<div class="page">
  <div class="header">
    <div class="logo">IL <span>MAESTRO</span></div>
    <div style="text-align:${isAr?'left':'right'}">
      <div style="font-size:10px;color:#A7ABB3;font-weight:700">${isAr?'Ø§Ù„Ø¥Ø­ØµØ§Ø¡Ø§Øª ÙˆØ§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ§Øª':'Statistics & Strategies'}</div>
      <div style="font-size:12px;font-weight:900">${date}</div>
    </div>
  </div>
  <div class="tricolor"></div>

  <div class="page-label">${isAr?'Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø«Ø§Ù„Ø«Ø© â€” Ø§Ø­ØµØ§Ø¡Ø§Øª ÙˆØ§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ§Øª ØªØ­Ø³ÙŠÙ†':'Page 3 â€” Analytics & Improvement Strategies'}</div>

  <h2>${isAr?'Ø¥Ø­ØµØ§Ø¡Ø§Øª Ù…ÙˆØ³Ù‘Ø¹Ø©':'Extended Analytics'}</h2>
  <div class="summary-grid" style="grid-template-columns:repeat(5,1fr)">
    <div class="stat-card"><div class="stat-label">${isAr?'Ø£Ø¹Ù„Ù‰ ÙØ±Ø¹ Ø¥ÙŠØ±Ø§Ø¯Ø§Ù‹':'Top Revenue Branch'}</div><div class="stat-value" style="font-size:12px">${isAr?'Ø§Ù„Ø±ÙŠØ§Ø¶ â€” Ø·Ø±ÙŠÙ‚ Ø§Ù„Ù…Ù„Ùƒ':'Riyadh King Rd'}</div></div>
    <div class="stat-card red"><div class="stat-label">${isAr?'Ø£Ø¹Ù„Ù‰ Ù†Ø³Ø¨Ø© Ø¥Ø´ØºØ§Ù„':'Top Occupancy'}</div><div class="stat-value">90%</div></div>
    <div class="stat-card green"><div class="stat-label">${isAr?'Ù…Ø¹Ø¯Ù„ Ø§Ù„Ø¹ÙˆØ¯Ø©':'Retention Rate'}</div><div class="stat-value">73%</div></div>
    <div class="stat-card"><div class="stat-label">${isAr?'Ù…ØªÙˆØ³Ø· Ø§Ù„ÙØ§ØªÙˆØ±Ø©':'Avg Ticket'}</div><div class="stat-value">${fmt(75)}</div></div>
    <div class="stat-card"><div class="stat-label">${isAr?'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø£Ø¹Ø¶Ø§Ø¡':'Total Members'}</div><div class="stat-value">3,450</div></div>
  </div>

  <h2>${isAr?'Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ§Øª Ø§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­Ø©':'Proposed Improvement Strategies'}</h2>

  <div class="strategy-section">
    <div class="strategy-title">ðŸ’° ${isAr?'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª ÙˆØ§Ù„ØªØ³Ø¹ÙŠØ±':'Revenue & Pricing'}</div>
    ${isAr ? `
    <div class="strategy-item"><span class="strategy-dot"></span> Ø±ÙØ¹ Ø£Ø³Ø¹Ø§Ø± Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„ØªÙƒÙ…ÙŠÙ„ÙŠØ© (Ø­Ù…Ø§Ù… Ø±Ø£Ø³ / Ù‚Ù†Ø§Ø¹ ÙØ­Ù…) Ø¨Ù†Ø³Ø¨Ø© Ù¡Ù Ùª Ø¯ÙˆÙ† ØªØ£Ø«ÙŠØ± Ø¹Ù„Ù‰ Ø§Ù„Ø·Ù„Ø¨ â€” ØªØ£Ø«ÙŠØ± Ù…ØªÙˆÙ‚Ø¹: +Ù¡Ù¨,Ù Ù Ù  Ø±ÙŠØ§Ù„/Ø´Ù‡Ø±.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> ØªÙØ¹ÙŠÙ„ Ø¨Ø§Ù‚Ø© "Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ Ø§Ù„Ù…ØªØ¬Ø¯Ø¯" Ù„Ø£Ø¹Ø¶Ø§Ø¡ Silver Ø¨Ø®ØµÙ… Ù¡Ù¢Ùª Ù„ØªÙ‚Ù„ÙŠØµ dechurn ÙˆØ²ÙŠØ§Ø¯Ø© LTV Ø¨Ù…Ø¹Ø¯Ù„ Ù¤Ù Ùª.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> ØªØ­ÙˆÙŠÙ„ Ù¢Ù Ùª Ù…Ù† Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ø¹Ø§Ø¨Ø±ÙŠÙ† Ø¥Ù„Ù‰ Ø£Ø¹Ø¶Ø§Ø¡ Ø¹Ø¨Ø± Ø¹Ø±Ø¶ ØªØ¬Ø±ÙŠØ¨ÙŠ Ù…Ø¬Ø§Ù†ÙŠ Ø®Ù„Ø§Ù„ Ø§Ù„Ø²ÙŠØ§Ø±Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©.</div>
    ` : `
    <div class="strategy-item"><span class="strategy-dot"></span> Raise add-on prices (Head Spa / Charcoal Mask) by 10% â€” demand inelastic at this range. Impact: +18,000 SAR/mo.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Re-activate Silver subscription with 12% loyalty discount to cut churn and lift LTV by 40%.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Convert 20% of walk-in clients to members via free trial offer at 2nd visit.</div>
    `}
  </div>

  <div class="strategy-section">
    <div class="strategy-title">ðŸ‘¥ ${isAr?'Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ© ÙˆØ§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©':'HR & Academy'}</div>
    ${isAr ? `
    <div class="strategy-item"><span class="strategy-dot"></span> Ù…Ø¶Ø§Ø¹ÙØ© Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© Ù„Ù…Ø¯Ø© Ù£ Ø£Ø´Ù‡Ø± â€” Ø§Ù„Ù‡Ø¯Ù Ø±ÙØ¹ Ù…ØªÙˆØ³Ø· ØªÙ‚ÙŠÙŠÙ…Ø§Øª Ø§Ù„Ø­Ù„Ø§Ù‚ÙŠÙ† Ù…Ù† Ù¤.Ù¦ Ø¥Ù„Ù‰ Ù¤.Ù¨.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Ø±Ø¨Ø· Ù¡Ù¥Ùª Ù…Ù† Ø±Ø§ØªØ¨ Ù…Ø¯ÙŠØ± Ø§Ù„ÙØ±Ø¹ Ø¨Ù…Ø¤Ø´Ø± Ø±Ø¶Ø§ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø´Ù‡Ø±ÙŠØ§Ù‹ â€” ÙŠÙØ­Ø³Ù‘Ù† Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„ØªÙ„Ù‚Ø§Ø¦ÙŠ Ø¯ÙˆÙ† ØªÙƒÙ„ÙØ© Ø¥Ø¶Ø§ÙÙŠØ©.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Ù†Ù‚Ù„ Ø£ÙØ¶Ù„ Ø­Ù„Ø§Ù‚ÙŽÙŠÙ† Ù…Ù† ÙØ±Ø¹ Ø§Ù„Ø¹Ù„ÙŠØ§ Ø¥Ù„Ù‰ Ø§Ù„ÙØ±ÙˆØ¹ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© Ù„Ø¶Ù…Ø§Ù† Ø§Ù„Ø¬ÙˆØ¯Ø© ÙÙŠ Ù…Ø±Ø­Ù„Ø© Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.</div>
    ` : `
    <div class="strategy-item"><span class="strategy-dot"></span> Double internal academy sessions for 3 months â€” target: raise avg barber rating from 4.6 to 4.8.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Link 15% of Branch Manager salary to monthly NPS â€” drives organic performance without added cost.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Transfer top 2 barbers from Olaya to new branches to anchor quality during ramp-up phase.</div>
    `}
  </div>

  <div class="strategy-section">
    <div class="strategy-title">ðŸ“¦ ${isAr?'Ø§Ù„Ù…Ø®Ø²ÙˆÙ† ÙˆØ§Ù„Ù…Ø´ØªØ±ÙŠØ§Øª':'Inventory & Procurement'}</div>
    ${isAr ? `
    <div class="strategy-item"><span class="strategy-dot"></span> ØªÙˆØ­ÙŠØ¯ Ø§Ù„Ù…Ø´ØªØ±ÙŠØ§Øª Ø¹Ø¨Ø± Ù…Ø³ØªÙˆØ¯Ø¹ Ù…Ø±ÙƒØ²ÙŠ â€” Ø§Ù„ÙˆÙÙˆØ±Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: Ù¢Ù¢,Ù Ù Ù â€“Ù¢Ù¨,Ù Ù Ù  Ø±ÙŠØ§Ù„ Ø±Ø¨Ø¹ Ø³Ù†ÙˆÙŠØ§Ù‹.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> ØªÙ†Ø¨ÙŠÙ‡ ØªÙ„Ù‚Ø§Ø¦ÙŠ Ø¹Ù†Ø¯ ÙˆØµÙˆÙ„ Ø§Ù„ÙƒÙ…ÙŠØ© Ø¥Ù„Ù‰ Ù¢Ù  ÙˆØ­Ø¯Ø© â€” ÙŠÙ…Ù†Ø¹ Ø§Ù„Ø§Ù†Ù‚Ø·Ø§Ø¹ Ø§Ù„Ø­Ø±Ø¬ Ø§Ù„Ø°ÙŠ ØªÙƒØ±Ø± Ù£ Ù…Ø±Ø§Øª Ø®Ù„Ø§Ù„ Ø±Ø¨Ø¹ Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ù…Ø§Ø¶ÙŠ.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Ø§Ù„ØªÙØ§ÙˆØ¶ Ø¹Ù„Ù‰ Ø¹Ù‚ÙˆØ¯ Ø³Ù†ÙˆÙŠØ© Ù…Ø¹ Ù…ÙˆØ±Ø¯ÙŠ Davines Ùˆ Kemon Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø®ØµÙ… Ø­Ø¬Ù… Ø¨Ø­Ø¯ Ø£Ø¯Ù†Ù‰ Ù¡Ù¢Ùª.</div>
    ` : `
    <div class="strategy-item"><span class="strategy-dot"></span> Centralize procurement via single warehouse â€” projected savings: 22,000â€“28,000 SAR/quarter.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Auto-alert at 20-unit threshold â€” prevents critical stockouts that occurred 3x last quarter.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Negotiate annual contracts with Davines & Kemon for minimum 12% volume discount.</div>
    `}
  </div>

  <div class="strategy-section">
    <div class="strategy-title">ðŸ— ${isAr?'Ø§Ù„ØªÙˆØ³Ø¹ ÙˆÙØ±Øµ Ø§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø±':'Expansion & Investment'}</div>
    ${isAr ? `
    <div class="strategy-item"><span class="strategy-dot"></span> Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù‚ÙˆÙŠ Ù„ÙØ±Ø¹ Ø·Ø±ÙŠÙ‚ Ø§Ù„Ù…Ù„Ùƒ (Ø¥Ø´ØºØ§Ù„ Ù©Ù Ùª) ÙŠÙØ´ÙŠØ± Ø¥Ù„Ù‰ ÙØ±ØµØ© ÙØªØ­ ÙØ±Ø¹ Ø«Ø§Ù†Ù ÙÙŠ Ø§Ù„Ù…Ù†Ø·Ù‚Ø© Ø¨Ø¹Ø§Ø¦Ø¯ Ø§Ø³ØªØ«Ù…Ø§Ø± Ù…ØªÙˆÙ‚Ø¹ Ù¤Ù¢Ùª Ø®Ù„Ø§Ù„ Ù¢Ù¤ Ø´Ù‡Ø±Ø§Ù‹.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Ù†Ø¸Ø§Ù… Ø§Ù„Ø§Ù…ØªÙŠØ§Ø² (Franchise) Ø¬Ø§Ù‡Ø² Ù„Ù„Ø·Ø±Ø­ â€” Ù‡Ø§Ù…Ø´ Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø§Ù…ØªÙŠØ§Ø² Ø§Ù„Ø³Ù†ÙˆÙŠØ© ÙŠÙÙ‚Ø¯ÙŽÙ‘Ø± Ø¨Ù€ Ù¢Ù¨Ù ,Ù Ù Ù â€“Ù£Ù¥Ù ,Ù Ù Ù  Ø±ÙŠØ§Ù„ Ù„ÙƒÙ„ ÙØ±Ø¹.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> ÙØ±ØµØ© Ø§Ù„Ø§Ù†ØªØ´Ø§Ø± Ø§Ù„Ø±Ù‚Ù…ÙŠ: ØªØ·Ø¨ÙŠÙ‚ Ù…Ø§ÙŠØ³ØªØ±Ùˆ ÙŠÙÙ‚Ù„Ù„ ØªÙƒÙ„ÙØ© Ø§Ù„Ø§Ø³ØªØ­ÙˆØ§Ø° Ù…Ù† Ù¤Ù¢ Ø±ÙŠØ§Ù„ Ø¥Ù„Ù‰ Ù¡Ù¨ Ø±ÙŠØ§Ù„ Ø¹Ø¨Ø± Ø§Ù„Ø­Ø¬ÙˆØ²Ø§Øª Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø©.</div>
    ` : `
    <div class="strategy-item"><span class="strategy-dot"></span> King Road branch (90% occupancy) signals a 2nd location opportunity â€” projected ROI 42% within 24 months.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Franchise system ready to launch â€” annual franchise fee revenue estimated 280,000â€“350,000 SAR per branch.</div>
    <div class="strategy-item"><span class="strategy-dot"></span> Digital expansion: Maestro App cuts CAC from 42 SAR to 18 SAR via direct booking funnel.</div>
    `}
  </div>

  <div class="footer">IL MAESTRO Â© ${new Date().getFullYear()} â€” ${isAr?'Ø³Ø±ÙŠ â€” Ù„Ù„Ø¥Ø¯Ø§Ø±Ø© ÙˆØ§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ† ÙÙ‚Ø·':'Confidential â€” Management & Investors Only'} â€¢ ${date}</div>
</div>

</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank', 'width=900,height=700');
  if (win) { win.focus(); }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
};

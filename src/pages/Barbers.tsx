import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Star, MapPin, Award, Medal, ChevronRight } from 'lucide-react';
import { BARBERS, BRANCHES } from '@/data/demoDb';

// Stable avatar colors per barber index
const AVATAR_COLORS = [
  ['#B1262A', '#8E1D20'],
  ['#1F7A3F', '#155C2D'],
  ['#141518', '#2A2D34'],
  ['#6B2737', '#4A1A25'],
  ['#1B4F72', '#154060'],
  ['#4A235A', '#35174A'],
  ['#1A5276', '#144060'],
  ['#784212', '#5C3209'],
  ['#117A65', '#0D5C4E'],
  ['#B7950B', '#8E7109'],
];

export function Barbers() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [filter, setFilter] = useState<string>('all');

  // Build unique city list
  const cities: string[] = ['all'];
  BRANCHES.forEach(br => {
    if (!cities.includes(br.city)) cities.push(br.city);
  });

  // Filter barbers by city
  const filtered = BARBERS.filter(b => {
    if (filter === 'all') return true;
    const br = BRANCHES.find(x => x.id === b.branchId);
    return br ? br.city === filter : false;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F1', fontFamily: 'var(--font-arabic, Cairo, sans-serif)' }}>

      {/* ── HERO ── */}
      <div style={{ background: '#141518', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Italian side stripe */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 5, background: 'linear-gradient(to bottom, #1F7A3F, #B1262A)' }} />
        <div style={{ maxWidth: 800 }}>
          <p style={{ color: '#B1262A', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Montserrat, sans-serif' }}>
            IL MAESTRO — BARBIERE
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#fff', marginBottom: 16, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif', lineHeight: 1.1 }}>
            {isAr ? 'نخبة الحلاقين' : 'The Barber Roster'}
          </h1>
          <p style={{ color: '#A7ABB3', fontSize: 17, maxWidth: 520 }}>
            {isAr
              ? 'فريق من أكفأ الحلاقين في المملكة، مدرَّبون على المعايير الإيطالية.'
              : 'Curated masters trained to Italian grooming standards across all 6 branches.'}
          </p>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: '#1C1E22', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
          {[
            { n: isAr ? '١٠+' : '10+',  l: isAr ? 'حلاق' : 'Barbers' },
            { n: isAr ? '٤٫٨' : '4.8',  l: isAr ? 'تقييم وسطي' : 'Avg Rating' },
            { n: isAr ? '١٠٠٪' : '100%', l: isAr ? 'معتمدون' : 'Certified' },
          ].map((s, idx) => (
            <div key={idx}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#B1262A', fontFamily: 'Montserrat, sans-serif' }}>{s.n}</div>
              <div style={{ fontSize: 10, color: '#A7ABB3', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>

        {/* City Filter Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '8px 18px',
                
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                border: filter === c ? 'none' : '1px solid #E2E0DB',
                background: filter === c ? '#B1262A' : '#fff',
                color: filter === c ? '#fff' : '#141518',
                boxShadow: filter === c ? '0 4px 12px rgba(177,38,42,0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {c === 'all' ? (isAr ? 'الكل' : 'All Branches') : c}
            </button>
          ))}
        </div>

        {/* Barber Cards Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#A7ABB3' }}>
            {isAr ? 'لا يوجد حلاقون في هذا الفرع' : 'No barbers found in this branch'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {filtered.map((b, idx) => {
              const branch = BRANCHES.find(br => br.id === b.branchId);
              const name   = isAr ? b.nameAr : b.nameEn;
              const role   = isAr ? b.roleAr : b.roleEn;
              const [bgColor, bgDark] = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const initials = name.substring(0, 2).toUpperCase();

              const isMaster = b.roleEn === 'Master Barber' || b.roleEn === 'Artistic Director';
              const roleBadgeColor = isMaster ? '#B1262A' : '#1F7A3F';

              return (
                <div
                  key={b.id}
                  style={{
                    background: '#fff',
                    overflow: 'hidden',
                    border: '1px solid #E2E0DB',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Avatar Panel */}
                  <div style={{ height: 200, background: `linear-gradient(135deg, ${bgColor}, ${bgDark})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Big initials */}
                    <div style={{ fontSize: 56, fontWeight: 900, color: 'rgba(255,255,255,0.15)', fontFamily: 'Montserrat, sans-serif', userSelect: 'none', letterSpacing: -2 }}>
                      {initials}
                    </div>
                    {/* Scissors watermark */}
                    <div style={{ position: 'absolute', bottom: 12, right: 12, opacity: 0.15, fontSize: 32 }}>✂</div>

                    {/* Role badge */}
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      background: roleBadgeColor, color: '#fff',
                      padding: '4px 10px', 
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {role}
                    </div>

                    {/* Rating badge */}
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(20,21,24,0.85)', color: '#fff',
                      padding: '4px 10px',  fontSize: 12, fontWeight: 900,
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <Star style={{ width: 12, height: 12, fill: '#B1262A', color: '#B1262A' }} />
                      {b.rating}
                    </div>

                    {/* Italian tricolor bottom stripe */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, #1F7A3F 33%, #fff 33%, #fff 66%, #B1262A 66%)' }} />
                  </div>

                  {/* Info Panel */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: '#141518', margin: '0 0 12px', fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif' }}>
                      {name}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#A7ABB3' }}>
                        <MapPin style={{ width: 13, height: 13, color: '#B1262A', flexShrink: 0 }} />
                        <span>{branch ? (isAr ? branch.nameAr : branch.nameEn) : '—'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#A7ABB3' }}>
                        <Award style={{ width: 13, height: 13, color: '#1F7A3F', flexShrink: 0 }} />
                        <span>{b.exp} {isAr ? 'سنة خبرة' : 'yrs experience'}</span>
                      </div>
                      {isMaster && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#A7ABB3' }}>
                          <Medal style={{ width: 13, height: 13, color: '#B1262A', flexShrink: 0 }} />
                          <span>{isAr ? 'خبير معتمد' : 'Certified Expert'}</span>
                        </div>
                      )}
                    </div>

                    {/* Specialty Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, flex: 1 }}>
                      {b.spec.map((s, si) => (
                        <span
                          key={si}
                          style={{
                            display: 'inline-block',
                            fontSize: 10, fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.07em',
                            padding: '3px 8px', 
                            background: '#F3F3F1', color: '#1F7A3F',
                            border: '1px solid rgba(31,122,63,0.2)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Book CTA */}
                    <Link to="/book" style={{ display: 'block', textDecoration: 'none' }}>
                      <button
                        style={{
                          width: '100%', padding: '11px 16px',
                          background: '#141518', color: '#fff',
                          border: 'none', 
                          fontSize: 13, fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#B1262A')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#141518')}
                      >
                        {isAr ? 'احجز معه' : 'Book Now'}
                        <ChevronRight style={{ width: 15, height: 15 }} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{ background: '#141518', padding: '64px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #1F7A3F, #B1262A)' }} />
        <p style={{ color: '#B1262A', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Montserrat, sans-serif' }}>IL MAESTRO</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', marginBottom: 12, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif' }}>
          {isAr ? 'حلاقك ينتظرك' : 'Your Barber Is Waiting'}
        </h2>
        <p style={{ color: '#A7ABB3', marginBottom: 32, fontSize: 15 }}>
          {isAr ? 'احجز موعدك في أقل من دقيقة.' : 'Book your appointment in under 60 seconds.'}
        </p>
        <Link to="/book">
          <button
            style={{
              padding: '14px 48px', background: '#B1262A',
              color: '#fff', border: 'none', 
              fontSize: 15, fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(177,38,42,0.35)',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}
          >
            {isAr ? 'احجز الآن' : 'BOOK NOW'}
          </button>
        </Link>
      </div>
    </div>
  );
}

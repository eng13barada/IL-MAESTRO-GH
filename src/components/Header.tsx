import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/stores/useAppStore';
import { useCommerceStore } from '@/stores/useCommerceStore';
import { ShoppingBag, ChevronDown, Grid2x2 } from 'lucide-react';

const NAV_FONT = "'Noto Kufi Arabic', 'Montserrat', sans-serif";

// ─── All subpages for the mobile shortcut grid ─────────────────────────────
const ALL_PAGES = [
  { k: 'home',        p: '/',            icon: '🏠' },
  { k: 'services',    p: '/services',    icon: '✂️' },
  { k: 'packages',    p: '/packages',    icon: '📦' },
  { k: 'memberships', p: '/memberships', icon: '👑' },
  { k: 'branches',    p: '/branches',    icon: '📍' },
  { k: 'barbers',     p: '/barbers',     icon: '💈' },
  { k: 'offers',      p: '/offers',      icon: '🎁' },
  { k: 'opportunity', p: '/opportunity', icon: '💡' },
  { k: 'club',        p: '/club',        icon: '🔴' },
  { k: 'book',        p: '/book',        icon: '📅' },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();
  const { cart } = useCommerceStore();
  const location = useLocation();

  // Mobile state
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const [gridMenuOpen, setGridMenuOpen] = useState(false);

  const toggleLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    setLocale(next);
    i18n.changeLanguage(next);
    document.documentElement.dir  = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  const mainNavs = [
    { k: 'home',        p: '/' },
    { k: 'services',    p: '/services' },
    { k: 'packages',    p: '/packages' },
    { k: 'memberships', p: '/memberships' },
    { k: 'branches',    p: '/branches' },
    { k: 'barbers',     p: '/barbers' },
    { k: 'offers',      p: '/offers' },
  ];

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const activeStyle = { color: '#ffffff', borderBottom: '2px solid #ffffff', background: 'rgba(255,255,255,0.10)' };
  const inactiveStyle = { color: 'rgba(255,255,255,0.80)', borderBottom: '2px solid transparent', background: 'transparent' };

  // Close both mobile menus
  const closeAll = () => {
    setBrandMenuOpen(false);
    setGridMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          height: '60px',
          background: 'rgba(8, 38, 18, 0.93)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 32px rgba(4,20,10,0.55)',
        }}
      >
        {/* Italian tricolor stripe */}
        <div className="h-[2px]" style={{background:'linear-gradient(to right, #155C28 33.3%, rgba(255,255,255,0.45) 33.3% 66.6%, #7A161A 66.6%)'}} />

        {/* ═══════════════════════════════════════════════════════
            MOBILE LAYOUT  (< md)
        ═══════════════════════════════════════════════════════ */}
        <div className="flex md:hidden items-center h-[58px] px-3 gap-2 w-full">

          {/* LEFT: Brand name button → opens dropdown */}
          <button
            onClick={() => { setBrandMenuOpen(v => !v); setGridMenuOpen(false); }}
            className="flex items-center gap-1.5 shrink-0"
            aria-label="Brand menu"
            aria-expanded={brandMenuOpen}
          >
            <div
              className="w-8 h-8 flex items-center justify-center font-black text-sm text-white shrink-0"
              style={{ background: '#7A161A', fontFamily: 'Montserrat,sans-serif' }}
            >
              IM
            </div>
            <span
              className="font-black text-[14px] tracking-tight text-white"
              style={{ fontFamily: 'Montserrat,sans-serif' }}
            >
              IL MAESTRO
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 text-white/70 transition-transform duration-200"
              style={{ transform: brandMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {/* CENTER: Pages shortcut pill */}
          <button
            onClick={() => { setGridMenuOpen(v => !v); setBrandMenuOpen(false); }}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 text-[11px] font-black border transition-all duration-200"
            style={{
              fontFamily: NAV_FONT,
              color: gridMenuOpen ? '#0d2e14' : '#ffffff',
              background: gridMenuOpen ? '#ffffff' : 'rgba(255,255,255,0.12)',
              borderColor: gridMenuOpen ? '#ffffff' : 'rgba(255,255,255,0.30)',
              letterSpacing: '0.04em',
            }}
            aria-label="Browse all pages"
            aria-expanded={gridMenuOpen}
          >
            <Grid2x2 className="w-3.5 h-3.5" />
            {locale === 'ar' ? 'تصفح الصفحات' : 'ALL PAGES'}
          </button>

          {/* RIGHT: Lang toggle + Cart */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={toggleLocale}
              className="w-8 h-8 flex items-center justify-center text-[11px] font-black border transition-colors"
              aria-label="Toggle language"
              style={{
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.10)',
                fontFamily: NAV_FONT,
              }}
            >
              {locale === 'ar' ? 'EN' : 'AR'}
            </button>

            <Link
              to="/cart"
              className="relative w-8 h-8 flex items-center justify-center"
              aria-label="Cart"
              onClick={closeAll}
              style={{ color: '#ffffff' }}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#7A161A] text-white text-[9px] font-black flex items-center justify-center leading-none rounded-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            DESKTOP LAYOUT  (≥ md) — COMPLETELY UNCHANGED
        ═══════════════════════════════════════════════════════ */}
        <div className="hidden md:flex w-full h-[58px] items-center px-4 lg:px-6 gap-3">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 bg-[#7A161A] text-white flex items-center justify-center font-black text-sm group-hover:bg-[#5C1015] transition-colors" style={{fontFamily:'Montserrat,sans-serif'}}>IM</div>
            <span className="font-black text-[15px] tracking-tight text-white hidden sm:block" style={{fontFamily:'Montserrat,sans-serif'}}>IL MAESTRO</span>
          </Link>

          {/* ── \"أبعاد الفرصة\" — special pill next to logo ── */}
          <Link
            to="/opportunity"
            className="hidden md:flex items-center px-3 py-1 text-[12px] font-black transition-all duration-150 shrink-0 border"
            style={{
              fontFamily: NAV_FONT,
              color: location.pathname === '/opportunity' ? '#155C28' : '#ffffff',
              background: location.pathname === '/opportunity' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.10)',
              borderColor: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.02em',
            }}
          >
            {t('nav.opportunity')}
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden xl:flex items-center gap-0 flex-1 justify-center">
            {mainNavs.map(n => {
              const active = location.pathname === n.p || (n.p !== '/' && location.pathname.startsWith(n.p));
              return (
                <Link
                  key={n.k}
                  to={n.p}
                  className="px-3 py-2 text-[13px] font-bold tracking-wide transition-all duration-150"
                  style={{ fontFamily: NAV_FONT, ...(active ? activeStyle : inactiveStyle) }}
                >
                  {t(`nav.${n.k}`)}
                </Link>
              );
            })}

            {/* Club — same font, red color */}
            <Link
              to="/club"
              className="px-3 py-2 text-[13px] font-black tracking-wide transition-all duration-150"
              style={{
                fontFamily: NAV_FONT,
                color: location.pathname === '/club' ? '#ffffff' : 'rgba(255,140,130,0.95)',
                borderBottom: location.pathname === '/club' ? '2px solid #7A161A' : '2px solid transparent',
                background: location.pathname === '/club' ? 'rgba(122,22,26,0.30)' : 'transparent',
              }}
            >
              {t('nav.club')}
            </Link>
          </nav>

          {/* ── RIGHT CONTROLS ── */}
          <div className="flex items-center gap-1 ml-auto rtl:ml-0 rtl:mr-auto shrink-0">

            <button
              onClick={toggleLocale}
              className="w-9 h-9 flex items-center justify-center transition-all duration-150 text-xs font-black"
              aria-label="Toggle language"
              style={{color:'rgba(255,255,255,0.85)', border:'1px solid rgba(255,255,255,0.25)', background:'rgba(255,255,255,0.08)', fontFamily:NAV_FONT}}
            >
              {locale === 'ar' ? 'EN' : 'AR'}
            </button>

            <Link
              to="/cart"
              className="relative w-9 h-9 flex items-center justify-center transition-all duration-150"
              aria-label="Cart"
              style={{color:'rgba(255,255,255,0.85)'}}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7A161A] text-white text-[9px] font-black flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden lg:flex items-center gap-1 border-l border-white/15 pl-3 ml-1 rtl:pr-3 rtl:mr-1 rtl:border-r rtl:border-l-0">
              <Link to="/customer" className="px-3 py-1.5 text-[12px] font-bold transition-all duration-150" style={{color:'rgba(255,255,255,0.80)',fontFamily:NAV_FONT}}>
                {t('nav.customer')}
              </Link>
              <Link to="/admin" className="hidden 2xl:block px-3 py-1.5 text-[12px] font-bold transition-all duration-150" style={{color:'rgba(255,255,255,0.80)',fontFamily:NAV_FONT}}>
                {t('nav.admin')}
              </Link>
            </div>

            <Link
              to="/book"
              className="ml-2 rtl:mr-2 hidden sm:flex items-center px-5 py-0 h-9 text-white text-[13px] font-black transition-all duration-150 tracking-wide"
              style={{background:'#7A161A', fontFamily:NAV_FONT}}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#5C1015'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#7A161A'}
            >
              {t('nav.book')}
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          MOBILE: Brand Dropdown Panel  (≥ md → hidden)
      ════════════════════════════════════════════════════════════ */}
      {brandMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}
      <div
        className="md:hidden fixed top-[60px] left-0 right-0 z-45 transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: brandMenuOpen ? '420px' : '0px',
          opacity: brandMenuOpen ? 1 : 0,
          pointerEvents: brandMenuOpen ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(4, 18, 10, 0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Brand header strip */}
          <div
            className="flex items-center gap-3 px-4 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.10)' }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center font-black text-sm text-white"
              style={{ background: '#7A161A', fontFamily: 'Montserrat,sans-serif' }}
            >
              IM
            </div>
            <div>
              <div className="text-white font-black text-[15px]" style={{ fontFamily: 'Montserrat,sans-serif' }}>
                IL MAESTRO
              </div>
              <div className="text-white/50 text-[11px] font-medium" style={{ fontFamily: NAV_FONT }}>
                {locale === 'ar' ? 'الحلاقة الإيطالية الراقية' : 'Premium Italian Barbering'}
              </div>
            </div>
          </div>

          {/* Nav links list */}
          <div className="py-2">
            {[...mainNavs, { k: 'opportunity', p: '/opportunity' }, { k: 'club', p: '/club' }].map(n => {
              const active = location.pathname === n.p || (n.p !== '/' && location.pathname.startsWith(n.p));
              return (
                <Link
                  key={n.k}
                  to={n.p}
                  onClick={closeAll}
                  className="flex items-center justify-between px-4 py-3.5 border-b transition-all duration-150"
                  style={{
                    borderColor: 'rgba(255,255,255,0.07)',
                    background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.75)',
                    fontFamily: NAV_FONT,
                  }}
                >
                  <span className="text-[14px] font-bold">{t(`nav.${n.k}`)}</span>
                  {active && (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: '#7A161A' }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Book CTA at bottom */}
            <Link
              to="/book"
              onClick={closeAll}
              className="flex items-center justify-center mx-4 my-3 py-3 text-white font-black text-[14px] tracking-wide transition-colors"
              style={{ background: '#7A161A', fontFamily: NAV_FONT }}
              onTouchStart={e => (e.currentTarget as HTMLElement).style.background = '#5C1015'}
              onTouchEnd={e => (e.currentTarget as HTMLElement).style.background = '#7A161A'}
            >
              {t('nav.book')}
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE: Pages Grid Panel  (≥ md → hidden)
      ════════════════════════════════════════════════════════════ */}
      {gridMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}
      <div
        className="md:hidden fixed top-[60px] left-0 right-0 z-45 transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: gridMenuOpen ? '500px' : '0px',
          opacity: gridMenuOpen ? 1 : 0,
          pointerEvents: gridMenuOpen ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(4, 18, 10, 0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div className="px-3 pt-3 pb-1">
            <p
              className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-3"
              style={{ fontFamily: NAV_FONT }}
            >
              {locale === 'ar' ? 'تصفح جميع الصفحات' : 'BROWSE ALL PAGES'}
            </p>
            <div className="grid grid-cols-3 gap-2 pb-4">
              {ALL_PAGES.map(page => {
                const active = location.pathname === page.p || (page.p !== '/' && location.pathname.startsWith(page.p));
                return (
                  <Link
                    key={page.k}
                    to={page.p}
                    onClick={closeAll}
                    className="flex flex-col items-center justify-center gap-1.5 py-3.5 border transition-all duration-150"
                    style={{
                      background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                      borderColor: active ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.12)',
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.70)',
                    }}
                  >
                    <span className="text-xl leading-none">{page.icon}</span>
                    <span
                      className="text-[11px] font-bold text-center leading-tight"
                      style={{ fontFamily: NAV_FONT }}
                    >
                      {t(`nav.${page.k}`)}
                    </span>
                    {active && (
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: '#7A161A' }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

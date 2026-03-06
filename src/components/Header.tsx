import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/stores/useAppStore';
import { useCommerceStore } from '@/stores/useCommerceStore';
import { ShoppingBag } from 'lucide-react';

const NAV_FONT = "'Noto Kufi Arabic', 'Montserrat', sans-serif";

export function Header() {
  const { t, i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();
  const { cart } = useCommerceStore();
  const location = useLocation();

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

  return (
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

      <div className="w-full h-[58px] flex items-center px-4 lg:px-6 gap-3">

        {/* ── LOGO ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 bg-[#7A161A] text-white flex items-center justify-center font-black text-sm group-hover:bg-[#5C1015] transition-colors" style={{fontFamily:'Montserrat,sans-serif'}}>IM</div>
          <span className="font-black text-[15px] tracking-tight text-white hidden sm:block" style={{fontFamily:'Montserrat,sans-serif'}}>IL MAESTRO</span>
        </Link>

        {/* ── "أبعاد الفرصة" — special pill next to logo ── */}
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
  );
}

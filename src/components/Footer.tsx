import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRANCHES } from '@/data/demoDb';
import { Mail, Phone, User, Scissors, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <footer
      className="relative min-h-screen flex flex-col text-white overflow-hidden"
      style={{background:'#0B0D10'}}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/footer-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          style={{filter:'grayscale(20%) contrast(1.1)'}}
        />
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(11,13,16,0.75) 0%, rgba(11,13,16,0.92) 60%, rgba(11,13,16,1) 100%)'}} />
        {/* Green tinted left/right panels */}
        <div className="absolute inset-y-0 left-0 w-1" style={{background:'#1F7A3F'}} />
        <div className="absolute inset-y-0 right-0 w-1" style={{background:'#B1262A'}} />
      </div>

      {/* Tricolor top strip */}
      <div className="relative z-10 h-[3px]" style={{background:'linear-gradient(to right, #1F7A3F 33.3%, rgba(255,255,255,0.5) 33.3% 66.6%, #B1262A 66.6%)'}} />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="container mx-auto px-6 py-20">

          {/* Brand Statement */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#1F7A3F]" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#B1262A] text-white flex items-center justify-center font-black text-base" style={{fontFamily:'Montserrat,sans-serif'}}>IM</div>
                <span className="font-black text-3xl tracking-tight text-white" style={{fontFamily:'Montserrat,sans-serif'}}>IL MAESTRO</span>
              </div>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#B1262A]" />
            </div>
            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed" style={{fontFamily:'Noto Kufi Arabic,sans-serif'}}>
              {isAr ? 'حيث يلتقي الأسلوب الإيطالي بروح الخليج — تجربة حلاقة لا تُنسى' : 'Where Italian craftsmanship meets Gulf elegance — an unforgettable grooming experience'}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Quick Links */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Scissors className="w-4 h-4 text-[#1F7A3F]" />
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1F7A3F]" style={{fontFamily:'Noto Kufi Arabic,Montserrat,sans-serif'}}>{t('footer.quick_links')}</h4>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { to: '/services',    label: t('nav.services') },
                  { to: '/packages',    label: t('nav.packages') },
                  { to: '/memberships', label: t('nav.memberships') },
                  { to: '/club',        label: t('nav.club') },
                  { to: '/offers',      label: t('nav.offers') },
                  { to: '/opportunity', label: t('nav.opportunity') },
                ].map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-[#1F7A3F] group-hover:bg-white transition-colors shrink-0" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Branches */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-4 h-4 text-[#1F7A3F]" />
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1F7A3F]" style={{fontFamily:'Noto Kufi Arabic,Montserrat,sans-serif'}}>{t('footer.branches_title')}</h4>
              </div>
              <ul className="space-y-3 text-sm">
                {BRANCHES.map(b => (
                  <li key={b.id}>
                    <Link to="/branches" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-[#B1262A] group-hover:bg-white transition-colors shrink-0" />
                      {isAr ? b.nameAr : b.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-4 h-4 text-[#1F7A3F]" />
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1F7A3F]" style={{fontFamily:'Noto Kufi Arabic,Montserrat,sans-serif'}}>{t('footer.contact')}</h4>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <User className="w-4 h-4 text-[#1F7A3F] shrink-0" />
                  <span className="font-bold text-white">م. محمد الموسى</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#1F7A3F] shrink-0" />
                  <a href="tel:+966567705504" className="text-white/70 hover:text-white transition-colors" dir="ltr">+966 567 705 504</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#1F7A3F] shrink-0 mt-0.5" />
                  <a href="mailto:architect.malmousa@gmail.com" className="text-white/70 hover:text-white transition-colors break-all">architect.malmousa@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Social + Book CTA */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 text-[#1F7A3F] flex items-center"><span className="text-base">✦</span></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1F7A3F]" style={{fontFamily:'Noto Kufi Arabic,Montserrat,sans-serif'}}>{isAr ? 'تواصل معنا' : 'Connect'}</h4>
              </div>
              <div className="flex gap-3 mb-8">
                {[
                  { icon: <Instagram className="w-4 h-4" />, href: '#' },
                  { icon: <Twitter className="w-4 h-4" />, href: '#' },
                  { icon: <Linkedin className="w-4 h-4" />, href: '#' },
                ].map((s, i) => (
                  <a key={i} href={s.href} className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/60 hover:border-[#1F7A3F] hover:text-[#1F7A3F] transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
              <Link
                to="/book"
                className="block w-full text-center py-3 text-sm font-black text-white tracking-widest transition-colors"
                style={{background:'#B1262A', fontFamily:'Noto Kufi Arabic,Montserrat,sans-serif'}}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#1F7A3F'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#B1262A'}
              >
                {isAr ? 'احجز موعدك الآن' : 'Book Your Appointment'}
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-3">
            <p style={{fontFamily:'Noto Kufi Arabic,sans-serif'}}>{t('footer.rights')}</p>
            <div className="flex gap-5">
              <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
              <Link to="/terms"   className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

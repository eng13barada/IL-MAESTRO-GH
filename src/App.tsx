import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAppStore } from '@/stores/useAppStore';

import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { Packages } from '@/pages/Packages';
import { Memberships } from '@/pages/Memberships';
import { Branches } from '@/pages/Branches';
import { Barbers } from '@/pages/Barbers';
import { Book } from '@/pages/Book';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { CheckoutSuccess } from '@/pages/CheckoutSuccess';
import { CustomerDashboard } from '@/pages/CustomerDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { Brand, Gallery } from '@/pages/StaticPages';
import { About, News, Privacy } from '@/pages/About';
import { Offers } from '@/pages/Offers';
import { Club } from '@/pages/Club';
import { Opportunity } from '@/pages/Opportunity';

const NotFound = () => <div className="min-h-screen pt-20 text-center flex items-center justify-center"><h1 className="text-4xl text-[#B1262A]">404 - Not Found</h1></div>;

export default function App() {
  const { locale, theme } = useAppStore();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.className = theme;
  }, [locale, theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`app min-h-screen flex flex-col bg-[#F3F3F1] text-[#141518] ${theme}`}>
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/:id" element={<Branches />} />
          <Route path="/barbers" element={<Barbers />} />
          <Route path="/barbers/:id" element={<Barbers />} />
          <Route path="/book" element={<Book />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/news" element={<News />} />
          <Route path="/club" element={<Club />} />
          <Route path="/opportunity" element={<Opportunity />} />
          <Route path="/about" element={<About />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

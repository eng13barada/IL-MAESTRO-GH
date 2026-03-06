import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '@/data/demoDb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { formatSar } from '@/lib/money';
import { ImageFactory } from '@/lib/imageFactory';
import { useCommerceStore } from '@/stores/useCommerceStore';

export function Services() {
  const { t } = useTranslation();
  const { addItem } = useCommerceStore();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: t('common.view_all') },
    { id: 'hair', label: t('services.hair') },
    { id: 'beard', label: t('services.beard') },
    { id: 'rituals', label: t('services.rituals') },
    { id: 'addons', label: t('services.addons') },
  ];

  const filtered = activeTab === 'all' ? SERVICES : SERVICES.filter(s => s.cat === activeTab);

  const ServiceList = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {filtered.map((s, i) => (
        <Card key={s.id} variant="default" className="overflow-hidden flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="h-48 relative overflow-hidden bg-[#1A1410]">
            <img src={ImageFactory.generateServiceCard(i, s.cat)} alt="" className="w-full h-full object-cover mix-blend-screen opacity-80" />
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4"><Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-[#0B0D10] font-bold shadow-sm">{formatSar(s.price)}</Badge></div>
            <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4"><Badge variant="default" className="text-[10px] uppercase shadow-md">{t(`services.${s.cat}`)}</Badge></div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#1A1410] mb-2">{t('locale') === 'ar' ? s.nameAr : s.nameEn}</h3>
            <p className="text-[#A7ABB3] text-sm mb-4 line-clamp-2 flex-grow">{t('locale') === 'ar' ? s.descAr : s.descEn}</p>
            <div className="flex items-center text-xs text-[#A7ABB3] mb-6 font-medium">
              <svg className="w-4 h-4 mr-1 rtl:ml-1 text-[#C8A45D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {s.duration} {t('common.min')}
            </div>
            <Button variant="secondary" className="w-full shadow-md" onClick={() => addItem({ id: s.id, type: 'service', nameEn: s.nameEn, nameAr: s.nameAr, price: s.price })}>
              {t('common.add_cart')}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B0D10] mb-4">{t('services.title')}</h1>
          <p className="text-xl text-[#A7ABB3]">{t('services.subtitle')}</p>
        </div>
        <Tabs tabs={categories.map(c => ({ ...c, content: ServiceList }))} defaultTab="all" onChange={setActiveTab} />
      </div>
    </div>
  );
}

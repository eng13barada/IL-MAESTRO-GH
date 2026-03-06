import { useTranslation } from 'react-i18next';
import { BRANCHES } from '@/data/demoDb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageFactory } from '@/lib/imageFactory';
import { MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Branches() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B0D10] mb-4">{t('branches.title')}</h1>
          <p className="text-xl text-[#A7ABB3] max-w-2xl mx-auto">{t('branches.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map((b, i) => (
            <Card key={b.id} className="overflow-hidden flex flex-col group border-[#E8E0D2] shadow-sm hover:shadow-xl hover:border-[#C8A45D] transition-all bg-white">
              <div className="h-48 relative bg-[#1A1410] overflow-hidden">
                <img src={ImageFactory.generateHeroTexture(i + 10)} alt="" className="w-full h-full object-cover mix-blend-screen opacity-50 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,13,16,0.9)] to-transparent" />
                <div className="absolute bottom-4 left-4 rtl:right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{t('locale') === 'ar' ? b.nameAr : b.nameEn}</h3>
                  <div className="flex items-center text-sm font-medium text-[#E8E0D2] opacity-90"><MapPin className="w-4 h-4 mr-1 rtl:ml-1 text-[#C8A45D] fill-current" /> {b.city}</div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm text-[#0B0D10] font-medium p-3 bg-[#F7F4EF] rounded-md border border-[#E8E0D2]">
                    <Clock className="w-5 h-5 mr-3 rtl:ml-3 text-[#C8A45D]" />
                    <span className="flex-grow">{t('branches.hours')}</span>
                    <span className="font-bold">{b.hours}</span>
                  </div>
                  <div className="flex items-center text-sm text-[#0B0D10] font-medium p-3 bg-[#F7F4EF] rounded-md border border-[#E8E0D2]">
                    <Users className="w-5 h-5 mr-3 rtl:ml-3 text-[#C8A45D]" />
                    <span className="flex-grow">{t('branches.chairs')}</span>
                    <Badge variant="outline" className="bg-white">{b.chairs}</Badge>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <Link to="/book" className="w-full"><Button variant="secondary" className="w-full shadow-md font-bold">{t('branches.book_branch')}</Button></Link>
                  <Button variant="outline" className="w-full bg-[#F7F4EF] text-[#A7ABB3] border-transparent hover:bg-[#E8E0D2]">{t('branches.get_directions')}</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

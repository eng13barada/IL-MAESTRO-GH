import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { ImageFactory } from '@/lib/imageFactory';

export function Brand() {
  const { t } = useTranslation();
  const colors = [ {n:'nero',h:'#0B0D10'},{n:'espresso',h:'#1A1410'},{n:'oro',h:'#C8A45D'},{n:'pietra',h:'#E8E0D2'},{n:'oliva',h:'#4D5B44'},{n:'cenere',h:'#A7ABB3'},{n:'offwhite',h:'#F7F4EF'} ];
  return (
    <div className="min-h-screen bg-[#F7F4EF] py-16">
      <div className="container px-4 mx-auto max-w-5xl"><h1 className="text-4xl font-extrabold text-[#0B0D10] mb-12">{t('brand.title')}</h1>
        <h2 className="text-2xl font-bold mb-6">{t('brand.colors')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
           {colors.map(c => (
              <Card key={c.n} className="overflow-hidden bg-white shadow-sm border-[#E8E0D2]">
                 <div className="h-24 w-full" style={{backgroundColor: c.h}}></div>
                 <div className="p-3"><p className="font-bold text-sm capitalize">{c.n}</p><p className="text-xs font-mono text-[#A7ABB3] uppercase">{c.h}</p></div>
              </Card>
           ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">{t('brand.typography')}</h2>
        <Card className="p-8 bg-white border-[#E8E0D2] shadow-sm mb-16 space-y-6">
           <div><p className="text-xs text-[#A7ABB3] font-mono mb-2">Display (H1)</p><h1 className="text-display">IL MAESTRO — إيل مايسترو</h1></div>
           <div><p className="text-xs text-[#A7ABB3] font-mono mb-2">Heading (H2)</p><h2 className="text-4xl font-bold">Quiet Luxury in Every Detail</h2></div>
           <div><p className="text-xs text-[#A7ABB3] font-mono mb-2">Body Text</p><p className="text-[#A7ABB3]">This is the standard body text used across all paragraphs and UI elements. The Arabic fallbacks to IBM Plex Sans Arabic for perfect RTL geometry.</p></div>
        </Card>
      </div>
    </div>
  );
}

export function Gallery() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F7F4EF] py-16">
      <div className="container px-4 mx-auto max-w-6xl"><h1 className="text-4xl font-extrabold text-[#C8A45D] mb-2">{t('gallery.title')}</h1><p className="text-white/60 mb-12">{t('gallery.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-4">
              <h3 className="font-bold text-xl text-white">Hero Textures</h3>
              <img src={ImageFactory.generateHeroTexture(1)} alt="" className="w-full h-48 object-cover"/>
              <img src={ImageFactory.generateHeroTexture(8)} alt="" className="w-full h-48 object-cover"/>
           </div>
           <div className="space-y-4">
              <h3 className="font-bold text-xl text-white">Barber Avatars</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[...Array(4)].map((_,i) => <img key={i} src={ImageFactory.generateAvatar(i+10, 'IM')} alt="" className="w-full h-auto aspect-square object-cover"/>)}
              </div>
           </div>
           <div className="space-y-4">
              <h3 className="font-bold text-xl text-white">Before / After Gallery</h3>
              <img src={ImageFactory.generateBeforeAfter(5, false)} alt="" className="w-full h-48 object-cover"/>
           </div>
        </div>
      </div>
    </div>
  );
}

export interface BrandTheme { background: string; card: string; text: string; }
export const demoThemes: Record<string, BrandTheme> = {
  dark:  { background: '#0B0D10', card: '#1A1410', text: '#F7F4EF' },
  light: { background: '#F3F3F1', card: '#FFFFFF',  text: '#141518' },
};

export const SERVICES = [
  { id: 's1',  cat: 'hair',    price: 40,  duration: 30, nameEn: 'Haircut',                nameAr: 'حلاقة رأس فقط',            descEn: 'A timeless precision cut tailored to your head shape.',   descAr: 'قصة دقيقة وكلاسيكية مصممة لتناسب شكل الرأس.'                        },
  { id: 's2',  cat: 'beard',   price: 40,  duration: 20, nameEn: 'Beard Trim',             nameAr: 'حلاقة ذقن فقط',            descEn: 'Sharpen lines and tame bulk for a structured look.',      descAr: 'تحديد خطوط اللحية وتخفيف الكثافة لمظهر أنيق.'                       },
  { id: 's3',  cat: 'hair',    price: 65,  duration: 45, nameEn: 'Hair & Beard Combo',     nameAr: 'حلاقة رأس مع ذقن',         descEn: 'The full Maestro signature experience.',                  descAr: 'تجربة مايسترو الكاملة والمتكاملة.'                                  },
  { id: 's4',  cat: 'hair',    price: 35,  duration: 40, nameEn: 'Hair Dye',               nameAr: 'صبغة شعر',                 descEn: 'Professional hair coloring using premium Italian dyes.',  descAr: 'صبغ احترافي للشعر باستخدام أجود الصبغات الإيطالية.'                },
  { id: 's5',  cat: 'rituals', price: 15,  duration: 15, nameEn: 'Hair Wash & Cold Towel', nameAr: 'حمام رأس مع فوطة باردة',   descEn: 'Refreshing hair wash concluded with a cold towel.',       descAr: 'غسيل شعر منعش يختتم بفوطة باردة.'                                  },
  { id: 's6',  cat: 'rituals', price: 15,  duration: 15, nameEn: 'Face Scrub',             nameAr: 'سنفرة',                    descEn: 'Exfoliating face scrub for fresh skin.',                  descAr: 'سنفرة وتنظيف للوجه لبشرة نقية ومنتعشة.'                            },
  { id: 's7',  cat: 'addons',  price: 20,  duration: 15, nameEn: 'Waxing',                 nameAr: 'ازالة شعر بالشمع',         descEn: 'Quick and painless waxing.',                              descAr: 'إزالة سريعة ومريحة للشعر بالشمع.'                                  },
  { id: 's8',  cat: 'addons',  price: 10,  duration: 15, nameEn: 'Blow-dry',               nameAr: 'استشوار',                  descEn: 'Professional blow-dry and styling.',                      descAr: 'تجفيف وتصفيف الاستشوار باحترافية.'                                 },
  { id: 's9',  cat: 'hair',    price: 35,  duration: 45, nameEn: 'Hair Straightening',     nameAr: 'فرد شعر',                  descEn: 'Professional hair straightening treatment.',              descAr: 'علاج فرد وتنعيم الشعر باحترافية وأمان.'                            },
];

export const BRANCHES = [
  { id: 'b1', nameEn: 'Riyadh Olaya',       nameAr: 'الرياض — العليا',       hours: '10 AM – 11 PM', chairs: 12, city: 'Riyadh',  phone: '+966 11 234 5678' },
  { id: 'b2', nameEn: 'Riyadh Hittin',      nameAr: 'الرياض — حطين',         hours: '10 AM – 11 PM', chairs: 8,  city: 'Riyadh',  phone: '+966 11 876 5432' },
  { id: 'b3', nameEn: 'Jeddah Al Rawdah',   nameAr: 'جدة — الروضة',          hours: '2 PM – 12 AM',  chairs: 10, city: 'Jeddah',  phone: '+966 12 111 2233' },
  { id: 'b4', nameEn: 'Dammam Corniche',    nameAr: 'الدمام — الكورنيش',     hours: '1 PM – 11 PM',  chairs: 6,  city: 'Dammam', phone: '+966 13 444 5566' },
  { id: 'b5', nameEn: 'Riyadh King Road',   nameAr: 'الرياض — طريق الملك',   hours: '10 AM – 11 PM', chairs: 10, city: 'Riyadh',  phone: '+966 11 667 7890' },
  { id: 'b6', nameEn: 'Khobar Waterfront',  nameAr: 'الخبر — الواجهة البحرية', hours: '12 PM – 12 AM', chairs: 8, city: 'Khobar',  phone: '+966 13 990 1122' },
];

export const BARBERS = [
  { id: 'br1', branchId: 'b1', nameEn: 'Omar S.',    nameAr: 'عمر س.',     roleEn: 'Master Barber',    roleAr: 'حلاق خبير', rating: 4.9, exp: 8,  spec: ['Fade', 'Beard'] },
  { id: 'br2', branchId: 'b1', nameEn: 'Tariq M.',   nameAr: 'طارق م.',    roleEn: 'Senior Barber',    roleAr: 'حلاق أول',  rating: 4.8, exp: 5,  spec: ['Classic', 'Ritual'] },
  { id: 'br3', branchId: 'b2', nameEn: 'Faisal A.',  nameAr: 'فيصل أ.',    roleEn: 'Barber',           roleAr: 'حلاق',      rating: 4.7, exp: 6,  spec: ['Fade', 'Color'] },
  { id: 'br4', branchId: 'b3', nameEn: 'Ahmad K.',   nameAr: 'أحمد ك.',    roleEn: 'Master Barber',    roleAr: 'حلاق خبير', rating: 4.9, exp: 12, spec: ['Scissor Work', 'Ritual'] },
  { id: 'br5', branchId: 'b2', nameEn: 'Khalid S.',  nameAr: 'خالد س.',    roleEn: 'Senior Barber',    roleAr: 'حلاق أول',  rating: 4.8, exp: 7,  spec: ['Taper', 'Ritual'] },
  { id: 'br6', branchId: 'b4', nameEn: 'Ali M.',     nameAr: 'علي م.',     roleEn: 'Barber',           roleAr: 'حلاق',      rating: 4.7, exp: 4,  spec: ['Classic', 'Color'] },
  { id: 'br7', branchId: 'b5', nameEn: 'Saad N.',    nameAr: 'سعد ن.',     roleEn: 'Master Barber',    roleAr: 'حلاق خبير', rating: 5.0, exp: 10, spec: ['Scissor', 'Beard'] },
  { id: 'br8', branchId: 'b6', nameEn: 'Yousef R.',  nameAr: 'يوسف ر.',    roleEn: 'Senior Barber',    roleAr: 'حلاق أول',  rating: 4.9, exp: 6,  spec: ['Fade', 'Scissor'] },
  { id: 'br9', branchId: 'b5', nameEn: 'Hassan T.',  nameAr: 'حسان ت.',    roleEn: 'Barber',           roleAr: 'حلاق',      rating: 4.6, exp: 3,  spec: ['Taper', 'Beard'] },
  { id: 'br10',branchId: 'b6', nameEn: 'Nasser B.',  nameAr: 'ناصر ب.',    roleEn: 'Artistic Director',roleAr: 'مدير فني',  rating: 5.0, exp: 15, spec: ['Color', 'Design', 'Ritual'] },
];

export const CUSTOMERS = [
  { id: 'c1', nameEn: 'Khalid Al Saud',     nameAr: 'خالد آل سعود',  tier: 'Black',  points: 1250 },
  { id: 'c2', nameEn: 'Mohammed R.',        nameAr: 'محمد ر.',        tier: 'Gold',   points: 840  },
  { id: 'c3', nameEn: 'Saud F.',            nameAr: 'سعود ف.',        tier: 'Silver', points: 320  },
  { id: 'c4', nameEn: 'Guest User',         nameAr: 'مستخدم زائر',   tier: 'None',   points: 0    },
];

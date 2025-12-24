import React from 'react';
import { SiteType } from '../types';
import { ShoppingBag, Search, User, Menu, Play, ArrowLeft, Heart, Share2, MoreHorizontal } from 'lucide-react';

interface SitePreviewProps {
  type: SiteType;
}

const BrowserFrame: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 mt-6 animate-fadeIn transition-all duration-500 hover:shadow-indigo-500/20">
    {/* Browser Header */}
    <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
      </div>
      <div className="flex-1 bg-white rounded-md h-6 mx-4 text-[10px] flex items-center px-2 text-slate-400 font-mono shadow-sm">
        https://your-website.com
      </div>
    </div>
    {/* Viewport */}
    <div className={`w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden relative ${color}`}>
      {children}
    </div>
  </div>
);

const NewsPreview = () => (
  <div className="w-full h-full bg-white text-slate-900 font-[Vazirmatn]">
    {/* Header */}
    <div className="h-12 border-b-4 border-red-600 flex items-center justify-between px-6 bg-white shadow-sm relative z-10">
      <div className="font-black text-xl tracking-tighter text-red-600">NEWS<span className="text-slate-900">24</span></div>
      <div className="flex gap-4 text-xs font-bold text-slate-500 hidden sm:flex">
        <span>سیاسی</span>
        <span>اقتصادی</span>
        <span className="text-red-600">فوری</span>
      </div>
      <Search className="w-4 h-4 text-slate-400" />
    </div>
    {/* Breaking News */}
    <div className="bg-slate-900 text-white text-xs py-1 px-4 flex items-center gap-2">
      <span className="bg-red-600 px-2 rounded-sm text-[10px] font-bold animate-pulse">فوری</span>
      <span className="truncate opacity-90">نرخ دلار در بازار امروز تغییر کرد...</span>
    </div>
    {/* Content Grid */}
    <div className="p-4 grid grid-cols-12 gap-4 h-full">
      <div className="col-span-8 space-y-2">
        <div className="w-full h-40 bg-slate-200 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
             <h3 className="text-white font-bold text-lg leading-tight group-hover:underline decoration-red-500">تیتر یک: تحولات بزرگ در تکنولوژی هوش مصنوعی</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
           <div className="h-20 bg-slate-100 rounded p-2 flex gap-2">
             <div className="w-16 h-full bg-slate-300 rounded shrink-0"></div>
             <div className="space-y-1">
               <div className="h-2 w-full bg-slate-300 rounded"></div>
               <div className="h-2 w-2/3 bg-slate-300 rounded"></div>
             </div>
           </div>
           <div className="h-20 bg-slate-100 rounded p-2 flex gap-2">
             <div className="w-16 h-full bg-slate-300 rounded shrink-0"></div>
             <div className="space-y-1">
               <div className="h-2 w-full bg-slate-300 rounded"></div>
               <div className="h-2 w-2/3 bg-slate-300 rounded"></div>
             </div>
           </div>
        </div>
      </div>
      <div className="col-span-4 space-y-2 border-r pr-2 border-slate-100">
        <div className="text-xs font-bold text-red-600 mb-1 border-b border-red-100 pb-1">پربازدیدترین‌ها</div>
        {[1, 2, 3].map(i => (
          <div key={i} className="text-[10px] text-slate-600 leading-snug border-b border-slate-50 pb-1">
            لورم ایپسوم متن ساختگی با تولید سادگی...
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ECommercePreview = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);
  
  const slides = [
    { 
      bg: "from-blue-600 to-indigo-700", 
      sub: "فروش ویژه", 
      title: "تخفیف ۵۰٪", 
      btnColor: "text-blue-600"
    },
    { 
      bg: "from-rose-500 to-pink-600", 
      sub: "کالکشن جدید", 
      title: "تابستانه ۱۴۰۳", 
      btnColor: "text-rose-600"
    },
    { 
      bg: "from-emerald-500 to-teal-600", 
      sub: "ارسال رایگان", 
      title: "خرید اول", 
      btnColor: "text-emerald-600"
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full h-full bg-slate-50 font-[Vazirmatn]">
    {/* Header */}
    <div className="h-14 bg-white shadow-sm flex items-center justify-between px-6 relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">S</div>
        <div className="hidden sm:block w-48 h-8 bg-slate-100 rounded-full"></div>
      </div>
      <div className="flex gap-3 text-slate-600">
        <User className="w-5 h-5" />
        <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center">2</span>
        </div>
      </div>
    </div>
    {/* Hero */}
    <div className="p-4 flex gap-4 h-[calc(100%-3.5rem)]">
      <div className="hidden sm:block w-1/4 space-y-2">
         <div className="h-8 w-full bg-white rounded shadow-sm"></div>
         <div className="h-8 w-full bg-white rounded shadow-sm"></div>
         <div className="h-8 w-full bg-white rounded shadow-sm"></div>
      </div>
      <div className="flex-1 space-y-4">
        
        {/* Carousel */}
        <div className={`w-full h-32 bg-gradient-to-r ${slides[slideIndex].bg} rounded-xl flex items-center justify-between px-8 text-white relative overflow-hidden transition-all duration-700`}>
           <div className="z-10 animate-fadeIn" key={slideIndex}>
             <div className="text-xs opacity-90 mb-1">{slides[slideIndex].sub}</div>
             <div className="font-black text-xl mb-3">{slides[slideIndex].title}</div>
             <div className={`bg-white ${slides[slideIndex].btnColor} text-[10px] px-3 py-1.5 rounded-full w-fit font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform`}>خرید کنید</div>
           </div>
           
           {/* Abstract Decoration */}
           <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none">
              <div className="absolute top-1/2 right-4 w-32 h-32 bg-white rounded-full blur-2xl -translate-y-1/2"></div>
           </div>

           {/* Indicators */}
           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
             {slides.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setSlideIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === slideIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                ></div>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 flex flex-col gap-2 group cursor-pointer hover:border-blue-300 transition-colors">
               <div className="w-full h-16 bg-slate-100 rounded-md self-center group-hover:scale-95 transition-transform relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50"></div>
               </div>
               <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
               <div className="flex justify-between items-center mt-auto">
                 <div className="h-2 w-1/3 bg-blue-200 rounded"></div>
                 <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm hover:bg-blue-700 transition-colors">+</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const BlogPreview = () => (
  <div className="w-full h-full bg-[#fdfbf7] text-stone-800 font-[Vazirmatn]">
    {/* Minimal Header */}
    <div className="h-16 flex flex-col items-center justify-center border-b border-stone-200">
      <div className="font-serif font-bold text-xl tracking-widest text-stone-900">NARRATIVE</div>
      <div className="text-[8px] text-stone-500 tracking-[0.2em] uppercase">Stories & Thoughts</div>
    </div>
    {/* Content */}
    <div className="max-w-3xl mx-auto p-6 flex gap-6">
      <div className="flex-1 space-y-3">
         <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">سبک زندگی</div>
         <h2 className="font-serif text-2xl font-bold leading-tight">چگونه مینیمال زندگی کنیم؟</h2>
         <p className="text-xs text-stone-500 leading-relaxed text-justify">
           در دنیای شلوغ امروز، پیدا کردن آرامش کار دشواری است. مینیمالیسم فقط درباره دور ریختن اشیا نیست، بلکه درباره...
         </p>
         <div className="flex items-center gap-2 pt-2">
            <div className="w-6 h-6 rounded-full bg-stone-300"></div>
            <div className="text-[9px] text-stone-400">نوشته شده توسط علی • خواندن ۵ دقیقه</div>
         </div>
      </div>
      <div className="w-1/3 h-40 bg-stone-200 rounded-sm overflow-hidden">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1499750310159-525446cc0d27?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>
      </div>
    </div>
  </div>
);

const CorporatePreview = () => (
  <div className="w-full h-full bg-white text-slate-800 font-[Vazirmatn]">
    {/* Professional Header */}
    <div className="h-12 flex items-center justify-between px-8 bg-white border-b border-slate-100">
      <div className="font-bold text-lg text-indigo-900 flex items-center gap-1">
        <div className="w-3 h-3 bg-indigo-600 rounded-sm rotate-45"></div>
        TECH CORP
      </div>
      <div className="flex gap-4 text-[10px] font-medium text-slate-500">
        <span>خدمات</span>
        <span>درباره ما</span>
        <span>تماس</span>
        <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">مشاوره رایگان</span>
      </div>
    </div>
    {/* Hero Section */}
    <div className="bg-slate-900 text-white p-8 flex items-center justify-between relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 space-y-3 max-w-[60%]">
        <h1 className="text-2xl font-black leading-tight">راهکارهای نوین برای <br/><span className="text-indigo-400">آینده کسب‌وکار شما</span></h1>
        <p className="text-[10px] text-slate-400 leading-relaxed">ما با استفاده از تکنولوژی‌های روز دنیا، فرآیندهای سازمانی شما را بهینه می‌کنیم.</p>
        <div className="flex gap-2 pt-2">
           <button className="bg-indigo-600 text-white text-[10px] px-3 py-1.5 rounded font-bold">شروع کنید</button>
           <button className="border border-slate-600 text-slate-300 text-[10px] px-3 py-1.5 rounded flex items-center gap-1">
             <Play className="w-2 h-2 fill-current" /> ویدیو معرفی
           </button>
        </div>
      </div>
      <div className="w-32 h-24 bg-slate-800 rounded-lg border border-slate-700 relative z-10 flex items-center justify-center">
         <div className="grid grid-cols-2 gap-2 opacity-50">
            <div className="w-8 h-8 bg-indigo-500/50 rounded"></div>
            <div className="w-8 h-8 bg-white/10 rounded"></div>
            <div className="w-8 h-8 bg-white/10 rounded"></div>
            <div className="w-8 h-8 bg-white/10 rounded"></div>
         </div>
      </div>
    </div>
    {/* Services Strip */}
    <div className="h-12 bg-slate-50 flex items-center justify-around px-8">
       {[1, 2, 3, 4].map(i => <div key={i} className="w-16 h-4 bg-slate-200 rounded grayscale opacity-50"></div>)}
    </div>
  </div>
);

const PortfolioPreview = () => (
  <div className="w-full h-full bg-zinc-900 text-white font-[Vazirmatn]">
    <div className="grid grid-cols-12 h-full">
      {/* Sidebar Navigation */}
      <div className="col-span-1 border-l border-zinc-800 flex flex-col items-center py-4 gap-6">
         <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center font-bold text-xs">MA</div>
         <div className="flex-1 flex flex-col gap-4 text-zinc-500">
           <Menu className="w-4 h-4" />
           <Search className="w-4 h-4" />
         </div>
         <div className="space-y-2">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
            <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
         </div>
      </div>
      
      {/* Main Content */}
      <div className="col-span-11 p-6 flex gap-6">
        <div className="flex-1 flex flex-col justify-center space-y-4">
           <div className="text-[10px] text-yellow-400 font-bold tracking-widest uppercase">طراح و توسعه‌دهنده</div>
           <h1 className="text-4xl font-black leading-none tracking-tight">خلاقیت <br/>بدون مرز.</h1>
           <p className="text-[10px] text-zinc-400 max-w-xs leading-relaxed">
             من مهدی هستم، متخصص طراحی رابط کاربری و خلق تجربه‌های دیجیتال که در ذهن می‌مانند.
           </p>
           <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold border-b border-yellow-400 pb-0.5 cursor-pointer">نمونه کارها</span>
              <ArrowLeft className="w-3 h-3 text-yellow-400" />
           </div>
        </div>
        
        {/* Gallery Grid (Masonry feel) */}
        <div className="w-1/2 grid grid-cols-2 gap-2">
           <div className="bg-zinc-800 rounded-lg overflow-hidden relative group">
             <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
           <div className="bg-zinc-700 rounded-lg translate-y-4"></div>
           <div className="bg-zinc-700 rounded-lg -translate-y-4"></div>
           <div className="bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

const SitePreview: React.FC<SitePreviewProps> = ({ type }) => {
  if (!type) return null;

  const renderPreview = () => {
    switch (type) {
      case 'NEWS': return <NewsPreview />;
      case 'ECOMMERCE': return <ECommercePreview />;
      case 'BLOG': return <BlogPreview />;
      case 'CORPORATE': return <CorporatePreview />;
      case 'PORTFOLIO': return <PortfolioPreview />;
      default: return null;
    }
  };

  return (
    <div className="w-full">
       <BrowserFrame color="">
         {renderPreview()}
       </BrowserFrame>
       <div className="flex justify-center mt-2 gap-2">
          <div className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold">طراحی ریسپانسیو</div>
          <div className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">SEO Friendly</div>
          <div className="bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">پنل فارسی</div>
       </div>
    </div>
  );
};

export default SitePreview;

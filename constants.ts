import { SiteType, TechStack } from './types';
import { 
  Newspaper, 
  ShoppingCart, 
  BookOpen, 
  Building2, 
  Briefcase,
  Share2,
  Bot,
  Workflow,
  MessageCircleCode,
  Mic,
  Video,
  Palette,
  Image as ImageIcon
} from 'lucide-react';

export const GEMINI_CHAT_MODEL = 'gemini-3-pro-preview';
export const GEMINI_SEARCH_MODEL = 'gemini-3-flash-preview';

// Prices are in Millions of Tomans
// Durations are in Working Days

export const SITE_TYPE_DETAILS: Record<SiteType, { 
  label: string; 
  icon: any; 
  baseMultiplier: number;
  addedDuration: number; // Days added to base
  hosting: import('./types').HostingInfo;
}> = {
  [SiteType.News]: { 
    label: 'سایت خبری / مجله‌ای', 
    icon: Newspaper, 
    baseMultiplier: 1.3,
    addedDuration: 5,
    hosting: {
      type: 'سرور مجازی اختصاصی (VPS)',
      space: '۴۰ گیگابایت NVMe',
      ram: '۸ گیگابایت رم اختصاصی',
      price: 5.8,
      reason: 'سایت‌های خبری ترافیک لحظه‌ای بالا دارند و نیازمند منابع اختصاصی برای جلوگیری از کندی هستند.'
    }
  },
  [SiteType.ECommerce]: { 
    label: 'فروشگاه اینترنتی', 
    icon: ShoppingCart, 
    baseMultiplier: 2.0,
    addedDuration: 10,
    hosting: {
      type: 'هاست ابری مخصوص ووکامرس',
      space: '۵۰ گیگابایت NVMe',
      ram: '۱۲ گیگابایت رم اختصاصی',
      price: 8.5,
      reason: 'برای پردازش سبد خرید، اتصال به درگاه و مدیریت هزاران محصول، قدرتمندترین زیرساخت الزامی است.'
    }
  },
  [SiteType.Blog]: { 
    label: 'وبلاگ شخصی / برندینگ', 
    icon: BookOpen, 
    baseMultiplier: 1.0,
    addedDuration: 2,
    hosting: {
      type: 'هاست لینوکس پرسرعت',
      space: '۵ گیگابایت SSD',
      ram: '۲ گیگابایت',
      price: 2.5,
      reason: 'یک هاست استاندارد و پرسرعت برای لود سریع مقالات و تصاویر وبلاگ کافی است.'
    }
  },
  [SiteType.Corporate]: { 
    label: 'شرکتی / خدماتی', 
    icon: Building2, 
    baseMultiplier: 1.5,
    addedDuration: 4,
    hosting: {
      type: 'هاست شرکتی (Business Cloud)',
      space: '۱۰ گیگابایت NVMe',
      ram: '۴ گیگابایت',
      price: 3.8,
      reason: 'پایداری بالا و امنیت ایمیل‌های سازمانی در هاست‌های بیزینس اولویت دارد.'
    }
  },
  [SiteType.Portfolio]: { 
    label: 'رزومه / نمونه‌کار', 
    icon: Briefcase, 
    baseMultiplier: 1.1,
    addedDuration: 3,
    hosting: {
      type: 'هاست اقتصادی بهینه',
      space: '۲ گیگابایت',
      ram: '۱ گیگابایت',
      price: 1.5,
      reason: 'فضای کافی برای آپلود تصاویر با کیفیت نمونه‌کارها با هزینه مناسب.'
    }
  },
};

export const TECH_STACK_DETAILS: Record<TechStack, { label: string; description: string; basePrice: number; baseDuration: number }> = {
  [TechStack.WordPress]: { 
    label: 'وردپرس اختصاصی (WordPress)', 
    description: 'پیاده‌سازی حرفه‌ای، بهینه‌سازی شده برای سرعت و امنیت، مناسب کسب‌وکارهای استاندارد.',
    basePrice: 15,
    baseDuration: 10 // Working days
  },
  [TechStack.NextJS]: { 
    label: 'کدنویسی اختصاصی (Next.js)', 
    description: 'معماری مدرن، پرفورمنس جهانی، امنیت Enterprise، مناسب پروژه‌های اسکیل‌بالا.',
    basePrice: 65,
    baseDuration: 30 // Working days
  }
};

export const GENERIC_EXTRAS: Record<keyof import('./types').Extras, { label: string; price: number; desc: string; duration: number }> = {
  uiux: { label: 'طراحی UI/UX اختصاصی (Figma)', price: 25, desc: 'طراحی و پروتوتایپ کامل قبل از اجرا', duration: 7 },
  multilingual: { label: 'زیرساخت چند زبانه', price: 12, desc: 'ترجمه ساختار و چیدمان چپ‌چین/راست‌چین', duration: 3 },
  content: { label: 'استراتژی و ورود محتوا', price: 8, desc: 'ورود ۲۰ محتوای سئو شده + ساختاردهی', duration: 4 },
  storage: { label: 'سرور دانلود مدیا (۱۰۰ گیگ)', price: 4.5, desc: 'فضای ایزوله برای ویدیو و پادکست', duration: 1 },
};

export const INITIAL_EXTRAS: import('./types').Extras = {
  uiux: false,
  multilingual: false,
  content: false,
  storage: false,
};

// --- Automation Options ---
export const AUTOMATION_OPTIONS: import('./types').AutomationOption[] = [
  {
    id: 'social-sync',
    title: 'اتوماسیون سوشال مدیا',
    price: 7.5,
    description: 'انتشار و زمان‌بندی خودکار پست‌ها در اینستاگرام، لینکدین و تلگرام.',
    icon: Share2
  },
  {
    id: 'ai-writer',
    title: 'سیستم تولید محتوا (AI)',
    price: 14.0,
    description: 'پایپ‌لاین هوشمند تولید مقاله با GPT-4 و انتشار خودکار با رعایت اصول سئو.',
    icon: Bot
  },
  {
    id: 'crm-sync',
    title: 'یکپارچه‌سازی CRM',
    price: 9.5,
    description: 'اتصال دوطرفه سایت به CRM (دیدار، پیام‌گستر، HubSpot) و همگام‌سازی مشتریان.',
    icon: Workflow
  },
  {
    id: 'ai-chatbot',
    title: 'چت‌بات هوشمند (RAG)',
    price: 22.0,
    description: 'ربات پاسخگو آموزش دیده روی داکیومنت‌های شرکت شما با قابلیت یادگیری.',
    icon: MessageCircleCode
  }
];

// --- Content Creation Services ---
export const CONTENT_CREATION_OPTIONS: import('./types').ContentCreationOption[] = [
  {
    id: 'brand-identity',
    title: 'برندینگ و لوگو (Premium)',
    price: 18.0,
    description: 'طراحی لوگو، تایپوگرافی، پالت رنگی و برند بوک جامع سازمانی.',
    icon: Palette
  },
  {
    id: 'promo-video',
    title: 'تیزر تبلیغاتی و موشن',
    price: 15.0,
    description: 'سناریو نویسی، ساخت و تدوین تیزر معرفی خدمات (تا ۹۰ ثانیه).',
    icon: Video
  },
  {
    id: 'voice-over',
    title: 'نریشن استودیویی',
    price: 5.0,
    description: 'ضبط صدای گوینده حرفه‌ای برای ویدیوها و خوش‌آمدگویی سایت.',
    icon: Mic
  },
  {
    id: 'ai-visuals',
    title: 'پکیج گرافیک و بنر',
    price: 7.0,
    description: 'طراحی ست کامل بنرهای سایت و اسلایدرها با کیفیت بالا.',
    icon: ImageIcon
  }
];

// --- WordPress Specific Data ---

// Common essential plugins for almost all WP sites
const COMMON_WP_PLUGINS: import('./types').Plugin[] = [
  { id: 'elementor-pro', name: 'لایسنس المنتور پرو (Elementor Pro)', price: 4.5, description: 'به همراه طراحی تم اختصاصی', isMandatory: true },
  { id: 'wp-rocket', name: 'کانفیگ سرعت (WP Rocket)', price: 3.0, description: 'بهینه‌سازی دیتابیس و کشینگ پیشرفته', isMandatory: true },
  { id: 'security-pro', name: 'پکیج امنیت (Security Config)', price: 4.0, description: 'کانفیگ فایروال، ضد هک و مانیتورینگ', isMandatory: true },
  { id: 'seo-pro', name: 'سئو تکنیکال (RankMath Setup)', price: 5.5, description: 'اسکیما، نقشه سایت و تنظیمات گوگل', isMandatory: true },
];

export const WORDPRESS_PLUGINS_BY_TYPE: Record<SiteType, import('./types').Plugin[]> = {
  [SiteType.ECommerce]: [
    ...COMMON_WP_PLUGINS,
    { id: 'woodmart-theme', name: 'قالب فروشگاهی اورجینال', price: 3.5, description: 'خرید لایسنس و شخصی‌سازی کامل', isMandatory: true },
    { id: 'woo-core', name: 'راه‌اندازی ووکامرس', price: 0.0, description: 'تنظیمات مالیات، واحد پولی و انبار', isMandatory: true },
    { id: 'payment-gateway', name: 'اتصال درگاه بانکی', price: 1.5, description: 'دریافت اینماد و تست تراکنش', isMandatory: true },
    { id: 'shipping-pro', name: 'سیستم حمل‌ونقل پیشرفته', price: 2.5, description: 'اتصال به پست/تیپاکس/الوپیک', isMandatory: false },
    { id: 'torob-api', name: 'اتصال به مارکت‌پلیس‌ها', price: 2.0, description: 'فید خودکار برای ترب و ایمالز', isMandatory: false },
    { id: 'sms-panel', name: 'سیستم اطلاع‌رسانی پیامک', price: 1.8, description: 'پترن‌های خدماتی کاوه نگار/ملی پیامک', isMandatory: false },
  ],
  [SiteType.News]: [
    ...COMMON_WP_PLUGINS,
    { id: 'jannah-theme', name: 'قالب خبری پیشرفته', price: 3.0, description: 'چیدمان حرفه‌ای بلوک‌های خبری', isMandatory: true },
    { id: 'auto-post', name: 'ربات خبرخوان (News Scraper)', price: 4.5, description: 'جمع‌آوری هوشمند اخبار از منابع', isMandatory: false },
    { id: 'ad-manager', name: 'سیستم مدیریت تبلیغات', price: 2.0, description: 'جایگاه‌های بنر و تبلیغات کلیکی', isMandatory: false },
    { id: 'amp-pro', name: 'نسخه موبایل (Google AMP)', price: 2.5, description: 'لود آنی در نتایج گوگل موبایل', isMandatory: false },
  ],
  [SiteType.Corporate]: [
    ...COMMON_WP_PLUGINS,
    { id: 'corporate-theme', name: 'قالب شرکتی پرمیوم', price: 2.5, description: 'طراحی رسمی مطابق رنگ سازمانی', isMandatory: true },
    { id: 'gravity-forms', name: 'فرم‌ساز پیشرفته (Gravity)', price: 2.5, description: 'طراحی فرم‌های استخدام و سفارش پیچیده', isMandatory: true },
    { id: 'live-chat', name: 'سیستم پشتیبانی آنلاین', price: 1.5, description: 'اتصال به CRM و پاسخگویی', isMandatory: false },
    { id: 'portfolio-addon', name: 'ماژول پروژه‌ها', price: 1.5, description: 'نمایش حرفه‌ای سوابق کاری', isMandatory: false },
  ],
  [SiteType.Portfolio]: [
    ...COMMON_WP_PLUGINS,
    { id: 'portfolio-theme', name: 'قالب پورتفولیو', price: 2.0, description: 'تمرکز بر نمایش بصری آثار', isMandatory: true },
    { id: 'gallery-pro', name: 'گالری و لایت‌باکس پرو', price: 1.8, description: 'فیلترینگ و نمایش باکیفیت', isMandatory: true },
    { id: 'download-manager', name: 'فروش فایل دیجیتال', price: 1.5, description: 'برای فروش طرح‌ها و فایل‌ها', isMandatory: false },
  ],
  [SiteType.Blog]: [
    ...COMMON_WP_PLUGINS,
    { id: 'blog-theme', name: 'قالب وبلاگی استاندارد', price: 2.0, description: 'تایپوگرافی خوانا و چیدمان مینیمال', isMandatory: true },
    { id: 'table-contents', name: 'بهینه‌سازی تجربه خواندن', price: 1.0, description: 'فهرست خودکار و زمان مطالعه', isMandatory: true },
    { id: 'newsletter', name: 'سیستم ایمیل مارکتینگ', price: 2.5, description: 'جمع‌آوری لید و ارسال خبرنامه', isMandatory: false },
  ]
};

// --- Support Packages ---

export const SUPPORT_PACKAGES: import('./types').SupportPackage[] = [
  {
    id: 'basic',
    title: 'پشتیبانی نقره‌ای',
    price: 12.0, 
    features: [
      'آپدیت ماهانه هسته و پلاگین‌ها',
      'پاسخگویی تیکت (۲۴ ساعته)',
      'مانیتورینگ آپتایم و امنیت',
      'مدت زمان: ۱ سال'
    ]
  },
  {
    id: 'pro',
    title: 'پشتیبانی طلایی',
    price: 28.0,
    recommended: true,
    features: [
      'تمام موارد پلن نقره‌ای',
      'بکاپ‌گیری روزانه در سرور جداگانه',
      'اسکن امنیتی هفتگی و رفع آلودگی',
      'پاسخگویی تلفنی و واتساپ',
      '۵ ساعت تغییرات فنی/گرافیکی در ماه'
    ]
  },
  {
    id: 'vip',
    title: 'پشتیبانی الماس (VIP)',
    price: 65.0,
    features: [
      'اختصاص یک نیروی فنی پشتیبان',
      'مانیتورینگ لحظه‌ای (Real-time)',
      'بهینه‌سازی مداوم سرعت (Core Web Vitals)',
      'پشتیبانی اضطراری ۲۴/۷ (حتی تعطیلات)',
      'ورود محتوا و مدیریت محصولات',
      'جلسات ماهانه استراتژی و مشاوره'
    ]
  }
];
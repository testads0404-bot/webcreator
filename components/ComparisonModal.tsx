import React from 'react';
import { X, CheckCircle, XCircle, Code, Layers } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800">مقایسه تخصصی</h2>
            <p className="text-slate-500 text-sm">وردپرس یا کدنویسی اختصاصی (Next.js)؟</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* WordPress Column */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">وردپرس (WordPress)</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">اقتصادی و محبوب</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm">مزایا:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>هزینه راه‌اندازی بسیار پایین‌تر (حدود ۳ تا ۵ برابر ارزان‌تر)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>زمان تحویل بسیار سریع (۱ تا ۳ هفته)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>پنل مدیریت آسان و فارسی بدون نیاز به دانش کدنویسی</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>وجود هزاران افزونه آماده برای توسعه امکانات</span>
                </li>
              </ul>

              <h4 className="font-bold text-slate-700 text-sm mt-6">معایب:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>امنیت پایین‌تر در صورت عدم به‌روزرسانی مداوم</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>سرعت کمتر نسبت به کدنویسی اختصاصی (در پروژه‌های سنگین)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>محدودیت در پیاده‌سازی دیزاین‌های خیلی خاص و انیمیشنی</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Coding Column */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">کدنویسی (Next.js)</h3>
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">حرفه‌ای و مقیاس‌پذیر</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm">مزایا:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>سرعت فوق‌العاده بالا و بهینه برای گوگل (SEO عالی)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>امنیت بسیار بالا (Close to Unhackable)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>بدون هیچ محدودیتی در طراحی و پیاده‌سازی ایده‌ها</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>مناسب برای استارتاپ‌ها و پروژه‌های بزرگ با ترافیک بالا</span>
                </li>
              </ul>

              <h4 className="font-bold text-slate-700 text-sm mt-6">معایب:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>هزینه بالا (نیاز به تیم برنامه‌نویسی متخصص)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>زمان توسعه طولانی‌تر (۱ ماه به بالا)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>وابستگی فنی به شرکت یا برنامه‌نویس برای تغییرات</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <p className="text-center text-slate-600 font-medium">
            <span className="text-indigo-600 font-bold">نتیجه‌گیری:</span> اگر بودجه محدود دارید یا سایت استاندارد می‌خواهید، <span className="underline decoration-blue-400 decoration-2 underline-offset-2">وردپرس</span> بهترین گزینه است. اگر بودجه کافی دارید و یک محصول خاص و یونیک می‌خواهید، <span className="underline decoration-indigo-400 decoration-2 underline-offset-2">کدنویسی اختصاصی</span> را انتخاب کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;

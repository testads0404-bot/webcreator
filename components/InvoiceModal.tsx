import React, { useState } from 'react';
import { X, Copy, Download, Phone, BadgeCheck, Send, Check } from 'lucide-react';
import { CalculatorState } from '../types';
import { SITE_TYPE_DETAILS, TECH_STACK_DETAILS, CONTENT_CREATION_OPTIONS } from '../constants';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CalculatorState;
  priceData: {
    total: number;
    items: { name: string; value: number }[];
  };
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, state, priceData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
  const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}-1403`;

  const generateInvoiceText = () => {
    const itemsList = priceData.items.map(item => `▫️ ${item.name}: ${item.value} میلیون تومان`).join('\n');
    const siteType = state.siteType ? SITE_TYPE_DETAILS[state.siteType].label : '---';
    const tech = state.techStack ? TECH_STACK_DETAILS[state.techStack].label : '---';
    
    return `
🧾 پیش‌فاکتور آنلاین - WebCreator
📅 تاریخ: ${today}
🏷 شماره: ${invoiceNumber}

📌 خلاصه پروژه:
نوع سایت: ${siteType}
تکنولوژی: ${tech}

📋 لیست خدمات انتخاب شده:
${itemsList}

💰 مبلغ کل برآورد شده: ${priceData.total} میلیون تومان

--------------------------------
📞 جهت دریافت فاکتور رسمی و قرارداد تماس بگیرید:
تلگرام: @holdingansariir
تلفن: 09175980917
وبسایت: www.webcreator.ir
`.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateInvoiceText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateInvoiceText();
    // Add Byte Order Mark (\uFEFF) so Windows Notepad recognizes UTF-8 properly
    const blob = new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WebCreator-Invoice-${Math.floor(Math.random() * 1000)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div 
        className="relative w-full max-w-3xl bg-white min-h-[80vh] max-h-[90vh] overflow-y-auto rounded-none sm:rounded-lg shadow-2xl animate-fadeIn"
      >
        {/* Toolbar */}
        <div className="sticky top-0 bg-slate-800 text-white p-4 flex justify-between items-center z-10">
          <h2 className="font-bold flex items-center gap-2">
            <span className="bg-emerald-500 text-xs px-2 py-1 rounded text-slate-900">پیش‌فاکتور رسمی</span>
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy} 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'کپی شد' : 'کپی متن'}
            </button>
            <button 
              onClick={handleDownload} 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              دانلود فایل
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 md:p-12 text-slate-800 bg-white" dir="rtl">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-black text-xl rounded">W</div>
                 <h1 className="text-2xl font-black tracking-tight">گروه توسعه WebCreator</h1>
              </div>
              <div className="text-sm text-slate-500 font-medium">مشاوره، طراحی و توسعه راهکارهای دیجیتال</div>
            </div>
            <div className="text-left space-y-1">
              <div className="text-sm font-bold text-slate-900">تاریخ: {today}</div>
              <div className="text-sm text-slate-500">شماره: {invoiceNumber}</div>
              <div className="text-sm text-slate-500">اعتبار: ۷ روز</div>
            </div>
          </div>

          {/* Client & Project Info */}
          <div className="grid grid-cols-2 gap-8 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">اطلاعات کارفرما</h3>
              <div className="font-bold text-lg">مهمان گرامی</div>
              <div className="text-sm text-slate-500 mt-1">درخواست ثبت شده از طریق محاسبه‌گر آنلاین</div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">خلاصه پروژه</h3>
              <div className="font-bold text-lg">
                {state.siteType ? SITE_TYPE_DETAILS[state.siteType].label : 'مشخص نشده'}
              </div>
              <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                 <BadgeCheck className="w-4 h-4 text-indigo-600" />
                 {state.techStack ? TECH_STACK_DETAILS[state.techStack].label : 'تکنولوژی نامشخص'}
              </div>
            </div>
          </div>

          {/* Line Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-right py-3 text-sm font-black text-slate-600">شرح خدمات</th>
                <th className="text-left py-3 text-sm font-black text-slate-600">مبلغ (میلیون تومان)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priceData.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-4 text-sm font-medium text-slate-700">{item.name}</td>
                  <td className="py-4 text-left text-sm font-bold text-slate-900">{item.value.toLocaleString('fa-IR')}</td>
                </tr>
              ))}
              
              {/* Detailed Breakdown Rows (Hidden from simple chart logic but useful here) */}
              {state.selectedContentServices.map(id => {
                 const opt = CONTENT_CREATION_OPTIONS.find(o => o.id === id);
                 if(!opt) return null;
                 return (
                    <tr key={id} className="bg-rose-50/50">
                      <td className="py-2 px-2 text-xs text-rose-700 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                         {opt.title}
                      </td>
                      <td className="py-2 px-2 text-left text-xs text-rose-700">{opt.price}</td>
                    </tr>
                 )
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-full sm:w-1/2 bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-2 opacity-80 text-sm">
                <span>جمع کل خدمات</span>
                <span>{priceData.total} م.ت</span>
              </div>
              <div className="flex justify-between items-center mb-4 opacity-80 text-sm">
                <span>مالیات (۰٪)</span>
                <span>۰</span>
              </div>
              <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">مبلغ قابل پرداخت</span>
                <span className="font-black text-3xl text-emerald-400">{priceData.total.toLocaleString('fa-IR')} <span className="text-sm font-normal text-white">میلیون تومان</span></span>
              </div>
            </div>
          </div>

          {/* Features / Details */}
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 mb-12">
             <div className="space-y-1">
               <h4 className="font-bold text-slate-700 mb-2">تعهدات فنی:</h4>
               <p>• کدنویسی استاندارد و بهینه (Clean Code)</p>
               <p>• رعایت اصول اولیه سئو (Technical SEO)</p>
               <p>• طراحی ریسپانسیو (موبایل و تبلت)</p>
             </div>
             <div className="space-y-1">
               <h4 className="font-bold text-slate-700 mb-2">شرایط پرداخت:</h4>
               <p>• ۵۰٪ پیش پرداخت جهت شروع پروژه</p>
               <p>• ۳۰٪ پس از تایید طرح گرافیکی</p>
               <p>• ۲۰٪ پس از تحویل نهایی و آموزش</p>
             </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400">
             <div className="flex gap-4 text-sm font-bold text-indigo-600">
                <span className="flex items-center gap-2" style={{ direction: 'ltr' }}><Send className="w-4 h-4 -rotate-90" /> تلگرام : @holdingansariir</span>
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> 0917-598-0917</span>
             </div>
             <div className="text-xs">
               این سند صرفاً یک برآورد سیستمی است و فاقد ارزش قانونی بدون مهر می‌باشد.
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
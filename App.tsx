import React, { useState, useMemo, useEffect } from 'react';
import { 
  CalculatorState, 
  SiteType, 
  TechStack, 
  Extras 
} from './types';
import { 
  SITE_TYPE_DETAILS, 
  TECH_STACK_DETAILS, 
  GENERIC_EXTRAS, 
  INITIAL_EXTRAS,
  WORDPRESS_PLUGINS_BY_TYPE,
  SUPPORT_PACKAGES,
  AUTOMATION_OPTIONS,
  CONTENT_CREATION_OPTIONS
} from './constants';
import ChatInterface from './components/ChatInterface';
import PriceChart from './components/PriceChart';
import ComparisonModal from './components/ComparisonModal';
import ProjectTimeline from './components/ProjectTimeline';
import InvoiceModal from './components/InvoiceModal';
import { Calculator, Check, Zap, Shield, MousePointer2, Languages, Headphones, Menu, MessageSquare, Info, Server, Package, Star, Database, PhoneCall, Download, HardDrive, Film, Music, Cpu, Clapperboard } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    siteType: null,
    techStack: null,
    extras: INITIAL_EXTRAS,
    selectedPlugins: [],
    selectedAutomations: [],
    selectedContentServices: [],
    supportPackageId: null,
    includeHosting: true,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Auto-select mandatory plugins when site type or tech stack changes
  useEffect(() => {
    if (state.techStack === TechStack.WordPress && state.siteType) {
      const plugins = WORDPRESS_PLUGINS_BY_TYPE[state.siteType];
      const mandatoryIds = plugins.filter(p => p.isMandatory).map(p => p.id);
      
      // Reset to mandatory ones initially to ensure correct list for the new type
      setState(prev => ({ ...prev, selectedPlugins: mandatoryIds }));
    } else if (state.techStack === TechStack.NextJS) {
      // Clear plugins if switching to coding
      setState(prev => ({ ...prev, selectedPlugins: [] }));
    }
  }, [state.techStack, state.siteType]);

  // Calculate Prices & Duration
  const { priceData, duration } = useMemo(() => {
    let base = 0;
    let typeMultiplier = 1;
    let extrasCost = 0;
    let pluginsCost = 0;
    let automationCost = 0;
    let contentCreationCost = 0;
    let supportCost = 0;
    let hostingCost = 0;
    let totalDuration = 0;

    const items = [];

    // 1. Base Tech Cost & Duration
    if (state.techStack) {
      base = TECH_STACK_DETAILS[state.techStack].basePrice;
      totalDuration += TECH_STACK_DETAILS[state.techStack].baseDuration;
      items.push({ name: 'تکنولوژی پایه', value: base });
    }

    // 2. Type Multiplier Effect (Applied to Base)
    if (state.siteType) {
      typeMultiplier = SITE_TYPE_DETAILS[state.siteType].baseMultiplier;
      totalDuration += SITE_TYPE_DETAILS[state.siteType].addedDuration;

      // The "value" added by the specific type complexity
      const typeAddedValue = (base * typeMultiplier) - base;
      if (base > 0 && typeAddedValue > 0) {
        items.push({ name: 'پیچیدگی طراحی', value: parseFloat(typeAddedValue.toFixed(1)) });
      }

      // 3. Hosting Cost
      if (state.includeHosting) {
        hostingCost = SITE_TYPE_DETAILS[state.siteType].hosting.price;
        // Add Media Storage Cost
        if (state.extras.storage) {
          hostingCost += GENERIC_EXTRAS.storage.price;
          totalDuration += GENERIC_EXTRAS.storage.duration;
        }
        items.push({ name: 'هاست و زیرساخت', value: parseFloat(hostingCost.toFixed(1)) });
      }
    }

    // 4. WordPress Plugins
    if (state.techStack === TechStack.WordPress && state.siteType) {
      const availablePlugins = WORDPRESS_PLUGINS_BY_TYPE[state.siteType];
      state.selectedPlugins.forEach(pluginId => {
        const plugin = availablePlugins.find(p => p.id === pluginId);
        if (plugin) {
          pluginsCost += plugin.price;
        }
      });
      if (pluginsCost > 0) {
        items.push({ name: 'افزونه‌ها و طراحی', value: parseFloat(pluginsCost.toFixed(1)) });
      }
    }

    // 5. Generic Extras (Exclude storage as it's handled in hosting)
    (Object.keys(state.extras) as Array<keyof Extras>).forEach((key) => {
      if (key !== 'storage' && state.extras[key]) {
        const cost = GENERIC_EXTRAS[key].price;
        totalDuration += GENERIC_EXTRAS[key].duration;
        extrasCost += cost;
        items.push({ name: GENERIC_EXTRAS[key].label.split(' ')[0], value: cost });
      }
    });

    // 6. Automation
    state.selectedAutomations.forEach(autoId => {
      const option = AUTOMATION_OPTIONS.find(a => a.id === autoId);
      if (option) {
        automationCost += option.price;
        totalDuration += 2; // Rough estimate for integration
      }
    });
    if (automationCost > 0) {
      items.push({ name: 'اتوماسیون هوشمند', value: automationCost });
    }

    // 7. Content Creation
    state.selectedContentServices.forEach(contentId => {
      const option = CONTENT_CREATION_OPTIONS.find(c => c.id === contentId);
      if (option) {
        contentCreationCost += option.price;
        totalDuration += 3; // Rough estimate per service
      }
    });
    if (contentCreationCost > 0) {
      items.push({ name: 'خدمات مدیا و محتوا', value: contentCreationCost });
    }

    // 8. Support Package
    if (state.supportPackageId) {
      const pkg = SUPPORT_PACKAGES.find(p => p.id === state.supportPackageId);
      if (pkg) {
        supportCost = pkg.price;
        items.push({ name: 'پشتیبانی', value: supportCost });
      }
    }

    const total = (base * typeMultiplier) + extrasCost + pluginsCost + supportCost + hostingCost + automationCost + contentCreationCost;

    return { 
      priceData: { total: parseFloat(total.toFixed(1)), items },
      duration: totalDuration
    };
  }, [state]);

  const toggleExtra = (key: keyof Extras) => {
    setState(prev => ({
      ...prev,
      extras: { ...prev.extras, [key]: !prev.extras[key] }
    }));
  };

  const togglePlugin = (id: string, isMandatory?: boolean) => {
    if (isMandatory) return; 
    
    setState(prev => {
      const isSelected = prev.selectedPlugins.includes(id);
      if (isSelected) {
        return { ...prev, selectedPlugins: prev.selectedPlugins.filter(p => p !== id) };
      } else {
        return { ...prev, selectedPlugins: [...prev.selectedPlugins, id] };
      }
    });
  };

  const toggleAutomation = (id: string) => {
    setState(prev => {
      const isSelected = prev.selectedAutomations.includes(id);
      if (isSelected) {
        return { ...prev, selectedAutomations: prev.selectedAutomations.filter(a => a !== id) };
      } else {
        return { ...prev, selectedAutomations: [...prev.selectedAutomations, id] };
      }
    });
  };

  const toggleContentService = (id: string) => {
    setState(prev => {
      const isSelected = prev.selectedContentServices.includes(id);
      if (isSelected) {
        return { ...prev, selectedContentServices: prev.selectedContentServices.filter(c => c !== id) };
      } else {
        return { ...prev, selectedContentServices: [...prev.selectedContentServices, id] };
      }
    });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 font-[Vazirmatn]">
      
      {/* Modals */}
      <ComparisonModal isOpen={isComparisonOpen} onClose={() => setIsComparisonOpen(false)} />
      <InvoiceModal 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        state={state}
        priceData={priceData}
      />

      {/* Navbar - Glassmorphism */}
      <nav className="glass-card sticky top-0 z-30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <Calculator className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-black text-slate-800 hidden sm:block tracking-tight">WebCreator <span className="text-indigo-600">Calculator</span></h1>
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                onClick={() => setIsComparisonOpen(true)}
                className="hidden sm:flex items-center gap-2 text-slate-700 hover:text-indigo-600 bg-white/50 hover:bg-white px-4 py-2 rounded-xl font-bold transition-all border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <Info className="w-5 h-5" />
                مقایسه وردپرس و کدنویسی
              </button>

              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="md:hidden flex items-center gap-2 text-white bg-indigo-600 px-3 py-2 rounded-xl font-medium shadow-lg shadow-indigo-600/30"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Calculator Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Site Type */}
            <section className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">۱</span>
                نوع سایت را انتخاب کنید
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(Object.keys(SITE_TYPE_DETAILS) as SiteType[]).map((type) => {
                  const details = SITE_TYPE_DETAILS[type];
                  const Icon = details.icon;
                  const isSelected = state.siteType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setState(prev => ({ ...prev, siteType: type }))}
                      className={`group flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 shadow-lg shadow-indigo-500/10 scale-105' 
                          : 'border-transparent bg-white/50 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <div className={`p-3 rounded-xl mb-3 transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="font-bold text-sm text-center">{details.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Tech Stack */}
            <section className={`glass-card rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${!state.siteType ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">۲</span>
                  تکنولوژی ساخت
                </h2>
                <button 
                  onClick={() => setIsComparisonOpen(true)}
                  className="text-xs text-indigo-600 font-bold hover:underline sm:hidden"
                >
                  راهنما
                </button>
              </div>
              
              <div className="space-y-4">
                {(Object.keys(TECH_STACK_DETAILS) as TechStack[]).map((stack) => {
                  const details = TECH_STACK_DETAILS[stack];
                  const isSelected = state.techStack === stack;
                  return (
                    <div
                      key={stack}
                      onClick={() => setState(prev => ({ ...prev, techStack: stack }))}
                      className={`relative flex items-center gap-5 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                         isSelected 
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-md' 
                          : 'border-transparent bg-white/50 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-3 h-3 rounded-full bg-indigo-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                           <h3 className={`font-black text-lg ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>{details.label}</h3>
                           <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-lg">شروع از {details.basePrice} م</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{details.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Hosting Recommendation */}
            <section className={`glass-card rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${!state.techStack ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
               <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">۳</span>
                هاست و زیرساخت پیشنهادی
              </h2>
              
              {state.siteType ? (
                <>
                  <div 
                    onClick={() => setState(prev => ({...prev, includeHosting: !prev.includeHosting}))}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                      state.includeHosting ? 'border-indigo-500 bg-indigo-50/80 shadow-md' : 'border-transparent bg-white/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${state.includeHosting ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>
                         <HardDrive className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-lg text-slate-800">{SITE_TYPE_DETAILS[state.siteType].hosting.type}</h3>
                           <div className="flex items-center gap-2">
                              <span className="font-black text-indigo-600 bg-white/50 px-2 py-1 rounded-lg">
                                {state.extras.storage 
                                  ? (SITE_TYPE_DETAILS[state.siteType].hosting.price + GENERIC_EXTRAS.storage.price).toFixed(1) 
                                  : SITE_TYPE_DETAILS[state.siteType].hosting.price
                                } م.ت
                              </span>
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${state.includeHosting ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
                                {state.includeHosting && <Check className="w-4 h-4 text-white" />}
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-2 my-3 text-xs font-bold">
                           <span className="px-3 py-1.5 bg-white rounded-lg text-slate-600 shadow-sm border border-slate-100">
                             فضا: {state.extras.storage 
                               ? `${SITE_TYPE_DETAILS[state.siteType].hosting.space} + ۲۰ گیگابایت`
                               : SITE_TYPE_DETAILS[state.siteType].hosting.space
                             }
                           </span>
                           <span className="px-3 py-1.5 bg-white rounded-lg text-slate-600 shadow-sm border border-slate-100">
                             رم: {SITE_TYPE_DETAILS[state.siteType].hosting.ram}
                           </span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed bg-white/40 p-3 rounded-xl border border-white/50">
                          <span className="font-bold text-indigo-600">چرا این هاست؟ </span>
                          {SITE_TYPE_DETAILS[state.siteType].hosting.reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Media Storage Upgrade Option */}
                  {state.includeHosting && (
                    <div 
                      onClick={() => toggleExtra('storage')}
                      className={`mt-4 flex items-center justify-between p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                        state.extras.storage 
                          ? 'bg-purple-50/80 border-purple-400 text-purple-900' 
                          : 'bg-transparent border-slate-300 text-slate-500 hover:border-slate-400 hover:bg-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${state.extras.storage ? 'bg-purple-200 text-purple-700' : 'bg-slate-200 text-slate-400'}`}>
                           {state.extras.storage ? <Film className="w-6 h-6" /> : <Music className="w-6 h-6" />}
                         </div>
                         <div>
                            <div className="font-bold text-sm mb-1">سرور دانلود و مدیا استریمینگ</div>
                            <div className="text-xs opacity-70">افزودن فضای اختصاصی برای پادکست و ویدیو</div>
                         </div>
                      </div>
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${state.extras.storage ? 'bg-purple-600 border-purple-600' : 'bg-white border-slate-300'}`}>
                        {state.extras.storage && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-slate-400 text-sm py-8 border-2 border-dashed border-slate-300/50 rounded-2xl bg-white/20">
                  لطفا ابتدا نوع سایت را انتخاب کنید تا هاست مناسب پیشنهاد شود.
                </div>
              )}
            </section>

            {/* Step 4 (Conditional): WordPress Essential Plugins */}
            {state.techStack === TechStack.WordPress && state.siteType && (
              <section className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm animate-fadeIn">
                <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">۴</span>
                  طراحی و افزونه‌های مورد نیاز
                </h2>
                <p className="text-sm text-slate-500 mb-6 mr-11">
                  شامل <b className="text-slate-800">طراحی با المنتور</b> و ابزارهای تخصصی {SITE_TYPE_DETAILS[state.siteType].label}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {WORDPRESS_PLUGINS_BY_TYPE[state.siteType].map((plugin) => {
                    const isSelected = state.selectedPlugins.includes(plugin.id);
                    return (
                      <div 
                        key={plugin.id}
                        onClick={() => togglePlugin(plugin.id, plugin.isMandatory)}
                        className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
                          plugin.isMandatory ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:border-blue-200 hover:bg-white'
                        } ${
                          isSelected 
                           ? 'bg-blue-50/80 border-blue-400 shadow-sm' 
                           : 'bg-white/50 border-slate-200'
                        }`}
                      >
                         <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                               <h4 className="font-bold text-slate-800 text-sm truncate">{plugin.name}</h4>
                               <span className="text-[10px] font-black text-blue-600 shrink-0 bg-white px-1.5 py-0.5 rounded shadow-sm">{plugin.price === 0 ? 'رایگان' : `${plugin.price} م`}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{plugin.description}</p>
                            {plugin.isMandatory && <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded mt-1.5 inline-block">الزامی</span>}
                         </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Step 5: Generic Extras */}
            <section className={`glass-card rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${!state.techStack ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">{state.techStack === TechStack.WordPress ? '۵' : '۴'}</span>
                امکانات تکمیلی (اختیاری)
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { key: 'uiux', icon: MousePointer2 },
                  { key: 'multilingual', icon: Languages },
                  { key: 'content', icon: Database },
                ].map(({ key, icon: Icon }) => {
                  const k = key as keyof Extras;
                  const isChecked = state.extras[k];
                  const info = GENERIC_EXTRAS[k];
                  return (
                    <div 
                      key={key}
                      onClick={() => toggleExtra(k)}
                      className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-50/80 border-emerald-500 text-emerald-900 shadow-md' 
                          : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${isChecked ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                           <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-bold text-base block">{info.label}</span>
                          <span className="text-xs text-slate-500">{info.desc}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="text-sm font-black text-slate-400">+{info.price} م</span>
                         <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
                            {isChecked && <Check className="w-4 h-4 text-white" />}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step 6: Automation & AI */}
            <section className={`glass-card rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${!state.techStack ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
               <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                 <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">{state.techStack === TechStack.WordPress ? '۶' : '۵'}</span>
                 هوش مصنوعی و اتوماسیون (پیشرفته)
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {AUTOMATION_OPTIONS.map((option) => {
                   const isSelected = state.selectedAutomations.includes(option.id);
                   const Icon = option.icon;
                   return (
                     <div 
                       key={option.id}
                       onClick={() => toggleAutomation(option.id)}
                       className={`flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                         isSelected 
                          ? 'border-purple-600 bg-purple-50/80 shadow-md' 
                          : 'border-transparent bg-white/50 hover:border-purple-200 hover:bg-white hover:shadow-md'
                      }`}
                     >
                       <div className="flex justify-between items-start mb-3">
                         <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-purple-200 text-purple-700' : 'bg-slate-100 text-slate-500 group-hover:bg-purple-100'}`}>
                           <Icon className="w-6 h-6" />
                         </div>
                         <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${isSelected ? 'bg-purple-600 border-purple-600' : 'border-slate-300 bg-white'}`}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                         </div>
                       </div>
                       <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-purple-900' : 'text-slate-800'}`}>{option.title}</h3>
                       <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{option.description}</p>
                       <div className="text-right border-t border-purple-100/50 pt-2">
                         <span className="text-sm font-black text-purple-600">{option.price} میلیون تومان</span>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </section>

             {/* Step 7: Content Creation Services */}
             <section className={`glass-card rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${!state.techStack ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
               <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                 <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">{state.techStack === TechStack.WordPress ? '۷' : '۶'}</span>
                 خدمات تولید محتوا و مدیا (استودیو)
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {CONTENT_CREATION_OPTIONS.map((option) => {
                   const isSelected = state.selectedContentServices.includes(option.id);
                   const Icon = option.icon;
                   return (
                     <div 
                       key={option.id}
                       onClick={() => toggleContentService(option.id)}
                       className={`flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                         isSelected 
                          ? 'border-rose-500 bg-rose-50/80 shadow-md' 
                          : 'border-transparent bg-white/50 hover:border-rose-200 hover:bg-white hover:shadow-md'
                       }`}
                     >
                       <div className="flex justify-between items-start mb-3">
                         <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-rose-200 text-rose-700' : 'bg-slate-100 text-slate-500 group-hover:bg-rose-100'}`}>
                           <Icon className="w-6 h-6" />
                         </div>
                         <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${isSelected ? 'bg-rose-500 border-rose-500' : 'border-slate-300 bg-white'}`}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                         </div>
                       </div>
                       <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-rose-900' : 'text-slate-800'}`}>{option.title}</h3>
                       <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{option.description}</p>
                       <div className="text-right border-t border-rose-100/50 pt-2">
                         <span className="text-sm font-black text-rose-500">{option.price} میلیون تومان</span>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </section>

             {/* Step 8: Support Packages */}
             <section className={`glass-card rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${!state.techStack ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md">{state.techStack === TechStack.WordPress ? '۸' : '۷'}</span>
                پکیج پشتیبانی و نگهداری (یک ساله)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SUPPORT_PACKAGES.map((pkg) => {
                    const isSelected = state.supportPackageId === pkg.id;
                    return (
                      <div 
                        key={pkg.id}
                        onClick={() => setState(prev => ({ ...prev, supportPackageId: isSelected ? null : pkg.id }))}
                        className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 flex flex-col group ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/80 shadow-lg transform scale-105 z-10' 
                            : 'border-transparent bg-white/50 hover:bg-white hover:shadow-lg'
                        }`}
                      >
                         {pkg.recommended && (
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap z-20">
                             <Star className="w-3 h-3 fill-amber-900" />
                             پیشنهاد کارشناس
                           </div>
                         )}
                         <div className="text-center mb-4 pb-4 border-b border-slate-100">
                           <h3 className="font-bold text-slate-800 text-lg">{pkg.title}</h3>
                           <div className="text-indigo-600 font-black text-2xl mt-2">{pkg.price} <span className="text-xs text-slate-500 font-normal">میلیون/سال</span></div>
                         </div>
                         <ul className="space-y-3 mb-6 flex-1">
                           {pkg.features.map((feat, i) => (
                             <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                               <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                               {feat}
                             </li>
                           ))}
                         </ul>
                         <div className={`w-full py-3 rounded-xl text-center text-sm font-bold transition-colors ${
                           isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                         }`}>
                           {isSelected ? 'انتخاب شده' : 'انتخاب پکیج'}
                         </div>
                      </div>
                    )
                  })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Summary & Chat */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cost Summary Card - Glass Dark Mode */}
            <div className="sticky top-24 glass-card-dark text-white rounded-3xl p-6 shadow-2xl overflow-hidden backdrop-blur-xl border border-white/10">
               {/* Abstract Background Blurs */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-indigo-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
               <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-rose-500 rounded-full blur-[100px] opacity-20"></div>
               
               <div className="relative z-10">
                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                   <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                   برآورد هزینه و زمان
                 </h2>
                 
                 <div className="bg-slate-800/40 rounded-2xl p-4 mb-6 backdrop-blur-sm border border-white/5">
                    <PriceChart data={priceData.items} />
                 </div>

                 {/* Project Duration Timeline (New) */}
                 {state.techStack && (
                   <div className="mb-6">
                      <div className="bg-slate-800/40 rounded-2xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-slate-300">مدت زمان پروژه:</span>
                          <span className="text-sm font-black text-white">{duration} روز کاری</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-3/4 animate-pulse"></div>
                        </div>
                         <div className="flex justify-between text-[9px] text-slate-500 mt-2">
                           <span>شروع</span>
                           <span>طراحی</span>
                           <span>توسعه</span>
                           <span>تحویل</span>
                        </div>
                      </div>
                   </div>
                 )}

                 <div className="space-y-4 mb-8 px-2">
                    {state.siteType && (
                      <div className="flex justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                        <span>نوع سایت</span>
                        <span className="font-bold text-white">{SITE_TYPE_DETAILS[state.siteType].label}</span>
                      </div>
                    )}
                    {state.includeHosting && state.siteType && (
                      <div className="flex justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                        <span>هاست</span>
                        <span className="font-bold text-white">
                          {SITE_TYPE_DETAILS[state.siteType].hosting.type.split(' ')[0]}
                          {state.extras.storage && <span className="text-purple-300 text-xs"> (+مدیا)</span>}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-end pt-2">
                      <span className="text-slate-400 font-medium text-sm">هزینه نهایی (تخمین)</span>
                      <div className="text-right">
                         <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 drop-shadow-sm">
                           {priceData.total}
                         </span>
                         <span className="text-sm text-emerald-300 mr-2 font-bold">میلیون تومان</span>
                      </div>
                    </div>
                 </div>
                 
                 <button 
                  onClick={() => setIsInvoiceOpen(true)}
                  className="group w-full py-4 bg-white text-slate-900 hover:bg-emerald-400 hover:text-emerald-950 rounded-2xl font-black transition-all shadow-lg shadow-white/5 mb-4 flex items-center justify-center gap-2 transform active:scale-95"
                 >
                   <Download className="w-5 h-5 group-hover:animate-bounce" />
                   صدور پیش‌فاکتور رسمی
                 </button>

                 <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">مشاوره رایگان</span>
                        <a href="tel:09175980917" className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors tracking-widest">
                          09175980917
                        </a>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Desktop Chat Container */}
            <div className="hidden lg:block h-[600px] glass-card rounded-3xl overflow-hidden shadow-lg border-none">
              <ChatInterface />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Chat Button & Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md h-[85vh] sm:h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl relative">
            <ChatInterface onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Search, Loader2, Sparkles, Calendar, DollarSign } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { streamConsultantResponse, searchMarketTrends } from '../services/geminiService';

interface ChatInterfaceProps {
  onClose?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'سلام! من مشاور هوشمند شما هستم. می‌تونید هر سوالی در مورد ساخت سایت، تفاوت وردپرس و کدنویسی، یا امکانات مورد نیازتون دارید از من بپرسید. چطور می‌تونم کمکتون کنم؟'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      const generator = streamConsultantResponse(history, userMsg.content);
      
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', content: '' }]);

      let fullContent = '';
      for await (const chunk of generator) {
        fullContent += chunk;
        setMessages(prev => 
          prev.map(m => m.id === botMsgId ? { ...m, content: fullContent } : m)
        );
      }
    } catch (error) {
      console.error('Error chatting:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'system', 
        content: 'متاسفانه خطایی رخ داد. لطفا دوباره تلاش کنید.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarketSearch = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    const searchMsgId = Date.now().toString();
    
    // Add a system message indicating search started
    setMessages(prev => [...prev, {
      id: searchMsgId,
      role: 'system',
      content: 'در حال جستجوی آنلاین قیمت‌های روز بازار...',
      isSearching: true
    }]);

    try {
      // Perform the grounded search
      const data = await searchMarketTrends("قیمت طراحی سایت ۱۴۰۳ و قیمت دلار امروز");
      
      if (data) {
        setMessages(prev => prev.filter(m => m.id !== searchMsgId)); // Remove loading msg
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          content: `**گزارش بازار (جستجوی آنلاین):**\n\n${data.summary}`,
          groundingSources: data.sources,
          marketData: {
            jalaliDate: data.jalaliDate,
            gregorianDate: data.gregorianDate,
            usdPrice: data.usdPrice
          }
        }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.filter(m => m.id !== searchMsgId));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: 'خطا در جستجوی اطلاعات بازار.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-violet-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-bold">مشاور هوشمند</h3>
            <span className="text-xs text-indigo-200 block">قدرت گرفته از Gemini 2.0</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/80 hover:text-white">
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : msg.role === 'system'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200 text-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.isSearching && (
                <div className="flex items-center gap-2 mb-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-bold">جستجو در گوگل...</span>
                </div>
              )}
              
              {/* Market Data Card */}
              {msg.marketData && (
                <div className="mb-4 bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <div className="flex items-center gap-1.5 text-slate-600">
                       <Calendar className="w-4 h-4 text-indigo-500" />
                       <span className="text-xs font-bold">{msg.marketData.jalaliDate}</span>
                       <span className="text-[10px] text-slate-400">({msg.marketData.gregorianDate})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">نرخ دلار آزاد:</span>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{msg.marketData.usdPrice}</span>
                      <span className="text-[10px]">تومان</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="prose prose-sm max-w-none dark:prose-invert">
                 <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>

              {msg.groundingSources && msg.groundingSources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                  <p className="font-semibold text-slate-500 mb-1">منابع:</p>
                  <ul className="list-disc list-inside text-slate-400">
                    {msg.groundingSources.map((source, idx) => (
                      <li key={idx}>
                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 hover:underline truncate inline-block max-w-full align-bottom">
                          {source.title || source.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-2 bg-slate-50 border-t border-slate-200 flex gap-2 overflow-x-auto">
        <button 
          onClick={handleMarketSearch}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium hover:bg-emerald-200 transition-colors whitespace-nowrap"
        >
          <Search className="w-3 h-3" />
          استعلام قیمت و ارز
        </button>
        <button 
          onClick={() => setInput('هزینه نگهداری سالانه سایت چقدره؟')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors whitespace-nowrap"
        >
          <Sparkles className="w-3 h-3" />
          هزینه نگهداری
        </button>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="پیام خود را بنویسید..."
            disabled={isLoading}
            className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute left-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 rtl:rotate-180" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

import React from 'react';
import { Mail, Lock, Hexagon } from 'lucide-react';

export function Elegant() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f3b35] via-[#165a51] to-[#0a2622] p-4 font-sans" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden relative border border-white/10">
        {/* Top decorative area */}
        <div className="h-32 bg-[#0a2622] flex items-center justify-center relative overflow-hidden">
          {/* Subtle pattern background */}
          <div className="absolute w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Diamond logo container */}
          <div className="absolute -bottom-8 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#e5c158] to-[#aa8c2c] rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] transform rotate-45 border-2 border-white">
             <Hexagon className="text-white w-8 h-8 -rotate-45" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="px-8 pt-14 pb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0a2622] mb-2 tracking-tight">ورشة</h1>
            <p className="text-gray-500 text-sm font-medium">بوابة إدارة ورشة الألمنيوم</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5 text-right">
              <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e5c158] focus:border-transparent outline-none transition-all text-right text-gray-800 bg-gray-50/50 focus:bg-white"
                  placeholder="name@example.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e5c158] focus:border-transparent outline-none transition-all text-right text-gray-800 bg-gray-50/50 focus:bg-white"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a href="#" className="text-sm text-[#165a51] hover:text-[#0a2622] font-semibold transition-colors">
                نسيت كلمة المرور؟
              </a>
              <label className="flex items-center gap-2 cursor-pointer group">
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">تذكرني</span>
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer" />
                  <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-[#165a51] peer-checked:border-[#165a51] transition-all flex items-center justify-center">
                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#e5c158] to-[#aa8c2c] hover:from-[#d4af37] hover:to-[#9b7e28] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-6 text-lg"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

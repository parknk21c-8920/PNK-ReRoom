"use client";

import { useLanguage } from '@/components/LanguageContext';

export default function Header() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-3.5 md:flex-row md:px-6">
        
        {/* 로고 & 모바일 우측 영역 */}
        <div className="flex w-full items-center justify-between md:w-auto">
          <a href="#top" className="group flex items-center justify-start gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-8 w-auto object-contain rounded-full shadow-sm md:h-14" />
            <span className="font-display text-xl font-bold tracking-tight text-ink md:text-[28px]">
              PNK Re-Room<span className="text-ink-faint">.</span>
            </span>
            <span className="hidden rounded-full border border-line-strong px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-ink-soft md:inline-block">
              AI Beta
            </span>
          </a>

          {/* 모바일 전용 언어 토글 & 배지 */}
          <div className="flex items-center gap-1.5 md:hidden">
            <span className="rounded-full border border-line-strong px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-ink-soft">
              AI Beta
            </span>
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="flex items-center rounded-full border border-line-strong bg-white p-0.5 shadow-xs transition-colors"
            >
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold transition-all ${lang === 'ko' ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'}`}>KR</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold transition-all ${lang === 'en' ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'}`}>EN</span>
            </button>
          </div>
        </div>

        {/* 내비게이션 & PC 우측 영역 */}
        <div className="flex w-full items-center md:w-auto md:gap-4">
          <nav className="grid w-full grid-cols-4 gap-1.5 text-center text-xs font-bold md:flex md:w-auto md:items-center md:gap-2 md:text-sm">
            <a
              href="#styles"
              className="flex items-center justify-center rounded-full bg-orange-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-orange-600 md:px-4"
            >
              STYLES
            </a>
            <a
              href="#how-it-works"
              className="flex items-center justify-center rounded-full bg-emerald-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-emerald-600 md:px-4"
            >
              HOW TO
            </a>
            <a
              href="#studio"
              className="flex items-center justify-center rounded-full bg-blue-500 py-2 font-semibold text-white shadow-xs transition-all duration-200 hover:bg-blue-600 md:px-5"
            >
              STUDIO
            </a>
            <a
              href="#faq"
              className="flex items-center justify-center rounded-full border border-line-strong bg-white py-2 text-ink shadow-xs transition-all duration-200 hover:border-ink md:px-4"
            >
              FAQ
            </a>
          </nav>
          
          {/* PC 전용 언어 토글 */}
          <button
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            className="hidden items-center rounded-full border border-line-strong bg-white p-0.5 shadow-sm transition-colors md:flex hover:border-ink"
          >
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${lang === 'ko' ? 'bg-ink text-white shadow-xs' : 'text-ink-soft hover:text-ink'}`}>KR</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${lang === 'en' ? 'bg-ink text-white shadow-xs' : 'text-ink-soft hover:text-ink'}`}>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
}

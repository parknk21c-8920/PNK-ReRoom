"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useAuth } from '@/components/AuthContext';
import AuthModal from '@/components/AuthModal';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const { user, credits, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-3.5 md:flex-row md:px-6">
          
          {/* 로고 & 모바일 우측 영역 */}
          <div className="flex w-full items-center justify-between md:w-auto">
            <a href="#top" className="group flex items-center justify-start gap-3">
              <img src="/qr_with_logo.png" alt="QR Logo" className="h-8 w-auto object-contain rounded-lg shadow-sm md:h-14" />
              <span className="font-display text-xl font-bold tracking-tight text-ink md:text-[28px]">
                PNK Re-Room<span className="text-ink-faint">.</span>
              </span>
              <span className="hidden rounded-full border border-line-strong px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-ink-soft md:inline-block">
                AI Beta
              </span>
            </a>

            {/* 모바일 전용 영역 (언어 토글, 배지, 로그인) */}
            <div className="flex items-center gap-1.5 md:hidden">
              {user ? (
                <button
                  onClick={signOut}
                  className="rounded-full border border-line-strong bg-white px-2 py-1 text-[9px] font-bold text-ink shadow-sm transition-colors hover:border-ink"
                >
                  로그아웃
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="rounded-full bg-ink px-2.5 py-1 text-[9px] font-bold text-white shadow-sm transition-colors hover:bg-ink-soft"
                >
                  로그인
                </button>
              )}
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
            <nav className="grid w-full grid-cols-5 gap-1.5 text-center text-[10px] font-bold md:flex md:w-auto md:items-center md:gap-2 md:text-xs">
              <Link
                href="/pricing"
                className="flex items-center justify-center rounded-full bg-indigo-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-indigo-600 md:px-4"
              >
                PRICING
              </Link>
              <Link
                href="/#styles"
                className="flex items-center justify-center rounded-full bg-orange-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-orange-600 md:px-4"
              >
                STYLES
              </Link>
              <Link
                href="/#how-it-works"
                className="flex items-center justify-center rounded-full bg-emerald-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-emerald-600 md:px-4"
              >
                HOW TO
              </Link>
              <Link
                href="/#studio"
                className="flex items-center justify-center rounded-full bg-blue-500 py-2 font-semibold text-white shadow-xs transition-all duration-200 hover:bg-blue-600 md:px-5"
              >
                STUDIO
              </Link>
              <Link
                href="/#faq"
                className="flex items-center justify-center rounded-full border border-line-strong bg-white py-2 text-ink shadow-xs transition-all duration-200 hover:border-ink md:px-4"
              >
                FAQ
              </Link>
            </nav>
            
            <div className="hidden items-center gap-2 md:flex">
              {/* 유저 인증 버튼 & 크레딧 */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold text-blue-800 border border-blue-200">
                    💳 {credits} Credits
                  </span>
                  <button
                    onClick={signOut}
                    className="rounded-full border border-line-strong bg-white px-3 py-1 text-[11px] font-bold text-ink shadow-sm transition-colors hover:border-ink"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="rounded-full bg-ink px-4 py-1.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-ink-soft"
                >
                  로그인 / 가입
                </button>
              )}

              {/* PC 전용 언어 토글 */}
              <button
                onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                className="flex items-center rounded-full border border-line-strong bg-white p-0.5 shadow-sm transition-colors hover:border-ink"
              >
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${lang === 'ko' ? 'bg-ink text-white shadow-xs' : 'text-ink-soft hover:text-ink'}`}>KR</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${lang === 'en' ? 'bg-ink text-white shadow-xs' : 'text-ink-soft hover:text-ink'}`}>EN</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}

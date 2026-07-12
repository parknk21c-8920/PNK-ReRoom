'use client';

import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-12 md:flex-row">
        {/* 좌측: 로고 + 카피라이트 */}
        <div className="flex items-center gap-3 text-[11px] text-ink-faint">
          <span className="font-display text-sm font-bold text-ink">
            PNK Re-Room<span className="text-ink-faint">.</span>
          </span>
          <span className="h-3 w-px bg-line" />
          <span>© 2026 PNK Re-Room</span>
        </div>

        {/* 우측: 원가 정보 + 잔여 배지 + API 링크 */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-ink-faint">
          <span>{t('이미지 1장 원가 약 70원 · Nano Banana 2 기준', 'Approx. cost per image: 70 KRW · Based on Nano Banana 2')}</span>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { STYLES } from '@/lib/constants';
import { useLanguage } from './LanguageContext';
import Reveal from './Reveal';

/** 스타일 갤러리 카드. 클릭 시 스튜디오로 스크롤하며 해당 스타일을 미리 선택한다. */
export default function StyleCards() {
  const { lang, t } = useLanguage();

  const pickStyle = (styleId: string) => {
    window.dispatchEvent(new CustomEvent('reroom:style', { detail: styleId }));
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
      {STYLES.map((style, i) => (
        <Reveal key={style.id} delay={i * 70}>
          <button
            type="button"
            onClick={() => pickStyle(style.id)}
            className="card-tactile group flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border border-line bg-paper p-5 text-left sm:p-6"
          >
            {/* 이모지 — 호버 시 살짝 바운스 */}
            <span className="block text-3xl transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
              {style.emoji}
            </span>

            <div className="mt-7">
              <h3 className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
                {lang === 'ko' ? style.label : style.labelEn}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft sm:text-xs">
                {lang === 'ko' ? style.desc : style.descEn}
              </p>
              {/* 호버 시 등장하는 CTA */}
              <p className="mt-4 text-[11px] font-semibold text-ink-faint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:text-xs">
                {t('이 스타일로 디자인하기 →', 'Design with this style →')}
              </p>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

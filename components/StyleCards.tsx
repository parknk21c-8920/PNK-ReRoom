'use client';

import { STYLES } from '@/lib/constants';
import Reveal from './Reveal';

/** 스타일 갤러리 카드. 클릭 시 스튜디오로 스크롤하며 해당 스타일을 미리 선택한다. */
export default function StyleCards() {
  const pickStyle = (styleId: string) => {
    window.dispatchEvent(new CustomEvent('reroom:style', { detail: styleId }));
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
      {STYLES.map((style, i) => (
        <Reveal key={style.id} delay={i * 60}>
          <button
            type="button"
            onClick={() => pickStyle(style.id)}
            className="group flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border border-line bg-paper p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
          >
            <div className="flex items-center gap-1.5">
              {style.swatch.map((color) => (
                <span
                  key={color}
                  className="h-5 w-5 rounded-full border border-ink/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-ink">
                {style.label}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                {style.desc}
              </p>
              <p className="mt-4 text-xs font-semibold text-clay opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                이 스타일로 디자인하기 →
              </p>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

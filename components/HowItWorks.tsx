"use client";

import { useLanguage } from './LanguageContext';
import Reveal from './Reveal';

export default function HowItWorks() {
  const { t } = useLanguage();

  const STEPS = [
    {
      no: '01',
      title: t('사진 업로드', 'Upload a Photo'),
      desc: t('바꾸고 싶은 공간의 사진을 올려 주세요. 브라우저에서 자동으로 최적화되어 안전하게 전송됩니다.', 'Upload a photo of the space you want to change. It is automatically optimized in the browser and transmitted safely.'),
    },
    {
      no: '02',
      title: t('공간과 스타일 선택', 'Choose Space & Style'),
      desc: t('거실부터 원룸까지 6가지 공간, 모던부터 한옥까지 8가지 스타일. 취향대로 조합하세요.', '6 spaces from living rooms to studios, 8 styles from modern to Hanok. Combine them to your taste.'),
    },
    {
      no: '03',
      title: t('10초 뒤, 새로운 방', '10 Seconds to a New Room'),
      desc: t('벽·창문·구도는 그대로 두고 가구와 조명, 색감만 바뀐 고화질 렌더링이 완성됩니다.', 'The walls, windows, and layout stay the same, while furniture, lighting, and colors are transformed into a high-res render.'),
    },
  ];

  return (
    <section id="how-it-works" className="w-full border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <span className="inline-block w-fit rounded-full bg-emerald-500 px-4 py-1.5 text-[13px] font-bold uppercase tracking-widest text-white shadow-sm">
            HOW TO
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-ink md:text-[2.5rem]">
            {t('세 단계면 충분합니다', 'Just Three Steps')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 120}>
              <div className="card-tactile flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-8">
                <span className="font-display text-[13px] font-bold text-ink-faint">
                  {step.no}
                </span>
                <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-ink-soft">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

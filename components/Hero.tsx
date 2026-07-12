import CompareSlider from './CompareSlider';
import Reveal from './Reveal';

const STATS = [
  { value: '10초', label: '평균 생성 시간' },
  { value: '8가지', label: '인테리어 스타일' },
  { value: '무제한', label: '무료 생성' },
];

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden">
      {/* 배경 글로우 — 두 개의 원형 그래디언트로 깊이감 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-soft to-transparent opacity-50 blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-28 pt-24 text-center md:pb-32 md:pt-32">
        <Reveal className="flex flex-col items-center">
          {/* 배지 */}
          <p className="mb-7 flex items-center gap-2.5 rounded-full border border-line bg-paper-raised/80 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-ink-soft backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            AI 인테리어 리디자인 스튜디오
          </p>

          {/* 메인 헤드라인 */}
          <h1 className="font-display max-w-[800px] text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.02em] text-ink/80 sm:text-4xl md:text-[3.25rem] md:leading-[1.25]">
            방 사진 한 장이면 충분해요.
            <br />
            당신의 공간이 10초 만에 달라집니다.
          </h1>

          {/* 서브텍스트 */}
          <p className="mt-8 max-w-2xl text-[16px] font-medium leading-[1.7] text-emerald-600 md:text-lg">
            복잡한 과정 없이, 원하는 스타일만 고르세요.
            <br />
            PNK Re-Room의 AI가 지금 있는 방의 구조를 살려, 상상하던 인테리어 스타일을 눈앞에 펼쳐드립니다.
          </p>

          {/* CTA */}
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#studio"
              className="btn-premium rounded-full bg-ink px-9 py-4 text-sm font-semibold text-paper shadow-lift hover:shadow-deep"
            >
              지금 무료로 디자인하기
            </a>
            <a
              href="#styles"
              className="btn-premium rounded-full border border-line-strong bg-paper px-8 py-4 text-sm font-semibold text-ink hover:border-ink hover:shadow-xs"
            >
              스타일 둘러보기
            </a>
          </div>

          {/* 통계 배지 */}
          <dl className="mt-14 flex items-center divide-x divide-line">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-7 sm:px-10">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {stat.value}
                </dd>
                <dd className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* 쇼케이스 슬라이더 */}
        <Reveal delay={200} className="mt-20 w-full max-w-4xl">
          <CompareSlider
            beforeSrc="/living_room_before.png"
            afterSrc="/living_room_after.png"
            beforeAlt="리디자인 전 거실"
            afterAlt="재팬디 스타일로 리디자인된 거실"
            priority
          />
          <p className="mt-5 text-[11px] tracking-wide text-ink-faint">
            핸들을 좌우로 드래그해 재팬디 스타일 변신을 직접 확인해 보세요.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from './Reveal';

const STEPS = [
  {
    no: '01',
    title: '사진 업로드',
    desc: '바꾸고 싶은 공간의 사진을 올려 주세요. 브라우저에서 자동으로 최적화되어 안전하게 전송됩니다.',
  },
  {
    no: '02',
    title: '공간과 스타일 선택',
    desc: '거실부터 원룸까지 6가지 공간, 모던부터 한옥까지 8가지 스타일. 취향대로 조합하세요.',
  },
  {
    no: '03',
    title: '10초 뒤, 새로운 방',
    desc: '벽·창문·구도는 그대로 두고 가구와 조명, 색감만 바뀐 고화질 렌더링이 완성됩니다.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink-faint">
            How it works
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-ink md:text-[2.5rem]">
            세 단계면 충분합니다
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

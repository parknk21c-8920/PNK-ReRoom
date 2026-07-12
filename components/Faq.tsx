import Reveal from './Reveal';

const FAQS = [
  {
    q: '무료로 몇 번까지 사용할 수 있나요?',
    a: '서비스 내에서 제공하는 키를 통해 횟수 제한 없이 무제한으로 체험하실 수 있습니다.',
  },
  {
    q: '내 방 구조가 바뀌어 버리지는 않나요?',
    a: '아니요. 벽, 창문, 문, 천장과 카메라 구도 같은 건축 요소는 그대로 유지하도록 설계되어 있습니다. 가구, 조명, 색감, 소품만 선택한 스타일에 맞춰 다시 디자인됩니다.',
  },
  {
    q: '업로드한 사진은 어디에 저장되나요?',
    a: '사진은 생성 요청 처리에만 잠시 사용되며, 서버나 외부 저장소에 절대 보관되지 않고 즉시 폐기됩니다.',
  },
  {
    q: '결과물 화질은 어느 정도인가요?',
    a: '고화질 실사 렌더링 PNG로 제공되며, 완성 후 바로 다운로드할 수 있습니다. 같은 사진으로 다른 스타일을 연속해서 실험할 수도 있습니다.',
  },
];

export default function Faq() {
  return (
    <section className="w-full border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-3xl px-6 py-28">
        <Reveal>
          <span className="inline-block w-fit rounded-full border border-line-strong bg-white px-4 py-1.5 text-[13px] font-bold uppercase tracking-widest text-ink shadow-sm">
            FAQ
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-ink md:text-[2.5rem]">
            자주 묻는 질문
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-14 flex flex-col gap-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-line bg-paper px-6 py-5 transition-all duration-300 hover:shadow-xs open:border-ink open:shadow-xs"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-sm font-light text-ink-faint transition-all duration-300 group-open:rotate-45 group-open:border-ink group-open:text-ink">
                  +
                </span>
              </summary>
              <p className="mt-4 text-[13px] leading-[1.8] text-ink-soft">{faq.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

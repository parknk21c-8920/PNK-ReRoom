export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* 로고 */}
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            PNK Re-Room<span className="text-ink-faint">.</span>
          </span>
          <span className="rounded-full border border-line-strong px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            AI Beta
          </span>
        </a>

        {/* 내비게이션 */}
        <nav className="flex items-center gap-1 text-[13px] font-medium text-ink-soft">
          <a
            href="#styles"
            className="hidden rounded-lg px-3.5 py-2 transition-all duration-200 hover:bg-accent-soft hover:text-ink sm:block"
          >
            스타일
          </a>
          <a
            href="#how-it-works"
            className="hidden rounded-lg px-3.5 py-2 transition-all duration-200 hover:bg-accent-soft hover:text-ink sm:block"
          >
            사용 방법
          </a>
          <a
            href="#studio"
            className="btn-premium ml-2 rounded-full bg-ink px-5 py-2 text-[13px] font-semibold text-paper shadow-xs hover:shadow-lift"
          >
            디자인하기
          </a>
        </nav>
      </div>
    </header>
  );
}

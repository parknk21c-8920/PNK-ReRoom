export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* 로고 */}
        <a href="#top" className="group flex items-center gap-2.5">
          <img src="/logo.jpg" alt="Logo" className="h-7 w-auto object-contain" />
          <span className="font-display text-2xl font-bold tracking-tight text-ink">
            PNK Re-Room<span className="text-ink-faint">.</span>
          </span>
          <span className="rounded-full border border-line-strong px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            AI Beta
          </span>
        </a>

        {/* 내비게이션 */}
        <nav className="flex items-center gap-2 text-[13px] font-bold">
          <a
            href="#styles"
            className="hidden rounded-full bg-orange-500 px-4 py-2 text-white shadow-xs transition-all duration-200 hover:bg-orange-600 sm:block"
          >
            STYLES
          </a>
          <a
            href="#how-it-works"
            className="hidden rounded-full bg-emerald-500 px-4 py-2 text-white shadow-xs transition-all duration-200 hover:bg-emerald-600 sm:block"
          >
            HOW TO
          </a>
          <a
            href="#studio"
            className="btn-premium rounded-full bg-ink px-5 py-2 font-semibold text-paper shadow-xs hover:shadow-lift"
          >
            STUDIO
          </a>
          <a
            href="#faq"
            className="hidden ml-1 rounded-full border border-line-strong bg-white px-4 py-2 text-ink shadow-xs transition-all duration-200 hover:border-ink sm:block"
          >
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}

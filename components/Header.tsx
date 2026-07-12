export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-3.5 sm:flex-row sm:px-6">
        {/* 로고 */}
        <a href="#top" className="group flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-start">
          <img src="/logo.jpg" alt="Logo" className="h-12 w-auto object-contain sm:h-14" />
          <span className="font-display flex flex-col text-center text-lg font-bold leading-tight tracking-tight text-ink sm:text-left sm:text-2xl">
            <span>PNK</span>
            <span>Re-Room<span className="text-ink-faint">.</span></span>
          </span>
          <span className="ml-1 rounded-full border border-line-strong px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            AI Beta
          </span>
        </a>

        {/* 내비게이션 */}
        <nav className="grid w-full grid-cols-4 gap-1.5 text-center text-xs font-bold sm:flex sm:w-auto sm:items-center sm:gap-2 sm:text-sm">
          <a
            href="#styles"
            className="flex items-center justify-center rounded-full bg-orange-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-orange-600 sm:px-4"
          >
            STYLES
          </a>
          <a
            href="#how-it-works"
            className="flex items-center justify-center rounded-full bg-emerald-500 py-2 text-white shadow-xs transition-all duration-200 hover:bg-emerald-600 sm:px-4"
          >
            HOW TO
          </a>
          <a
            href="#studio"
            className="flex items-center justify-center rounded-full bg-ink py-2 font-semibold text-paper shadow-xs hover:shadow-lift sm:px-5"
          >
            STUDIO
          </a>
          <a
            href="#faq"
            className="flex items-center justify-center rounded-full border border-line-strong bg-white py-2 text-ink shadow-xs transition-all duration-200 hover:border-ink sm:px-4"
          >
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}

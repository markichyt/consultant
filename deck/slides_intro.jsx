/* === SLIDE 1 — INTRO ============================================== */
function SlideIntro() {
  return (
    <div className="w-full h-full relative text-white font-sans flex flex-col items-center justify-center text-center" style={{ padding: '80px 110px' }}>
      <div className="stage-reveal flex flex-col items-center">
        {/* big logo */}
        <div className="relative">
          <div className="absolute -inset-x-24 -inset-y-16 rounded-full blur-[100px] opacity-40 pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(19,151,214,0.5), transparent 70%)' }}></div>
          <img src="deck/logo.svg" alt="CONSULTANT — Legal Marketplace" className="relative" style={{ width: 660, height: 'auto' }} />
        </div>

        <div className="mt-8 font-mono uppercase tracking-[0.42em] text-white/45" style={{ fontSize: 16 }}>
          Юридичний маркетплейс
        </div>

        {/* divider */}
        <div className="mt-12 flex items-center gap-4">
          <span className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25))' }}></span>
          <span className="h-2 w-2 rounded-full" style={{ background: '#1397D6', boxShadow: '0 0 16px 2px #1397D6' }}></span>
          <span className="h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.25), transparent)' }}></span>
        </div>

        {/* headline */}
        <h1 className="mt-10 font-display font-black tracking-[-0.02em] leading-[1.05] max-w-5xl" style={{ fontSize: 60 }}>
          Презентація нового<br /><span className="text-neon text-glow-neon">функціоналу для юристів</span>
        </h1>

        {/* feature hints */}
        <div className="mt-12 flex items-center gap-3">
          <Chip tone="neon" icon="sparkles">AI-генерація профілю</Chip>
          <Chip tone="em" icon="shopping-cart">Маркетплейс лідів</Chip>
        </div>
      </div>
    </div>
  );
}

window.SLIDES.push({ order: 1, title: 'CONSULTANT — новий функціонал', Component: SlideIntro });

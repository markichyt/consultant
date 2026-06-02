/* === SLIDE 1 — INTRO ============================================== */
function SlideIntro() {
  return (
    <div className="w-full h-full relative text-white font-sans flex flex-col items-center justify-center text-center" style={{ padding: '80px 110px' }}>
      {/* Q2 2026 badge — top right */}
      <div className="absolute font-mono uppercase tracking-[0.22em] text-white/55"
           style={{ top: 48, right: 56, fontSize: 11, padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8 }}>
        Q2 2026
      </div>

      <div className="stage-reveal flex flex-col items-center">
        {/* eyebrow — above logo */}
        <div className="font-mono uppercase tracking-[0.42em] text-white/45" style={{ fontSize: 16 }}>
          AI-native юридичний маркетплейс · США
        </div>

        {/* big logo */}
        <div className="relative mt-7">
          <div className="absolute -inset-x-24 -inset-y-16 rounded-full blur-[100px] opacity-40 pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(19,151,214,0.5), transparent 70%)' }}></div>
          <img src="deck/logo.svg" alt="CONSULTANT — Legal Marketplace" className="relative" style={{ width: 660, height: 'auto' }} />
        </div>

        {/* divider */}
        <div className="mt-12 flex items-center gap-4">
          <span className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25))' }}></span>
          <span className="h-2 w-2 rounded-full" style={{ background: '#1397D6', boxShadow: '0 0 16px 2px #1397D6' }}></span>
          <span className="h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.25), transparent)' }}></span>
        </div>

        {/* headline */}
        <h1 className="mt-10 font-display font-black tracking-[-0.02em] leading-[1.05] max-w-5xl" style={{ fontSize: 60 }}>
          Інвестиційний кейс<br /><span className="text-neon text-glow-neon">AI + маркетплейс для юристів</span>
        </h1>

        {/* investor chips */}
        <div className="mt-12 flex items-center gap-3">
          <Chip tone="neon" icon="target">$24B SAM</Chip>
          <Chip tone="em" icon="circle-check">Live MVP</Chip>
          <Chip tone="amber" icon="handshake">Seed раунд відкрито</Chip>
        </div>

        {/* confidentiality footer */}
        <div className="mt-9 italic text-white/40" style={{ fontSize: 13 }}>
          Документ для попереднього ознайомлення · Конфіденційно
        </div>
      </div>
    </div>
  );
}

window.SLIDES.push({ order: 1, title: 'CONSULTANT — новий функціонал', Component: SlideIntro });

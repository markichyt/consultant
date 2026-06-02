const { useState: useStateL, useEffect: useEffectL, useRef: useRefL, useLayoutEffect: useLayoutEffectL } = React;

/* ===================================================================
   SLIDE 7 — Marketing team ($6,000/mo) vs cabinet ($80/lead)
   with an auto-playing "buy a lead" animation in the real cabinet UI.
====================================================================*/

const CAB = {
  ink: '#16242f', mut: '#6b7785', line: '#e7edf2', bg: '#f4f7fa',
  blue: '#1397d6', blueSoft: '#e8f5fc', green: '#22a06b', greenSoft: '#e6f6ee',
  card: '#ffffff', red: '#e5484d',
};

function offsetWithin(el, root) {
  let x = 0, y = 0, n = el;
  while (n && n !== root && n !== document.body) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function Cursor({ x, y, clicking }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, zIndex: 60, pointerEvents: 'none',
      transform: `translate(${x}px, ${y}px)`,
      transition: 'transform .75s cubic-bezier(.5,.05,.2,1)',
    }}>
      <div style={{ position: 'relative', transform: clicking ? 'scale(.82)' : 'scale(1)', transition: 'transform .12s' }}>
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.35))' }}>
          <path d="M2 2L2 22L7.5 17.5L11 25.5L14.5 24L11 16L18 16L2 2Z" fill="#fff" stroke="#16242f" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {clicking && <span style={{
          position: 'absolute', left: -8, top: -6, width: 34, height: 34, borderRadius: '50%',
          border: `2px solid ${CAB.blue}`, animation: 'ripple .5s ease-out',
        }}></span>}
      </div>
    </div>
  );
}

function SpecBadge({ t, bg = CAB.blueSoft, color = CAB.blue }) {
  return <span style={{ background: bg, color, fontWeight: 800, fontSize: 11, letterSpacing: '.04em', padding: '4px 8px', borderRadius: 6 }}>{t}</span>;
}
function SourceTag({ t, dot }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: CAB.mut, fontWeight: 600 }}>
    <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }}></span>{t}</span>;
}

function CabinetBuyMock() {
  const [phase, setPhase] = useStateL(0);
  const [cur, setCur] = useStateL({ x: 760, y: 470, click: false });
  const [flyer, setFlyer] = useStateL(null);
  const rootRef = useRefL(null), buyRef = useRefL(null), tabRef = useRefL(null), chatRef = useRefL(null);

  // phase machine (loops)
  useEffectL(() => {
    const dur = [800, 950, 850, 1250, 1050, 950, 3000];
    const id = setTimeout(() => setPhase((p) => (p + 1) % 7), dur[phase]);
    return () => clearTimeout(id);
  }, [phase]);

  const view = phase >= 4 ? 'mine' : 'feed';
  const bought = phase >= 2;
  const badge = phase >= 3 ? 29 : 28;
  const chatOpen = phase >= 6;

  // move cursor to targets + clicking states
  useLayoutEffectL(() => {
    const root = rootRef.current; if (!root) return;
    const center = (ref) => { const e = ref.current; if (!e) return null; const o = offsetWithin(e, root); return { x: o.x + o.w / 2 - 4, y: o.y + o.h / 2 - 2 }; };
    let target = null, click = false;
    if (phase === 0) target = { x: root.offsetWidth - 70, y: root.offsetHeight - 60 };
    else if (phase === 1) target = center(buyRef);
    else if (phase === 2) { target = center(buyRef); click = true; }
    else if (phase === 3) target = center(buyRef);
    else if (phase === 4) target = center(tabRef);
    else if (phase === 5) target = center(chatRef);
    else if (phase === 6) { target = center(chatRef); click = true; }
    if (target) setCur({ x: target.x, y: target.y, click });
    // unclick shortly after
    if (click) { const t = setTimeout(() => setCur((c) => ({ ...c, click: false })), 240); return () => clearTimeout(t); }
  }, [phase, view]);

  // flyer animation card -> My leads tab
  useLayoutEffectL(() => {
    if (phase !== 3) { setFlyer(null); return; }
    const root = rootRef.current; if (!root || !buyRef.current || !tabRef.current) return;
    const a = offsetWithin(buyRef.current, root), b = offsetWithin(tabRef.current, root);
    setFlyer({ x: a.x, y: a.y - 30, go: false });
    const r = requestAnimationFrame(() => setFlyer({ x: b.x, y: b.y, go: true }));
    return () => cancelAnimationFrame(r);
  }, [phase]);

  const Tab = ({ label, count, active, alert, innerRef }) => (
    <div ref={innerRef} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8,
      fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
      color: active ? '#fff' : CAB.ink, background: active ? CAB.blue : 'transparent',
      boxShadow: active ? '0 6px 16px -6px rgba(19,151,214,.7)' : 'none', transition: 'all .3s',
    }}>
      {label}
      <span style={{
        fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 20,
        background: active ? 'rgba(255,255,255,.25)' : (alert ? CAB.red : '#eef2f6'),
        color: active ? '#fff' : (alert ? '#fff' : CAB.mut),
        transform: (label === 'Мої ліди' && count === 29) ? 'scale(1.18)' : 'scale(1)', transition: 'transform .3s',
      }}>{count}</span>
    </div>
  );

  return (
    <div className="relative" style={{
      borderRadius: 16, overflow: 'hidden', background: CAB.bg,
      boxShadow: '0 50px 120px -40px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08)',
    }}>
      {/* chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 44, background: '#fff', borderBottom: `1px solid ${CAB.line}` }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }}></span>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }}></span>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }}></span>
        <div style={{ marginLeft: 14, flex: 1, height: 26, borderRadius: 7, background: CAB.bg, display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px' }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, border: `1.5px solid ${CAB.green}` }}></span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: CAB.mut }}>app.consultantlm.com/leads</span>
        </div>
      </div>

      {/* body */}
      <div ref={rootRef} style={{ position: 'relative', height: 512, padding: 22, fontFamily: 'Inter, sans-serif' }}>
        {/* tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', padding: 7, borderRadius: 12, boxShadow: '0 2px 10px rgba(6,32,44,.06)' }}>
          <Tab label="Купити ліди" count={149} active={view === 'feed'} />
          <Tab label="Інбокс" count={4} alert />
          <Tab label="Мої ліди" count={badge} active={view === 'mine'} innerRef={tabRef} />
        </div>

        {/* ===== FEED ===== */}
        {view === 'feed' && (
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 12, color: CAB.mut, fontWeight: 600 }}><b style={{ color: CAB.ink }}>149</b> активних лідів · спершу найновіші</div>

            {/* target card ($80) */}
            <div style={{
              background: CAB.card, border: `1px solid ${bought ? CAB.green : CAB.line}`, borderRadius: 14, padding: 16,
              boxShadow: bought ? `0 0 0 3px ${CAB.greenSoft}` : '0 4px 14px rgba(6,32,44,.05)',
              transition: 'all .4s', position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <SpecBadge t="СІМ" />
                  <SourceTag t="Meta / Facebook" dot="#1877F2" />
                </div>
                <span style={{ fontSize: 12, color: CAB.mut, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f0a500' }}></span>2 хв тому</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: CAB.ink, marginBottom: 5 }}>Розлучення з дітьми — потрібен сімейний юрист</div>
              <div style={{ fontSize: 13.5, color: CAB.mut, lineHeight: 1.5, marginBottom: 12 }}>Двоє неповнолітніх дітей, спільна нерухомість. Клієнтка хоче подати на розлучення та обговорити опіку. Передзвонити 17:00–20:00.</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: CAB.ink, fontWeight: 700 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={CAB.blue} strokeWidth="2.4"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>
                  Остін, TX
                </span>
                <button ref={buyRef} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', borderRadius: 10,
                  fontWeight: 800, fontSize: 14, color: '#fff', border: 'none',
                  background: bought ? CAB.green : CAB.blue,
                  boxShadow: bought ? `0 8px 20px -8px ${CAB.green}` : `0 8px 20px -8px ${CAB.blue}`,
                  transition: 'all .35s', minWidth: 132, justifyContent: 'center',
                }}>
                  {phase === 2 ? (
                    <><span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,.45)', borderTopColor: '#fff', display: 'inline-block', animation: 'spinslow .7s linear infinite' }}></span>Купуємо…</>
                  ) : bought ? (
                    <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l4 4L19 6"/></svg>Придбано</>
                  ) : (
                    <>КУПИТИ · $80</>
                  )}
                </button>
              </div>
            </div>

            {/* other cards (static) */}
            {[
              { b: 'ДТП', src: 'Google Ads', dot: '#34A853', t: 'ДТП із травмами — шукають адвоката', loc: 'Остін, TX', p: '$210' },
              { b: 'БІЗ', src: 'SEO', dot: '#9b59b6', t: 'Реєстрація LLC у Техасі', loc: 'Даллас, TX', p: '$76' },
            ].map((c, i) => (
              <div key={i} style={{ background: CAB.card, border: `1px solid ${CAB.line}`, borderRadius: 14, padding: '13px 16px', opacity: .72 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <SpecBadge t={c.b} bg="#eef2f6" color={CAB.mut} />
                      <SourceTag t={c.src} dot={c.dot} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: CAB.ink }}>{c.t}</div>
                  </div>
                  <button style={{ padding: '10px 16px', borderRadius: 10, fontWeight: 800, fontSize: 13.5, color: '#fff', background: CAB.blue, border: 'none', whiteSpace: 'nowrap' }}>КУПИТИ · {c.p}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== MY LEADS ===== */}
        {view === 'mine' && (
          <div style={{ marginTop: 16, display: 'flex', gap: 14 }}>
            {/* client card */}
            <div style={{ flex: chatOpen ? '0 0 300px' : '1', transition: 'flex .4s' }}>
              <div style={{ fontSize: 12, color: CAB.mut, fontWeight: 600, marginBottom: 10 }}><b style={{ color: CAB.ink }}>29</b> ваших лідів · оновлено щойно</div>
              <div style={{ background: CAB.card, border: `1px solid ${CAB.blue}`, borderRadius: 14, padding: 16, boxShadow: `0 0 0 3px ${CAB.blueSoft}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#1397d6,#0a6fa0)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 16 }}>ОК</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: CAB.ink }}>Олена Коваль</div>
                    <div style={{ fontSize: 12, color: CAB.mut }}>Клієнт з 1 черв. 2026 · Остін, TX</div>
                  </div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: CAB.blueSoft, color: CAB.blue, fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 20, marginBottom: 12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: CAB.blue }}></span>Новий лід · контакти відкрито
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: CAB.ink, fontWeight: 600 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={CAB.green} strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>
                    +1 (512) 555-0142
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: CAB.ink, fontWeight: 600 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={CAB.blue} strokeWidth="2.2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                    olena.koval@example.com
                  </div>
                </div>
                <button ref={chatRef} style={{
                  width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px', borderRadius: 10, fontWeight: 800, fontSize: 14, color: '#fff', border: 'none',
                  background: chatOpen ? CAB.green : CAB.blue, boxShadow: `0 8px 20px -8px ${chatOpen ? CAB.green : CAB.blue}`, transition: 'all .3s',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>
                  {chatOpen ? 'Чат відкрито' : 'Відкрити чат'}
                </button>
              </div>
            </div>

            {/* chat panel */}
            {chatOpen && (
              <div className="slide-enter" style={{ flex: 1, background: CAB.card, border: `1px solid ${CAB.line}`, borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderBottom: `1px solid ${CAB.line}` }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#1397d6,#0a6fa0)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13 }}>ОК</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: CAB.ink }}>Олена Коваль</div>
                    <div style={{ fontSize: 11.5, color: CAB.green, display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: CAB.green }}></span>онлайн</div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CAB.blue} strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>
                </div>
                <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: CAB.bg }}>
                  <div style={{ alignSelf: 'flex-start', maxWidth: '82%', background: '#fff', border: `1px solid ${CAB.line}`, borderRadius: '14px 14px 14px 4px', padding: '10px 13px', fontSize: 13.5, color: CAB.ink }}>
                    Доброго дня! Мені потрібна консультація щодо розлучення та опіки над дітьми.
                  </div>
                  <div style={{ alignSelf: 'flex-end', maxWidth: '82%', background: CAB.blue, color: '#fff', borderRadius: '14px 14px 4px 14px', padding: '10px 13px', fontSize: 13.5 }}>
                    Вітаю, Олено! Так, я спеціалізуюсь на сімейному праві. Можемо призначити дзвінок сьогодні о 18:00?
                  </div>
                  <div style={{ alignSelf: 'flex-start', fontSize: 11.5, color: CAB.mut, paddingLeft: 4 }}>Олена друкує…</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderTop: `1px solid ${CAB.line}` }}>
                  <div style={{ flex: 1, height: 38, borderRadius: 20, background: CAB.bg, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 13, color: CAB.mut }}>Напишіть повідомлення…</div>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: CAB.blue, display: 'grid', placeItems: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z"/></svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* flyer chip */}
        {flyer && (
          <div style={{
            position: 'absolute', left: 0, top: 0, zIndex: 55, transform: `translate(${flyer.x}px, ${flyer.y}px) scale(${flyer.go ? 0.4 : 1})`,
            opacity: flyer.go ? 0 : 1, transition: 'transform 1s cubic-bezier(.5,0,.3,1), opacity 1s',
            background: CAB.green, color: '#fff', fontWeight: 800, fontSize: 12, padding: '7px 12px', borderRadius: 20, boxShadow: '0 8px 20px -6px rgba(34,160,107,.8)',
            display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l4 4L19 6"/></svg>
            +1 лід
          </div>
        )}

        <Cursor x={cur.x} y={cur.y} clicking={cur.click} />
      </div>
    </div>
  );
}

function SlideLeads() {
  const roles = [
    ['Маркетолог', '$2 200'],
    ['Таргетолог / PPC', '$1 500'],
    ['SMM-менеджер', '$1 100'],
    ['Рекламний бюджет', '$1 200'],
  ];
  return (
    <window.Frame n="05 / 11">
      <div className="stage-reveal">
        <Eyebrow>Кабінет адвоката — Маркетплейс лідів</Eyebrow>
        <h2 className="mt-5 font-display font-extrabold tracking-tight leading-[1.04] max-w-5xl" style={{ fontSize: 44 }}>
          Замість маркетингового відділу за <span className="text-white">$6 000/міс</span> — ліди по <span className="text-emerald">$80</span> у кабінеті
        </h2>
      </div>

      <div className="grid grid-cols-[0.72fr_1.28fr] gap-10 items-stretch mt-8 stage-reveal">
        {/* left — marketing team cost */}
        <div className="flex flex-col gap-4">
          <div className="glass rounded-3xl p-7 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="grid place-items-center h-11 w-11 rounded-xl glass-soft">
                <Icon name="users" className="text-white/70" style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <div className="text-white font-display font-bold text-[20px] leading-tight">Маркетингова команда</div>
                <div className="text-white/45 text-[13px]">традиційний підхід</div>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {roles.map((r, i) => (
                <div key={i} className="flex items-center justify-between border-b hairline pb-3">
                  <span className="text-white/65 text-[16px]">{r[0]}</span>
                  <span className="text-white/85 font-semibold text-[16px] font-mono">{r[1]}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-white/45 font-mono text-[11px] uppercase tracking-wider">На місяць</div>
                <div className="font-display font-black text-white" style={{ fontSize: 44 }}>$6 000<span className="text-white/40 text-[20px] font-bold">/міс</span></div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: 'rgba(229,72,72,0.12)' }}>
              <Icon name="alert-triangle" style={{ width: 16, height: 16, color: '#ff7a7a' }} />
              <span className="text-[13.5px]" style={{ color: '#ffb3b3' }}>Фіксовані витрати — без гарантії результату</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 glow-em flex items-center gap-4">
            <div className="font-display font-black text-emerald" style={{ fontSize: 40 }}>75×</div>
            <div className="text-white/70 text-[15px] leading-snug">дешевше за один лід — і ви <span className="text-white font-semibold">платите лише за результат</span></div>
          </div>
        </div>

        {/* right — cabinet with buy animation */}
        <div className="relative">
          <div className="absolute -inset-8 rounded-[40px] blur-3xl opacity-40 pointer-events-none"
               style={{ background: 'radial-gradient(closest-side, rgba(19,151,214,0.4), transparent 70%)' }}></div>
          <div className="relative flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold text-white" style={{ background: '#1397D6' }}>
              <Icon name="mouse-pointer-click" style={{ width: 15, height: 15 }} /> $80 за лід · лише за результат
            </span>
            <span className="text-white/40 text-[13px]">демо живого кабінету ↓</span>
          </div>
          <CabinetBuyMock />
        </div>
      </div>
    </window.Frame>
  );
}

window.SLIDES.push({ order: 3, title: 'Кабінет: купівля ліда', Component: SlideLeads });

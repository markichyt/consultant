;(function () {
  const h = React.createElement;
  const { useState, useEffect, useRef, useLayoutEffect } = React;

  const AV = {
    ink: '#16242f', mut: '#6b7785', line: '#e7edf2', bg: '#f4f7fa', card: '#fff',
    blue: '#1397d6', blueLt: '#56c2f0', green: '#22a06b', amber: '#E0A93F',
    hero: '#0b1620', heroMut: 'rgba(255,255,255,.62)',
  };
  const PHOTO = 'deck/oleg-photo-v2.jpg';
  const VIDEO = 'deck/i_avatar.mp4';

  function offW(el, root) {
    let x = 0, y = 0, n = el;
    while (n && n !== root && n !== document.body) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }

  function ACursor({ x, y, clicking }) {
    return h('div', { style: { position: 'absolute', left: 0, top: 0, zIndex: 60, pointerEvents: 'none', transform: `translate(${x}px,${y}px)`, transition: 'transform .7s cubic-bezier(.5,.05,.2,1)' } },
      h('div', { style: { position: 'relative', transform: clicking ? 'scale(.82)' : 'scale(1)', transition: 'transform .12s' } },
        h('svg', { width: 26, height: 30, viewBox: '0 0 26 30', fill: 'none', style: { filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.4))' } },
          h('path', { d: 'M2 2L2 22L7.5 17.5L11 25.5L14.5 24L11 16L18 16L2 2Z', fill: '#fff', stroke: '#16242f', strokeWidth: 1.5, strokeLinejoin: 'round' })),
        clicking && h('span', { style: { position: 'absolute', left: -8, top: -6, width: 34, height: 34, borderRadius: '50%', border: `2px solid ${AV.blue}`, animation: 'ripple .5s ease-out' } })));
  }

  /* row in the dark account card */
  function AcctRow({ label, children, top }) {
    return h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderTop: top ? '1px solid rgba(255,255,255,.07)' : 'none' } },
      h('span', { style: { color: 'rgba(255,255,255,.55)', fontSize: 14, fontWeight: 600 } }, label),
      children);
  }

  function AvatarStudioMock() {
    const [phase, setPhase] = useState(0);
    const [cur, setCur] = useState({ x: 150, y: 520, click: false });
    const rootRef = useRef(null), dropRef = useRef(null), genRef = useRef(null);

    useEffect(() => {
      const dur = [1100, 1150, 900, 2600, 5200];
      const id = setTimeout(() => setPhase((p) => (p + 1) % 5), dur[phase]);
      return () => clearTimeout(id);
    }, [phase]);

    const photoUp = phase >= 1;
    const processing = phase === 3;
    const done = phase >= 4;
    const credits = phase >= 3 ? 5 : 10;
    const deducted = phase >= 3;

    useLayoutEffect(() => {
      const root = rootRef.current; if (!root) return;
      const c = (r) => { const e = r.current; if (!e) return null; const o = offW(e, root); return { x: o.x + o.w / 2 - 4, y: o.y + o.h / 2 - 2 }; };
      let target = null, click = false;
      if (phase === 0) target = { x: 150, y: root.offsetHeight - 40 };
      else if (phase === 1) { target = c(dropRef); click = true; }
      else if (phase === 2) { target = c(genRef); click = true; }
      else if (phase === 3) target = c(genRef);
      else if (phase === 4) target = { x: root.offsetWidth - 60, y: 44 };
      if (target) setCur({ x: target.x, y: target.y, click });
      if (click) { const t = setTimeout(() => setCur((s) => ({ ...s, click: false })), 240); return () => clearTimeout(t); }
    }, [phase]);

    const steps = ['Аналіз рис обличчя', 'Синтез міміки та мовлення', 'Рендер відео-аватара'];

    return h('div', { ref: rootRef, className: 'relative', style: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, height: 560 } },

      /* ===== LEFT column ===== */
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },

        /* studio card */
        h('div', { style: { background: AV.card, borderRadius: 16, border: `1px solid ${AV.line}`, padding: 20, boxShadow: '0 30px 70px -40px rgba(0,0,0,.7)' } },
          h('div', { style: { fontSize: 12, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: AV.blue, marginBottom: 4 } }, 'AI-студія'),
          h('div', { style: { fontSize: 16, fontWeight: 800, color: AV.ink, marginBottom: 15 } }, 'Створення відео-аватара'),

          /* photo dropzone */
          h('div', { ref: dropRef, style: { borderRadius: 12, border: `1.5px dashed ${photoUp ? AV.blue : AV.line}`, background: photoUp ? '#eef9ff' : AV.bg, padding: photoUp ? 12 : 22, display: 'flex', alignItems: 'center', gap: 13, transition: 'all .3s' } },
            photoUp
              ? h('img', { src: PHOTO, alt: 'Фото', style: { width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: `0 0 0 2px ${AV.blue}55` } })
              : h('div', { style: { width: 44, height: 44, borderRadius: 12, background: '#e2e8ee', display: 'grid', placeItems: 'center', flexShrink: 0 } },
                  h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#9aa6b0', strokeWidth: 2 }, h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }), h('path', { d: 'M17 8l-5-5-5 5' }), h('path', { d: 'M12 3v12' }))),
            h('div', null,
              h('div', { style: { fontSize: 13.5, fontWeight: 800, color: photoUp ? AV.blue : AV.ink, lineHeight: 1.25 } }, photoUp ? 'Фото додано' : 'Завантажте своє фото'),
              h('div', { style: { fontSize: 11.5, color: AV.mut, marginTop: 2 } }, photoUp ? 'photo.jpg · 1 файл' : 'JPG або PNG, портрет'))),

          /* generate button */
          h('button', { ref: genRef, style: { marginTop: 14, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '13px', borderRadius: 11, fontWeight: 800, fontSize: 14.5, color: '#fff', border: 'none', background: 'linear-gradient(120deg,#1397d6,#1aa6e6)', boxShadow: (phase === 2) ? `0 0 0 4px ${AV.blue}33, 0 10px 24px -8px ${AV.blue}` : `0 8px 22px -8px ${AV.blue}`, opacity: photoUp ? 1 : .55, transition: 'all .3s' } },
            processing
              ? h('span', { style: { width: 15, height: 15, borderRadius: '50%', border: '2px solid rgba(255,255,255,.45)', borderTopColor: '#fff', display: 'inline-block', animation: 'spinslow .7s linear infinite' } })
              : h('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 2.2 }, h('path', { d: 'm12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z' })),
            processing ? 'Генеруємо…' : done ? 'Аватар готовий' : 'Згенерувати аватар'),
          h('div', { style: { fontSize: 11.5, color: AV.mut, textAlign: 'center', marginTop: 8 } }, 'Вартість: ', h('b', { style: { color: AV.ink } }, '5 AI Credits'))),

        /* dark account card (screenshot style) */
        h('div', { style: { position: 'relative', background: 'linear-gradient(180deg,#0f1c28,#0a131c)', borderRadius: 16, border: '1px solid rgba(255,255,255,.08)', overflow: 'visible', boxShadow: '0 30px 70px -40px rgba(0,0,0,.8)' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px 14px' } },
            h('img', { src: PHOTO, alt: 'Listunov Oleg', style: { width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' } }),
            h('div', null,
              h('div', { style: { color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1.1 } }, 'Listunov Oleg'),
              h('div', { style: { color: 'rgba(255,255,255,.45)', fontSize: 12, marginTop: 2 } }, 'Consultant · Boston, MA'))),
          h(AcctRow, { label: 'AI Credits', top: true },
            h('span', { key: 'c' + credits, style: { color: AV.blueLt, fontWeight: 800, fontSize: 17, fontFamily: 'JetBrains Mono, monospace', display: 'inline-block', animation: 'rise .35s ease both' } }, credits)),
          h(AcctRow, { label: 'Subscription', top: true },
            h('span', { style: { background: '#ffd84d', color: '#1a1300', fontWeight: 900, fontSize: 12, letterSpacing: '.04em', padding: '4px 10px', borderRadius: 6 } }, 'PRO')),
          /* deduction chip */
          deducted && h('div', { className: 'slide-enter', style: { position: 'absolute', right: 14, top: 58, background: AV.green, color: '#fff', fontWeight: 800, fontSize: 12, padding: '5px 10px', borderRadius: 20, boxShadow: '0 8px 20px -6px rgba(34,160,107,.8)', display: 'inline-flex', alignItems: 'center', gap: 5 } },
            h('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 3 }, h('path', { d: 'M5 12h14' })), '5 AI Credits'))),

      /* ===== RIGHT: result mock ===== */
      h('div', { style: { position: 'relative', borderRadius: 16, overflow: 'hidden', background: AV.hero, boxShadow: '0 50px 120px -40px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08)' } },
        /* chrome */
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 42, background: '#0e1b27', borderBottom: '1px solid rgba(255,255,255,.07)' } },
          h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' } }),
          h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#febc2e' } }),
          h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#28c840' } }),
          h('div', { style: { marginLeft: 14, flex: 1, height: 26, borderRadius: 7, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px' } },
            h('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: 'rgba(255,255,255,.45)' } }, 'consultantlm.com/studio/avatar'))),

        h('div', { style: { position: 'relative', height: 518 } },
          /* idle */
          (phase < 3) && h('div', { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 30 } },
            h('div', { style: { textAlign: 'center', opacity: .9 } },
              h('div', { style: { width: 70, height: 70, margin: '0 auto 16px', borderRadius: 18, background: 'rgba(19,151,214,.12)', display: 'grid', placeItems: 'center', border: '1px solid rgba(19,151,214,.3)' } },
                h('svg', { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: AV.blueLt, strokeWidth: 1.8 }, h('path', { d: 'm23 7-7 5 7 5V7z' }), h('rect', { x: 1, y: 5, width: 15, height: 14, rx: 2 }))),
              h('div', { style: { color: '#fff', fontWeight: 700, fontSize: 17 } }, 'Аватар ще не згенеровано'),
              h('div', { style: { color: AV.heroMut, fontSize: 13.5, marginTop: 6, maxWidth: 330 } }, 'Завантажте фото та натисніть «Згенерувати» — AI створить живий відео-аватар для профілю'))),

          /* processing */
          processing && h(AvatarProcessing, { steps }),

          /* result video */
          done && h('div', { className: 'slide-enter', style: { position: 'absolute', inset: 0, background: '#05080c' } },
            h('video', { key: 'av', src: VIDEO, autoPlay: true, loop: true, playsInline: true, ref: (el) => { if (el) { el.muted = true; const p = el.play(); if (p && p.catch) p.catch(() => {}); } }, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }),
            /* AI badge */
            h('div', { style: { position: 'absolute', top: 14, right: 14, zIndex: 5, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(120deg,#1397d6,#0a6fa0)', color: '#fff', fontWeight: 800, fontSize: 11, padding: '6px 12px', borderRadius: 20, boxShadow: '0 8px 20px -6px rgba(19,151,214,.9)' } },
              h('svg', { width: 11, height: 11, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 2.5 }, h('path', { d: 'm12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z' })), 'Згенеровано AI'),
            /* live badge */
            h('div', { style: { position: 'absolute', top: 14, left: 14, zIndex: 5, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(8,16,24,.6)', backdropFilter: 'blur(6px)', color: '#fff', fontWeight: 700, fontSize: 11.5, padding: '6px 11px', borderRadius: 20, border: '1px solid rgba(255,255,255,.14)' } },
              h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: '#ff3b30', animation: 'pulseGlow 1.4s infinite' } }), 'Відео-аватар'),
            /* caption */
            h('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, padding: '32px 18px 14px', background: 'linear-gradient(0deg, rgba(5,8,12,.95), transparent)' } },
              h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#fff', fontWeight: 600 } },
                h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: AV.green } }),
                'Аватар Listunov Oleg готовий — додано у профіль на ',
                h('span', { style: { color: AV.blueLt } }, 'consultantlm.com')))))),

      h(ACursor, { x: cur.x, y: cur.y, clicking: cur.click }));
  }

  function AvatarProcessing({ steps }) {
    const [k, setK] = useState(0);
    useEffect(() => { const id = setInterval(() => setK((v) => Math.min(steps.length, v + 1)), 620); return () => clearInterval(id); }, []);
    return h('div', { style: { position: 'absolute', inset: 0, padding: 30, display: 'flex', flexDirection: 'column' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 } },
        /* source photo being scanned */
        h('div', { style: { position: 'relative', width: 96, height: 116, borderRadius: 10, overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 30px -10px rgba(0,0,0,.6)' } },
          h('img', { src: PHOTO, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover' } }),
          h('div', { style: { position: 'absolute', left: 0, right: 0, top: 0, height: 26, background: 'linear-gradient(180deg, rgba(19,151,214,.55), transparent)', borderTop: `2px solid ${AV.blueLt}`, animation: 'scanmove 1.3s ease-in-out infinite alternate' } })),
        h('div', null,
          h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(19,151,214,.14)', border: '1px solid rgba(19,151,214,.3)', color: AV.blueLt, fontWeight: 800, fontSize: 12, padding: '5px 11px', borderRadius: 20, marginBottom: 10 } },
            h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: AV.blueLt, animation: 'pulseGlow 1.2s infinite' } }), 'AI ГЕНЕРУЄ'),
          h('div', { style: { color: '#fff', fontWeight: 800, fontSize: 21, lineHeight: 1.2 } }, 'Оживляємо фото у\u00A0', h('br'), 'відео-аватар…'))),

      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        steps.map((s, i) => {
          const active = i < k, current = i === k;
          return h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, opacity: (active || current) ? 1 : .4, transition: 'opacity .3s' } },
            h('div', { style: { width: 30, height: 30, borderRadius: 9, display: 'grid', placeItems: 'center', flexShrink: 0, background: active ? 'rgba(34,160,107,.18)' : 'rgba(255,255,255,.06)', border: `1px solid ${active ? 'rgba(34,160,107,.5)' : 'rgba(255,255,255,.1)'}` } },
              active ? h('svg', { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: AV.green, strokeWidth: 3 }, h('path', { d: 'M5 12l4 4L19 6' }))
                : current ? h('span', { style: { width: 13, height: 13, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)', borderTopColor: AV.blueLt, animation: 'spinslow .7s linear infinite' } })
                : h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,.3)' } })),
            h('span', { style: { color: '#fff', fontWeight: 600, fontSize: 14.5 } }, s));
        })),

      h('div', { style: { marginTop: 'auto', height: 6, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' } },
        h('div', { style: { height: '100%', width: (k / steps.length * 100) + '%', background: `linear-gradient(90deg,${AV.blue},${AV.green})`, transition: 'width .5s' } })));
  }

  function SlideAvatar() {
    return h(window.Frame, { n: '06 / 11' },
      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'AI відео-аватар'),
        h('h2', { className: 'mt-5 font-display font-extrabold tracking-tight leading-[1.04] max-w-5xl', style: { fontSize: 42 } },
          'Одне фото — і AI створює ', h('span', { className: 'text-neon' }, 'живий відео-аватар')),
        h('p', { className: 'mt-4 text-white/55 text-[18px] max-w-3xl' },
          'Юрист завантажує фото й натискає «Згенерувати». AI оживляє портрет у відео-аватар для профілю — а з балансу списується 5 AI Credits.')),
      h('div', { className: 'mt-7 stage-reveal' }, h(AvatarStudioMock)));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 4, title: 'AI відео-аватар', Component: SlideAvatar });
})();

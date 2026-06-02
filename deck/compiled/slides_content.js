;(function () {
  const h = React.createElement;
  const { useState, useEffect, useRef, useLayoutEffect } = React;

  const CN = {
    ink: '#16242f', mut: '#6b7785', line: '#e7edf2', bg: '#f4f7fa', card: '#fff',
    blue: '#1397d6', blueLt: '#56c2f0', blueSoft: '#e8f5fc', green: '#22a06b', greenSoft: '#e6f6ee', amber: '#E0A93F',
    hero: '#0b1620', heroMut: 'rgba(255,255,255,.62)',
  };

  function offW(el, root) {
    let x = 0, y = 0, n = el;
    while (n && n !== root && n !== document.body) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }

  function NCursor({ x, y, clicking }) {
    return h('div', { style: { position: 'absolute', left: 0, top: 0, zIndex: 70, pointerEvents: 'none', transform: 'translate(' + x + 'px,' + y + 'px)', transition: 'transform .7s cubic-bezier(.5,.05,.2,1)' } },
      h('div', { style: { position: 'relative', transform: clicking ? 'scale(.82)' : 'scale(1)', transition: 'transform .12s' } },
        h('svg', { width: 26, height: 30, viewBox: '0 0 26 30', fill: 'none', style: { filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.4))' } },
          h('path', { d: 'M2 2L2 22L7.5 17.5L11 25.5L14.5 24L11 16L18 16L2 2Z', fill: '#fff', stroke: '#16242f', strokeWidth: 1.5, strokeLinejoin: 'round' })),
        clicking && h('span', { style: { position: 'absolute', left: -8, top: -6, width: 34, height: 34, borderRadius: '50%', border: '2px solid ' + CN.blue, animation: 'ripple .5s ease-out' } })));
  }

  function Bars() {
    const data = [22, 30, 28, 44, 52, 70, 86, 100];
    return h('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 } },
      data.map((v, i) => h('div', { key: i, style: { flex: 1, height: v + '%', borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg,' + CN.green + ',' + CN.green + '22)', animation: 'rise .5s ease both', animationDelay: (0.1 + i * 0.07) + 's' } })));
  }

  function ContentMock() {
    const [phase, setPhase] = useState(0);
    const [cur, setCur] = useState({ x: 130, y: 430, click: false });
    const rootRef = useRef(null), genRef = useRef(null);

    useEffect(() => {
      const dur = [1500, 900, 2700, 5200];
      const id = setTimeout(() => setPhase((p) => (p + 1) % 4), dur[phase]);
      return () => clearTimeout(id);
    }, [phase]);

    const processing = phase === 2;
    const done = phase >= 3;
    const credits = phase >= 2 ? 35 : 50;
    const deducted = phase >= 2;

    useLayoutEffect(() => {
      const root = rootRef.current; if (!root) return;
      const c = (r) => { const e = r.current; if (!e) return null; const o = offW(e, root); return { x: o.x + o.w / 2 - 4, y: o.y + o.h / 2 - 2 }; };
      let target = null, click = false;
      if (phase === 0) target = { x: 130, y: root.offsetHeight - 36 };
      else if (phase === 1) { target = c(genRef); click = true; }
      else if (phase === 2) target = c(genRef);
      else if (phase === 3) target = { x: root.offsetWidth - 60, y: 44 };
      if (target) setCur({ x: target.x, y: target.y, click });
      if (click) { const t = setTimeout(() => setCur((s) => ({ ...s, click: false })), 240); return () => clearTimeout(t); }
    }, [phase]);

    const steps = ['Аналіз завершеної справи', 'Генерація SEO-статті', 'Генерація кейса', 'Публікація та індексація'];

    const outPill = (icon, label) => h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 9, border: '1px solid ' + CN.blue, background: CN.blueSoft, color: CN.blue, fontWeight: 700, fontSize: 12.5 } },
      h('svg', { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: CN.blue, strokeWidth: 2 }, icon), label);

    return h('div', { ref: rootRef, className: 'relative', style: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, height: 512 } },

      /* LEFT: studio */
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        h('div', { style: { background: CN.card, borderRadius: 16, border: '1px solid ' + CN.line, padding: 20, boxShadow: '0 30px 70px -40px rgba(0,0,0,.7)' } },
          h('div', { style: { fontSize: 12, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: CN.blue, marginBottom: 4 } }, 'Студія контенту'),
          h('div', { style: { fontSize: 16, fontWeight: 800, color: CN.ink, marginBottom: 14 } }, 'Згенерувати матеріал'),

          /* source case */
          h('div', { style: { fontSize: 11, fontWeight: 700, color: CN.mut, marginBottom: 7 } }, 'ДЖЕРЕЛО'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 11, padding: 11, borderRadius: 10, border: '1px solid ' + CN.blue, background: CN.blueSoft, marginBottom: 14 } },
            h('div', { style: { width: 34, height: 34, borderRadius: 8, background: CN.greenSoft, display: 'grid', placeItems: 'center', flexShrink: 0 } },
              h('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: CN.green, strokeWidth: 2.4 }, h('path', { d: 'M5 12l4 4L19 6' }))),
            h('div', null,
              h('div', { style: { fontSize: 13, fontWeight: 800, color: CN.ink, lineHeight: 1.2 } }, 'Розлучення з опікою — виграно'),
              h('div', { style: { fontSize: 11.5, color: CN.mut, marginTop: 2 } }, 'Завершена справа · Family Law'))),

          /* outputs */
          h('div', { style: { fontSize: 11, fontWeight: 700, color: CN.mut, marginBottom: 7 } }, 'ЩО ЗГЕНЕРУВАТИ'),
          h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 } },
            outPill(h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M9 13h6 M9 17h4' }), 'SEO-стаття'),
            outPill([h('rect', { key: 'r', x: 4, y: 3, width: 16, height: 18, rx: 2 }), h('path', { key: 'p', d: 'M8 8h8 M8 12h8 M8 16h5' })], 'Кейс')),

          /* generate */
          h('button', { ref: genRef, style: { width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: 13, borderRadius: 11, fontWeight: 800, fontSize: 14, color: '#fff', border: 'none', background: 'linear-gradient(120deg,#1397d6,#1aa6e6)', boxShadow: phase === 1 ? '0 0 0 4px rgba(19,151,214,.22), 0 10px 24px -8px ' + CN.blue : '0 8px 22px -8px ' + CN.blue, transition: 'all .3s' } },
            processing
              ? h('span', { style: { width: 15, height: 15, borderRadius: '50%', border: '2px solid rgba(255,255,255,.45)', borderTopColor: '#fff', display: 'inline-block', animation: 'spinslow .7s linear infinite' } })
              : h('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 2.2 }, h('path', { d: 'm12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z' })),
            processing ? 'Генеруємо…' : done ? 'Готово' : 'Згенерувати в 1 клік'),
          h('div', { style: { fontSize: 11.5, color: CN.mut, textAlign: 'center', marginTop: 8 } }, 'Вартість: ', h('b', { style: { color: CN.ink } }, '15 AI Credits'))),

        /* credits widget */
        h('div', { style: { position: 'relative', background: 'linear-gradient(180deg,#0f1c28,#0a131c)', borderRadius: 16, border: '1px solid rgba(255,255,255,.08)', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 30px 70px -40px rgba(0,0,0,.8)' } },
          h('span', { style: { color: 'rgba(255,255,255,.55)', fontSize: 14, fontWeight: 600 } }, 'AI Credits'),
          h('span', { key: 'c' + credits, style: { color: CN.blueLt, fontWeight: 800, fontSize: 17, fontFamily: 'JetBrains Mono, monospace', animation: 'rise .35s ease both' } }, credits),
          deducted && h('div', { className: 'slide-enter', style: { position: 'absolute', right: 14, top: -14, background: CN.green, color: '#fff', fontWeight: 800, fontSize: 11, padding: '4px 9px', borderRadius: 20, boxShadow: '0 8px 20px -6px rgba(34,160,107,.8)' } }, '−15 AI Credits'))),

      /* RIGHT: result mock */
      h('div', { style: { position: 'relative', borderRadius: 16, overflow: 'hidden', background: CN.hero, boxShadow: '0 50px 120px -40px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08)' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 42, background: '#0e1b27', borderBottom: '1px solid rgba(255,255,255,.07)' } },
          h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' } }),
          h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#febc2e' } }),
          h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#28c840' } }),
          h('div', { style: { marginLeft: 14, flex: 1, height: 26, borderRadius: 7, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px' } },
            h('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: 'rgba(255,255,255,.45)' } }, 'consultantlm.com/content'))),

        h('div', { style: { position: 'relative', height: 470 } },
          /* idle */
          (phase < 2) && h('div', { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 30 } },
            h('div', { style: { textAlign: 'center', opacity: .9 } },
              h('div', { style: { width: 70, height: 70, margin: '0 auto 16px', borderRadius: 18, background: 'rgba(19,151,214,.12)', display: 'grid', placeItems: 'center', border: '1px solid rgba(19,151,214,.3)' } },
                h('svg', { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: CN.blueLt, strokeWidth: 1.8 }, h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' }), h('path', { d: 'M14 2v6h6 M9 13h6 M9 17h4' }))),
              h('div', { style: { color: '#fff', fontWeight: 700, fontSize: 17 } }, 'Матеріали ще не створені'),
              h('div', { style: { color: CN.heroMut, fontSize: 13.5, marginTop: 6, maxWidth: 330 } }, 'AI напише SEO-статтю та кейс на основі вашої справи й опублікує — щоб збирати органічний трафік'))),

          /* processing */
          processing && h(ContentProcessing, { steps }),

          /* result */
          done && h('div', { className: 'slide-enter', style: { position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' } },
            h('div', { style: { position: 'absolute', top: 14, right: 14, zIndex: 5, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(120deg,#1397d6,#0a6fa0)', color: '#fff', fontWeight: 800, fontSize: 11, padding: '6px 12px', borderRadius: 20, boxShadow: '0 8px 20px -6px rgba(19,151,214,.9)' } },
              h('svg', { width: 11, height: 11, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 2.5 }, h('path', { d: 'm12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z' })), 'Згенеровано AI'),

            /* two output cards */
            h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
              resultCard('SEO-СТАТТЯ', 'Як змінити аліменти в Техасі: гайд 2026', 3),
              resultCard('КЕЙС', 'Розлучення з опікою — як ми виграли справу', 2)),

            /* google rank */
            h('div', { style: { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 14px' } },
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 } },
                h('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#7fd17f' } }, 'google.com › consultantlm.com › articles'),
                h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(34,160,107,.18)', color: '#5fd39a', fontWeight: 800, fontSize: 11, padding: '3px 9px', borderRadius: 20 } }, '#1 у Google · 24 год')),
              h('div', { style: { color: '#9cc2ff', fontSize: 14, fontWeight: 600 } }, 'Як змінити аліменти в Техасі: покроковий гайд 2026')),

            /* traffic chart */
            h('div', { style: { flex: 1, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column' } },
              h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 } },
                h('span', { style: { color: 'rgba(255,255,255,.6)', fontSize: 12.5, fontWeight: 600 } }, 'Органічний трафік на профіль'),
                h('span', { style: { color: '#5fd39a', fontWeight: 800, fontSize: 15 } }, '+320% / міс')),
              h(Bars))))),
        h(NCursor, { x: cur.x, y: cur.y, clicking: cur.click }));

    function resultCard(tag, title, lines) {
      return h('div', { style: { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: 14 } },
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 } },
          h('span', { style: { fontSize: 10, fontWeight: 800, letterSpacing: '.06em', color: CN.blueLt, background: 'rgba(19,151,214,.16)', padding: '3px 8px', borderRadius: 4 } }, tag),
          h('span', { style: { fontSize: 10, fontWeight: 700, color: '#5fd39a' } }, '● Опубліковано')),
        h('div', { style: { color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.3, marginBottom: 9 } }, title),
        Array.from({ length: lines }).map((_, i) => h('div', { key: i, style: { height: 5, borderRadius: 3, background: 'rgba(255,255,255,.12)', marginBottom: 6, width: (i === lines - 1 ? '70%' : '100%') } })));
    }
  }

  function ContentProcessing({ steps }) {
    const [k, setK] = useState(0);
    useEffect(() => { const id = setInterval(() => setK((v) => Math.min(steps.length, v + 1)), 600); return () => clearInterval(id); }, []);
    return h('div', { style: { position: 'absolute', inset: 0, padding: 30, display: 'flex', flexDirection: 'column' } },
      h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(19,151,214,.14)', border: '1px solid rgba(19,151,214,.3)', color: CN.blueLt, fontWeight: 800, fontSize: 12, padding: '5px 11px', borderRadius: 20, marginBottom: 14, alignSelf: 'flex-start' } },
        h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: CN.blueLt, animation: 'pulseGlow 1.2s infinite' } }), 'AI ГЕНЕРУЄ'),
      h('div', { style: { color: '#fff', fontWeight: 800, fontSize: 21, lineHeight: 1.2, marginBottom: 22 } }, 'Пишемо статтю та кейс', h('br'), 'на основі вашої справи…'),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        steps.map((s, i) => {
          const active = i < k, current = i === k;
          return h('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 12, opacity: (active || current) ? 1 : .4, transition: 'opacity .3s' } },
            h('div', { style: { width: 30, height: 30, borderRadius: 9, display: 'grid', placeItems: 'center', flexShrink: 0, background: active ? 'rgba(34,160,107,.18)' : 'rgba(255,255,255,.06)', border: '1px solid ' + (active ? 'rgba(34,160,107,.5)' : 'rgba(255,255,255,.1)') } },
              active ? h('svg', { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: CN.green, strokeWidth: 3 }, h('path', { d: 'M5 12l4 4L19 6' }))
                : current ? h('span', { style: { width: 13, height: 13, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)', borderTopColor: CN.blueLt, animation: 'spinslow .7s linear infinite' } })
                : h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,.3)' } })),
            h('span', { style: { color: '#fff', fontWeight: 600, fontSize: 14.5 } }, s));
        })),
      h('div', { style: { marginTop: 'auto', height: 6, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' } },
        h('div', { style: { height: '100%', width: (k / steps.length * 100) + '%', background: 'linear-gradient(90deg,' + CN.blue + ',' + CN.green + ')', transition: 'width .5s' } })));
  }

  function SlideContent() {
    return h(window.Frame, { n: '07 / 11' },
      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'AI Content Engine · SEO-трафік'),
        h('h2', { className: 'mt-5 font-display font-extrabold tracking-tight leading-[1.05] max-w-5xl', style: { fontSize: 42 } },
          'Не лише відео-аватар — AI пише ', h('span', { className: 'text-neon' }, 'статті та кейси, що збирають трафік')),
        h('p', { className: 'mt-4 text-white/55 text-[17px] max-w-4xl' },
          'В один клік AI генерує SEO-статтю і кейс на основі реальної виграної справи. Вони ранжуються в Google і приводять клієнтів — а юрист платить лише за згенероване.')),
      h('div', { className: 'mt-6 stage-reveal' }, h(ContentMock)));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 4.5, title: 'AI-контент: SEO-трафік', Component: SlideContent });
})();

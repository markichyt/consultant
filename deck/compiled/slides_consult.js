;(function () {
  const h = React.createElement;
  const { useState, useEffect, useRef, useLayoutEffect } = React;

  const CO = {
    ink: '#16242f', mut: '#6b7785', line: '#e7edf2', bg: '#f4f7fa', card: '#fff',
    blue: '#1397d6', blueSoft: '#e8f5fc', green: '#22a06b', greenSoft: '#e6f6ee', violet: '#7c5cff',
  };

  function offW(el, root) {
    let x = 0, y = 0, n = el;
    while (n && n !== root && n !== document.body) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }

  function CCursor({ x, y, clicking }) {
    return h('div', { style: { position: 'absolute', left: 0, top: 0, zIndex: 70, pointerEvents: 'none', transform: 'translate(' + x + 'px,' + y + 'px)', transition: 'transform .7s cubic-bezier(.5,.05,.2,1)' } },
      h('div', { style: { position: 'relative', transform: clicking ? 'scale(.82)' : 'scale(1)', transition: 'transform .12s' } },
        h('svg', { width: 26, height: 30, viewBox: '0 0 26 30', fill: 'none', style: { filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.35))' } },
          h('path', { d: 'M2 2L2 22L7.5 17.5L11 25.5L14.5 24L11 16L18 16L2 2Z', fill: '#fff', stroke: '#16242f', strokeWidth: 1.5, strokeLinejoin: 'round' })),
        clicking && h('span', { style: { position: 'absolute', left: -8, top: -6, width: 34, height: 34, borderRadius: '50%', border: '2px solid ' + CO.blue, animation: 'ripple .5s ease-out' } })));
  }

  function useTyped(text, active, speed) {
    const [n, setN] = useState(0);
    useEffect(() => {
      if (!active) { setN(0); return; }
      let i = 0; const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, speed || 26);
      return () => clearInterval(id);
    }, [active]);
    return text.slice(0, n);
  }

  const ANSWER = 'У Техасі для зміни аліментів подають клопотання (Motion to Modify). Знадобиться нова довідка про дохід і документи про звільнення.';

  function QuestionCard(props) {
    return h('div', { ref: props.innerRef, style: { background: CO.card, border: '1px solid ' + (props.hot ? CO.blue : CO.line), borderRadius: 12, padding: '14px 16px', boxShadow: props.hot ? '0 0 0 3px ' + CO.blueSoft : '0 2px 8px rgba(6,32,44,.04)', opacity: props.dim ? 0.6 : 1, transition: 'all .3s' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 } },
        h('span', { style: { background: CO.blueSoft, color: CO.blue, fontWeight: 800, fontSize: 11, letterSpacing: '.04em', padding: '3px 8px', borderRadius: 6 } }, props.spec),
        h('span', { style: { fontSize: 12, color: CO.mut, display: 'inline-flex', alignItems: 'center', gap: 5 } },
          h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: '#f0a500' } }), props.time)),
      h('div', { style: { fontSize: 15.5, fontWeight: 800, color: CO.ink, lineHeight: 1.3, marginBottom: 10 } }, props.title),
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 14, fontSize: 12.5, color: CO.mut } },
          h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 5 } },
            h('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: CO.blue, strokeWidth: 2.2 }, h('path', { d: 'M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z' }), h('circle', { cx: 12, cy: 10, r: 2.4 })), props.loc),
          h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 5 } },
            h('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: CO.mut, strokeWidth: 2.2 }, h('rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }), h('path', { d: 'm3 7 9 6 9-6' })), props.answers + ' відповідей')),
        h('button', { ref: props.btnRef, style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 9, fontWeight: 800, fontSize: 12.5, color: '#fff', border: 'none', background: CO.blue, boxShadow: props.hot ? '0 8px 20px -8px ' + CO.blue : 'none', textTransform: 'uppercase', letterSpacing: '.3px' } }, 'Відповісти')));
  }

  function ConsultMock() {
    const [phase, setPhase] = useState(0);
    const [cur, setCur] = useState({ x: 120, y: 430, click: false });
    const rootRef = useRef(null), btnRef = useRef(null), taRef = useRef(null), subRef = useRef(null);

    useEffect(() => {
      const dur = [1300, 1000, 1200, 2700, 1700, 3200];
      const id = setTimeout(() => setPhase((p) => (p + 1) % 6), dur[phase]);
      return () => clearTimeout(id);
    }, [phase]);

    const drawerOpen = phase >= 2;
    const published = phase >= 4;
    const toastOn = phase === 4 || phase === 5;
    const payoff = phase >= 5;
    const typed = useTyped(ANSWER, phase === 3, 22);

    useLayoutEffect(() => {
      const root = rootRef.current; if (!root) return;
      const c = (r) => { const e = r.current; if (!e) return null; const o = offW(e, root); return { x: o.x + o.w / 2 - 4, y: o.y + o.h / 2 - 2 }; };
      let target = null, click = false;
      if (phase === 0) target = { x: 120, y: root.offsetHeight - 36 };
      else if (phase === 1) target = c(btnRef);
      else if (phase === 2) { target = c(btnRef); click = true; }
      else if (phase === 3) target = c(taRef);
      else if (phase === 4) { target = c(subRef); click = true; }
      else if (phase === 5) target = { x: root.offsetWidth / 2, y: root.offsetHeight / 2 };
      if (target) setCur({ x: target.x, y: target.y, click });
      if (click) { const t = setTimeout(() => setCur((s) => ({ ...s, click: false })), 240); return () => clearTimeout(t); }
    }, [phase]);

    return h('div', { className: 'relative', style: { borderRadius: 16, overflow: 'hidden', background: CO.bg, boxShadow: '0 50px 120px -40px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08)' } },
      /* chrome */
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 42, background: '#fff', borderBottom: '1px solid ' + CO.line } },
        h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' } }),
        h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#febc2e' } }),
        h('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#28c840' } }),
        h('div', { style: { marginLeft: 14, flex: 1, height: 26, borderRadius: 7, background: CO.bg, display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px' } },
          h('span', { style: { width: 9, height: 9, borderRadius: 2, border: '1.5px solid ' + CO.green } }),
          h('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: CO.mut } }, 'app.consultantlm.com/consultations'))),

      /* body */
      h('div', { ref: rootRef, style: { position: 'relative', height: 470, padding: 20, fontFamily: 'Inter, sans-serif', overflow: 'hidden' } },
        /* tabs */
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
          h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: '#fff', background: CO.blue } }, 'Усі питання',
            h('span', { style: { fontSize: 11, fontWeight: 800, padding: '1px 7px', borderRadius: 20, background: 'rgba(255,255,255,.25)' } }, '6')),
          h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: CO.ink } }, 'Мої відповіді',
            h('span', { style: { fontSize: 11, fontWeight: 800, padding: '1px 7px', borderRadius: 20, background: '#eef2f6', color: CO.mut } }, published ? '3' : '2'))),

        /* feed */
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 11 } },
          h(QuestionCard, { innerRef: null, btnRef: btnRef, hot: phase >= 1 && phase < 2, spec: 'СІМ', time: '1 год тому', title: 'Як змінити розмір аліментів у Техасі?', loc: 'Остін, TX', answers: 2 }),
          h(QuestionCard, { dim: true, spec: 'НЕРУХ', time: '3 год тому', title: 'Права покупця, якщо продавець виходить з угоди?', loc: 'Х’юстон, TX', answers: 5 }),
          h(QuestionCard, { dim: true, spec: 'КРИМ', time: '5 год тому', title: 'Перше DUI в Далласі — які можливі покарання?', loc: 'Даллас, TX', answers: 0 })),

        /* drawer */
        h('div', { style: { position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', background: '#fff', borderLeft: '1px solid ' + CO.line, boxShadow: '-30px 0 60px -30px rgba(0,0,0,.25)', transform: drawerOpen ? 'translateX(0)' : 'translateX(103%)', transition: 'transform .5s cubic-bezier(.5,.05,.2,1)', display: 'flex', flexDirection: 'column' } },
          h('div', { style: { padding: '18px 20px 14px', borderBottom: '1px solid ' + CO.line } },
            h('span', { style: { background: CO.blueSoft, color: CO.blue, fontWeight: 800, fontSize: 11, padding: '3px 8px', borderRadius: 6 } }, 'СІМ · Family Law'),
            h('div', { style: { fontSize: 17, fontWeight: 800, color: CO.ink, lineHeight: 1.3, marginTop: 10 } }, 'Як змінити розмір аліментів у Техасі?')),
          h('div', { style: { padding: '14px 20px', flex: 1, overflow: 'hidden' } },
            h('div', { style: { fontSize: 11, fontWeight: 700, color: CO.mut, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 6 } }, 'Опис'),
            h('p', { style: { fontSize: 13.5, color: '#374151', lineHeight: 1.6, margin: 0 } }, 'Мій дохід суттєво змінився після звільнення та нової роботи. Хочу подати на зміну аліментів. Які документи знадобляться в суді?'),
            h('div', { style: { fontSize: 12, color: CO.mut, marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6 } },
              h('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: CO.mut, strokeWidth: 2.2 }, h('path', { d: 'M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z' }), h('circle', { cx: 12, cy: 10, r: 2.4 })), 'Michael S. · Остін, TX')),
          /* reply box */
          h('div', { style: { padding: 18, borderTop: '1px solid ' + CO.line, background: '#f9fafb' } },
            published
              ? h('div', { style: { background: '#eff6ff', borderLeft: '3px solid ' + CO.blue, borderRadius: '0 6px 6px 0', padding: '12px 14px' } },
                  h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
                    h('span', { style: { fontSize: 11, fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '.5px' } }, 'Ваша відповідь'),
                    h('span', { style: { fontSize: 10, fontWeight: 700, color: '#fff', background: CO.violet, padding: '2px 8px', borderRadius: 3 } }, 'Опубліковано')),
                  h('p', { style: { fontSize: 13, color: '#1e3a8a', lineHeight: 1.5, margin: 0 } }, ANSWER))
              : h('div', null,
                  h('div', { style: { fontSize: 11, fontWeight: 700, color: CO.mut, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 } }, 'Напишіть відповідь'),
                  h('div', { ref: taRef, style: { minHeight: 92, border: '1px solid ' + (phase === 3 ? CO.blue : CO.line), borderRadius: 8, padding: 12, fontSize: 13.5, color: CO.ink, lineHeight: 1.5, background: '#fff', boxShadow: phase === 3 ? '0 0 0 3px rgba(19,151,214,.1)' : 'none', transition: 'all .2s' } },
                    typed || h('span', { style: { color: '#aeb8c0' } }, 'Напишіть професійну, детальну відповідь…'),
                    phase === 3 && h('span', { style: { display: 'inline-block', width: 1.5, height: 15, background: CO.blue, marginLeft: 1, verticalAlign: 'middle', animation: 'caretblink 1s steps(1) infinite' } })),
                  h('button', { ref: subRef, style: { marginTop: 12, width: '100%', padding: 12, borderRadius: 8, fontWeight: 800, fontSize: 13, color: '#fff', border: 'none', background: CO.blue, textTransform: 'uppercase', letterSpacing: '.5px', boxShadow: phase === 4 ? '0 0 0 4px rgba(19,151,214,.25)' : 'none' } }, 'Опублікувати відповідь')))),

        /* toast */
        toastOn && h('div', { className: 'slide-enter', style: { position: 'absolute', bottom: 18, left: 18, zIndex: 65, display: 'inline-flex', alignItems: 'center', gap: 10, background: CO.green, color: '#fff', fontWeight: 600, fontSize: 13, padding: '12px 16px', borderRadius: 9, boxShadow: '0 12px 28px -10px rgba(34,160,107,.7)' } },
          h('span', { style: { width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,.22)', display: 'grid', placeItems: 'center', fontSize: 13 } }, '✓'), 'Відповідь опубліковано'),

        /* payoff */
        payoff && h('div', { style: { position: 'absolute', inset: 0, zIndex: 66, background: 'rgba(11,22,30,.55)', backdropFilter: 'blur(3px)', display: 'grid', placeItems: 'center', padding: 24 } },
          h('div', { className: 'slide-enter', style: { background: '#fff', borderRadius: 18, padding: 28, maxWidth: 380, textAlign: 'center', boxShadow: '0 40px 90px -30px rgba(0,0,0,.6)' } },
            h('div', { style: { width: 58, height: 58, margin: '0 auto 14px', borderRadius: '50%', background: CO.greenSoft, display: 'grid', placeItems: 'center' } },
              h('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: CO.green, strokeWidth: 2.6 }, h('path', { d: 'M5 12l4 4L19 6' }))),
            h('div', { style: { fontSize: 19, fontWeight: 800, color: CO.ink, lineHeight: 1.25 } }, 'Клієнт обрав вас виконавцем'),
            h('div', { style: { fontSize: 13, color: CO.mut, marginTop: 8, lineHeight: 1.5 } }, '«Як змінити розмір аліментів…»', h('br'), 'Michael S. · Остін, TX'),
            h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 16, background: CO.greenSoft, color: CO.green, fontWeight: 800, fontSize: 13, padding: '8px 14px', borderRadius: 20 } },
              h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: CO.green } }), 'Безкоштовний лід · $0 за залучення'),
            h('button', { style: { marginTop: 16, width: '100%', padding: 12, borderRadius: 9, fontWeight: 800, fontSize: 13.5, color: '#fff', border: 'none', background: CO.blue } }, 'Відкрити замовлення'))),

        h(CCursor, { x: cur.x, y: cur.y, clicking: cur.click })));
  }

  function Step(props) {
    return h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.7)', fontSize: 13.5, fontWeight: 600 } },
      h('span', { style: { width: 22, height: 22, borderRadius: '50%', background: 'rgba(19,151,214,.18)', border: '1px solid rgba(86,194,240,.4)', color: '#56C2F0', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800 } }, props.n),
      props.children);
  }

  function SlideConsult() {
    return h(window.Frame, { n: '08 / 11' },
      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'Консультації · Безкоштовні ліди'),
        h('h2', { className: 'mt-5 font-display font-extrabold tracking-tight leading-[1.05] max-w-5xl', style: { fontSize: 42 } },
          'Юрист відповідає на питання — і клієнт ', h('span', { className: 'text-neon' }, 'обирає його виконавцем')),
        h('p', { className: 'mt-4 text-white/55 text-[17px] max-w-4xl' },
          'Публічні питання з сайту приходять у кабінет. Відповів детально — потрапив у видачу — клієнт обрав саме вас. Нуль витрат на залучення.')),

      h('div', { className: 'mt-6 stage-reveal' },
        h('div', { className: 'relative flex items-center gap-5 mb-3' },
          h(Step, { n: '1' }, 'Клієнт ставить питання'),
          h('span', { style: { color: 'rgba(255,255,255,.3)' } }, '→'),
          h(Step, { n: '2' }, 'Юрист відповідає'),
          h('span', { style: { color: 'rgba(255,255,255,.3)' } }, '→'),
          h(Step, { n: '3' }, 'Обрали вас = безкоштовний лід')),
        h('div', { className: 'relative' },
          h('div', { className: 'absolute -inset-8 rounded-[40px] blur-3xl opacity-40 pointer-events-none', style: { background: 'radial-gradient(closest-side, rgba(19,151,214,0.4), transparent 70%)' } }),
          h(ConsultMock))));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 5, title: 'Консультації: безкоштовні ліди', Component: SlideConsult });
})();

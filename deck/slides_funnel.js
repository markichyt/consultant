;(function () {
  const h = React.createElement;
  const C = { blue: '#1397d6', blueLt: '#56C2F0', green: '#22c07a', amber: '#E0A93F', ink: '#fff', mut: 'rgba(255,255,255,.55)' };

  function Ico(d, color, size) {
    return h('svg', { width: size || 26, height: size || 26, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }, Array.isArray(d) ? d.map((p, i) => h('path', { key: i, d: p })) : h('path', { d: d }));
  }

  function Node(o) {
    const accent = o.accent || 'rgba(255,255,255,.09)';
    return h('div', { style: { position: 'absolute', left: o.x, top: o.y, width: o.w, height: o.h, opacity: 0, animation: 'rise .55s cubic-bezier(.22,.61,.36,1) both', animationDelay: o.delay, boxSizing: 'border-box', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, background: o.bg || 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid ' + accent, boxShadow: o.glow || '0 20px 50px -30px rgba(0,0,0,.8)' } },
      o.icon && h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        h('div', { style: { width: 36, height: 36, borderRadius: 10, background: 'rgba(19,151,214,.14)', border: '1px solid rgba(86,194,240,.28)', display: 'grid', placeItems: 'center', flexShrink: 0 } }, o.icon),
        h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: 17, color: '#fff', lineHeight: 1.15 } }, o.title)),
      !o.icon && h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: o.titleSize || 17, color: o.titleColor || '#fff', lineHeight: 1.15, textAlign: o.center ? 'center' : 'left' } }, o.title),
      o.sub && h('div', { style: { fontSize: 13, color: C.mut, lineHeight: 1.4, textAlign: o.center ? 'center' : 'left' } }, o.sub));
  }

  function chip(x, y, text, color, delay) {
    return h('div', { style: { position: 'absolute', left: x, top: y, opacity: 0, animation: 'rise .5s ease both', animationDelay: delay, fontSize: 12, fontWeight: 800, color: color, background: 'rgba(8,16,24,.9)', border: '1px solid ' + color, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' } }, text);
  }

  function Funnel() {
    const W = 1630, H = 500;
    const marker = (id, col) => h('marker', { id: id, markerWidth: 9, markerHeight: 9, refX: 7, refY: 4.5, orient: 'auto', markerUnits: 'userSpaceOnUse' }, h('path', { d: 'M0,0 L9,4.5 L0,9 z', fill: col }));
    const path = (d, col, mk) => h('path', { d: d, fill: 'none', stroke: col, strokeWidth: 2.5, strokeLinecap: 'round', markerEnd: 'url(#' + mk + ')', style: { opacity: 0, animation: 'rise .6s ease both', animationDelay: '.5s' } });

    return h('div', { style: { position: 'relative', width: W, height: H, margin: '0 auto' } },
      /* connectors */
      h('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, style: { position: 'absolute', inset: 0, overflow: 'visible' } },
        h('defs', null, marker('arC', C.blueLt), marker('arG', C.green), marker('arA', C.amber)),
        path('M230,250 L296,250', C.blueLt, 'arC'),
        path('M515,250 L556,250', C.blueLt, 'arC'),
        path('M770,250 C 815,250 815,97 856,97', C.green, 'arG'),
        path('M770,250 C 815,250 815,402 856,402', C.amber, 'arA'),
        path('M1190,97 C 1265,97 1265,220 1336,220', C.green, 'arG'),
        path('M1240,402 C 1292,402 1292,300 1336,300', C.green, 'arG')),

      /* nodes + labels */
      h('div', { className: 'stage-reveal', style: { position: 'absolute', inset: 0 } },
        h(Node, { x: 0, y: 185, w: 230, h: 132, delay: '.05s', icon: Ico(['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20'], C.blueLt), title: 'Трафік', sub: 'Реклама · SEO · соцмережі' }),
        h(Node, { x: 300, y: 185, w: 215, h: 132, delay: '.16s', icon: Ico('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z', C.blueLt), title: 'Заявка', sub: 'Людина лишає номер телефону' }),
        h(Node, { x: 560, y: 205, w: 210, h: 92, delay: '.27s', center: true, titleSize: 16, accent: 'rgba(86,194,240,.4)', bg: 'rgba(19,151,214,.1)', title: 'Юрист купує лід?' }),
        h(Node, { x: 860, y: 35, w: 330, h: 124, delay: '.4s', accent: 'rgba(34,192,122,.45)', glow: '0 0 38px -6px rgba(34,192,122,.4)', icon: Ico('M5 12l4 4L19 6', C.green), title: 'Так → продано юристу', sub: 'Миттєвий продаж ліда · дохід' }),
        h(Node, { x: 860, y: 340, w: 385, h: 124, delay: '.52s', accent: 'rgba(224,169,63,.45)', icon: Ico(['M4 14v-2a8 8 0 0 1 16 0v2', 'M4 14h3v6H6a2 2 0 0 1-2-2v-4z', 'M20 14h-3v6h1a2 2 0 0 0 2-2v-4z'], C.amber), title: 'Ні → кол-центр обробляє', sub: 'Оператор телефонує, кваліфікує й підбирає юриста → угода' }),
        h(Node, { x: 1340, y: 150, w: 290, h: 200, delay: '.66s', center: true, accent: 'rgba(34,192,122,.55)', bg: 'linear-gradient(160deg, rgba(34,192,122,.16), rgba(34,192,122,.04))', glow: '0 0 50px -8px rgba(34,192,122,.5)', title: '0%', titleSize: 64, titleColor: C.green, sub: 'втрачених лідів — кожен продається або обробляється' }),
        chip(792, 150, 'куплено', C.green, '.46s'),
        chip(784, 330, 'не куплено', C.amber, '.58s')));
  }

  function SlideFunnel() {
    return h(window.Frame, { n: '09 / 11' },
      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'Бізнес-модель · Безпрограшна воронка'),
        h('h2', { className: 'mt-5 font-display font-extrabold tracking-tight leading-[1.05] max-w-5xl', style: { fontSize: 42 } },
          'Жоден лід не втрачається — кожен ', h('span', { className: 'text-neon' }, 'продається або обробляється')),
        h('p', { className: 'mt-4 text-white/55 text-[17px] max-w-4xl' },
          'Якщо юрист не купує заявку — вона не зникає: лід іде на кол-центр, де оператор кваліфікує його й підбирає юриста. Мінімум втрат, максимум монетизації.')),
      h('div', { className: 'mt-9 stage-reveal' }, h(Funnel)));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 6, title: 'Безпрограшна воронка лідів', Component: SlideFunnel });
})();

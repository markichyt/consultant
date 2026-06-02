;(function () {
  const h = React.createElement;
  const RED = '#ef4444';

  /* 6 full-colour circles scattered across the 7×4 grid; rest muted */
  const COLORED = { 2: 1, 8: 1, 13: 1, 17: 1, 22: 1, 25: 1 };
  const GRADS = [
    'linear-gradient(135deg,#1397d6,#0a6fa0)',
    'linear-gradient(135deg,#22a06b,#0d6e4a)',
    'linear-gradient(135deg,#3a7bd5,#2456a6)',
    'linear-gradient(135deg,#2bb6c4,#127d89)',
    'linear-gradient(135deg,#19a7ce,#0c6f8c)',
    'linear-gradient(135deg,#4a90d9,#2a63b0)',
  ];
  const INITS = ['ОК','ІМ','ВД','СП','НТ','ЛР','АБ','ГП','ДЗ','МК','РТ','ЮВ','ОС','ПН','КЛ','ТА','БМ','ВС','ДО','ЛК','НП','РЯ','СІ','ФД','ХО','ЦВ','ЧЕ','ШУ'];

  function AvatarGrid() {
    const cells = [];
    let ci = 0;
    for (let i = 0; i < 28; i++) {
      const colored = !!COLORED[i];
      const grad = colored ? GRADS[ci++ % GRADS.length] : 'linear-gradient(135deg,#3a4754,#222c36)';
      const delay = (0.30 + i * 0.05).toFixed(2) + 's';
      cells.push(
        h('div', { key: i, style: { position: 'relative', width: 56, height: 56, opacity: 0, animation: 'rise .5s cubic-bezier(.22,.61,.36,1) both', animationDelay: delay } },
          (!colored) && h('div', { style: { position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', fontFamily: 'Inter, sans-serif' } }, '?'),
          h('div', { style: { width: 56, height: 56, borderRadius: '50%', background: grad, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'Inter, sans-serif', opacity: colored ? 1 : 0.32, filter: colored ? 'none' : 'grayscale(1)', boxShadow: colored ? '0 6px 18px -6px rgba(19,151,214,.6)' : 'none' } }, INITS[i]))
      );
    }
    return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 56px)', gap: 10, justifyContent: 'start' } }, cells);
  }

  function PainCards() {
    const sv = (kids) => h('svg', { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: RED, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }, kids);
    const funnel = sv([ h('path', { key: 'a', d: 'M3 5h18l-7 8v5l-4 2v-7L3 5z' }), h('path', { key: 'b', d: 'M2 3l20 18' }) ]);
    const chain = sv([ h('rect', { key: 'a', x: 3, y: 9, width: 9, height: 6, rx: 3 }), h('rect', { key: 'b', x: 12, y: 9, width: 9, height: 6, rx: 3 }), h('path', { key: 'c', d: 'M12 3.5v3M12 17.5v3' }) ]);
    const down = sv([ h('path', { key: 'a', d: 'M3 6l6 6 4-3 8 8' }), h('path', { key: 'b', d: 'M21 11v6h-6' }) ]);

    const card = (key, icon, num, label) => h('div', { key: key, style: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 10 } },
      icon,
      h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: 52, lineHeight: 1, color: RED } }, num),
      h('div', { style: { fontSize: 13, color: 'rgba(255,255,255,.7)', lineHeight: 1.45 } }, label));

    return h('div', { className: 'mt-7 stage-reveal', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
      card('c1', funnel, '$8K–$24K', 'щороку — Google Ads, агентства, SEO. Без вимірюваного ROI.'),
      card('c2', chain, '1 → 5', 'Avvo, FindLaw та Lawyer.com продають той самий лід 3–5 юристам одночасно.'),
      card('c3', down, '4–8%', 'Середня конверсія ліда в клієнта на застарілих платформах.'));
  }

  function SlideProblem() {
    return h(window.Frame, { n: '02 / 11' },
      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'Проблема ринку · США'),
        h('h1', { className: 'mt-5 font-display font-black tracking-[-0.02em] leading-[1.08]', style: { maxWidth: 1100, fontSize: 46 } },
          'Юристи США витрачають', h('br'),
          h('span', { className: 'text-neonlt text-glow-neon' }, '$24 млрд щороку на маркетинг'), h('br'),
          h('span', { style: { fontSize: 30, fontWeight: 800 } }, '— і не можуть порахувати, скільки клієнтів отримали')),
        h('p', { className: 'mt-4 text-white/55', style: { fontSize: 18, maxWidth: 900 } }, '1.3 млн юристів. 79% — solo або фірми до 10 осіб. Маркетингової команди немає.')),

      h('div', { className: 'mt-7' },
        h(AvatarGrid),
        h('div', { style: { marginTop: 12, fontSize: 12, fontStyle: 'italic', color: 'rgba(255,255,255,.45)', textAlign: 'center', width: 452 } }, 'Більшість юристів залишається невидимою онлайн')),

      h(PainCards),

      h('div', { style: { marginTop: 12, textAlign: 'right', fontSize: 10, fontStyle: 'italic', color: 'rgba(255,255,255,.4)' } }, 'Джерело: ABA TechReport 2024'));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 1.5, title: 'Проблема ринку', Component: SlideProblem });
})();

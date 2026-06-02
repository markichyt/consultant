;(function () {
  const h = React.createElement;
  const M = { blue: '#1397d6', blueLt: '#56C2F0', green: '#22c07a', amber: '#E0A93F', navy: '#1b2c3a' };

  function subEye(text) {
    return h('div', { className: 'font-mono', style: { fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.42)', marginBottom: 12 } }, text);
  }

  function Tier(o) {
    return h('div', { style: { position: 'relative', flex: 1, minWidth: 0, boxSizing: 'border-box', borderRadius: 14, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 4, transform: o.raised ? 'translateY(-6px)' : 'none', background: o.bg || 'rgba(255,255,255,0.03)', border: o.border, boxShadow: o.glow || 'none', opacity: 0, animation: 'rise .5s cubic-bezier(.22,.61,.36,1) both', animationDelay: o.delay } },
      o.badge && h('div', { style: { position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 700, fontFamily: 'Outfit, sans-serif', letterSpacing: '.04em', color: '#06384f', background: M.blueLt, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' } }, 'MOST PICKED'),
      o.icon && h('div', { style: { color: M.amber, marginBottom: 2 } }, o.icon),
      h('div', { className: 'font-display', style: { fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', color: o.nameColor || 'rgba(255,255,255,.55)' } }, o.name),
      h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 } },
        h('span', { className: 'font-display', style: { fontWeight: 800, fontSize: o.priceSize || 36, color: o.priceColor || '#fff', lineHeight: 1 } }, o.price),
        o.per && h('span', { style: { fontSize: 11, color: 'rgba(255,255,255,.45)' } }, o.per)),
      h('div', { style: { marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5 } },
        o.feats.map((f, i) => h('div', { key: i, style: { fontSize: 11, color: 'rgba(255,255,255,.62)', lineHeight: 1.3 } }, f))));
  }

  function seg(pct, bg, label, color, delay) {
    return h('div', { style: { width: pct + '%', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', padding: '0 4px', opacity: 0, animation: 'rise .5s ease both', animationDelay: delay } }, label);
  }

  function statChip(num, color, caption, delay) {
    return h('div', { style: { flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 12, padding: '12px 8px', opacity: 0, animation: 'rise .5s ease both', animationDelay: delay } },
      h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: 24, color: color, lineHeight: 1 } }, num),
      h('div', { style: { fontSize: 10.5, color: 'rgba(255,255,255,.5)', marginTop: 5, lineHeight: 1.3 } }, caption));
  }

  function circleLbl(big, bigSize, bigColor, sub) {
    return h('div', { style: { textAlign: 'center' } },
      h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: bigSize, color: bigColor, lineHeight: 1 } }, big),
      h('div', { style: { fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 4 } }, sub));
  }

  function SlideModel() {
    return h(window.Frame, { n: '10 / 11' },
      h('style', null, '@keyframes growx{from{transform:scaleX(0)}to{transform:scaleX(1)}} @keyframes sompulse{0%,100%{box-shadow:0 0 0 0 rgba(86,194,240,.45)}50%{box-shadow:0 0 0 14px rgba(86,194,240,0)}}'),

      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'Бізнес-модель · Ринок · Юніт-економіка'),
        h('h2', { className: 'mt-4 font-display font-extrabold tracking-tight leading-[1.06] max-w-5xl', style: { fontSize: 40 } },
          '$2,400 ARPU на рік', h('br'),
          h('span', { className: 'text-neonlt text-glow-neon' }, 'у $24 млрд адресуємому ринку США'))),

      h('div', { className: 'mt-7', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'start', animation: 'none', opacity: 1 } },

        /* ===== LEFT: business model ===== */
        h('div', null,
          subEye('Тарифи'),
          h('div', { style: { display: 'flex', gap: 12, alignItems: 'stretch' } },
            h(Tier, { delay: '.15s', name: 'BASE', price: '$49', per: '/місяць', nameColor: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,0.15)', feats: ['10 AI-постів', '6 лідів/міс', 'Публічний профайл'] }),
            h(Tier, { delay: '.25s', name: 'PRO', price: '$199', per: '/місяць', priceSize: 40, raised: true, badge: true, nameColor: M.blueLt, priceColor: M.blueLt, border: '2px solid ' + M.blue, bg: 'rgba(19,151,214,.1)', glow: '0 0 36px -6px rgba(19,151,214,.5)', feats: ['40 AI-постів', '30 лідів/міс', 'AI Avatar'] }),
            h(Tier, { delay: '.35s', name: 'PREMIUM', price: '$499', per: '/місяць', border: '1px solid rgba(224,169,63,.4)', feats: ['100 AI-постів', '∞ лідів', '24/7 менеджер'] }),
            h(Tier, { delay: '.45s', name: 'ENTERPRISE', price: 'Custom', priceSize: 26, border: '1px dashed rgba(255,255,255,0.25)', icon: h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: M.amber, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }, h('path', { d: 'm11 17 2 2a1 1 0 1 0 3-3' }), h('path', { d: 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4' }), h('path', { d: 'm21 3 1 11h-2' }), h('path', { d: 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3' }), h('path', { d: 'M3 4h8' })), feats: ['10+ юристів', 'Sales-контракт', 'White-label'] })),

          h('div', { style: { marginTop: 22 } },
            subEye('4 потоки виручки на юриста'),
            h('div', { style: { display: 'flex', height: 48, borderRadius: 10, overflow: 'hidden', transformOrigin: 'left', animation: 'growx .7s cubic-bezier(.22,.61,.36,1) both', animationDelay: '.55s' } },
              seg(45, M.navy, '$179 · Підписка', '#fff', '.6s'),
              seg(35, M.blue, '$220 · Ліди', '#fff', '.68s'),
              seg(12, M.green, 'Enterprise', '#06281a', '.76s'),
              seg(8, M.amber, 'Реф.', '#3a2a00', '.84s')),
            h('div', { style: { fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 8 } }, 'Annual prepay (−10%) → 38% юзерів лочаться на 12 міс.'))),

        /* ===== RIGHT: market ===== */
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
          circleLbl('$394 МЛРД', 30, '#fff', 'TAM · US legal services'),
          h('div', { style: { position: 'relative', width: 320, height: 320, marginTop: 8 } },
            /* TAM */
            h('div', { style: { position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(148,163,184,0.10)', border: '1px solid rgba(148,163,184,.35)', opacity: 0, animation: 'rise .55s ease both', animationDelay: '.3s' } }),
            /* SAM */
            h('div', { style: { position: 'absolute', left: 50, top: 50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(86,194,240,0.18)', border: '1.5px solid rgba(86,194,240,.6)', opacity: 0, animation: 'rise .55s ease both', animationDelay: '.46s', display: 'flex', justifyContent: 'center', paddingTop: 20 } },
              circleLbl('$24 МЛРД', 26, M.blueLt, 'SAM · маркетинг юристів')),
            /* SOM */
            h('div', { style: { position: 'absolute', left: 100, top: 100, width: 120, height: 120, borderRadius: '50%', background: '#0A1118', border: '2px solid ' + M.blueLt, display: 'grid', placeItems: 'center', textAlign: 'center', opacity: 0, animation: 'rise .55s ease both, sompulse 2.6s ease-in-out infinite', animationDelay: '.62s, .9s' } },
              h('div', null,
                h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: 21, color: M.blueLt, lineHeight: 1 } }, '$1.5 МЛРД'),
                h('div', { style: { fontSize: 9, color: 'rgba(255,255,255,.55)', marginTop: 3 } }, 'SOM · 3 роки'),
                h('div', { style: { fontSize: 8, color: 'rgba(255,255,255,.4)', marginTop: 2 } }, '600K solo × $2.5K')))),

          h('div', { style: { display: 'flex', gap: 10, marginTop: 26, width: '100%' } },
            statChip('85%+', M.green, 'очікувана gross margin', '.8s'),
            statChip('$2.4K', M.blueLt, 'ARPU цільовий Y1', '.9s'),
            statChip('+17% YoY', M.amber, 'ріст digital-витрат юристів', '1s')))));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 7, title: 'Бізнес-модель та ринок', Component: SlideModel });
})();

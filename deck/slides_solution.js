;(function () {
  const h = React.createElement;
  const CY = '#56C2F0';
  const EASE = 'cubic-bezier(.22,.61,.36,1)';

  function Check() {
    return h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: CY, strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round', style: { flexShrink: 0, marginTop: 2 } }, h('path', { d: 'M5 12l4 4L19 6' }));
  }
  function Bullet(props) {
    return h('div', { style: { display: 'flex', gap: 9, alignItems: 'flex-start' } }, h(Check), h('span', { style: { fontSize: 14, color: 'rgba(255,255,255,.82)', lineHeight: 1.34 } }, props.children));
  }
  function Chip(props) {
    return h('span', { style: { display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 600, color: CY, background: 'rgba(86,194,240,.1)', border: '1px solid rgba(86,194,240,.28)', padding: '5px 11px', borderRadius: 20, whiteSpace: 'nowrap' } }, props.children);
  }

  function Pillar(p) {
    return h('div', { style: { opacity: 0, animation: 'rise .55s ' + EASE + ' both', animationDelay: p.delay } },
      h('div', { style: { position: 'relative', height: '100%', transform: p.raised ? 'translateY(-8px)' : 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(86,194,240,0.18)', borderRadius: 18, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: p.glow ? '0 0 40px rgba(19,151,214,0.25)' : 'none' } },
        p.badge && h('div', { style: { position: 'absolute', top: 16, right: 16, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', fontFamily: 'Outfit, sans-serif', color: '#06384f', background: CY, padding: '4px 9px', borderRadius: 20 } }, 'MOST PICKED'),
        h('div', { style: { width: 80, height: 80, borderRadius: '50%', background: 'rgba(19,151,214,.14)', border: '1px solid rgba(86,194,240,.3)', display: 'grid', placeItems: 'center', fontSize: 38, lineHeight: 1 } }, p.emoji),
        h('div', null,
          h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1.1 } }, p.title),
          h('div', { style: { fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 4 } }, p.subtitle)),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } }, p.bullets.map(function (b, i) { return h(Bullet, { key: i }, b); })),
        h('div', { style: { marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 6 } }, p.chips.map(function (c, i) { return h(Chip, { key: i }, c); }))));
  }

  function SlideSolution() {
    return h(window.Frame, { n: '03 / 11' },
      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'Рішення · 3 продукти в одній підписці'),
        h('h1', { className: 'mt-5 font-display font-black tracking-[-0.02em] leading-[1.08]', style: { maxWidth: 1000, fontSize: 46 } },
          'Один акаунт — три AI-системи,', h('br'),
          h('span', { className: 'text-neonlt text-glow-neon' }, 'які працюють 24/7 за юриста')),
        h('p', { className: 'mt-4 text-white/55', style: { fontSize: 16, maxWidth: 920 } }, 'Маркетингова команда, яку соло-юрист собі не може дозволити. Граничні витрати на одного юриста: під $4 на місяць.')),

      h('div', { className: 'mt-8', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, alignItems: 'stretch', animation: 'none', opacity: 1 } },
        h(Pillar, {
          delay: '.25s', emoji: '🪪', title: 'AI Профайл', subtitle: 'Замінює сайт + копірайтера (~$5K/рік)',
          bullets: ['Завантажує CV — AI генерує сторінку англійською', 'Compliance з ABA Model Rules', 'Індексується в Google за 24 години', 'Один клік: лого, кольори, фото'],
          chips: ['→ Демо на слайді 4'],
        }),
        h(Pillar, {
          delay: '.65s', raised: true, glow: true, badge: true, emoji: '🤖', title: 'AI Content Engine', subtitle: 'Замінює агентство (~$2K/місяць)',
          bullets: ['10 / 40 / 100 постів і відео на місяць (за тарифом)', 'AI Avatar говорить за юриста 24/7', 'Авто-публікація у Google Ads + Meta Ads', 'AI-моніторинг конкурентів і авто-адаптація'],
          chips: ['→ AI Avatar на слайді 6'],
        }),
        h(Pillar, {
          delay: '.45s', emoji: '💬', title: 'Lead Marketplace', subtitle: 'Замінює Avvo / FindLaw',
          bullets: ['Один лід → один юрист (НЕ 1-до-5 як у Avvo)', 'Передкваліфікація AI-асистентом', 'Географічна ексклюзивність по практичних областях', 'Pay-as-you-go понад квоту підписки'],
          chips: ['→ Демо на слайді 5'],
        })),

      h('div', { style: { marginTop: 26, textAlign: 'center', fontSize: 18, fontStyle: 'italic', fontWeight: 600, fontFamily: 'Outfit, sans-serif', color: '#1397D6', opacity: 0, animation: 'rise .55s ' + EASE + ' both', animationDelay: '.95s' } }, 'Те, що Avvo зробив у 2007 для каталогів — ми робимо AI-native у 2026.'));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 1.75, title: 'Рішення: 3 продукти', Component: SlideSolution });
})();

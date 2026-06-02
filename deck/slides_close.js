;(function () {
  const h = React.createElement;
  const K = { blue: '#1397d6', blueLt: '#56C2F0', green: '#22c07a', amber: '#E0A93F', navy: '#1b2c3a' };

  function colTitle(t) {
    return h('div', { className: 'font-display', style: { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 14 } }, t);
  }
  function card(children, extra) {
    return h('div', { style: Object.assign({ background: 'linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: 20, boxShadow: '0 30px 60px -30px rgba(0,0,0,.7)' }, extra || {}) }, children);
  }

  function checkBullet(text, delay) {
    return h('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start', opacity: 0, animation: 'rise .5s ease both', animationDelay: delay } },
      h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: K.green, strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round', style: { flexShrink: 0, marginTop: 3 } },
        h('path', { d: 'M5 12l4 4L19 6' })),
      h('div', { style: { fontSize: 13, color: 'rgba(255,255,255,.82)', lineHeight: 1.42 } }, text));
  }

  function dotBullet(text, delay) {
    return h('div', { style: { display: 'flex', gap: 11, alignItems: 'flex-start', opacity: 0, animation: 'rise .5s ease both', animationDelay: delay } },
      h('span', { style: { width: 8, height: 8, borderRadius: '50%', background: K.blueLt, flexShrink: 0, marginTop: 7, boxShadow: '0 0 10px ' + K.blueLt } }),
      h('div', { style: { fontSize: 13, color: 'rgba(255,255,255,.82)', lineHeight: 1.42 } }, text));
  }

  function tlItem(q, text, delay) {
    return h('div', { style: { position: 'relative', paddingLeft: 26, paddingBottom: 16, opacity: 0, animation: 'rise .5s ease both', animationDelay: delay } },
      h('span', { style: { position: 'absolute', left: 0, top: 2, width: 12, height: 12, borderRadius: '50%', background: K.blue, boxShadow: '0 0 10px -1px ' + K.blue, border: '2px solid #0b1620' } }),
      h('div', { style: { fontSize: 12, fontWeight: 800, color: K.blueLt, fontFamily: 'JetBrains Mono, monospace' } }, q),
      h('div', { style: { fontSize: 13, color: 'rgba(255,255,255,.78)', marginTop: 3, lineHeight: 1.35 } }, text));
  }

  function ufCol(pct, color, pctLabel, cat, delay) {
    return h('div', { style: { width: pct + '%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0, animation: 'rise .5s ease both', animationDelay: delay } },
      h('div', { style: { fontSize: 12, fontWeight: 800, color: color } }, pctLabel),
      h('div', { style: { width: '100%', height: 30, background: color } }),
      h('div', { style: { fontSize: 10.5, color: 'rgba(255,255,255,.6)', textAlign: 'center', lineHeight: 1.25 } }, cat));
  }

  function SlideClose() {
    return h(window.Frame, { n: '11 / 11' },
      h('style', null, '@keyframes askpop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}'),

      h('div', { className: 'stage-reveal' },
        h(window.Eyebrow, null, 'Що далі'),
        h('h2', { className: 'mt-4 font-display font-extrabold tracking-tight leading-[1.06] max-w-5xl', style: { fontSize: 38 } },
          'Продукт працює. Воронка теж.', h('br'),
          h('span', { className: 'text-neonlt text-glow-neon' }, 'Шукаємо партнера, щоб масштабувати.'))),

      /* three columns */
      h('div', { className: 'mt-6', style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'stretch', animation: 'none', opacity: 1 } },

        /* WHAT WORKS — real, no fake numbers */
        h('div', { style: { opacity: 0, animation: 'rise .55s cubic-bezier(.22,.61,.36,1) both', animationDelay: '.15s' } },
          card([
            colTitle('Що вже працює'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 11 } },
              checkBullet('Live MVP — 24-крокова воронка залучення (5 хв)', '.2s'),
              checkBullet('AI-генерація профайлу та відео-аватара', '.27s'),
              checkBullet('Кабінет лідів — реальне інтерактивне демо в цьому деці', '.34s'),
              checkBullet('AI-контент та SEO-движок (слайди 6–7)', '.41s'),
              checkBullet('Compliance-ready: ABA Model Rules + SOC 2 path', '.48s'),
              checkBullet('Подвійна воронка лідів — продаж + кол-центр (слайд 9)', '.55s'))
          ], { height: '100%', boxSizing: 'border-box' })),

        /* WHAT MAKES US DIFFERENT — principles, no team placeholders */
        h('div', { style: { opacity: 0, animation: 'rise .55s cubic-bezier(.22,.61,.36,1) both', animationDelay: '.3s' } },
          card([
            colTitle('Що робить нас іншими'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 13 } },
              dotBullet('Exclusive lead model: 1 лід → 1 юрист (НЕ як Avvo 1→5)', '.35s'),
              dotBullet('AI-native архітектура з нуля, а не "AI поверх legacy"', '.42s'),
              dotBullet('Compliance-first — кожна фіча проходить ABA-перевірку', '.49s'),
              dotBullet('Marketplace flywheel: кожен новий юрист посилює SEO для всіх', '.56s')),
            h('div', { style: { marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.08)', fontSize: 12, color: 'rgba(255,255,255,.5)', fontStyle: 'italic', lineHeight: 1.45 } },
              'Команда, traction-метрики та dataroom — після першого дзвінка під NDA.')
          ], { height: '100%', boxSizing: 'border-box' })),

        /* ROADMAP — unchanged */
        h('div', { style: { opacity: 0, animation: 'rise .55s cubic-bezier(.22,.61,.36,1) both', animationDelay: '.45s' } },
          card([
            colTitle('Наступні 12 місяців'),
            h('div', { style: { position: 'relative' } },
              h('div', { style: { position: 'absolute', left: 5, top: 6, bottom: 14, width: 2, background: 'rgba(86,194,240,.3)' } }),
              tlItem('Q1', 'Paid acquisition: NY → FL → TX', '.5s'),
              tlItem('Q2', 'AI Avatar v2 (real-time, multilingual)', '.6s'),
              tlItem('Q3', 'Mobile app + інтеграції Clio / iManage', '.7s'),
              tlItem('Q4', 'Гео-розширення: UK + Canada', '.8s'))
          ], { height: '100%', boxSizing: 'border-box' }))),

      /* ASK card — generic round language, no specific $X.XM placeholder */
      h('div', { style: { marginTop: 18, opacity: 0, animation: 'askpop .55s cubic-bezier(.22,.61,.36,1) both', animationDelay: '.7s', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'center', background: 'linear-gradient(160deg, rgba(19,151,214,.16), rgba(19,151,214,.04))', border: '1px solid rgba(86,194,240,.5)', borderRadius: 18, padding: '24px 28px', boxShadow: '0 0 60px -12px rgba(19,151,214,.5)' } },
        h('div', null,
          h('div', { className: 'font-display', style: { fontWeight: 800, fontSize: 36, color: '#fff', lineHeight: 1.08 } },
            'Відкриваємо ', h('span', { style: { color: K.blueLt } }, 'seed-раунд')),
          h('div', { style: { fontSize: 14, color: 'rgba(255,255,255,.7)', marginTop: 10, lineHeight: 1.55 } },
            'Шукаємо lead-інвестора з мережею в US legal-tech.',
            h('br'),
            'Розмір раунду та оцінку обговорюємо на першому дзвінку — після того, як ви побачите dataroom.')),
        h('div', null,
          h('div', { style: { fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 10 } }, 'Куди підуть кошти'),
          h('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end' } },
            ufCol(40, K.blue, '40%', 'Paid acquisition (NY/FL/TX)', '.85s'),
            ufCol(30, K.navy, '30%', 'Engineering & product', '.95s'),
            ufCol(20, K.green, '20%', 'GTM hires', '1.05s'),
            ufCol(10, K.amber, '10%', 'Compliance & legal', '1.15s')))),

      /* tagline */
      h('div', { style: { marginTop: 16, textAlign: 'center', fontSize: 16, fontStyle: 'italic', color: K.blueLt, opacity: 0, animation: 'rise .6s ease both', animationDelay: '1.25s' } },
        'Ви не робите ставку на AI. Ви робите ставку на маркетплейс, який AI робить можливим.'));
  }

  window.SLIDES = window.SLIDES || [];
  window.SLIDES.push({ order: 8, title: 'Команда та раунд', Component: SlideClose });
})();

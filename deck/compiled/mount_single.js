;(function () {
  const h = React.createElement;
  const { useState, useEffect } = React;

  function SingleSlide() {
    const slides = (window.SLIDES || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
    const slide = slides[0];
    const [scale, setScale] = useState(1);

    useEffect(() => {
      const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
      fit();
      window.addEventListener('resize', fit);
      return () => window.removeEventListener('resize', fit);
    }, []);

    useEffect(() => {
      const id = setTimeout(() => { try { window.lucide.createIcons(); } catch (e) {} }, 40);
      return () => clearTimeout(id);
    }, []);

    const C = slide ? slide.Component : function () { return null; };

    return h('div', { className: 'fixed inset-0 overflow-hidden', style: { background: 'radial-gradient(120% 80% at 50% -10%, #13202B 0%, #0A1118 45%, #05080c 100%)' } },
      h('div', { className: 'pointer-events-none absolute inset-0 overflow-hidden' },
        h('div', { className: 'absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full blur-[120px] opacity-25', style: { background: '#1397D6' } }),
        h('div', { className: 'absolute bottom-0 right-10 h-[420px] w-[420px] rounded-full blur-[130px] opacity-[0.12]', style: { background: '#2CB67D' } })),
      h('div', { className: 'absolute top-1/2 left-1/2', style: { transform: 'translate(-50%, -50%) scale(' + scale + ')', width: 1920, height: 1080 } },
        h('div', { className: 'slide-enter absolute inset-0' }, h(C))));
  }

  ReactDOM.createRoot(document.getElementById('root')).render(h(SingleSlide));
  requestAnimationFrame(function () {
    var b = document.getElementById('boot');
    if (b) { b.style.transition = 'opacity .4s'; b.style.opacity = '0'; setTimeout(function () { b.remove(); }, 450); }
  });
})();

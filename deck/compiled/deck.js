;(function(){
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;
const STORE_KEY = 'consultantlm-deck-slide';
function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return scale;
}

/* ---- bottom control bar ---- */
function ControlBar({
  index,
  total,
  title,
  onPrev,
  onNext,
  onPick,
  onToggleGrid
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed left-1/2 bottom-6 -translate-x-1/2 z-40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass rounded-2xl flex items-center gap-1.5 px-3 py-2.5",
    style: {
      boxShadow: '0 24px 60px -24px rgba(0,0,0,0.9)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onPrev,
    disabled: index === 0,
    className: "group grid place-items-center h-11 w-11 rounded-xl transition-all duration-200 disabled:opacity-25 hover:bg-white/8 active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    className: "text-white/80 group-hover:-translate-x-0.5 transition-transform",
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 px-3"
  }, Array.from({
    length: total
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onPick(i),
    "aria-label": `Slide ${i + 1}`,
    className: "rounded-full transition-all duration-300",
    style: {
      height: 7,
      width: i === index ? 26 : 7,
      background: i === index ? '#1397D6' : 'rgba(255,255,255,0.22)',
      boxShadow: i === index ? '0 0 14px -2px #1397D6' : 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-3 min-w-[150px] text-center select-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[12px] text-white/40 tracking-wider"
  }, String(index + 1).padStart(2, '0'), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-white/20"
  }, "/"), " ", String(total).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "text-[12.5px] text-white/80 font-medium truncate max-w-[180px]"
  }, title)), /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    disabled: index === total - 1,
    className: "group grid place-items-center h-11 w-11 rounded-xl transition-all duration-200 disabled:opacity-25 hover:bg-white/8 active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    className: "text-white/80 group-hover:translate-x-0.5 transition-transform",
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-7 bg-white/10 mx-1"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleGrid,
    className: "grid place-items-center h-11 w-11 rounded-xl transition-all duration-200 hover:bg-white/8 active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layout-grid",
    className: "text-white/80",
    style: {
      width: 20,
      height: 20
    }
  }))));
}

/* ---- slide jump drawer ---- */
function SlideGrid({
  slides,
  index,
  onPick,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-end justify-center",
    style: {
      background: 'rgba(3,6,10,0.78)',
      backdropFilter: 'blur(10px)',
      animation: 'rise .25s ease both'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-[1180px] m-6 mb-8",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-5 px-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layout-grid",
    className: "text-neonlt",
    style: {
      width: 18,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold text-white text-lg"
  }, "Jump to slide")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center h-10 w-10 rounded-xl glass-soft hover:bg-white/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "text-white/70",
    style: {
      width: 18,
      height: 18
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-4 max-h-[68vh] overflow-y-auto no-sb pb-2"
  }, slides.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => {
      onPick(i);
      onClose();
    },
    className: `group text-left rounded-2xl p-5 transition-all duration-200 ${i === index ? 'glass glow-neon' : 'glass-soft hover:bg-white/[0.06]'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[13px]",
    style: {
      color: i === index ? '#56C2F0' : 'rgba(255,255,255,0.35)'
    }
  }, String(i + 1).padStart(2, '0')), i === index && /*#__PURE__*/React.createElement("span", {
    className: "h-2 w-2 rounded-full bg-neon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 text-white/85 font-medium text-[14.5px] leading-snug"
  }, s.title))))));
}
function Deck() {
  const slides = (window.SLIDES || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  const total = slides.length;
  const [index, setIndex] = useState(() => {
    const m = (location.hash || '').match(/s(\d+)/i);
    if (m) return Math.max(0, Math.min(total - 1, parseInt(m[1], 10) - 1));
    const saved = parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
    return isNaN(saved) ? 0 : Math.max(0, Math.min(total - 1, saved));
  });
  const [gridOpen, setGridOpen] = useState(false);
  const scale = useScale();
  const go = useCallback(next => {
    setIndex(cur => {
      const v = Math.max(0, Math.min(total - 1, typeof next === 'function' ? next(cur) : next));
      localStorage.setItem(STORE_KEY, String(v));
      return v;
    });
  }, [total]);

  // keyboard nav
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        go(c => c + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(c => c - 1);
      } else if (e.key === 'Home') go(0);else if (e.key === 'End') go(total - 1);else if (e.key === 'Escape') setGridOpen(false);else if (e.key === 'g' || e.key === 'G') setGridOpen(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, total]);

  // re-render lucide icons whenever slide changes
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        window.lucide.createIcons();
      } catch (e) {}
    }, 30);
    return () => clearTimeout(id);
  }, [index, gridOpen]);
  const Current = slides[index] ? slides[index].Component : () => null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 overflow-hidden",
    style: {
      background: 'radial-gradient(120% 80% at 50% -10%, #13202B 0%, #0A1118 45%, #05080c 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full blur-[120px] opacity-25",
    style: {
      background: '#1397D6'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 right-10 h-[420px] w-[420px] rounded-full blur-[130px] opacity-[0.12]",
    style: {
      background: '#2CB67D'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/2 left-1/2",
    style: {
      transform: `translate(-50%, -50%) scale(${scale})`,
      width: 1920,
      height: 1080
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "slide-enter absolute inset-0"
  }, /*#__PURE__*/React.createElement(Current, null))), /*#__PURE__*/React.createElement(ControlBar, {
    index: index,
    total: total,
    title: slides[index] ? slides[index].title : '',
    onPrev: () => go(c => c - 1),
    onNext: () => go(c => c + 1),
    onPick: i => go(i),
    onToggleGrid: () => setGridOpen(v => !v)
  }), gridOpen && /*#__PURE__*/React.createElement(SlideGrid, {
    slides: slides,
    index: index,
    onPick: i => go(i),
    onClose: () => setGridOpen(false)
  }));
}
window.Deck = Deck;
})();

;(function(){
const {
  useState,
  useEffect,
  useRef
} = React;

/* ----------------------------------------------------------------
   Icon — thin wrapper over Lucide UMD. createIcons() is re-run by
   the deck after every slide mount, so a plain <i> placeholder is
   enough here.
-----------------------------------------------------------------*/
function Icon({
  name,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    className: className,
    style: style
  });
}

/* small uppercase eyebrow with a neon node */
function Eyebrow({
  children,
  tone = 'neon'
}) {
  const c = tone === 'em' ? '#2CB67D' : '#1397D6';
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative flex h-2.5 w-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute inline-flex h-full w-full rounded-full opacity-60",
    style: {
      background: c,
      animation: 'pulseGlow 2.4s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-flex h-2.5 w-2.5 rounded-full",
    style: {
      background: c
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[15px] tracking-[0.32em] uppercase",
    style: {
      color: 'rgba(255,255,255,0.5)'
    }
  }, children));
}

/* brand wordmark — user's real logo SVG */
function Logo({
  size = 'base'
}) {
  const big = size === 'lg';
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "deck/logo.svg",
    alt: "CONSULTANT",
    style: {
      height: big ? 38 : 27,
      width: 'auto'
    }
  }));
}

/* animated count-up number, fires once when active */
function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1200
}) {
  const [n, setN] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = t => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) requestAnimationFrame(tick);else setN(value);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value]);
  const txt = n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return /*#__PURE__*/React.createElement("span", null, prefix, txt, suffix);
}

/* stat tile */
function Stat({
  value,
  label,
  sub,
  tone = 'neon',
  big = false
}) {
  const c = tone === 'em' ? '#2CB67D' : tone === 'plain' ? '#FFFFFF' : '#56C2F0';
  return /*#__PURE__*/React.createElement("div", {
    className: "glass rounded-2xl px-6 py-5 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-6 -top-10 h-24 w-24 rounded-full blur-2xl opacity-30",
    style: {
      background: tone === 'em' ? '#2CB67D' : '#1397D6'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `font-display font-extrabold tracking-tight ${big ? 'text-6xl' : 'text-5xl'}`,
    style: {
      color: c
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-white font-semibold text-[18px]"
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-white/45 text-[14px] font-mono tracking-wide"
  }, sub));
}

/* bullet row */
function Bullet({
  icon = 'check',
  tone = 'neon',
  children
}) {
  const c = tone === 'em' ? '#2CB67D' : '#56C2F0';
  return /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-0.5 grid place-items-center h-7 w-7 shrink-0 rounded-lg glass-soft",
    style: {
      boxShadow: `0 0 22px -8px ${c}`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    className: "",
    style: {
      width: 16,
      height: 16,
      color: c
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-white/82 text-[20px] leading-snug"
  }, children));
}

/* glass card */
function Card({
  children,
  className = '',
  glow = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `glass rounded-3xl ${glow} ${className}`
  }, children);
}

/* ----------------------------------------------------------------
   BrowserMockup — macOS-style window chrome. children render inside;
   if none, a labelled striped placeholder is shown.
-----------------------------------------------------------------*/
function BrowserMockup({
  url = 'app.consultantlm.com',
  caption,
  children,
  float = true,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `relative ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-10 rounded-[40px] blur-3xl opacity-40 pointer-events-none",
    style: {
      background: 'radial-gradient(closest-side, rgba(19,151,214,0.45), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative glass rounded-2xl overflow-hidden",
    style: {
      boxShadow: '0 50px 120px -40px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)',
      animation: float ? 'floaty 7s ease-in-out infinite' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 px-5 h-12 border-b hairline",
    style: {
      background: 'rgba(255,255,255,0.03)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-3.5 w-3.5 rounded-full",
    style: {
      background: '#FF5F57'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "h-3.5 w-3.5 rounded-full",
    style: {
      background: '#FEBC2E'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "h-3.5 w-3.5 rounded-full",
    style: {
      background: '#28C840'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ml-4 flex-1 flex items-center gap-2 h-7 rounded-lg px-3 glass-soft"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    style: {
      width: 12,
      height: 12,
      color: '#2CB67D'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[12px] text-white/45 truncate"
  }, url))), /*#__PURE__*/React.createElement("div", {
    className: "relative bg-[#0B141C]"
  }, children || /*#__PURE__*/React.createElement(Placeholder, {
    caption: caption
  }))));
}
function Placeholder({
  caption = 'Screenshot placeholder'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "striped grid place-items-center text-center px-8",
    style: {
      height: 460
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto mb-4 grid place-items-center h-14 w-14 rounded-2xl glass-soft"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    style: {
      width: 24,
      height: 24,
      color: 'rgba(255,255,255,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[13px] text-white/40 max-w-md leading-relaxed"
  }, caption)));
}

/* a thin pill chip */
function Chip({
  children,
  tone = 'default',
  icon
}) {
  const map = {
    default: 'text-white/70',
    neon: 'text-neonlt',
    em: 'text-emerald'
  };
  return /*#__PURE__*/React.createElement("span", {
    className: `inline-flex items-center gap-2 rounded-full glass-soft px-4 py-2 text-[14px] font-medium ${map[tone]}`
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      width: 14,
      height: 14
    }
  }), children);
}

/* faux UI primitives for inside mockups -------------------------- */
function MiniBars({
  data = [40, 62, 48, 80, 70, 96],
  color = '#1397D6'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-end gap-2 h-28"
  }, data.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex-1 rounded-t-md",
    style: {
      height: h + '%',
      background: `linear-gradient(180deg, ${color}, ${color}22)`,
      boxShadow: `0 0 18px -6px ${color}`
    }
  })));
}
function Sparkline({
  color = '#2CB67D'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 60",
    className: "w-full h-16",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "spk",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M0,48 C25,46 35,30 55,32 C80,34 90,12 120,16 C150,20 165,4 200,6",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0,48 C25,46 35,30 55,32 C80,34 90,12 120,16 C150,20 165,4 200,6 L200,60 L0,60 Z",
    fill: "url(#spk)"
  }));
}

/* shared slide frame ------------------------------------------------ */
function Frame({
  children,
  tag = 'CONSULTANT · Legal Marketplace',
  n,
  footnote,
  header = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full relative text-white font-sans flex flex-col",
    style: {
      padding: '70px 110px 96px'
    }
  }, header && /*#__PURE__*/React.createElement("header", {
    className: "flex items-center justify-between shrink-0"
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[12px] tracking-[0.25em] uppercase text-white/35"
  }, tag), n && /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[12px] text-white/25"
  }, "/ ", n))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 min-h-0 flex flex-col justify-center stage-reveal",
    style: {
      paddingTop: 28
    }
  }, children), footnote && /*#__PURE__*/React.createElement("footer", {
    className: "shrink-0 font-mono text-[11px] text-white/25 leading-relaxed mt-3 max-w-4xl"
  }, footnote));
}
window.SLIDES = window.SLIDES || [];
Object.assign(window, {
  Icon,
  Eyebrow,
  Logo,
  AnimatedNumber,
  Stat,
  Bullet,
  Card,
  Frame,
  BrowserMockup,
  Placeholder,
  Chip,
  MiniBars,
  Sparkline
});
})();

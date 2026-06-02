;(function(){
const {
  useState: useStateP,
  useEffect: useEffectP,
  useRef: useRefP,
  useLayoutEffect: useLayoutEffectP
} = React;

/* ===================================================================
   SLIDE 8 — AI profile generation.
   Lawyer uploads name / photo / résumé → clicks "Generate profile"
   → AI analyses everything → polished profile appears (flag hero).
====================================================================*/

const PR = {
  ink: '#16242f',
  mut: '#6b7785',
  line: '#e7edf2',
  bg: '#f4f7fa',
  card: '#fff',
  blue: '#1397d6',
  blueLt: '#56c2f0',
  green: '#22a06b',
  hero: '#0b1620',
  heroMut: 'rgba(255,255,255,.62)'
};
function offW(el, root) {
  let x = 0,
    y = 0,
    n = el;
  while (n && n !== root && n !== document.body) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return {
    x,
    y,
    w: el.offsetWidth,
    h: el.offsetHeight
  };
}
function PCursor({
  x,
  y,
  clicking
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 60,
      pointerEvents: 'none',
      transform: `translate(${x}px,${y}px)`,
      transition: 'transform .7s cubic-bezier(.5,.05,.2,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      transform: clicking ? 'scale(.82)' : 'scale(1)',
      transition: 'transform .12s'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "30",
    viewBox: "0 0 26 30",
    fill: "none",
    style: {
      filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.4))'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2L2 22L7.5 17.5L11 25.5L14.5 24L11 16L18 16L2 2Z",
    fill: "#fff",
    stroke: "#16242f",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  })), clicking && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -8,
      top: -6,
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: `2px solid ${PR.blue}`,
      animation: 'ripple .5s ease-out'
    }
  })));
}
function useTyped(text, active, speed) {
  const [n, setN] = useStateP(0);
  useEffectP(() => {
    if (!active) {
      setN(0);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed || 42);
    return () => clearInterval(id);
  }, [active, text]);
  return text.slice(0, n);
}
function Field({
  label,
  value,
  active,
  filled,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: PR.mut,
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 42,
      borderRadius: 9,
      border: `1.5px solid ${active ? PR.blue : PR.line}`,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      boxShadow: active ? `0 0 0 3px ${PR.blue}22` : 'none',
      transition: 'all .25s'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: filled ? PR.blue : '#c2ccd4',
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: value ? PR.ink : '#aeb8c0',
      fontWeight: 600
    }
  }, value || ' ', active && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 1.5,
      height: 16,
      background: PR.blue,
      marginLeft: 1,
      verticalAlign: 'middle',
      animation: 'caretblink 1s steps(1) infinite'
    }
  }))));
}
function ProfileGenMock() {
  const [phase, setPhase] = useStateP(0);
  const [cur, setCur] = useStateP({
    x: 470,
    y: 470,
    click: false
  });
  const rootRef = useRefP(null),
    nameRef = useRefP(null),
    surRef = useRefP(null),
    phoneRef = useRefP(null),
    emailRef = useRefP(null),
    photoRef = useRefP(null),
    cvRef = useRefP(null),
    genRef = useRefP(null);
  useEffectP(() => {
    const dur = [700, 900, 1050, 1250, 1350, 950, 1050, 850, 2700, 5200];
    const id = setTimeout(() => setPhase(p => (p + 1) % 10), dur[phase]);
    return () => clearTimeout(id);
  }, [phase]);
  const name = useTyped('Oleg', phase === 1, 90);
  const surname = useTyped('Listunov', phase === 2, 70);
  const phone = useTyped('+1 (617) 555-0148', phase === 3, 45);
  const email = useTyped('oleg.listunov@consultantlm.com', phase === 4, 30);
  const photoUp = phase >= 5;
  const cvUp = phase >= 6;
  const processing = phase === 8;
  const done = phase >= 9;
  useLayoutEffectP(() => {
    const root = rootRef.current;
    if (!root) return;
    const c = r => {
      const e = r.current;
      if (!e) return null;
      const o = offW(e, root);
      return {
        x: o.x + o.w / 2 - 4,
        y: o.y + o.h / 2 - 2
      };
    };
    let target = null,
      click = false;
    if (phase === 0) target = {
      x: root.offsetWidth / 2 - 120,
      y: root.offsetHeight - 50
    };else if (phase === 1) target = c(nameRef);else if (phase === 2) target = c(surRef);else if (phase === 3) target = c(phoneRef);else if (phase === 4) target = c(emailRef);else if (phase === 5) {
      target = c(photoRef);
      click = true;
    } else if (phase === 6) {
      target = c(cvRef);
      click = true;
    } else if (phase === 7) {
      target = c(genRef);
      click = true;
    } else if (phase === 8) target = c(genRef);else if (phase === 9) target = {
      x: root.offsetWidth - 60,
      y: 40
    };
    if (target) setCur({
      x: target.x,
      y: target.y,
      click
    });
    if (click) {
      const t = setTimeout(() => setCur(s => ({
        ...s,
        click: false
      })), 240);
      return () => clearTimeout(t);
    }
  }, [phase]);
  const steps = [{
    l: 'Сканування резюме (PDF)',
    i: 'scan-line'
  }, {
    l: 'Аналіз досвіду та кейсів',
    i: 'brain'
  }, {
    l: 'Генерація опису профілю',
    i: 'sparkles'
  }, {
    l: 'Створення відео-аватара',
    i: 'video'
  }];
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    className: "relative",
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 16,
      height: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PR.card,
      borderRadius: 16,
      border: `1px solid ${PR.line}`,
      padding: 20,
      boxShadow: '0 30px 70px -40px rgba(0,0,0,.7)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: PR.blue,
      marginBottom: 4
    }
  }, "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \u044E\u0440\u0438\u0441\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: PR.ink,
      marginBottom: 16
    }
  }, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0442\u0435 \u0441\u0432\u043E\u0457 \u0434\u0430\u043D\u0456"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: nameRef
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u0406\u043C\u02BC\u044F",
    value: name,
    active: phase === 1,
    filled: phase > 1
  })), /*#__PURE__*/React.createElement("div", {
    ref: surRef
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435",
    value: surname,
    active: phase === 2,
    filled: phase > 2
  }))), /*#__PURE__*/React.createElement("div", {
    ref: phoneRef
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    value: phone,
    active: phase === 3,
    filled: phase > 3,
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
    }))
  })), /*#__PURE__*/React.createElement("div", {
    ref: emailRef
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: email,
    active: phase === 4,
    filled: phase > 4,
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m3 7 9 6 9-6"
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: photoRef,
    style: {
      borderRadius: 10,
      border: `1.5px dashed ${photoUp ? PR.blue : PR.line}`,
      background: photoUp ? '#eef9ff' : PR.bg,
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      transition: 'all .3s'
    }
  }, photoUp ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#1397d6,#0a6fa0)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 800,
      fontSize: 12,
      flexShrink: 0
    }
  }, "OL") : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#e2e8ee',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#9aa6b0",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21a8 8 0 0 1 16 0"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: photoUp ? PR.blue : PR.mut,
      lineHeight: 1.2
    }
  }, photoUp ? 'Фото додано' : 'Фото')), /*#__PURE__*/React.createElement("div", {
    ref: cvRef,
    style: {
      borderRadius: 10,
      border: `1.5px dashed ${cvUp ? PR.blue : PR.line}`,
      background: cvUp ? '#eef9ff' : PR.bg,
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      transition: 'all .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 7,
      background: cvUp ? '#ffe9e9' : '#e2e8ee',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: cvUp ? '#e5484d' : '#9aa6b0',
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v6h6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: cvUp ? PR.blue : PR.mut,
      lineHeight: 1.2
    }
  }, cvUp ? 'CV.pdf · 2 стор.' : 'Резюме'))), /*#__PURE__*/React.createElement("button", {
    ref: genRef,
    style: {
      marginTop: 8,
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      padding: '13px',
      borderRadius: 11,
      fontWeight: 800,
      fontSize: 14.5,
      color: '#fff',
      border: 'none',
      background: phase >= 7 ? 'linear-gradient(120deg,#1397d6,#0a6fa0)' : 'linear-gradient(120deg,#1397d6,#1aa6e6)',
      boxShadow: phase === 7 ? `0 0 0 4px ${PR.blue}33, 0 10px 24px -8px ${PR.blue}` : `0 8px 22px -8px ${PR.blue}`,
      transition: 'all .3s'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"
  })), processing ? 'Генеруємо…' : done ? 'Профіль готовий' : 'Згенерувати профіль'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: PR.mut,
      textAlign: 'center',
      marginTop: 2
    }
  }, "\u0416\u043E\u0434\u043D\u043E\u0433\u043E \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0435\u043D\u043D\u044F \u2014 \u0440\u0435\u0448\u0442\u0443 \u0437\u0440\u043E\u0431\u0438\u0442\u044C AI"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      background: PR.hero,
      boxShadow: '0 50px 120px -40px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 16px',
      height: 42,
      background: '#0e1b27',
      borderBottom: '1px solid rgba(255,255,255,.07)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#ff5f57'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#febc2e'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#28c840'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 14,
      flex: 1,
      height: 26,
      borderRadius: 7,
      background: 'rgba(255,255,255,.06)',
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '0 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11.5,
      color: 'rgba(255,255,255,.45)'
    }
  }, "consultantlm.com/consultant/oleg-listunov"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 518
    }
  }, phase < 8 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      padding: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      opacity: .9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      height: 70,
      margin: '0 auto 16px',
      borderRadius: 18,
      background: 'rgba(19,151,214,.12)',
      display: 'grid',
      placeItems: 'center',
      border: '1px solid rgba(19,151,214,.3)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: PR.blueLt,
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9h6v6H9z",
    opacity: ".4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 3 1 3M12 18l1 3"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff',
      fontWeight: 700,
      fontSize: 17
    }
  }, "\u041F\u0440\u043E\u0444\u0456\u043B\u044C \u0449\u0435 \u043D\u0435 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: PR.heroMut,
      fontSize: 13.5,
      marginTop: 6,
      maxWidth: 320
    }
  }, "AI \u0437\u0433\u0435\u043D\u0435\u0440\u0443\u0454 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0437 \u0432\u0430\u0448\u0438\u0445 \u0434\u0430\u043D\u0438\u0445 \u2014 \u043E\u043F\u0438\u0441, \u043F\u043E\u0441\u043B\u0443\u0433\u0438, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0456 \u0432\u0456\u0434\u0435\u043E-\u0430\u0432\u0430\u0442\u0430\u0440"))), processing && /*#__PURE__*/React.createElement(Processing, {
    steps: steps
  }), done && /*#__PURE__*/React.createElement(GeneratedProfile, null))), /*#__PURE__*/React.createElement(PCursor, {
    x: cur.x,
    y: cur.y,
    clicking: cur.click
  }));
}
function Processing({
  steps
}) {
  const [k, setK] = useStateP(0);
  useEffectP(() => {
    const id = setInterval(() => setK(v => Math.min(steps.length, v + 1)), 560);
    return () => clearInterval(id);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: 30,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 104,
      height: 130,
      borderRadius: 8,
      background: '#fff',
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 10px 30px -10px rgba(0,0,0,.6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      width: '60%',
      background: '#dfe6ec',
      borderRadius: 3,
      marginBottom: 7
    }
  }), [...Array(8)].map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 4,
      width: i % 3 === 0 ? '90%' : '100%',
      background: '#eef2f6',
      borderRadius: 2,
      marginBottom: 5
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 26,
      background: 'linear-gradient(180deg, rgba(19,151,214,.5), transparent)',
      borderTop: `2px solid ${PR.blueLt}`,
      animation: 'scanmove 1.3s ease-in-out infinite alternate'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(19,151,214,.14)',
      border: '1px solid rgba(19,151,214,.3)',
      color: PR.blueLt,
      fontWeight: 800,
      fontSize: 12,
      padding: '5px 11px',
      borderRadius: 20,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: PR.blueLt,
      animation: 'pulseGlow 1.2s infinite'
    }
  }), "AI \u041F\u0420\u0410\u0426\u042E\u0404"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff',
      fontWeight: 800,
      fontSize: 21,
      lineHeight: 1.2
    }
  }, "\u0410\u043D\u0430\u043B\u0456\u0437\u0443\u0454\u043C\u043E \u0432\u0430\u0448\u0435", /*#__PURE__*/React.createElement("br", null), "\u0440\u0435\u0437\u044E\u043C\u0435 \u0442\u0430 \u0434\u043E\u0441\u0432\u0456\u0434\u2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, steps.map((s, i) => {
    const active = i < k,
      current = i === k;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: active || current ? 1 : .4,
        transition: 'opacity .3s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 9,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        background: active ? 'rgba(34,160,107,.18)' : 'rgba(255,255,255,.06)',
        border: `1px solid ${active ? 'rgba(34,160,107,.5)' : 'rgba(255,255,255,.1)'}`
      }
    }, active ? /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: PR.green,
      strokeWidth: "3"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12l4 4L19 6"
    })) : current ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 13,
        height: 13,
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,.3)',
        borderTopColor: PR.blueLt,
        animation: 'spinslow .7s linear infinite'
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'rgba(255,255,255,.3)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 14.5
      }
    }, s.l));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      height: 6,
      borderRadius: 3,
      background: 'rgba(255,255,255,.08)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: k / steps.length * 100 + '%',
      background: `linear-gradient(90deg,${PR.blue},${PR.green})`,
      transition: 'width .5s'
    }
  })));
}
function GeneratedProfile() {
  return /*#__PURE__*/React.createElement("div", {
    className: "slide-enter",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: PR.hero
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "deck/profile-real.jpg",
    alt: "\u0420\u0435\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0440\u043E\u0444\u0456\u043B\u044C \u043D\u0430 consultantlm.com",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'block',
      animation: 'profilescroll 8s ease-in-out forwards'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 56,
      background: 'linear-gradient(180deg, rgba(8,16,24,.8), transparent)',
      pointerEvents: 'none',
      zIndex: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 5,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'linear-gradient(120deg,#1397d6,#0a6fa0)',
      color: '#fff',
      fontWeight: 800,
      fontSize: 11,
      padding: '5px 11px',
      borderRadius: 20,
      boxShadow: '0 8px 20px -6px rgba(19,151,214,.9)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"
  })), "\u0417\u0433\u0435\u043D\u0435\u0440\u043E\u0432\u0430\u043D\u043E AI"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      padding: '26px 16px 12px',
      background: 'linear-gradient(0deg, rgba(8,16,24,.94), transparent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 12.5,
      color: '#fff',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: PR.green
    }
  }), "\u0420\u0435\u0430\u043B\u044C\u043D\u0430 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0430 \u043D\u0430 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: PR.blueLt
    }
  }, "consultantlm.com"), " \u2014 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u0430 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E")));
}
function SlideProfile() {
  return /*#__PURE__*/React.createElement(window.Frame, {
    n: "04 / 11"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-reveal"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 \xB7 AI-\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0456\u044F \u043F\u0440\u043E\u0444\u0456\u043B\u044E"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-5 font-display font-extrabold tracking-tight leading-[1.04] max-w-5xl",
    style: {
      fontSize: 42
    }
  }, "\u042E\u0440\u0438\u0441\u0442 \u043D\u0435 \u0441\u0442\u0432\u043E\u0440\u044E\u0454 \u043F\u0440\u043E\u0444\u0456\u043B\u044C \u0441\u0430\u043C \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "text-neon"
  }, "AI \u0440\u043E\u0431\u0438\u0442\u044C \u0446\u0435 \u0437\u0430 \u043D\u044C\u043E\u0433\u043E")), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-white/55 text-[18px] max-w-3xl"
  }, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0443\u0454 \u043B\u0438\u0448\u0435 \u0456\u043C\u02BC\u044F, \u0444\u043E\u0442\u043E \u0442\u0430 \u0440\u0435\u0437\u044E\u043C\u0435. AI \u0430\u043D\u0430\u043B\u0456\u0437\u0443\u0454 \u0432\u0441\u0435 \u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0433\u0435\u043D\u0435\u0440\u0443\u0454 \u043E\u043F\u0438\u0441, \u043F\u043E\u0441\u043B\u0443\u0433\u0438, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0456 \u0432\u0456\u0434\u0435\u043E-\u0430\u0432\u0430\u0442\u0430\u0440.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 stage-reveal"
  }, /*#__PURE__*/React.createElement(ProfileGenMock, null)));
}
window.SLIDES.push({
  order: 2,
  title: 'AI-генерація профілю',
  Component: SlideProfile
});
})();

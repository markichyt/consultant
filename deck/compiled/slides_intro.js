;(function(){
/* === SLIDE 1 — INTRO ============================================== */
function SlideIntro() {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full relative text-white font-sans flex flex-col items-center justify-center text-center",
    style: {
      padding: '80px 110px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-reveal flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-x-24 -inset-y-16 rounded-full blur-[100px] opacity-40 pointer-events-none",
    style: {
      background: 'radial-gradient(closest-side, rgba(19,151,214,0.5), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "deck/logo.svg",
    alt: "CONSULTANT \u2014 Legal Marketplace",
    className: "relative",
    style: {
      width: 660,
      height: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 font-mono uppercase tracking-[0.42em] text-white/45",
    style: {
      fontSize: 16
    }
  }, "\u042E\u0440\u0438\u0434\u0438\u0447\u043D\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u043F\u043B\u0435\u0439\u0441"), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-px w-24",
    style: {
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "h-2 w-2 rounded-full",
    style: {
      background: '#1397D6',
      boxShadow: '0 0 16px 2px #1397D6'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "h-px w-24",
    style: {
      background: 'linear-gradient(90deg, rgba(255,255,255,0.25), transparent)'
    }
  })), /*#__PURE__*/React.createElement("h1", {
    className: "mt-10 font-display font-black tracking-[-0.02em] leading-[1.05] max-w-5xl",
    style: {
      fontSize: 60
    }
  }, "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0456\u044F \u043D\u043E\u0432\u043E\u0433\u043E", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-neon text-glow-neon"
  }, "\u0444\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B\u0443 \u0434\u043B\u044F \u044E\u0440\u0438\u0441\u0442\u0456\u0432")), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "neon",
    icon: "sparkles"
  }, "AI-\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0456\u044F \u043F\u0440\u043E\u0444\u0456\u043B\u044E"), /*#__PURE__*/React.createElement(Chip, {
    tone: "em",
    icon: "shopping-cart"
  }, "\u041C\u0430\u0440\u043A\u0435\u0442\u043F\u043B\u0435\u0439\u0441 \u043B\u0456\u0434\u0456\u0432"))));
}
window.SLIDES.push({
  order: 1,
  title: 'CONSULTANT — новий функціонал',
  Component: SlideIntro
});
})();

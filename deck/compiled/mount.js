;(function(){
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(window.Deck));
  requestAnimationFrame(function(){ var b=document.getElementById("boot"); if(b){ b.style.transition="opacity .4s"; b.style.opacity="0"; setTimeout(function(){ b.remove(); },450); } });
})();

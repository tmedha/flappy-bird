window.Game = window.Game || {};

// Fires registered flap callbacks on spacebar, mouse click, or touch —
// but only while a flap listener is active, so menu clicks on buttons
// don't also trigger a flap.
Game.Input = (function () {
  let listener = null;

  function onFlap(callback) {
    listener = callback;
  }

  function offFlap() {
    listener = null;
  }

  function trigger(e) {
    if (!listener) return;
    e.preventDefault();
    listener();
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') trigger(e);
  });

  document.addEventListener('mousedown', (e) => {
    if (e.target.closest('.screen')) return;
    trigger(e);
  });

  document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.screen')) return;
    trigger(e);
  }, { passive: false });

  return { onFlap, offFlap };
})();

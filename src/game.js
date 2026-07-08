(function () {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  Game.StateMachine.changeState('MENU');

  let last = 0;
  function loop(ts) {
    const dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;
    Game.StateMachine.update(dt);
    Game.StateMachine.render(ctx);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

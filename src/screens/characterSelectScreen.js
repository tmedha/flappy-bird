window.Game = window.Game || {};

Game.StateMachine.register('CHARACTER_SELECT', {
  enter() {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-character-select');
    drawPreviews();

    document.querySelectorAll('.character-option').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.character === Game.Session.character);
      btn.onclick = () => {
        Game.Session.character = btn.dataset.character;
        Game.StateMachine.changeState('MODE_SELECT');
      };
    });

    document.getElementById('character-back-btn').onclick = () => Game.StateMachine.changeState('MENU');
  },
});

function drawPreviews() {
  document.querySelectorAll('.preview-canvas').forEach((canvas) => {
    const sprite = Game.SPRITES[canvas.dataset.character];
    const grid = sprite.frames[0];
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pixelSize = Math.floor(canvas.width / grid[0].length);
    const w = grid[0].length * pixelSize;
    const h = grid.length * pixelSize;
    Game.drawSprite(ctx, grid, sprite.palette, (canvas.width - w) / 2, (canvas.height - h) / 2, pixelSize, 0);
  });
}

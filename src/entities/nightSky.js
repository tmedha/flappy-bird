window.Game = window.Game || {};

// Decorative moon + starfield shown during the night phase of the endless
// day/night cycle. Positions are fixed (no parallax), same as the sky fill.
Game.NightSky = function () {
  const CONFIG = Game.CONFIG;
  this.moonX = CONFIG.CANVAS_WIDTH * 0.76;
  this.moonY = CONFIG.CANVAS_HEIGHT * 0.14;
  this.stars = [];
  for (let i = 0; i < 20; i++) {
    this.stars.push({
      x: Math.random() * CONFIG.CANVAS_WIDTH,
      y: Math.random() * CONFIG.CANVAS_HEIGHT * 0.5,
      scale: 0.7 + Math.random() * 1.3,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }
  this.time = 0;
};

Game.NightSky.prototype.update = function (dt) {
  this.time += dt;
};

// amount: 0 (full day, hidden) to 1 (full night, fully visible).
Game.NightSky.prototype.draw = function (ctx, amount) {
  if (amount <= 0) return;
  const pixelSize = Game.CONFIG.PIXEL_SIZE;
  const moon = Game.SPRITES.moon;
  const star = Game.SPRITES.star;

  ctx.save();
  ctx.globalAlpha = amount;
  Game.drawSprite(ctx, moon.grid, moon.palette, this.moonX, this.moonY, pixelSize * 1.5, 0);

  for (const s of this.stars) {
    const twinkle = 0.5 + 0.5 * Math.sin(this.time * 2 + s.twinklePhase);
    ctx.globalAlpha = amount * twinkle;
    Game.drawSprite(ctx, star.grid, star.palette, s.x, s.y, pixelSize * s.scale, 0);
  }
  ctx.restore();
};

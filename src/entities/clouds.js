window.Game = window.Game || {};

// A handful of drifting decorative cloud puffs in the background.
Game.Clouds = function () {
  const CONFIG = Game.CONFIG;
  this.puffs = [];
  for (let i = 0; i < 4; i++) {
    this.puffs.push(this.spawnPuff(Math.random() * CONFIG.CANVAS_WIDTH));
  }
};

Game.Clouds.prototype.spawnPuff = function (x) {
  const CONFIG = Game.CONFIG;
  return {
    x,
    y: 20 + Math.random() * (CONFIG.CANVAS_HEIGHT * 0.35),
    speed: 8 + Math.random() * 10,
    scale: 1 + Math.random() * 0.6,
  };
};

Game.Clouds.prototype.update = function (dt) {
  const CONFIG = Game.CONFIG;
  for (const puff of this.puffs) {
    puff.x -= puff.speed * dt;
  }
  this.puffs = this.puffs.filter((p) => p.x > -60);
  while (this.puffs.length < 4) {
    this.puffs.push(this.spawnPuff(CONFIG.CANVAS_WIDTH + 30));
  }
};

Game.Clouds.prototype.draw = function (ctx) {
  const sprite = Game.SPRITES.cloud;
  const pixelSize = Game.CONFIG.PIXEL_SIZE;
  for (const puff of this.puffs) {
    const size = Math.max(1, Math.round(pixelSize * puff.scale));
    Game.drawSprite(ctx, sprite.grid, sprite.palette, puff.x, puff.y, size, 0);
  }
};

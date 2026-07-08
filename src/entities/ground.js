window.Game = window.Game || {};

// Scrolling floor strip, tiled from the ground sprite.
Game.Ground = function () {
  this.offset = 0;
};

Game.Ground.prototype.update = function (dt, speed) {
  const tileW = Game.SPRITES.ground.grid[0].length * Game.CONFIG.PIXEL_SIZE;
  this.offset = (this.offset + speed * dt) % tileW;
};

Game.Ground.prototype.getRect = function () {
  const CONFIG = Game.CONFIG;
  return {
    x: 0,
    y: CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT,
    w: CONFIG.CANVAS_WIDTH,
    h: CONFIG.GROUND_HEIGHT,
  };
};

Game.Ground.prototype.draw = function (ctx) {
  const CONFIG = Game.CONFIG;
  const sprite = Game.SPRITES.ground;
  const tileW = sprite.grid[0].length * CONFIG.PIXEL_SIZE;
  const y = CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT;
  for (let x = -this.offset - tileW; x < CONFIG.CANVAS_WIDTH; x += tileW) {
    Game.drawSprite(ctx, sprite.grid, sprite.palette, x, y, CONFIG.PIXEL_SIZE, 0);
  }
};

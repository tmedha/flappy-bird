window.Game = window.Game || {};

Game.Bird = function (characterKey) {
  const CONFIG = Game.CONFIG;
  const sprite = Game.SPRITES[characterKey];

  this.characterKey = characterKey;
  this.x = CONFIG.BIRD_START_X;
  this.y = CONFIG.BIRD_START_Y;
  this.velocityY = 0;
  this.frameIndex = 0;
  this.animTimerMs = 0;
  this.size = sprite.frames[0].length * CONFIG.PIXEL_SIZE;
};

Game.Bird.prototype.flap = function () {
  this.velocityY = Game.CONFIG.FLAP_IMPULSE;
};

Game.Bird.prototype.update = function (dt) {
  const CONFIG = Game.CONFIG;
  this.velocityY = Math.min(this.velocityY + CONFIG.GRAVITY * dt, CONFIG.MAX_FALL_VELOCITY);
  this.y += this.velocityY * dt;

  this.animTimerMs += dt * 1000;
  if (this.animTimerMs > CONFIG.ANIM_FRAME_MS) {
    this.frameIndex ^= 1;
    this.animTimerMs = 0;
  }
};

Game.Bird.prototype.getRotation = function () {
  const CONFIG = Game.CONFIG;
  const ratio = Math.max(-1, Math.min(1, this.velocityY / CONFIG.TILT_VELOCITY_RANGE));
  return ratio < 0 ? ratio * CONFIG.TILT_MAX_UP_RAD : ratio * CONFIG.TILT_MAX_DOWN_RAD;
};

Game.Bird.prototype.getRect = function () {
  const sprite = Game.SPRITES[this.characterKey];
  const inset = sprite.hitboxInset;
  return {
    x: this.x + inset,
    y: this.y + inset,
    w: this.size - inset * 2,
    h: this.size - inset * 2,
  };
};

Game.Bird.prototype.draw = function (ctx) {
  const sprite = Game.SPRITES[this.characterKey];
  const grid = sprite.frames[this.frameIndex];
  Game.drawSprite(ctx, grid, sprite.palette, this.x, this.y, Game.CONFIG.PIXEL_SIZE, this.getRotation());
};

window.Game = window.Game || {};

// A tree-trunk obstacle pair: one trunk growing down from the ceiling,
// one growing up from the ground, with a gap the player flies through.
// Structurally equivalent to classic pipes — only the art differs.
Game.Trunk = function (x, gapY, gapHeight, speed) {
  const segment = Game.SPRITES.trunkSegment.grid;
  this.width = segment[0].length * Game.CONFIG.PIXEL_SIZE;
  this.x = x;
  this.gapY = gapY;
  this.gapHeight = gapHeight;
  this.speed = speed;
  this.passed = false;
};

Game.Trunk.prototype.update = function (dt) {
  this.x -= this.speed * dt;
};

Game.Trunk.prototype.getRects = function (canvasHeight, groundHeight) {
  const floorY = canvasHeight - groundHeight;
  return {
    top: { x: this.x, y: 0, w: this.width, h: this.gapY },
    bottom: { x: this.x, y: this.gapY + this.gapHeight, w: this.width, h: floorY - (this.gapY + this.gapHeight) },
  };
};

Game.Trunk.prototype.draw = function (ctx, canvasHeight, groundHeight) {
  const rects = this.getRects(canvasHeight, groundHeight);
  const segment = Game.SPRITES.trunkSegment;
  const cap = Game.SPRITES.trunkCap;
  const pixelSize = Game.CONFIG.PIXEL_SIZE;
  const segH = segment.grid.length * pixelSize;
  const capH = cap.grid.length * pixelSize;

  drawTiledColumn(rects.top, true);
  drawTiledColumn(rects.bottom, false);

  function drawTiledColumn(rect, capAtBottom) {
    if (rect.h <= 0) return;
    // Clip so segment tiles (a fixed size that rarely divides rect.h evenly)
    // never bleed past the trunk's bounds into the gap.
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
    ctx.clip();
    for (let y = rect.y; y < rect.y + rect.h; y += segH) {
      Game.drawSprite(ctx, segment.grid, segment.palette, rect.x, y, pixelSize, 0);
    }
    ctx.restore();

    const capY = capAtBottom ? rect.y + rect.h - capH : rect.y;
    Game.drawSprite(ctx, cap.grid, cap.palette, rect.x - pixelSize, capY, pixelSize, 0);
  }
};

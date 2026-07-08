window.Game = window.Game || {};

// Owns the set of active trunk-pair obstacles: spawning, scrolling,
// recycling, and the current speed/gap difficulty settings.
Game.ObstacleManager = function (speed, gapHeight) {
  this.reset(speed, gapHeight);
};

Game.ObstacleManager.prototype.reset = function (speed, gapHeight) {
  this.trunks = [];
  this.speed = speed;
  this.gapHeight = gapHeight;
  this.scrollDistance = 0;
  this.nextSpawnAt = Game.CONFIG.SPAWN_SPACING * 1.5;
};

Game.ObstacleManager.prototype.setDifficulty = function (speed, gapHeight) {
  this.speed = speed;
  this.gapHeight = gapHeight;
};

Game.ObstacleManager.prototype.update = function (dt, canvasWidth, canvasHeight, groundHeight) {
  this.scrollDistance += this.speed * dt;

  for (const trunk of this.trunks) trunk.update(dt);
  this.trunks = this.trunks.filter((t) => t.x + t.width > 0);

  if (this.scrollDistance >= this.nextSpawnAt) {
    this.spawn(canvasWidth, canvasHeight, groundHeight);
    this.nextSpawnAt += Game.CONFIG.SPAWN_SPACING;
  }
};

Game.ObstacleManager.prototype.spawn = function (canvasWidth, canvasHeight, groundHeight) {
  const margin = Game.CONFIG.TRUNK_GAP_MARGIN;
  const floorY = canvasHeight - groundHeight;
  const minGapY = margin;
  const maxGapY = floorY - margin - this.gapHeight;
  const gapY = minGapY + Math.random() * Math.max(0, maxGapY - minGapY);
  this.trunks.push(new Game.Trunk(canvasWidth, gapY, this.gapHeight, this.speed));
};

// Returns how many trunks the bird has newly passed this frame (for scoring).
Game.ObstacleManager.prototype.checkScored = function (birdX) {
  let count = 0;
  for (const trunk of this.trunks) {
    if (!trunk.passed && trunk.x + trunk.width < birdX) {
      trunk.passed = true;
      count++;
    }
  }
  return count;
};

Game.ObstacleManager.prototype.checkCollision = function (birdRect, canvasHeight, groundHeight) {
  for (const trunk of this.trunks) {
    const rects = trunk.getRects(canvasHeight, groundHeight);
    if (Game.rectsIntersect(birdRect, rects.top) || Game.rectsIntersect(birdRect, rects.bottom)) return true;
  }
  return false;
};

Game.ObstacleManager.prototype.draw = function (ctx, canvasHeight, groundHeight) {
  for (const trunk of this.trunks) trunk.draw(ctx, canvasHeight, groundHeight);
};

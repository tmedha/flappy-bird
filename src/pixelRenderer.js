window.Game = window.Game || {};

// The single reusable function that draws any pixel-grid sprite to canvas.
Game.drawSprite = function (ctx, grid, palette, x, y, pixelSize, rotationRad) {
  const w = grid[0].length * pixelSize;
  const h = grid.length * pixelSize;
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  if (rotationRad) ctx.rotate(rotationRad);
  for (let row = 0; row < grid.length; row++) {
    const line = grid[row];
    for (let col = 0; col < line.length; col++) {
      const idx = line[col];
      if (!idx) continue;
      ctx.fillStyle = palette[idx];
      ctx.fillRect(-w / 2 + col * pixelSize, -h / 2 + row * pixelSize, pixelSize, pixelSize);
    }
  }
  ctx.restore();
};

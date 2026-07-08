window.Game = window.Game || {};

// Small set of drawing primitives used to build pixel-grid sprites
// procedurally in code (grids of small integers -> palette colors),
// rather than hand-authoring every row as a literal array.
Game.SpriteBuilder = (function () {
  function makeGrid(w, h) {
    return Array.from({ length: h }, () => new Array(w).fill(0));
  }

  function setPixel(grid, x, y, value) {
    const row = grid[Math.round(y)];
    if (row && x >= 0 && x < row.length) row[Math.round(x)] = value;
  }

  function fillRect(grid, x0, y0, w, h, value) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) setPixel(grid, x, y, value);
    }
  }

  function fillEllipse(grid, cx, cy, rx, ry, value) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1) grid[y][x] = value;
      }
    }
  }

  function fillTriangle(grid, x0, y0, x1, y1, x2, y2, value) {
    const minX = Math.max(0, Math.floor(Math.min(x0, x1, x2)));
    const maxX = Math.min(grid[0].length - 1, Math.ceil(Math.max(x0, x1, x2)));
    const minY = Math.max(0, Math.floor(Math.min(y0, y1, y2)));
    const maxY = Math.min(grid.length - 1, Math.ceil(Math.max(y0, y1, y2)));
    const edge = (px, py, ax, ay, bx, by) => (px - bx) * (ay - by) - (ax - bx) * (py - by);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const d1 = edge(x, y, x0, y0, x1, y1);
        const d2 = edge(x, y, x1, y1, x2, y2);
        const d3 = edge(x, y, x2, y2, x0, y0);
        const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
        const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
        if (!(hasNeg && hasPos)) grid[y][x] = value;
      }
    }
  }

  // Draws an outlined blob: a slightly larger ellipse in outlineValue,
  // then an inset ellipse in bodyValue on top, giving pixel sprites a
  // defined silhouette without hand-drawing every edge pixel.
  function outlinedEllipse(grid, cx, cy, rx, ry, outlineValue, bodyValue) {
    fillEllipse(grid, cx, cy, rx, ry, outlineValue);
    fillEllipse(grid, cx, cy, rx - 1, ry - 1, bodyValue);
  }

  return { makeGrid, setPixel, fillRect, fillEllipse, fillTriangle, outlinedEllipse };
})();

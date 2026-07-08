window.Game = window.Game || {};

// All sprites are built procedurally as pixel-index grids (see spriteBuilder.js)
// rather than loaded from image files. Each sprite definition carries its own
// local palette (index -> hex) plus one or more animation frames.
Game.SPRITES = (function () {
  const SB = Game.SpriteBuilder;
  const C = Game.COLORS;

  function buildBird(wingUp) {
    const g = SB.makeGrid(16, 16);
    SB.outlinedEllipse(g, 8, 7.5, 6, 5.5, 1, 2);
    // wing, shifts between frames for a flapping animation
    SB.fillRect(g, 4, wingUp ? 6 : 9, 5, 3, 3);
    // beak
    SB.fillTriangle(g, 13, 6.5, 13, 9.5, 16, 8, 4);
    // eye
    SB.fillEllipse(g, 10.5, 5, 1.4, 1.4, 5);
    SB.setPixel(g, 11, 5, 6);
    return g;
  }

  function buildPenguin(wingUp) {
    const g = SB.makeGrid(16, 16);
    SB.outlinedEllipse(g, 8, 8, 6, 6.5, 1, 2);
    SB.fillEllipse(g, 8, 9.5, 3.5, 4.5, 3);
    // beak
    SB.fillTriangle(g, 12.5, 6.5, 12.5, 8, 15, 7.25, 4);
    // feet
    SB.fillRect(g, 5, 14, 2, 2, 4);
    SB.fillRect(g, 9, 14, 2, 2, 4);
    // flipper, shifts between frames
    SB.fillRect(g, 1, wingUp ? 6 : 9, 2, 4, 1);
    // eye
    SB.fillEllipse(g, 10, 5, 1.3, 1.3, 5);
    SB.setPixel(g, 10.5, 5, 6);
    return g;
  }

  function buildDino(frameUp) {
    const g = SB.makeGrid(16, 16);
    SB.outlinedEllipse(g, 8, 9.5, 6, 5.5, 1, 2);
    SB.fillEllipse(g, 8, 11.5, 3.5, 2.5, 3);
    // back spikes
    SB.fillTriangle(g, 4, 5, 5.5, 5, 4.75, 2.5, 4);
    SB.fillTriangle(g, 6.5, 4.5, 8, 4.5, 7.25, 2, 4);
    SB.fillTriangle(g, 9, 5, 10.5, 5, 9.75, 2.5, 4);
    // legs / arm, shifts between frames for a running animation
    SB.fillRect(g, 4, 14, 2, 2, 1);
    SB.fillRect(g, 9, wingUpLegOffset(frameUp), 2, 2, 1);
    // eye
    SB.fillEllipse(g, 11, 7, 1.3, 1.3, 5);
    SB.setPixel(g, 11.5, 7, 6);
    return g;

    function wingUpLegOffset(up) {
      return up ? 13 : 14;
    }
  }

  function buildTrunkSegment() {
    const w = 13;
    const h = 8;
    const g = SB.makeGrid(w, h);
    SB.fillRect(g, 0, 0, w, h, 2);
    SB.fillRect(g, 0, 0, 1, h, 1);
    SB.fillRect(g, w - 1, 0, 1, h, 1);
    SB.fillRect(g, 3, 0, 1, h, 3);
    SB.fillRect(g, 9, 0, 1, h, 3);
    SB.fillRect(g, 6, 0, 1, h, 4);
    return g;
  }

  function buildTrunkCap() {
    const w = 15;
    const h = 6;
    const g = SB.makeGrid(w, h);
    SB.fillRect(g, 0, 0, w, h, 1);
    SB.fillEllipse(g, 7, 2.5, 6.5, 2.3, 2);
    SB.fillEllipse(g, 7, 2.5, 4.5, 1.6, 3);
    SB.fillEllipse(g, 7, 2.5, 2, 0.9, 4);
    return g;
  }

  function buildGroundTile() {
    const w = 8;
    const h = 14;
    const g = SB.makeGrid(w, h);
    SB.fillRect(g, 0, 0, w, h, 3);
    SB.fillRect(g, 0, 0, w, 2, 1);
    SB.setPixel(g, 1, 1, 2);
    SB.setPixel(g, 5, 0, 2);
    SB.setPixel(g, 2, 5, 4);
    SB.setPixel(g, 6, 8, 4);
    SB.setPixel(g, 3, 11, 4);
    return g;
  }

  return {
    bird: {
      palette: { 1: C.bird.outline, 2: C.bird.body, 3: C.bird.wing, 4: C.bird.beak, 5: C.bird.eyeWhite, 6: C.bird.pupil },
      frames: [buildBird(false), buildBird(true)],
      hitboxInset: 3,
    },
    penguin: {
      palette: { 1: C.penguin.outline, 2: C.penguin.body, 3: C.penguin.belly, 4: C.penguin.beak, 5: C.penguin.eyeWhite, 6: C.penguin.pupil },
      frames: [buildPenguin(false), buildPenguin(true)],
      hitboxInset: 3,
    },
    dino: {
      palette: { 1: C.dino.outline, 2: C.dino.body, 3: C.dino.belly, 4: C.dino.spike, 5: C.dino.eyeWhite, 6: C.dino.pupil },
      frames: [buildDino(false), buildDino(true)],
      hitboxInset: 3,
    },
    trunkSegment: {
      palette: { 1: C.trunk.outline, 2: C.trunk.bark, 3: C.trunk.barkDark, 4: C.trunk.barkLight },
      grid: buildTrunkSegment(),
    },
    trunkCap: {
      palette: { 1: C.trunk.outline, 2: C.trunk.cap, 3: C.trunk.barkLight, 4: C.trunk.barkDark },
      grid: buildTrunkCap(),
    },
    ground: {
      palette: { 1: C.ground.grassDark, 2: C.ground.grass, 3: C.ground.dirt, 4: C.ground.dirtDark },
      grid: buildGroundTile(),
    },
  };
})();

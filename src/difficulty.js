window.Game = window.Game || {};

// Limited-mode level table, generated from base constants so difficulty
// is easy to tune from one place rather than hand-authored per level.
Game.Difficulty = (function () {
  const LEVEL_COUNT = 5;
  const BASE_GAP = 170;
  const GAP_STEP = 12;
  const MIN_GAP = 100;
  const BASE_SPEED = 140;
  const SPEED_GROWTH = 0.15;
  const MAX_SPEED = 320;
  const BASE_TARGET = 8;
  const TARGET_STEP = 2;

  const LEVELS = Array.from({ length: LEVEL_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      level: n,
      targetScore: BASE_TARGET + (n - 1) * TARGET_STEP,
      gapHeight: Math.max(MIN_GAP, BASE_GAP - (n - 1) * GAP_STEP),
      speed: Math.min(MAX_SPEED, BASE_SPEED * (1 + (n - 1) * SPEED_GROWTH)),
    };
  });

  function getLevel(n) {
    return LEVELS[n - 1];
  }

  return { LEVELS, LEVEL_COUNT, getLevel };
})();

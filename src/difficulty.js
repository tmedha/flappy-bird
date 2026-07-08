window.Game = window.Game || {};

// Limited-mode level table, generated from base constants so difficulty
// is easy to tune from one place rather than hand-authored per level.
Game.Difficulty = (function () {
  const LEVEL_COUNT = 6;
  const BASE_GAP = 213;
  const GAP_STEP = 25;
  const MIN_GAP = 110;
  const BASE_SPEED = 175;
  const SPEED_GROWTH = 0.3;
  const MAX_SPEED = 500;
  const BASE_TARGET = 8;
  const TARGET_STEP = 3;

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

  // Endless mode has no discrete levels — instead speed/gap ramp
  // continuously with elapsed play time, reaching max difficulty after
  // ENDLESS_RAMP_SECONDS and holding there.
  const ENDLESS_RAMP_SECONDS = 300; // 5 minutes to reach max difficulty
  const ENDLESS_MAX_SPEED = MAX_SPEED;
  const ENDLESS_MIN_GAP = MIN_GAP;

  function getEndlessDifficulty(elapsedSeconds) {
    const ramp = Math.min(1, elapsedSeconds / ENDLESS_RAMP_SECONDS);
    const baseSpeed = Game.CONFIG.ENDLESS_SPEED;
    const baseGap = Game.CONFIG.ENDLESS_GAP_HEIGHT;
    return {
      speed: baseSpeed + ramp * (ENDLESS_MAX_SPEED - baseSpeed),
      gapHeight: baseGap - ramp * (baseGap - ENDLESS_MIN_GAP),
    };
  }

  return { LEVELS, LEVEL_COUNT, getLevel, getEndlessDifficulty };
})();

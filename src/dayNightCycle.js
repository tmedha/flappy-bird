window.Game = window.Game || {};

// Endless-mode-only decorative sky cycle: day -> sunsetting evening -> night
// -> sunrise dawn -> day, keyed off obstacles passed (via ObstacleManager's
// scroll distance) rather than wall-clock time. Every CYCLE_OBSTACLES
// "obstacle-lengths" of scroll: DAY_OBSTACLES of plain day sky, then
// EVENING_OBSTACLES gradually sunsetting into night, then NIGHT_OBSTACLES of
// full night (moon + stars), then DAWN_OBSTACLES gradually sunrising back
// into day, and it repeats.
Game.DayNightCycle = (function () {
  const DAY_OBSTACLES = 12;
  const EVENING_OBSTACLES = 10;
  const NIGHT_OBSTACLES = 12;
  const DAWN_OBSTACLES = 10;
  const CYCLE_OBSTACLES = DAY_OBSTACLES + EVENING_OBSTACLES + NIGHT_OBSTACLES + DAWN_OBSTACLES;

  const EVENING_START = DAY_OBSTACLES;
  const NIGHT_START = EVENING_START + EVENING_OBSTACLES;
  const DAWN_START = NIGHT_START + NIGHT_OBSTACLES;

  const DAY = '#70c5ce';
  const SUNSET = '#e8794f';
  const NIGHT = '#1b2440';

  // 0 (full day) .. 1 (full night), ramping up through the evening and back
  // down through the dawn.
  function getNightAmount(obstacleProgress) {
    const t = obstacleProgress % CYCLE_OBSTACLES;
    if (t < EVENING_START) return 0;
    if (t < NIGHT_START) return (t - EVENING_START) / EVENING_OBSTACLES;
    if (t < DAWN_START) return 1;
    return 1 - (t - DAWN_START) / DAWN_OBSTACLES;
  }

  function getSkyColor(obstacleProgress) {
    const t = obstacleProgress % CYCLE_OBSTACLES;
    if (t < EVENING_START) return DAY;
    if (t < NIGHT_START) {
      const localT = (t - EVENING_START) / EVENING_OBSTACLES;
      return localT < 0.5
        ? Game.lerpColor(DAY, SUNSET, localT / 0.5)
        : Game.lerpColor(SUNSET, NIGHT, (localT - 0.5) / 0.5);
    }
    if (t < DAWN_START) return NIGHT;
    const localT = (t - DAWN_START) / DAWN_OBSTACLES;
    return localT < 0.5
      ? Game.lerpColor(NIGHT, SUNSET, localT / 0.5)
      : Game.lerpColor(SUNSET, DAY, (localT - 0.5) / 0.5);
  }

  return { getSkyColor, getNightAmount, CYCLE_OBSTACLES };
})();

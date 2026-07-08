window.Game = window.Game || {};

// Endless-mode-only decorative sky cycle: day -> sunsetting evening -> night
// -> day, keyed off obstacles passed (via ObstacleManager's scroll distance)
// rather than wall-clock time. Every CYCLE_OBSTACLES "obstacle-lengths" of
// scroll: DAY_OBSTACLES of plain day sky, then EVENING_OBSTACLES gradually
// sunsetting into night, then NIGHT_OBSTACLES of full night (moon + stars),
// then it snaps back to day and repeats.
Game.DayNightCycle = (function () {
  const DAY_OBSTACLES = 12;
  const EVENING_OBSTACLES = 10;
  const NIGHT_OBSTACLES = 12;
  const CYCLE_OBSTACLES = DAY_OBSTACLES + EVENING_OBSTACLES + NIGHT_OBSTACLES;

  const DAY = '#70c5ce';
  const SUNSET = '#e8794f';
  const NIGHT = '#1b2440';

  // 0 (full day) .. 1 (full night), ramping up gradually through the evening.
  function getNightAmount(obstacleProgress) {
    const t = obstacleProgress % CYCLE_OBSTACLES;
    if (t < DAY_OBSTACLES) return 0;
    if (t < DAY_OBSTACLES + EVENING_OBSTACLES) return (t - DAY_OBSTACLES) / EVENING_OBSTACLES;
    return 1;
  }

  function getSkyColor(obstacleProgress) {
    const t = obstacleProgress % CYCLE_OBSTACLES;
    if (t < DAY_OBSTACLES) return DAY;
    if (t < DAY_OBSTACLES + EVENING_OBSTACLES) {
      const localT = (t - DAY_OBSTACLES) / EVENING_OBSTACLES;
      return localT < 0.5
        ? Game.lerpColor(DAY, SUNSET, localT / 0.5)
        : Game.lerpColor(SUNSET, NIGHT, (localT - 0.5) / 0.5);
    }
    return NIGHT;
  }

  return { getSkyColor, getNightAmount, CYCLE_OBSTACLES };
})();

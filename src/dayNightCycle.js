window.Game = window.Game || {};

// Endless-mode-only decorative sky cycle: day -> sunset -> night -> day,
// repeating every CYCLE_SECONDS. Colors are linearly interpolated between
// whichever pair of keyframes the current time falls between.
Game.DayNightCycle = (function () {
  const CYCLE_SECONDS = 420; // 7 min: 2 min day, 1 min sunset, 4 min night

  const DAY = '#70c5ce';
  const SUNSET = '#e8794f';
  const NIGHT = '#1b2440';

  const KEYFRAMES = [
    [0, DAY],
    [110, DAY],
    [120, SUNSET],
    [170, SUNSET],
    [180, NIGHT],
    [410, NIGHT],
    [420, DAY],
  ];

  function getSkyColor(elapsedSeconds) {
    const t = elapsedSeconds % CYCLE_SECONDS;
    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
      const [t0, c0] = KEYFRAMES[i];
      const [t1, c1] = KEYFRAMES[i + 1];
      if (t >= t0 && t <= t1) {
        const localT = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
        return Game.lerpColor(c0, c1, localT);
      }
    }
    return DAY;
  }

  return { getSkyColor, CYCLE_SECONDS };
})();

window.Game = window.Game || {};

Game.CONFIG = {
  // All spatial (px, px/s, px/s^2) constants are scaled 1.25x from the
  // original 288x512 tuning so gameplay feel stays identical at the
  // bigger 360x640 canvas. Angles, durations, and counts are unscaled.
  CANVAS_WIDTH: 360,
  CANVAS_HEIGHT: 640,
  PIXEL_SIZE: 3, // single grid unit shared by every sprite

  SKY_COLOR: '#70c5ce',
  GROUND_HEIGHT: 42, // matches ground sprite tile height (14 rows * PIXEL_SIZE)

  GRAVITY: 1250, // px/s^2
  FLAP_IMPULSE: -400, // px/s
  MAX_FALL_VELOCITY: 600, // px/s

  BIRD_START_X: 88,
  BIRD_START_Y: 250,

  TILT_MAX_UP_RAD: 0.5, // magnitude, applied as negative (nose-up) while rising
  TILT_MAX_DOWN_RAD: 1.3, // magnitude, applied as positive (nose-down) while falling
  TILT_VELOCITY_RANGE: 600, // velocity magnitude that maps to max tilt

  ANIM_FRAME_MS: 150,

  TRUNK_GAP_MARGIN: 50, // min distance from ceiling/ground to the gap
  SPAWN_SPACING: 250, // world px between trunk spawn points

  ENDLESS_SPEED: 175, // px/s, starting speed (ramps up over time — see difficulty.js)
  ENDLESS_GAP_HEIGHT: 188, // px, starting gap (shrinks over time — see difficulty.js)
};

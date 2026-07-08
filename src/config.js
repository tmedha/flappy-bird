window.Game = window.Game || {};

Game.CONFIG = {
  CANVAS_WIDTH: 288,
  CANVAS_HEIGHT: 512,
  PIXEL_SIZE: 3, // single grid unit shared by every sprite

  SKY_COLOR: '#70c5ce',
  GROUND_HEIGHT: 42, // matches ground sprite tile height (14 rows * PIXEL_SIZE)

  GRAVITY: 1000, // px/s^2
  FLAP_IMPULSE: -320, // px/s
  MAX_FALL_VELOCITY: 480, // px/s

  BIRD_START_X: 70,
  BIRD_START_Y: 200,

  TILT_MAX_UP_RAD: 0.5, // magnitude, applied as negative (nose-up) while rising
  TILT_MAX_DOWN_RAD: 1.3, // magnitude, applied as positive (nose-down) while falling
  TILT_VELOCITY_RANGE: 480, // velocity magnitude that maps to max tilt

  ANIM_FRAME_MS: 150,

  TRUNK_GAP_MARGIN: 40, // min distance from ceiling/ground to the gap
  SPAWN_SPACING: 200, // world px between trunk spawn points

  ENDLESS_SPEED: 140, // px/s
  ENDLESS_GAP_HEIGHT: 150, // px

  GROUND_SCROLL_SPEED: 140, // px/s, kept in sync with obstacle speed by playingScreen
};

window.Game = window.Game || {};

// Registry + enter/exit dispatcher for the game's screens.
Game.StateMachine = (function () {
  const screens = {};
  let current = null;
  let currentName = null;

  function register(name, screen) {
    screens[name] = screen;
  }

  function changeState(name, payload) {
    if (current && current.exit) current.exit();
    current = screens[name];
    currentName = name;
    if (!current) throw new Error('Unknown state: ' + name);
    if (current.enter) current.enter(payload);
  }

  function update(dt) {
    if (current && current.update) current.update(dt);
  }

  function render(ctx) {
    if (current && current.render) current.render(ctx);
  }

  function getCurrentName() {
    return currentName;
  }

  return { register, changeState, update, render, getCurrentName };
})();

// Data that persists across screens within a session (selected character,
// mode, current level). Kept as one plain shared object rather than
// threading everything through payloads, since it's simple app-wide state.
Game.Session = {
  character: 'bird',
  mode: 'endless',
  level: 1,
};

// DOM screen switching helper. Playing screen has no div of its own (it's
// the canvas), so hiding all of these is how it "shows".
Game.UI = (function () {
  const SCREEN_IDS = [
    'screen-menu',
    'screen-character-select',
    'screen-mode-select',
    'screen-level-select',
    'screen-level-complete',
    'screen-win',
    'screen-game-over',
  ];

  function showScreen(id) {
    for (const screenId of SCREEN_IDS) {
      document.getElementById(screenId).classList.toggle('hidden', screenId !== id);
    }
  }

  function hideAllScreens() {
    for (const screenId of SCREEN_IDS) {
      document.getElementById(screenId).classList.add('hidden');
    }
  }

  return { showScreen, hideAllScreens };
})();

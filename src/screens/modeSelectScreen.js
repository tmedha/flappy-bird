window.Game = window.Game || {};

Game.StateMachine.register('MODE_SELECT', {
  enter() {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-mode-select');

    document.getElementById('mode-limited-btn').onclick = () => {
      Game.Session.mode = 'limited';
      Game.Session.level = 1;
      Game.StateMachine.changeState('LEVEL_SELECT');
    };
    document.getElementById('mode-endless-btn').onclick = () => {
      Game.Session.mode = 'endless';
      Game.StateMachine.changeState('PLAYING');
    };
    document.getElementById('mode-back-btn').onclick = () => Game.StateMachine.changeState('CHARACTER_SELECT');
  },
});

window.Game = window.Game || {};

Game.StateMachine.register('LEVEL_SELECT', {
  enter() {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-level-select');

    document.getElementById('level-select-title').textContent = 'Level ' + Game.Session.level;

    document.getElementById('level-start-btn').onclick = () => Game.StateMachine.changeState('PLAYING');
    document.getElementById('level-back-btn').onclick = () => Game.StateMachine.changeState('MODE_SELECT');
  },
});

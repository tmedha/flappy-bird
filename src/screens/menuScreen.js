window.Game = window.Game || {};

Game.StateMachine.register('MENU', {
  enter() {
    Game.Session.level = 1;
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-menu');
    document.getElementById('menu-play-btn').onclick = () => Game.StateMachine.changeState('CHARACTER_SELECT');
  },
});

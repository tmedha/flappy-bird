window.Game = window.Game || {};

Game.StateMachine.register('WIN', {
  enter(payload) {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-win');
    document.getElementById('win-info').textContent =
      `You beat all ${Game.Difficulty.LEVEL_COUNT} levels with a final score of ${payload.score}!`;
    document.getElementById('win-menu-btn').onclick = () => Game.StateMachine.changeState('MENU');
  },
});

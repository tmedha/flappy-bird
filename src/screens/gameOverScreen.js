window.Game = window.Game || {};

Game.StateMachine.register('GAME_OVER', {
  enter(payload) {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-game-over');

    let info = `Score: ${payload.score}`;
    if (Game.Session.mode === 'limited') info += ` — reached level ${Game.Session.level}`;
    document.getElementById('game-over-info').textContent = info;

    document.getElementById('game-over-restart-btn').onclick = () => {
      if (Game.Session.mode === 'limited') Game.Session.level = 1;
      Game.StateMachine.changeState('PLAYING');
    };
    document.getElementById('game-over-menu-btn').onclick = () => Game.StateMachine.changeState('MENU');
  },
});

window.Game = window.Game || {};

Game.StateMachine.register('LEVEL_SELECT', {
  enter() {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-level-select');

    const level = Game.Difficulty.getLevel(Game.Session.level);
    document.getElementById('level-select-title').textContent = 'Level ' + level.level;
    document.getElementById('level-select-info').textContent =
      `Pass ${level.targetScore} trunks to level up. Speed ${Math.round(level.speed)} px/s, gap ${level.gapHeight}px.`;

    document.getElementById('level-start-btn').onclick = () => Game.StateMachine.changeState('PLAYING');
    document.getElementById('level-back-btn').onclick = () => Game.StateMachine.changeState('MODE_SELECT');
  },
});

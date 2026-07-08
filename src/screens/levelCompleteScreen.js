window.Game = window.Game || {};

Game.StateMachine.register('LEVEL_COMPLETE', {
  enter(payload) {
    document.getElementById('hud').classList.add('hidden');
    Game.UI.showScreen('screen-level-complete');
    document.getElementById('level-complete-info').textContent =
      `Level ${Game.Session.level} cleared with a score of ${payload.score}!`;

    const nextLevel = () => {
      Game.Session.level += 1;
      Game.StateMachine.changeState('PLAYING');
    };

    document.getElementById('level-complete-next-btn').onclick = nextLevel;

    this.onKeydown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        nextLevel();
      }
    };
    window.addEventListener('keydown', this.onKeydown);
  },

  exit() {
    window.removeEventListener('keydown', this.onKeydown);
  },
});

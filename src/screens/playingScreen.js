window.Game = window.Game || {};

Game.StateMachine.register('PLAYING', {
  enter() {
    const CONFIG = Game.CONFIG;
    Game.UI.hideAllScreens();
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    document.getElementById('screen-paused').classList.add('hidden');

    this.bird = new Game.Bird(Game.Session.character);
    this.ground = new Game.Ground();
    this.clouds = new Game.Clouds();
    this.scoreboard = new Game.Scoreboard();
    this.gameOver = false;
    this.paused = false;
    this.elapsedSeconds = 0;

    if (Game.Session.mode === 'limited') {
      const level = Game.Difficulty.getLevel(Game.Session.level);
      this.speed = level.speed;
      this.obstacles = new Game.ObstacleManager(level.speed, level.gapHeight);
    } else {
      this.speed = CONFIG.ENDLESS_SPEED;
      this.obstacles = new Game.ObstacleManager(CONFIG.ENDLESS_SPEED, CONFIG.ENDLESS_GAP_HEIGHT);
    }

    setScoreDisplay(0);
    Game.Input.onFlap(() => {
      if (!this.paused) this.bird.flap();
    });

    this.onPauseBtn = () => this.togglePause();
    this.onResumeBtn = () => this.setPaused(false);
    this.onPausedMenuBtn = () => Game.StateMachine.changeState('MENU');
    this.onKeydown = (e) => {
      if (e.code === 'KeyP' || e.code === 'Escape') this.togglePause();
    };
    document.getElementById('pause-btn').onclick = this.onPauseBtn;
    document.getElementById('resume-btn').onclick = this.onResumeBtn;
    document.getElementById('paused-menu-btn').onclick = this.onPausedMenuBtn;
    window.addEventListener('keydown', this.onKeydown);
  },

  exit() {
    Game.Input.offFlap();
    window.removeEventListener('keydown', this.onKeydown);
    document.getElementById('pause-btn').classList.add('hidden');
    document.getElementById('screen-paused').classList.add('hidden');
  },

  setPaused(paused) {
    if (this.gameOver) return;
    this.paused = paused;
    document.getElementById('screen-paused').classList.toggle('hidden', !paused);
  },

  togglePause() {
    this.setPaused(!this.paused);
  },

  update(dt) {
    if (this.gameOver || this.paused) return;
    const CONFIG = Game.CONFIG;

    this.elapsedSeconds += dt;

    if (Game.Session.mode === 'endless') {
      const difficulty = Game.Difficulty.getEndlessDifficulty(this.elapsedSeconds);
      this.speed = difficulty.speed;
      this.obstacles.setDifficulty(difficulty.speed, difficulty.gapHeight);
    }

    this.bird.update(dt);
    this.ground.update(dt, this.speed);
    this.clouds.update(dt);
    this.obstacles.update(dt, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT, CONFIG.GROUND_HEIGHT);

    const scored = this.obstacles.checkScored(this.bird.x);
    if (scored) {
      this.scoreboard.add(scored);
      setScoreDisplay(this.scoreboard.score);
    }

    const birdRect = this.bird.getRect();
    const hitGround = Game.rectsIntersect(birdRect, this.ground.getRect());
    const hitCeiling = birdRect.y < 0;
    const hitTrunk = this.obstacles.checkCollision(birdRect, CONFIG.CANVAS_HEIGHT, CONFIG.GROUND_HEIGHT);

    if (hitGround || hitCeiling || hitTrunk) {
      this.gameOver = true;
      Game.StateMachine.changeState('GAME_OVER', { score: this.scoreboard.score });
      return;
    }

    if (Game.Session.mode === 'limited') {
      const target = Game.Difficulty.getLevel(Game.Session.level).targetScore;
      if (this.scoreboard.score >= target) {
        this.gameOver = true;
        if (Game.Session.level >= Game.Difficulty.LEVEL_COUNT) {
          Game.StateMachine.changeState('WIN', { score: this.scoreboard.score });
        } else {
          Game.StateMachine.changeState('LEVEL_COMPLETE', { score: this.scoreboard.score });
        }
      }
    }
  },

  render(ctx) {
    const CONFIG = Game.CONFIG;
    ctx.fillStyle = Game.Session.mode === 'endless' ? Game.DayNightCycle.getSkyColor(this.elapsedSeconds) : CONFIG.SKY_COLOR;
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    this.clouds.draw(ctx);
    this.obstacles.draw(ctx, CONFIG.CANVAS_HEIGHT, CONFIG.GROUND_HEIGHT);
    this.ground.draw(ctx);
    this.bird.draw(ctx);
  },
});

function setScoreDisplay(score) {
  document.getElementById('score-display').textContent = score;
}

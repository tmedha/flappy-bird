window.Game = window.Game || {};

Game.StateMachine.register('PLAYING', {
  enter() {
    const CONFIG = Game.CONFIG;
    Game.UI.hideAllScreens();
    document.getElementById('hud').classList.remove('hidden');

    this.bird = new Game.Bird(Game.Session.character);
    this.ground = new Game.Ground();
    this.scoreboard = new Game.Scoreboard();
    this.gameOver = false;

    if (Game.Session.mode === 'limited') {
      const level = Game.Difficulty.getLevel(Game.Session.level);
      this.speed = level.speed;
      this.obstacles = new Game.ObstacleManager(level.speed, level.gapHeight);
    } else {
      this.speed = CONFIG.ENDLESS_SPEED;
      this.obstacles = new Game.ObstacleManager(CONFIG.ENDLESS_SPEED, CONFIG.ENDLESS_GAP_HEIGHT);
    }

    setScoreDisplay(0);
    Game.Input.onFlap(() => this.bird.flap());
  },

  exit() {
    Game.Input.offFlap();
  },

  update(dt) {
    if (this.gameOver) return;
    const CONFIG = Game.CONFIG;

    this.bird.update(dt);
    this.ground.update(dt, this.speed);
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
    ctx.fillStyle = CONFIG.SKY_COLOR;
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    this.obstacles.draw(ctx, CONFIG.CANVAS_HEIGHT, CONFIG.GROUND_HEIGHT);
    this.ground.draw(ctx);
    this.bird.draw(ctx);
  },
});

function setScoreDisplay(score) {
  document.getElementById('score-display').textContent = score;
}

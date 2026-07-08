window.Game = window.Game || {};

Game.Scoreboard = function () {
  this.score = 0;
};

Game.Scoreboard.prototype.reset = function () {
  this.score = 0;
};

Game.Scoreboard.prototype.add = function (points) {
  this.score += points;
};

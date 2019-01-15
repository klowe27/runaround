class Level {
  constructor() {
    this.id = 0;
    this.exitX = 0;
    this.exitY = 0;
    this.timeLeft = 0;
    this.gameOver = false;
    this.enemies = [];
    this.currentEnemies = [];
  }
}

export { Level };

class Level {
  constructor() {
    this.id = 0;
    this.exitX = 0;
    this.exitY = 0;
    this.timeLeft = this.getTimeById(this.id);
    this.gameOver = false;
    this.enemies = [];
    this.currentEnemies = [];

    setInterval(() => {
      this.timeLeft--;
    }, 1000);
  }

  getTimeById(id) {
    switch(id) {
    case 0:
      return 180;
    default:
      return 60;
    }
  }
}

export { Level };

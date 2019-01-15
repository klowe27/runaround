import { Enemy } from './enemy.js';

class Level {
  constructor() {
    this.id = 0;
    this.exitX = 0;
    this.exitY = 0;
    this.timeLeft = 0;
    this.gameOver = false;
    this.enemies = [];
    this.currentEnemies = [];

    setInterval(() => {
      this.timeLeft--;
    }, 1000);
  }

  static setDataById(id, level) {
    switch(id) {
    case 0:
      level.id = id;
      level.exitX = 1000;
      level.exitY = 500;
      level.timeLeft = 180;
      level.gameOver = false;
      level.enemies = [new Enemy(0), new Enemy(0), new Enemy(0)];
      level.currentEnemies = [];
      break;
    case 1:
      level.id = id;
      level.exitX = 1000;
      level.exitY = 500;
      level.timeLeft = 180;
      level.gameOver = false;
      level.enemies = [new Enemy(0), new Enemy(0), new Enemy(0)];
      level.currentEnemies = [];
      break;
    }

    return level;
  }
}

export { Level };

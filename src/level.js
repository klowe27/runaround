import { Enemy } from './enemy.js';

class Level {
  constructor() {
    this.id = 0;
    this.x = 0;
    this.y = 0;
    this.size = [0, 0];
    this.timeLeft = 0;
    this.gameOver = false;
    this.youWon = false;
    this.enemies = [];
    this.currentEnemies = [];

    setInterval(() => {
      this.timeLeft--;
    }, 1000);
  }

  setDataById(id) {
    if(id == 0) {
      this.id = id;
      this.x = 990;
      this.y = 380;
      this.size = [40, 100];
      this.timeLeft = 180;
      this.gameOver = false;
      this.youWon = false;
      this.enemies = [];
      for(let i = 0; i < 1; i++) {
        this.enemies.push(new Enemy(0));
      }
      this.currentEnemies = [];
    } else if(id == 1) {
      this.id = id;
      this.x = 990;
      this.y = 380;
      this.size = [40, 100];
      this.timeLeft = 180;
      this.gameOver = false;
      this.youWon = false;
      this.enemies = [];
      for(let i = 0; i < 1; i++) {
        this.enemies.push(new Enemy(0));
      }
      this.currentEnemies = [];
    } else {
      this.youWon = true;
    }
  }
}

export { Level };

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
    switch(id) {
    case 0:
      this.id = id;
      this.x = 990;
      this.y = 480;
      this.size = [10, 40];
      this.timeLeft = 180;
      this.gameOver = false;
      this.youWon = false;
      this.enemies = [new Enemy(0), new Enemy(0), new Enemy(0)];
      this.currentEnemies = [];
      break;
    // case 1:
    //   this.id = id;
    //   this.x = 990;
    //   this.y = 480;
    //   this.size = [10, 40];
    //   this.timeLeft = 180;
    //   this.gameOver = false;
    //   this.youWon = false;
    //   this.enemies = [new Enemy(0), new Enemy(0), new Enemy(0)];
    //   this.currentEnemies = [];
    //   break;
    default:
      this.youWon = true;
      console.log("YOU WON!!!!!!");
      break;
    }
  }
}

export { Level };

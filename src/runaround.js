import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { Level } from './level.js';
import { Bullet } from './bullet.js';

class Runaround {
  constructor() {
    this.level = null;
    this.player = null;
    this.bullets = [];
    this.userInput = [];
  }

  addUserInput(keyCode){
    this.userInput.push(keyCode);
  }

  updateGame(userInput, level, player, bullets) {
    level = this.createLevel(level);
    player = this.createPlayer(player);
    console.log(userInput, bullets, player.bullets);
    [userInput, player] = this.movePlayer(userInput, player);
    [userInput, player, bullets] = this.playerShoot(userInput, player, bullets);
    // level = this.spawnEnemies(leve);
    // level = this.moveEnemies(level, player);
    // bullets = this.moveBullets(bullets);
    // [level, bullets] = this.checkEnemyHit(level, bullets);
    // level = this.checkEnemyDeath(level);
    // player = this.checkPlayerHit(level, player);
    // level = this.checkPlayerDeath(level, player);
    // level = this.checkExit(level, player);
    // level = this.checkTime(level);
    // level = this.checkGameOver(level, player);

    return [userInput, level, player, bullets];
  }

  createLevel(level) {
    if (!level) {
      level = new Level();
      level.id = 0;
      level.exitX = 1000;
      level.exitY = 500;
      level.timeLeft = 180;
      level.gameOver = false;
      level.ememies = [new Enemy(0), new Enemy(0), new Enemy(0)];
      level.currentEnemies = [];
    }
    return level;
  }

  createPlayer(player){
    if (!player) {
      player = new Player();
      player.x = 100;
      player.y = 100;
      player.directionX = 1;
      player.directionY = 0;
      player.bullets = 30;
      player.score = 0;
      player.life = player.lifeTotal;
    }
    return player;
  }

  checkPlayerBounds(player) {
    const boardWidth = 1000;
    const boardHeight = 1000;
    if(player.x < 0) {
      player.x = 0;
    } else if(player.x > boardWidth) {
      player.x = boardWidth;
    }
    if(player.y < 0) {
      player.y = 0;
    } else if(player.y > boardHeight) {
      player.y = boardHeight;
    }
    return player;
  }

  movePlayer(userInput, player) {
    const moveSize = 10;
    userInput = userInput.reduce((array, keyCode) => {
      switch(keyCode) {
      case 37:
        player.x -= moveSize;
        player.directionX = -1;
        player.directionY = 0;
        break;
      case 38:
        player.y += moveSize;
        player.directionX = 0;
        player.directionY = 1;
        break;
      case 39:
        player.x += moveSize;
        player.directionX = 1;
        player.directionY = 0;
        break;
      case 40:
        player.y -= moveSize;
        player.directionX = 0;
        player.directionY = -1;
        break;
      default:
        array.push(keyCode);
      }
      return array;
    }, []);

    return [userInput, this.checkPlayerBounds(player)];
  }

  playerShoot(userInput, player, bullets) {
    const velocity = 20;
    userInput = userInput.reduce((array, keyCode) => {
      if (keyCode === 32) {
        if (player.bullets > 0) {
          player.bullets--;
          let bullet = new Bullet();
          bullet.x = player.x;
          bullet.y = player.y;
          this.velocityX = velocity * player.directionX;
          this.velocityY = velocity * player.directionY;
          bullets.push(bullet);
        }
      } else {
        array.push(keyCode);
      }
      return array;
    }, []);
    return [userInput, player, bullets];
  }


  drawGame(level, player, bullets, useSummary) {
    // drawLevel(level);
    // drawPlayer(player);
    // drawBullets(bullets);

    if(useSummary) {
      level.id++;
      let summary = "Runaround\n";
      summary += `level=${level.id}`;
      return summary;
    }
  }
}

export { Runaround };

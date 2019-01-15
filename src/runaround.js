import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { Level } from './level.js';
import { Bullet } from './bullet.js';

class Runaround {
  constructor() {
    this.boardWidth = 1000;
    this.boardHeight = 1000;
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
    [userInput, player] = this.movePlayer(userInput, player);
    [userInput, player, bullets] = this.playerShoot(userInput, player, bullets);
    level = this.spawnEnemies(level);
    level = this.moveEnemies(level, player);
    bullets = this.moveBullets(bullets);
    // [level, bullets] = this.checkEnemyHit(level, bullets);
    // level = this.checkEnemyDeath(level);
    // player = this.checkPlayerHit(level, player);
    // level = this.checkPlayerDeath(level, player);
    // level = this.checkExit(level, player);
    // level = this.checkTime(level);
    // level = this.checkGameOver(level, player);

    return [userInput, level, player, bullets];
  }

  randomNumber(min, max){
    return (Math.floor(Math.random() * (max-min + 1)))+min;
  }

  createLevel(level) {
    if (!level) {
      level = new Level();
      level.id = 0;
      level.exitX = 1000;
      level.exitY = 500;
      level.timeLeft = 180;
      level.gameOver = false;
      level.enemies = [new Enemy(0), new Enemy(0), new Enemy(0)];
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

  isInBounds(object) {
    if((object.x < 0) ||
      (object.x > this.boardWidth) ||
      (object.y < 0) ||
      (object.y > this.boardHeight)) {
        return false;
      }
      return true;
  }

  confineToBounds(object) {
    if(object.x < 0) {
      object.x = 0;
    } else if(object.x > this.boardWidth) {
      object.x = this.boardWidth;
    }
    if(object.y < 0) {
      object.y = 0;
    } else if(object.y > this.boardHeight) {
      object.y = this.boardHeight;
    }
    return object;
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

    return [userInput, this.confineToBounds(player)];
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
          bullet.velocityX = velocity * player.directionX;
          bullet.velocityY = velocity * player.directionY;
          bullets.push(bullet);
        }
      } else {
        array.push(keyCode);
      }
      return array;
    }, []);
    return [userInput, player, bullets];
  }

  spawnEnemies(level) {
    if((level.currentEnemies.length === 0)
    && (level.enemies.length !== 0)) {
      level.currentEnemies.push(level.enemies.pop());
    }
    return level;
  }

  moveEnemies(level) {
    level.currentEnemies.forEach((enemy) => {
      const signX = ((this.randomNumber(0,1) == 0) ? -1 : +1);
      const signY = ((this.randomNumber(0,1) == 0) ? -1 : +1);
      const min = 5;
      const max = 15;
      enemy.x += signX * this.randomNumber(min, max);
      enemy.y += signY * this.randomNumber(min, max);
      enemy = this.confineToBounds(enemy);
    });
    return level;
  }

  moveBullets(bullets) {
    return bullets.reduce((array, bullet) => {
      bullet.x += bullet.velocityX;
      bullet.y += bullet.velocityY;
      if(this.isInBounds(bullet)) {
        array.push(bullet);
      }
      return array;
    }, []);
  }

  drawGame(level, player, bullets, useSummary) {
    // drawLevel(level);
    // drawPlayer(player);
    // drawBullets(bullets);

    if(useSummary) {
      let summary = "<p>Runaround</p>";
      summary += `<p>Player position=${player.x}, ${player.y}</p>`;
      summary += `<p>Player direction=${player.directionX}, ${player.directionY}</p>`;
      summary += `<p>Player bullets=${player.bullets}</p>`;
      summary += `<p>Player life=${player.life}<p>`;
      summary += `<p>Enemy count=${level.currentEnemies.length}</p>`;
      if(bullets.length > 0) {
        summary += `<p>Bullet0: x=${bullets[0].x}, y=${bullets[0].y} vx=${bullets[0].velocityX} vy=${bullets[0].velocityY}</p>`
      }
      summary += `<p>Bullets=[${bullets.reduce((s, b) => { return s + `x=${b.x} y=${b.y}, `}, "")}]</p>`;
      return summary;
    }
  }
}

export { Runaround };

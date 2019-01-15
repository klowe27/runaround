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
    [userInput, player] = this.movePlayer(userInput, player);
    [userInput, player, bullets] = this.playerShoot(userInput, player, bullets);
    level = this.spawnEnemies(level);
    console.log("before", level.currentEnemies[0]);
    level = this.moveEnemies(level, player);
    console.log("after", level.currentEnemies[0]);
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

  checkBounds(character) {
    const boardWidth = 1000;
    const boardHeight = 1000;
    if(character.x < 0) {
      character.x = 0;
    } else if(character.x > boardWidth) {
      character.x = boardWidth;
    }
    if(character.y < 0) {
      character.y = 0;
    } else if(character.y > boardHeight) {
      character.y = boardHeight;
    }
    return character;
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

    return [userInput, this.checkBounds(player)];
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
      enemy = this.checkBounds(enemy);
    });
    return level;
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
      return summary;
    }
  }
}

export { Runaround };

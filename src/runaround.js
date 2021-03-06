import { Player } from './player.js';
import { Level } from './level.js';
import { Bullet } from './bullet.js';

class Runaround {
  constructor() {
    this.boardWidth = 1000;
    this.boardHeight = 800;
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
    [level, bullets] = this.checkEnemyHit(level, bullets);
    level = this.checkEnemyDeath(level);
    player = this.checkPlayerHit(level, player);
    level = this.checkPlayerDeath(level, player);
    level = this.checkTime(level);
    [level, player] = this.checkExit(level, player);

    return [userInput, level, player, bullets];
  }

  randomNumber(min, max){
    return (Math.floor(Math.random() * (max-min + 1)))+min;
  }

  createLevel(level) {
    if (!level) {
      level = new Level();
      level.setDataById(0);
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
      player.bullets = 300;
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

  hasOverlap(area, object) {
    const xMin = area.x;
    const xMax = area.x + area.size[0];
    const yMin = area.y;
    const yMax = area.y + area.size[1];
    const corners = [[object.x, object.y], [(object.x + object.size[0]), object.y], [object.x, (object.y + object.size[1])], [(object.x + object.size[0]), (object.y + object.size[1])]];
    let foundOverlap = false;
    corners.forEach(function(corner){
      if ((corner[0] >= xMin) && (corner[0] <= xMax) && (corner[1] >= yMin) && (corner[1] <= yMax)) {
        foundOverlap = true;
      }
    });
    return foundOverlap;
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
        player.y -= moveSize;
        player.directionX = 0;
        player.directionY = -1;
        break;
      case 39:
        player.x += moveSize;
        player.directionX = 1;
        player.directionY = 0;
        break;
      case 40:
        player.y += moveSize;
        player.directionX = 0;
        player.directionY = 1;
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
          bullet.x = player.x + (player.size[0] / 2);
          bullet.y = player.y + (player.size[1] / 3);
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
    if((level.currentEnemies.length <= 1) && (level.enemies.length !== 0)) {
      let enemy = level.enemies.pop();
      enemy.x = this.randomNumber(0, this.boardWidth);
      enemy.y = this.randomNumber(0, this.boardHeight);
      level.currentEnemies.push(enemy);
    }
    return level;
  }

  moveEnemies(level) {
    level.currentEnemies.forEach((enemy) => {
      const signX = ((this.randomNumber(0,1) == 0) ? -1 : +1);
      const signY = ((this.randomNumber(0,1) == 0) ? -1 : +1);
      const min = 1;
      const max = 6;
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

  checkEnemyHit(level, bullets) {
    bullets = bullets.reduce((array, bullet) => {
      let bulletHasHit = false;
      for (let i = 0; i < level.currentEnemies.length; i++) {
        if (this.hasOverlap(level.currentEnemies[i], bullet)) {
          bulletHasHit = true;
          level.currentEnemies[i].life -= bullet.strength;
        }
      }
      if (!bulletHasHit) {
        array.push(bullet);
      }
      return array;
    }, []);
    return [level, bullets];
  }

  checkEnemyDeath(level) {
    level.currentEnemies = level.currentEnemies.filter((enemy) => enemy.life > 0);
    return level;
  }

  checkPlayerHit(level, player) {
    for (let i = 0; i < level.currentEnemies.length; i++) {
      if (this.hasOverlap(level.currentEnemies[i], player)) {
        player.life -= level.currentEnemies[i].strength;
      }
    }
    return player;
  }

  checkPlayerDeath(level, player) {
    if(player.life <= 0) {
      level.gameOver = true;
    }
    return level;
  }

  checkTime(level) {
    if(level.timeLeft <= 0) {
      level.gameOver = true;
    }
    return level;
  }

  checkExit(level, player) {
    if((level.enemies.length === 0) && (level.currentEnemies.length === 0)) {
      if(this.hasOverlap(player, level)) {
        player.x = 100;
        player.y = 100;
        player.directionX = 1;
        player.directionY = 0;
        let id = level.id + 1;
        level.setDataById(id);
      }
    }
    return [level, player];
  }

  drawLevel(ctx, images, level) {
    ctx.beginPath();
    ctx.fillStyle = "#ffefc0";
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = "#e0f8ff";
    ctx.fillRect(0, 0, 1000, 120);

    level.currentEnemies.forEach(function(enemy) {
      ctx.drawImage(images.enemy, enemy.x, enemy.y, enemy.size[0], enemy.size[1]);
    });
    if ((level.enemies.length === 0) && (level.currentEnemies.length === 0)) {
      const sizeX = level.size[0];
      const sizeY = level.size[1] / 3;
      ctx.drawImage(images.rock, level.x, level.y, sizeX, 2 * sizeY);
      ctx.drawImage(images.rock, level.x, level.y + sizeY, sizeX, 2 * sizeY);
      ctx.drawImage(images.rock, level.x, level.y + (2 * sizeY), sizeX, 2 * sizeY);
    }
  }

  drawPlayer(ctx, images, player) {
    ctx.drawImage(images.player, player.x, player.y, player.size[0], player.size[1]);
  }

  drawBullets(ctx, images, bullets) {
    bullets.forEach(function(bullet) {
      ctx.drawImage(images.bullet, bullet.x, bullet.y, bullet.size[0], bullet.size[1]);
    })
  }

  drawGame(ctx, images, level, player, bullets, useSummary) {
    this.drawLevel(ctx, images, level);
    this.drawPlayer(ctx, images, player);
    this.drawBullets(ctx, images, bullets);

    if(useSummary) {
      let summary = `<p>Level: ${level.id}</p>`;
      summary += `<p>Life: ${player.life}</p>`;
      summary += `<p>Bullets: ${player.bullets}</p>`;
      summary += `<p>Enemies: ${level.enemies.length}</p>`;
      summary += `<p class="double">Time: ${level.timeLeft}</p>`;
      return summary;
    }
  }
}

export { Runaround };

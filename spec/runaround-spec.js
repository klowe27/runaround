import { Runaround } from './../src/runaround.js';
import { Bullet } from './../src/bullet.js';

describe('Runaround', function() {
  let runaround;
  let level;
  let player;
  jasmine.clock().install();

  beforeEach(function(){
    runaround = new Runaround();
    level = runaround.createLevel(null);
    player = runaround.createPlayer(null);
  });

  describe('Constructor', function() {
    it('should create a new instance of Runaround and store its properties', function() {
      expect(runaround.level).toEqual(null);
      expect(runaround.player).toEqual(null);
      expect(runaround.bullets).toEqual([]);
      expect(runaround.userInput).toEqual([]);
    });
  });

  describe('addUserInput', function(){
    it('should add the user input to the userInput array', function() {
      runaround.addUserInput(38);
      expect(runaround.userInput).toEqual([38]);
    });
  });

  describe('updateGame', function() {
    describe('createLevel', function(){
      it('should create a new level and update properties', function() {
        expect(level.id).toEqual(0);
        expect(level.x).toEqual(990);
        expect(level.y).toEqual(480);
        expect(level.timeLeft).toEqual(180);
        expect(level.gameOver).toEqual(false);
        expect(level.enemies.length).toEqual(3);
        expect(level.currentEnemies).toEqual([]);
      });
    });

    describe('createPlayer', function(){
      it('should create a new player and update properties', function() {
        expect(player.x).toEqual(100);
        expect(player.y).toEqual(100);
        expect(player.directionX).toEqual(1);
        expect(player.directionY).toEqual(0);
        expect(player.bullets).toEqual(30);
        expect(player.score).toEqual(0);
        expect(player.life).toEqual(player.lifeTotal);
      });
    });

    describe('movePlayer', function() {
      it('should move the player to the right', function() {
        player.x = 100;
        let userInput = [39];
        [userInput, player] = runaround.movePlayer(userInput, player);
        expect(player.x).toEqual(110);
      });
    });

    describe('playerShoot', function() {
      it('should create a bullet and shoot it in the direction the player is facing', function() {
        player.bullets = 20;
        let userInput = [32];
        let bullets = [];
        [userInput, player, bullets] = runaround.playerShoot(userInput, player, bullets);
        expect(bullets.length).toEqual(1);
        expect(bullets[0].x).toEqual(player.x);
        expect(bullets[0].y).toEqual(player.y);
        expect(player.bullets).toEqual(19);
      });
    });

    describe('spawnEnemies', function() {
      it('should spawn enemies from the level onto the board', function() {
        level.currentEnemies = [];
        level = runaround.spawnEnemies(level);
        expect(level.currentEnemies.length == 0).toEqual(false);
      });
    });

    describe('moveEnemies', function() {
      it('should spawn enemies from the level onto the board', function() {
        level.currentEnemies = [];
        level = runaround.spawnEnemies(level);
        level = runaround.moveEnemies(level);
        expect(level.currentEnemies[0].x === 500).toEqual(false);
        expect(level.currentEnemies[0].y === 500).toEqual(false);
      });
    });

    describe('moveBullets', function() {
      it('should move bullets', function() {
        let bullet = new Bullet();
        bullet.x = 0;
        bullet.y = 0;
        bullet.velocityX = 20;
        bullet.velocityY = 0;
        let bullets = [];
        bullets.push(bullet);
        bullets = runaround.moveBullets(bullets);
        expect(bullets[0].x).toEqual(20);
        expect(bullets[0].y).toEqual(0);
      });
    });

    describe('hasOverlap', function() {
      it('should return true if two objects overlap', function() {
        let bullet = new Bullet();
        bullet.x = 100;
        bullet.y = 100;
        bullet.size = [5, 5];
        let bullet2 = new Bullet();
        bullet2.x = 104;
        bullet2.y = 98;
        bullet2.size = [5, 5];
        expect(runaround.hasOverlap(bullet, bullet2)).toEqual(true);
        bullet.x = 530;
        bullet.y = 499;
        bullet.size = [40, 80];
        bullet2.x = 500;
        bullet2.y = 500;
        bullet2.size = [40, 40];
        expect(runaround.hasOverlap(bullet, bullet2)).toEqual(true);
      });
    });

    describe('checkEnemyHit', function() {
      it('if bullet and enemy overlap, should reduce enemy strength and remove the bullet', function() {
        level = runaround.spawnEnemies(level);
        level.currentEnemies[0].life = 75;
        level.currentEnemies[0].x = 500;
        level.currentEnemies[0].y = 500;
        let bullet = new Bullet();
        bullet.x = 530;
        bullet.y = 499;
        bullet.strength = 20;
        let bullets = [];
        bullets.push(bullet);
        [level, bullets] = runaround.checkEnemyHit(level, bullets);
        expect(bullets).toEqual([]);
        expect(level.currentEnemies[0].life).toEqual(55);
      });
    });

    describe('checkEnemyDeath', function() {
      it('it should remove the current enemy if their life is zero or less', function() {
        level = runaround.spawnEnemies(level);
        level.currentEnemies.length = 1;
        level.currentEnemies[0].life = -10;
        level = runaround.checkEnemyDeath(level);
        expect(level.currentEnemies).toEqual([]);
      });
    });

    describe('checkPlayerHit', function() {
      it('if player and enemy overlap, should reduce player life', function() {
        // level = runaround.spawnEnemies(level);
        // level.currentEnemies[0].x = 500;
        // level.currentEnemies[0].y = 500;
        // level.currentEnemies[0].size = [40,40];
        // level.currentEnemies[0].strength = 20;
        // player.x = 530;
        // player.y = 499;
        // player.life = 100;
        // player.size = [40, 80];
        // player = runaround.checkPlayerHit(level, player);
        // expect(player.life).toEqual(80);

        // level = runaround.spawnEnemies(level);
        // player.x = 500;
        // player.y = 490;
        // player.life = 100;
        // player = runaround.checkPlayerHit(level, player);
        // console.log("afterHit p=", player);
        // console.log("afterHit l=", level);
        // expect(player.life).toEqual(80);
      });
    });

    describe('checkPlayerDeath', function() {
      it('it should remove the current enemy if their life is zero or less', function() {
        player.life = 0;
        level = runaround.checkPlayerDeath(level, player);
        expect(level.gameOver).toEqual(true);
      });
    });

    describe('checkTime', function() {
      it('it should set the value of gameOver to true if time is less than or equal to zero', function() {
        jasmine.clock().tick(180001);
        level = runaround.checkTime(level);
        expect(level.gameOver).toEqual(true);
      });
    });

    // describe('checkExit', function() {
    //   it('it should update the level if the player is at the exit', function() {
    //     level.id = 0;
    //     level.enemies = [];
    //     level.currentEnemies = [];
    //     level.x = 990;
    //     level.y = 480;
    //     level.size = [10, 40];
    //     player.x = 995;
    //     player.y = 500;
    //     level = runaround.checkExit(level);
    //     expect(level.id).toEqual(1);
    //   });
    // });
  });
});

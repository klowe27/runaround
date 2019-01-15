import { Runaround } from './../src/runaround.js';

describe('Runaround', function() {
  let runaround;
  let level;
  let player;

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
        expect(level.exitX).toEqual(1000);
        expect(level.exitY).toEqual(500);
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
  });
});

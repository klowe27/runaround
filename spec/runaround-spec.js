import { Runaround } from './../src/runaround.js';

describe('Runaround', function() {
  let runaround;

  beforeEach(function(){
    runaround = new Runaround();
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
        let level = runaround.createLevel(null);
        expect(level.id).toEqual(0);
        expect(level.exitX).toEqual(1000);
        expect(level.exitY).toEqual(500);
        expect(level.timeLeft).toEqual(180);
        expect(level.gameOver).toEqual(false);
        expect(level.ememies.length).toEqual(3);
        expect(level.currentEnemies).toEqual([]);
      });
    });

    describe('createPlayer', function(){
      it('should create a new player and update properties', function() {
        let player = runaround.createPlayer(null);
        expect(player.x).toEqual(100);
        expect(player.y).toEqual(100);
        expect(player.directionX).toEqual(1);
        expect(player.directionY).toEqual(0);
        expect(player.bullets).toEqual(30);
        expect(player.score).toEqual(0);
        expect(player.life).toEqual(player.lifeTotal);
      });
    });
  });
});

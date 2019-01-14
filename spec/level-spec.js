import { Level } from './../src/level.js';

describe('Level', function() {
  it('should create a new instance of Level and store its properties', function() {
    var level = new Level(0);
    expect(level.id).toEqual(0);
    expect(level.exitX).toEqual(0);
    expect(level.exitY).toEqual(0);
    expect(level.timeLeft).toEqual(0);
    expect(level.gameOver).toEqual(false);
    expect(level.ememies).toEqual([]);
    expect(level.currentEnemies).toEqual([]);
  });
})

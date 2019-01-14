import { Enemy } from './../src/enemy.js'

describe('Enemy', function() {

  it('should create a new instance of Enemy and store its properties', function() {
    var enemy = new Enemy(0);
    expect(enemy.type).toEqual(0);
    expect(enemy.x).toEqual(0);
    expect(enemy.y).toEqual(0);
    expect(enemy.life).toEqual(0);
    expect(enemy.lifeTotal).toEqual(20);
  });
});

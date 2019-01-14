import { Player } from './../src/player.js';

describe('Player', function() {

  it('should create a new instance of Player and store its properties', function() {
    var player = new Player();
    expect(player.x).toEqual(0);
    expect(player.y).toEqual(0);
    expect(player.directionX).toEqual(1);
    expect(player.directionY).toEqual(0);
    expect(player.bullets).toEqual(0);
    expect(player.score).toEqual(0);
    expect(player.life).toEqual(0);
    expect(player.lifeTotal).toEqual(100);
  });
});

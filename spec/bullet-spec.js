import { Bullet } from './../src/bullet.js';

describe('Bullet', function() {

  it('should create a new instance of Bullet and store its properties', function() {
    var bullet = new Bullet();
    expect(bullet.x).toEqual(0);
    expect(bullet.y).toEqual(0);
    expect(bullet.velocityX).toEqual(0);
    expect(bullet.velocityY).toEqual(0);
    expect(bullet.strength).toEqual(20);
  });
});

import { Runaround } from './../src/runaround.js';

describe('Runaround', function() {

  it('should create a new instance of Runaround and store its properties', function() {
    var runaround = new Runaround();
    expect(runaround.level).toEqual(null);
    expect(runaround.player).toEqual(null);
    expect(runaround.bullets).toEqual([]);
    expect(runaround.userInput).toEqual([]);
  });
});

import { Runaround } from './../src/runaround.js';

describe('Runaround', function() {

  it('should test practice has a name', function() {
    var runaround = new Runaround('Kristin');
    expect(runaround.name).toEqual('Kristin');  });
});

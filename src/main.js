import { Runaround } from './runaround.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  var runaround = new Runaround();
  let output = document.getElementById('output');

  const framesPerSecond = 0.5;
  const interval = 1000 / framesPerSecond;
  setInterval(() => {
    [runaround.userInput, runaround.level, runaround.player, runaround.bullets] = runaround.updateGame(runaround.userInput, runaround.level, runaround.player, runaround.bullets);
    let summary = runaround.drawGame(runaround.level, runaround.player, runaround.bullets, true);
    output.innerHTML = summary;
  }, interval);

  document.onkeydown = function(event) {
    event.preventDefault();
    const valids = [32, 37, 38, 39, 40];
    if(valids.includes(event.keyCode)) {
      runaround.addUserInput(event.keyCode);
    }
  };
});

import { Runaround } from './runaround.js';
import * as r2d2Url from '../img/r2d2-2.png';
import * as jawaUrl from '../img/jawa-1.png';
import * as bulletUrl from '../img/bullet-1.png';
import * as rockUrl from '../img/rock-1.png';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  var runaround = new Runaround();
  let output = document.getElementById('output');
  let board = document.getElementById('board');
  let gameOver = document.getElementById('game-over');
  let gameWon = document.getElementById('game-won');
  board.width = runaround.boardWidth;
  board.height = runaround.boardHeight;
  let ctx = board.getContext('2d');
  let images = {};
  images.player = document.createElement('img');
  images.player.src = r2d2Url.default;
  images.enemy = document.createElement('img');
  images.enemy.src = jawaUrl.default;
  images.bullet = document.createElement('img');
  images.bullet.src = bulletUrl.default;
  images.rock = document.createElement('img');
  images.rock.src = rockUrl.default;

  const framesPerSecond = 30;
  const interval = 1000 / framesPerSecond;
  setInterval(() => {
    [runaround.userInput, runaround.level, runaround.player, runaround.bullets] = runaround.updateGame(runaround.userInput, runaround.level, runaround.player, runaround.bullets);
    let summary = runaround.drawGame(ctx, images, runaround.level, runaround.player, runaround.bullets, true);
    if(output) {
      output.innerHTML = summary;
    }
    if(runaround.level.gameOver) {
      console.log("over", level);
      gameOver.style.display = 'block';
    } else if(runaround.level.youWon) {
      gameWon.style.display = 'block';
    }
  }, interval);

  document.onkeydown = function(event) {
    event.preventDefault();
    const valids = [32, 37, 38, 39, 40];
    if(valids.includes(event.keyCode)) {
      runaround.addUserInput(event.keyCode);
    }
  };
});

import Painter from './painter.js';
import * as defaults from './defaultValues.js';

class Controller {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }

  start() {
    const ctx = this.context;
    const cnvs = this.canvas;
    const painter = new Painter();

    document.querySelector('.play').addEventListener('click', function(){
      this.remove(); // remove play button

      setupCanvas(cnvs);

      let initialX = 7;
      let initialY = 5;

      setInterval(function(){
        ctx.clearRect(0, 0, cnvs.width, cnvs.height)

        document.onkeydown = (e) => {
          if (isMoveLeft(e, initialX, initialY)) {
              initialX -= defaults.default.slowFalling;
          } else if (isMoveRight(e, initialX, initialY)) {
            initialX += defaults.default.slowFalling;
          } else if (isMoveDown(e, initialY)) {
            initialY += defaults.default.slowFalling;
          }
        };

        painter.drawFigure(ctx, defaults.default.figure, initialX, initialY, defaults.default.initialWidth, defaults.default.initialHeight);
        
        if (initialY < defaults.default.endRow) {
          initialY += defaults.default.slowFalling;
        }
      }, defaults.default.standardTime);
      document.getElementById('background-music').play(); // play music of background      
    });
  }
}

export default Controller;

function isMoveDown(e, initialY) {
  return e.keyCode === defaults.default.keyCodeDown && isNotEndRow(initialY);
}

function isMoveRight(e, initialX, initialY) {
  return e.keyCode === defaults.default.keyCodeRight && initialX < defaults.default.endColRight && isNotEndRow(initialY);
}

function isMoveLeft(e, initialX, initialY) {
  return e.keyCode === defaults.default.keyCodeLeft && initialX > defaults.default.endColLeft && isNotEndRow(initialY);
}

function isNotEndRow(initialY) {
  return initialY < defaults.default.endRow;
}

function setupCanvas(cnvs) {
  cnvs.style.width = defaults.default.canvasWidth;
  cnvs.style.height = defaults.default.canvasHeight;
  cnvs.style.backgroundColor = defaults.default.color;
}
const KEY = {
  downKeyCode: 40,
  leftKeyCode: 37,
  rightKeyCode: 39
};

Object.freeze(KEY);

import figures from './figures.js';
import Figure from './Figure.js';

class Arena {
    constructor(player, painter, context, canvas) {
        this.player = player;
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        this.painter = painter;
        this.context = context;
        this.canvas = canvas;
        this.board = Array(18).fill(false).map(()=>Array(9).fill(false));
        this.row = 0;
        this.col = 0;
        // this.player.figures.push({
        //   position: {x: 0, y: 17},
        //   shape: figures.L 
        // });
        // this.board[15][0] = true;
        // this.board[14][0] = true;
        // this.board[13][0] = true;
        // console.table(this.board);
    }

    init() {
      this.move(1);
      this.userMoveHandler();
    }

    isCollision(row, col) {
      return false;
    }

    move = (time) => {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.row++;
            this.playerDrop();  
        }

        this.painter.draw(this.player);
        requestAnimationFrame(this.move);
    }

    playerDrop() {
        this.dropCounter = 0;
        if (this.player.figure.position.y <= 16) {
          this.player.figure.position.y++;
        } else {
          if (this.isCollision(this.row + 1, this.col)) {
            //TODO..
          } else {
            const oldFigure = this.player.figure;
            const shapeFigure = figures.L;
            const newFigure = new Figure({x: 0, y: 0}, shapeFigure);
            this.player.figure = newFigure;
            // this.player.position = {x: 0, y: 0};
            this.player.figures.push(newFigure);
            //this.board[this.row + 1][this.col] = true;
          }
        }
    }

    userMoveHandler() {
        document.addEventListener('keydown', event => {
          if (event.keyCode === KEY.downKeyCode) {
            this.row++;
            this.playerDrop();
          }
          else if (event.keyCode === KEY.leftKeyCode) {
            this.player.figure.position.x--;
            this.col--;
          }
          else if (event.keyCode === KEY.rightKeyCode) {
            this.player.figure.position.x++;
            this.col++;
          }
        });
    }
}

export default Arena;
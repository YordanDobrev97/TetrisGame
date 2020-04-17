
const COLORS = [
  'green',
  'blue',
  'red',
  'cyan',
  'white'
]

Object.freeze(COLORS);

class Painter {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw(player) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = COLORS[4];
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
      
        const currentFigures = player.figures;
        for(let matrix of currentFigures) {
          this.drawMatrix(matrix, player.position, this.context);
        }
       
    }
    drawMatrix(matrix, offset) {
        matrix.shape.forEach((row, y)=> {
          row.forEach((val, x) => {
            if (val !== 0) {
              this.context.fillStyle = COLORS[1];
              this.context.fillRect(x + matrix.position.x, y + matrix.position.y, 1,1);
            }
          });
        });
    }
}

export default Painter;

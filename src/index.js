function main() {
    $('#container').load('game.html');

    let canvas = document.getElementById('canvas');
    const game = new Game(canvas);
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.figures = {};
        this.startGame();
    }

    startGame() {
        this.initializationFigures();

        const defaultWidth = 73;

        let height = 85;
        let width = defaultWidth;
        let widthPosition = 8;
        let heightPosition = 13;
        let getTypeFigure = this.figures['T'];
        
        this.loopGame(height, width, widthPosition, heightPosition, getTypeFigure);
    }

    loopGame(height, width, widthPosition, heightPosition,getTypeFigure) {
        this.clear();

        let offset = -1;
        document.onkeydown = (e) => {
            if (e.keyCode === left) {
                width -= 3;
            } else if (e.keyCode === right) {
                height -= 3;
                width += 5;
                offset++;
            }
        };

        this.drawFigure(height, width - offset, widthPosition, heightPosition, getTypeFigure, offset);

        const left = 37;
        const right = 39;

        setTimeout(() => {
            this.loopGame(height + 3, width, widthPosition, heightPosition, getTypeFigure);
        }, 500);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawFigure(height, width, widthPosition, heightPosition, getTypeFigure, offset) {
        let countRow = getTypeFigure.length;
        const defaultWidth = width;
        for (let row = 0; row < countRow; row++) {
            let countCol = getTypeFigure[row].length;
            for (let col = 0; col < countCol; col++) {
                if (!getTypeFigure[row][col]) {
                    this.context.fillStyle = '#F8F8FF';
                }
                else {
                    this.context.fillStyle = '#000';
                }
                this.context.fillRect(width, height, widthPosition, heightPosition);
                width += 10;
            }
            width = defaultWidth;
            height += 15;
        }
    }

    initializationFigures() {
        this.figures = {
            "I": [
                [true, true, true]
            ],
            "J": [
                [false, true, false],
                [false, true, false],
                [true, true, false]
            ],
            "L": [
                [false, true, false],
                [false, true, false],
                [false, true, true]
            ],
            "O": [
                [true, true],
                [true, true]
            ],
            "S": [
                [false, true, true],
                [true, true, false]
            ],
            "T": [
                [false, true, false],
                [true, true, true]
            ], 
            "Z": [
                [true, true, false],
                [false, true, true]
            ]
        }
    }
}
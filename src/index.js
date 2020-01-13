function main() {
    $('#container').load('game.html');

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    const game = new Game(context);
}

class Game {
    constructor(context) {
        this.context = context;
        this.figures = {};
        this.startGame();
    }

    startGame() {
        this.initializationFigures();
        
        let height = 90;
        let width = 100;
        let widthPosition = 8;
        let heightPosition = 12;
        
        let getTypeFigure = this.figures['Z'];
        let countRow = getTypeFigure.length;

        for (let row = 0; row < countRow; row++) {
            let countCol = getTypeFigure[row].length;
            for (let col = 0; col < countCol; col++) {
                if (!getTypeFigure[row][col]) {
                    this.context.fillStyle = '#FFFFFF';
                } else {
                    this.context.fillStyle = '#000';
                }
                
                this.context.fillRect(width, height, widthPosition, heightPosition);
                width += 10;
            }
            width = 100;
            height += 15;
        }
    }

    initializationFigures() {
        this.figures = {
            "I": [
                [true, true, true]
            ],
            "J": [
                [true, true, true],
                [false, false, true]
            ],
            "L": [
                [true, true, true],
                [true, false, false]
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
    drawFigure(image, width, height, widthPosition, heightPosition) {
        this.context.drawImage(image, width, height, widthPosition, heightPosition);
    }
}
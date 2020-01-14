function main() {
    $('#container').load('game.html');

    let song = document.getElementById("my_audio");

    song.play();
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

        let randomFig = this.getRandomFigure();
        console.log(randomFig);
        let getTypeFigure = this.figures[randomFig];
        
        this.loopGame(height, width, widthPosition, heightPosition, getTypeFigure);
    }

    getRandomFigure() {
        let items = ['T', 'J', 'L', 'O', 'S', 'T', 'Z'];
        let rand = Math.random();
        let totalItems = items.length;
        let randomIndex = Math.floor(rand * totalItems);
        let randomFigure = items[randomIndex];

        return randomFigure;
    }

    loopGame(height, width, widthPosition, heightPosition,getTypeFigure) {
        this.clear();

        let offset = -1;
        const left = 37;
        const right = 39;
        const down = 40;
        const endRow = 315;
        const normalStepDown = 3;

        document.onkeydown = (e) => {
            console.log(e.keyCode);
            if (e.keyCode === left) {
                console.log(width);
                if (width > 60) {
                    width -= 3;
                }
            } else if (e.keyCode === right) {
                if (width < 120) {
                    width += 5;
                }
                offset++;
            } else if (e.keyCode === down) {
                height += 10;
            }
        };

        this.drawFigure(height, width - offset, widthPosition, heightPosition, getTypeFigure, offset);

        if (height >= endRow) {
            normalStepDown = 0;
        }
        setTimeout(() => {
            this.loopGame(height + normalStepDown, width, widthPosition, heightPosition, getTypeFigure);
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
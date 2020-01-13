function main() {
    $('#container').load('game.html');

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    const game = new Game(context);
    game.startGame();
}

class Game {
    constructor(context) {
        this.context = context;
        this.figures = {};
        this.images = [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg6Jz34T+Ifv3kGIOojBWYBgFkNlgADfTUeTEygjQLC3Iz3Li8G5sanGIauq5gPYwlTdvAtpMLwC6AORlkKjEA2bUYBvDxsYDN+PTpDwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Bb19cYRCW0EGNRrLCgBQXvH3/lQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQAfwJNr7nKi7AAAAABJRU5ErkJggg==',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBgKD1y/D+Ifn7sCIOklQ2YBgFkNlgADSwpK2VkBGkW4udjuLp9GzY1OMW0Pb3AehhjurrBtpMLwC6AORlkKjEA2bUYBvBzcYPN+PjtKwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Br69fYxDV1EKNRrLCgBQXvPv4iQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQBReJAxJHOTqwAAAABJRU5ErkJggg==',
        ];
    }

    startGame() {
        initializationFigures();
        const image = new Image();
        image.src = this.images[0];
        
        let height = 90;
        let width = 100;

        this.context.drawImage(image, 80, height, 8, 12);;
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
}
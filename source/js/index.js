
function loadFigure(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    })
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const o = {sx: 15, sy: 20, sWidth: 60, sHeight: 50,dx: 0, dy: 0, dWidth: 55, dHeight: 50};
const i = {sx: 128, sy: 23, sWidth: 115, sHeight: 31, dx: 50, dy: 50, dWidth: 135, dHeight: 50};
const l = {sx: 135, sy: 116, sWidth: 80, sHeight: 100, dx: 50, dy: 50, dWidth: 100, dHeight: 90}
const t =  {sx: 15, sy: 106, sWidth: 110, sHeight: 100, dx: 0, dy: 0, dWidth: 100, dHeight: 80}

const validFigures = [o, i, l, t];
let currentFigure = validFigures[Math.floor(Math.random() * validFigures.length)];
const drawnFigures = [];

setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    loadFigure('../resources/tetris-figures.png')
    .then(image => {
        const {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} = currentFigure;
        context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return currentFigure;
    }).then(figure => {
        if (figure.dy <= 500) {
            figure.dy += 25;
        } else {
            figure.dy = 0;
            //drawnFigures.push(figure); add already drawn figures
            currentFigure = validFigures[Math.floor(Math.random() * validFigures.length)];
        }
    });
}, 1000);


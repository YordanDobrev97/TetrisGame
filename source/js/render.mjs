import * as Helper from './helper.js';
let canvas;
function Render(canvas, context) {
    canvas = canvas;
    this.context  = context;

    drawCanvasContainer(canvas, this.context);
    drawFigure(context);
}

function drawCanvasContainer(canvas, context) {
    const divWrapper = document.getElementsByClassName('wrapper')[0];
    divWrapper.innerHTML = '';
    context.fillStyle = 'white';
    context.clearRect(30, 30, 30, 30); // default values
    divWrapper.appendChild(canvas);
}

function drawFigure(context) {
    let x  = 3;
    let y = 8;
    let width = 10;
    let height = 5;

    const randomFig = getRandomFigure();
    for (let i = 0; i < randomFig.length; i++) {
        const elements = randomFig[i];
        
        for (let j = 0; j < elements.length; j++) {
            const element = elements[j];
            if (element) {
                context.fillStyle = 'black';
            } else {
                context.fillStyle = 'white';
            }
            context.fillRect(x, y, width, height);
            x += 15;
        }
        x = 3;
        y += 10;
    }
}

function getRandomFigure() {
    const figures = Helper.default.figures;
    const randomFigure = figures[Math.floor(Math.random() * figures.length)];
    return randomFigure;
}

export default { Render }
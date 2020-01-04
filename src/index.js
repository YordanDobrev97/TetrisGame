const figure = {
    firstPieceX: 95,
    secondPieceX: 104,
    thirdPieceX: 113,
    firstPieceY: 25,
    secondPieceY: 36,
    thirdPieceY: 42,
    width: 30,
    height: 30,
};

//import {renderRandomFigure} from '../models/renderFigure.js'
//let figures = require('../models/renderFigure.js');
function start() {
    load();
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    
    ctx.fillStyle = 'blue';
    const figureObj = {x: 95, y: 25, width: 10, height: 6};

    const maxMoveDown = 121;
    function play() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(figureObj.x, figureObj.y, figureObj.width, figureObj.height);
        ctx.fillRect(figureObj.x + 11, figureObj.y, figureObj.width, figureObj.height);
        ctx.fillRect(figureObj.x + 11, figureObj.y, figureObj.width, figureObj.height);
        ctx.fillRect(figureObj.x + 22, figureObj.y, figureObj.width, figureObj.height);


        console.log(figureObj.y);
        const defaultValueMoveDown = 3;

        if (figureObj.y < maxMoveDown) {
            figureObj.y += defaultValueMoveDown;
        }
        
        document.onkeydown = (e) => {
        if (e.keyCode === 37) {
            figureObj.x -= defaultValueMoveDown;
        }
        else if (e.keyCode === 38) {
            figureObj.y -= defaultValueMoveDown;
        }
        else if (e.keyCode === 39) {
            figureObj.x += defaultValueMoveDown;
        }
        else if (e.keyCode === 40) {
            figureObj.y += defaultValueMoveDown;
        }
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(figureObj.x, figureObj.y, figureObj.width, figureObj.height);
    };
};

setInterval(play, 300);
    
}

function load() {
    $.ajax({
        url: 'game.html',
        success: function(data) {
            $('#container').html(data);
        }
    });
}
const objectCoordinates = {
    widthPosition: 95,
    heightPosition: 30,
    color: 'white',
};

//import {renderRandomFigure} from '../models/renderFigure.js'
//let figures = require('../models/renderFigure.js');
function start() {
    load();
    
    const canvas = document.getElementById('canvas');
    const dimension = canvas.getContext('2d'); 
    let typeFigure = 'L';
    
    createFigure(typeFigure, dimension);
}

function createFigure(typeFigure, dimension) {

    let colors = [];
    if (typeFigure === 'Z') {
        colors = ['grey', 'white', 'white', 'grey', 'grey', 'grey', 'white', 'white', 'grey'];
    }
    else if (typeFigure === 'S') {
        colors = ['white', 'grey', 'grey', 'grey', 'grey', 'white', 'white', 'white', 'white'];
    }
    else if (typeFigure === 'J') {
        colors = ['grey','white', 'grey', 'grey', 'grey', 'grey', 'white', 'white', 'white'];
    }
    else if (typeFigure === 'T') {
        colors = ['grey', 'white', 'white', 'grey', 'grey', 'grey', 'grey', 'white', 'white'];
    }
    else {
        colors = ['white', 'white', 'white', 'grey', 'grey', 'grey', 'white', 'white', 'grey'];
    }

    render(objectCoordinates.widthPosition, objectCoordinates.heightPosition, colors[0], typeFigure, dimension);
    render(objectCoordinates.widthPosition, 36, colors[1], typeFigure, dimension);
    render(objectCoordinates.widthPosition, 42, colors[2], typeFigure, dimension);
    objectCoordinates.widthPosition += 9;
    console.log(objectCoordinates.widthPosition);
    render(objectCoordinates.widthPosition, 30, colors[3], typeFigure, dimension);
    render(objectCoordinates.widthPosition, 36, colors[4], typeFigure, dimension);
    render(objectCoordinates.widthPosition, 42, colors[5], typeFigure, dimension);
    objectCoordinates.widthPosition += 9;
    render(objectCoordinates.widthPosition, 30, colors[6], typeFigure, dimension);
    render(objectCoordinates.widthPosition, 36, colors[7], typeFigure, dimension);
    render(objectCoordinates.widthPosition, 42, colors[8], typeFigure, dimension);
}

function render(widthPos, heightPos,color, typeFigure, dimension) {
    dimension.fillStyle = color;

    drawingBox(widthPos, heightPos, 8, 5, dimension);
}

function drawingBox(positionWidth, positionHeight, width, height, dimension) {
    dimension.fillRect(positionWidth, positionHeight, width, height);
}

function load() {
    $.ajax({
        url: 'game.html',
        success: function(data) {
            $('#container').html(data);
        }
    });
}
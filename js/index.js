import figures from './figures.js';
import Player from './player.js';
import Arena from './arena.js';
import Painter from './painter.js';
import Figure from './Figure.js';

document.querySelector('.play-button').addEventListener('click', ()=> {
    document.getElementById('background-music').play();
    
    const canvas = document.getElementById('board');
    const context = canvas.getContext('2d');
    context.scale(20, 20);

    const shapeFigure = figures.T;
    const initFigure = new Figure({x: 0, y: 0}, shapeFigure);
    const player = new Player(initFigure);

    const render = new Painter(canvas, context);
    const arena = new Arena(player, render);

    arena.init();
});


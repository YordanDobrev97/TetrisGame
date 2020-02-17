import painter from './render.mjs';

function start() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    painter.Render(canvas, context);
}

export { start };


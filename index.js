
function play() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    const figureObj = {x: 50, y: 50, width: 30, height: 30};

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(figureObj.x, figureObj.y, figureObj.width, figureObj.height);

    const defaultValue = 3;
    document.onkeydown = (e) => {
        if (e.keyCode === 37) {
            figureObj.x -= defaultValue;
        }
        else if (e.keyCode === 38) {
            figureObj.y -= defaultValue;
        }
        else if (e.keyCode === 39) {
            figureObj.x += defaultValue;
        }
        else if (e.keyCode === 40) {
            figureObj.y += defaultValue;
        }

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(figureObj.x, figureObj.y, figureObj.width, figureObj.height);
    };

    console.log('yes babayy');
};

play();












//moveFigureWithKeyWord();
// function moveFigureWithKeyWord() {
//     const figureObj = {x: 50, y: 50, width: 30, height: 30};
//     ctx.fillRect(figureObj.x, figureObj.y, figureObj.width, figureObj.height);

//     const defaultValue = 3;
//     document.onkeydown = (e) => {
//         if (e.keyCode === 37) {
//             figureObj.x -= defaultValue;
//         }
//         else if (e.keyCode === 38) {
//             figureObj.y -= defaultValue;
//         }
//         else if (e.keyCode === 39) {
//             figureObj.x += defaultValue;
//         }
//         else if (e.keyCode === 40) {
//             figureObj.y += defaultValue;
//         }

//         ctx.clearRect(0,0,canvas.width,canvas.height);
//         ctx.fillRect(figureObj.x, figureObj.y, figureObj.width, figureObj.height);
//     };
// }

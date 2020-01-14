(function(){
    let render = (height, width, widthPosition, heightPosition, getTypeFigure, offset) => {
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

    module.exports = render;
})();
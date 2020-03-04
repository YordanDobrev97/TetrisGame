class Painter {
    drawFigure(ctx, figure, positionX, positionY, width, height) {
        console.log(this);
        const defaultX = positionX;

        const defaultIncrementX = 9;
        const defaultIncrementY = 6;

        const image = new Image();
        image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg6Jz34T+Ifv3kGIOojBWYBgFkNlgADfTUeTEygjQLC3Iz3Li8G5sanGIauq5gPYwlTdvAtpMLwC6AORlkKjEA2bUYBvDxsYDN+PTpDwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Bb19cYRCW0EGNRrLCgBQXvH3/lQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQAfwJNr7nKi7AAAAABJRU5ErkJggg==";

        for (let row = 0; row < figure.length; row++) {
          for (let col = 0; col < figure[row].length; col++) {
            if (figure[row][col]) {
             ctx.drawImage(image, positionX, positionY, width, height);
            }
            positionX += defaultIncrementX;
          }
          positionY += defaultIncrementY;
          positionX = defaultX;
       }
      }
}

export default Painter;
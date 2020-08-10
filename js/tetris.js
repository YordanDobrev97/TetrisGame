const NUM_ROWS = 20;
const NUM_COLS = 10;
const BLOCK_WIDTH = 30;
const BLOCK_HEIGHT = 30;
const TICK_MS = 400;

const tetrominoes =
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
   [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
];

const PAUSED = 32;
const KEY_SPACE = 68;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const LEFT_ROTATION = 38;
const RIGHT_ROTATION = 38;
const KEY_R = 82;

function rotateLeft(tetromino) {
  return [
    [tetromino[0][3], tetromino[1][3], tetromino[2][3], tetromino[3][3]],
    [tetromino[0][2], tetromino[1][2], tetromino[2][2], tetromino[3][2]],
    [tetromino[0][1], tetromino[1][1], tetromino[2][1], tetromino[3][1]],
    [tetromino[0][0], tetromino[1][0], tetromino[2][0], tetromino[3][0]]
  ];
}
function intersects(rows, tetromino, y, x) {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (tetromino[i][j])
        if (y+i >= NUM_ROWS || x+j < 0 || x+j >= NUM_COLS || rows[y+i][x+j])
          return true;
  return false;
}

function applyTetromino(rows, piece, y, x) {
  const newRows = [];
  for (let i = 0; i < NUM_ROWS; i++)
    newRows[i] = rows[i].slice();
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (piece[i][j])
        newRows[y+i][x+j] = 1;
  return newRows;
}

function killRows(rows) {
  const newRows = [];
  let k = NUM_ROWS;
  for (let i = NUM_ROWS; i --> 0;) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (!rows[i][j]) {
        newRows[--k] = rows[i].slice();
        break;
      }
    }
  }
  for (let i = 0; i < k; i++) {
    newRows[i] = [];
    for (let j = 0; j < NUM_COLS; j++)
      newRows[i][j] = 0;
  }
  return {
    'rows': newRows,
    'numRowsKilled': k,
  };
}

function randomTetromino() {
  return tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
}

function TetrisGame() {
  this.gameOver = false;
  this.score = 0;
  this.currentPiece = randomTetromino();
  this.nextPiece = randomTetromino();
  this.pieceY = 0;
  this.pieceX = 3;
  this.rows = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    this.rows[i] = []
    for (let j = 0; j < NUM_COLS; j++) {
      this.rows[i][j] = 0;
    }
  }
}

TetrisGame.prototype.tick = function () {
  if (this.gameOver)
    return false;
  if (intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX)) {
    this.rows = applyTetromino(this.rows, this.currentPiece, this.pieceY, this.pieceX);
    let r = killRows(this.rows);
    this.rows = r.rows;
    this.score += 1 + r.numRowsKilled * r.numRowsKilled * NUM_COLS;
   
    if (intersects(this.rows, this.nextPiece, 0, NUM_COLS / 2 - 2)) {
      this.gameOver = true;
    } else {
      this.currentPiece = this.nextPiece;
      this.pieceY = 0;
      this.pieceX = NUM_COLS / 2 - 2;
      this.nextPiece = randomTetromino();
    }
  } else {
    this.pieceY += 1;
  }
  return true;
}

TetrisGame.prototype.left = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX - 1))
    this.pieceX -= 1;
}

TetrisGame.prototype.right = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX + 1))
    this.pieceX += 1;
}

TetrisGame.prototype.down = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX))
    this.pieceY += 1;
}

TetrisGame.prototype.rotateLeft = function () {
  let newPiece = rotateLeft(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.rotateRight = function () {
  let newPiece = rotateRight(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.letFall = function () {
  while (!intersects(this.rows, this.currentPiece, this.pieceY+1, this.pieceX))
    this.pieceY += 1;
  this.tick();
}

TetrisGame.prototype.getRows = function () {
  return applyTetromino(this.rows, this.currentPiece, this.pieceY, this.pieceX);
}

TetrisGame.prototype.getNextTetromino = function () {
  return this.nextPiece;
}

TetrisGame.prototype.getScore = function () {
  return this.score;
}

TetrisGame.prototype.getGameOver = function () {
  return this.gameOver;
}

function drawBlocks(rows, num_rows, num_cols) {
  let boardElem = document.createElement('div');
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      let blockElem = document.createElement('div');
      blockElem.classList.add('tetrisBlock');
      if (rows[i][j])
        blockElem.classList.add('habitated');
      blockElem.style.top = (i * BLOCK_HEIGHT) + 'px';
      blockElem.style.left = (j * BLOCK_WIDTH) + 'px';
      boardElem.appendChild(blockElem);
    }
  }
  return boardElem;
}

function drawTetrisGame(game, isPaused) {
  let leftPaneElem = drawTetrisLeftPane(game, isPaused);
  let rightPaneElem = drawTetrisRightPane(game);
  let gameElem = document.createElement('div');
  gameElem.classList.add('tetrisGame');
  gameElem.appendChild(leftPaneElem);
  gameElem.appendChild(rightPaneElem);
  return gameElem;
}

function drawTetrisLeftPane(game, isPaused) {
  let scoreElem = drawTetrisScore(game, isPaused);
  let previewElem = drawTetrisPreview(game);
  let usageElem = drawTetrisUsage(game);
  let leftPaneElem = document.createElement('div');
  leftPaneElem.classList.add('tetrisLeftPane');
  leftPaneElem.appendChild(previewElem);
  leftPaneElem.appendChild(scoreElem);
  leftPaneElem.appendChild(usageElem);
  return leftPaneElem;
}

function drawTetrisRightPane(game) {
  let boardElem = drawTetrisBoard(game);
  let rightPaneElem = document.createElement('div');
  rightPaneElem.classList.add('tetrisRightPane');
  rightPaneElem.appendChild(boardElem);
  return rightPaneElem;
}

function drawTetrisBoard(game) {
  let rows = game.getRows();
  let boardElem = drawBlocks(rows, NUM_ROWS, NUM_COLS);
  boardElem.classList.add('tetrisBoard');
  return boardElem;
}

function drawTetrisScore(game, isPaused) {
  let score = game.getScore();
  let scoreElem = document.createElement('div');
  scoreElem.classList.add('tetrisScore');
  scoreElem.innerHTML = '<p>SCORE: ' + score + '</p>';
  if (isPaused)
    scoreElem.innerHTML += '<p>PAUSED</p>'
  if (game.getGameOver())
    scoreElem.innerHTML += '<p>GAME OVER</p>'
  return scoreElem;
}

function drawTetrisPreview(game) {
  let piece = game.getNextTetromino();
  let pieceElem = drawBlocks(piece, 4, 4);
  let previewElem = document.createElement('div');
  previewElem.classList.add('tetrisPreview');
  previewElem.appendChild(pieceElem);
  return previewElem;
}

function drawTetrisUsage(game) {
  let usageElem = document.createElement('div');
  usageElem.classList.add('tetrisUsage');
  usageElem.innerHTML =
       "<table>" +
      "<tr><th>Cursor Keys</th><td>Steer</td></tr>" +
      "<tr><th>↑</th><td>Rotate</td></tr>" +
      "<tr><th>Space bar</th><td>Paused</td></tr>" +
      "<tr><th>r</th><td>Restart game</td></tr>" +
      "</table>";
  return usageElem;
}

function redraw(game, isPaused, containerElem) {
  let gameElem = drawTetrisGame(game, isPaused);
  containerElem.innerHTML = '';
  containerElem.appendChild(gameElem);
}

function tetrisRun(containerElem) {
  let game = new TetrisGame();

  play();

  function play() {
    let intervalHandler = setInterval(
      function () {
        if (game.tick())
          redraw(game, false, containerElem);
      },
      TICK_MS
    );

    function keyHandler(kev) {
        if (kev.shiftKey || kev.altKey || kev.metaKey)
          return;
        let consumed = true;
        let mustpause = false;
        if (kev.keyCode === PAUSED) {
          mustpause = true;
        } else if (kev.keyCode === KEY_R) {
          game = new TetrisGame();
        } else if (kev.keyCode === KEY_LEFT) {
          game.left();
        } else if (kev.keyCode === KEY_RIGHT) {
          game.right();
        } else if (kev.keyCode === KEY_DOWN) {
          game.down();
        } else if (kev.keyCode === LEFT_ROTATION || kev.keyCode === RIGHT_ROTATION) {
          game.rotateLeft();
        } else if (kev.keyCode === KEY_SPACE) {
          game.letFall();
        } else {
          consumed = false;
        }
        if (consumed) {
          kev.preventDefault();
          if (mustpause) {
            containerElem.removeEventListener('keydown', keyHandler);
            clearInterval(intervalHandler);
            pause();
          } else {
            redraw(game, false, containerElem);
          }
        }
    }

    containerElem.addEventListener('keydown', keyHandler);
  }

  function pause() {
    function keyHandler(kev) {
      if (kev.keyCode == PAUSED) {
        containerElem.removeEventListener('keydown', keyHandler);
        play();
      }
    }

    containerElem.addEventListener('keydown', keyHandler);

    redraw(game, true, containerElem);
  }
}
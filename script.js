const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game');
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let players = ['', ''];
let currentPlayer = 0; // 0 = player1, 1 = player2
let board = Array(9).fill('');
let gameActive = true;

submitBtn.onclick = function () {
  const name1 = player1Input.value.trim();
  const name2 = player2Input.value.trim();
  if (name1 && name2) {
    players = [name1, name2];
    setupDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    resetBoard();
  }
};

cells.forEach((cell) => {
  cell.onclick = function () {
    const idx = Number(cell.id) - 1;
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer === 0 ? 'x' : 'o';
    cell.textContent = board[idx];
    if (checkWin()) {
      gameActive = false;
      messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
      highlightWinningCells();
    } else if (board.every((cell) => cell)) {
      gameActive = false;
      messageDiv.textContent = "It's a tie!";
    } else {
      currentPlayer = 1 - currentPlayer;
      messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    }
  };
});

function checkWin() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of wins) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line; // return winning indices
    }
  }
  return false;
}

function highlightWinningCells() {
  const winningLine = checkWin();
  if (winningLine) {
    for (const idx of winningLine) {
      cells[idx].classList.add('winning');
    }
  }
}

function resetBoard() {
  board = Array(9).fill('');
  gameActive = true;
  currentPlayer = 0;
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
}

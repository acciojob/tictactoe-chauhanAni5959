const nameForm = document.getElementById('name-form');
const gameDiv = document.getElementById('game');
const submitBtn = document.getElementById('submit');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let players = [];
let currentPlayer = 0; // 0 = Player1, 1 = Player2
let symbols = ['x', 'o'];
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const player1 = document.getElementById('player1').value.trim();
  const player2 = document.getElementById('player2').value.trim();

  if (!player1 || !player2) {
    alert('Please enter names for both players');
    return;
  }
  players = [player1, player2];
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 0;
  gameActive = true;

  nameForm.style.display = 'none';
  gameDiv.style.display = 'block';

  // Reset cells
  cells.forEach(cell => cell.textContent = '');

  setMessage(`${players[currentPlayer]}, you're up`);
});

cells.forEach(cell => {
  cell.addEventListener('click', function () {
    const idx = parseInt(this.id) - 1;
    if (!gameActive || board[idx]) return;
    board[idx] = symbols[currentPlayer];
    this.textContent = symbols[currentPlayer];

    if (checkWinner()) {
      setMessage(`${players[currentPlayer]} congratulations you won!`);
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== '')) {
      setMessage('Draw! Try again.');
      gameActive = false;
      return;
    }

    currentPlayer = 1 - currentPlayer;
    setMessage(`${players[currentPlayer]}, you're up`);
  });
});

function setMessage(msg) {
  messageDiv.textContent = msg;
}

function checkWinner() {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return lines.some(pattern =>
    pattern.every(idx => board[idx] === symbols[currentPlayer])
  );
}

const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game');
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const messageDiv = document.querySelector('.message');
const cells = Array.from(document.getElementsByClassName('cell'));

let players = ["", ""];
let currentPlayer = 0; // 0 = player1, 1 = player2
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

submitBtn.addEventListener('click', function() {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();
  if (p1 === "" || p2 === "") return;

  players = [p1, p2];
  setupDiv.style.display = 'none';
  gameDiv.classList.remove('hidden');

  // Ensure grid is rendered before Cypress interacts
  setTimeout(() => {
    currentPlayer = 0;
    board = Array(9).fill("");
    gameActive = true;
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove('winning');
      cell.addEventListener('click', handleCellClick, { once: true });
    });
  }, 50);
});

function handleCellClick(e) {
  if (!gameActive) return;
  const idx = parseInt(e.target.id, 10) - 1;
  if (board[idx] !== "") return;

  board[idx] = currentPlayer === 0 ? 'x' : 'o';
  e.target.textContent = board[idx];

  const winCombo = getWinCombo();
  if (winCombo) {
    winCombo.forEach(i => cells[i].classList.add('winning'));
    messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = 1 - currentPlayer;
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
}

function getWinCombo() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}

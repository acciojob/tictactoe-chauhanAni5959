const submitBtn = document.getElementById("submit");
const message = document.querySelector(".message");
const gameArea = document.getElementById("game-area");
const inputArea = document.getElementById("input-area");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;

const winPatterns = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names.");
    return;
  }

  currentPlayer = player1;
  message.textContent = `${player1}, you're up`;

  inputArea.style.display = "none";
  gameArea.style.display = "block";
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    const A = document.getElementById(a).textContent;
    const B = document.getElementById(b).textContent;
    const C = document.getElementById(c).textContent;

    if (A && A === B && B === C) {
      gameActive = false;
      message.textContent = `${currentPlayer} congratulations you won!`;

      // highlight the winning cells
      document.getElementById(a).classList.add("win");
      document.getElementById(b).classList.add("win");
      document.getElementById(c).classList.add("win");

      return true;
    }
  }
  return false;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentSymbol;

    if (checkWinner()) return;

    if (currentSymbol === "x") {
      currentSymbol = "o";
      currentPlayer = player2;
    } else {
      currentSymbol = "x";
      currentPlayer = player1;
    }

    message.textContent = `${currentPlayer}, you're up`;
  });
});

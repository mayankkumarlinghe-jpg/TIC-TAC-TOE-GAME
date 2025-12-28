const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset');
const newGameBtn = document.getElementById('new-game');
const msgOverlay = document.getElementById('msg-overlay');
const msgElement = document.getElementById('msg');
const turnIndicator = document.querySelector('#turn-indicator span');

let currentPlayer = 'O'; // 'O' starts
let gameActive = true;
let board = Array(9).fill(null);

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function updateTurnDisplay() {
  turnIndicator.textContent = currentPlayer;
}

function disableBoard() {
  boxes.forEach(box => box.disabled = true);
}

function enableBoard() {
  boxes.forEach(box => box.disabled = false);
}

function resetGame() {
  currentPlayer = 'O';
  gameActive = true;
  board.fill(null);
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('O', 'X', 'win');
    box.disabled = false;
  });
  msgOverlay.style.display = 'none';
  updateTurnDisplay();
}

function checkWinner() {
  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      msgElement.textContent = `Winner: ${board[a]} 🎉`;
      msgOverlay.style.display = 'flex';

      // Highlight winning line
      boxes[a].classList.add('win');
      boxes[b].classList.add('win');
      boxes[c].classList.add('win');

      disableBoard();
      gameActive = false;
      return true;
    }
  }
  return false;
}

function checkDraw() {
  if (board.every(cell => cell !== null)) {
    msgElement.textContent = "It's a Draw! 🤝";
    msgOverlay.style.display = 'flex';
    gameActive = false;
    return true;
  }
  return false;
}

function handleClick(e) {
  const box = e.target;
  const index = Number(box.dataset.index);

  if (!gameActive || board[index] || box.disabled) return;

  board[index] = currentPlayer;
  box.textContent = currentPlayer;
  box.classList.add(currentPlayer);

  if (checkWinner()) return;
  if (checkDraw()) return;

  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  updateTurnDisplay();
}

// Event Listeners
boxes.forEach(box => box.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);

// Start game
updateTurnDisplay();

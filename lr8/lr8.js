let userName = '';
let userScore = 0;
let computerScore = 0;
let round = 0;
let isGameOver = false;
const maxWins = 3;

const userNameBox = document.getElementById('user-name');
const userScoreBox = document.getElementById('user-score');
const compScoreBox = document.getElementById('computer-score');
const userNum = document.getElementById('user-number');
const compNum = document.getElementById('computer-number');
const message = document.getElementById('message');
const roundInfo = document.getElementById('round-info');
const winnerText = document.getElementById('winner-text');
const btnGenerate = document.getElementById('generate-btn');
const btnReset = document.getElementById('reset-btn');

function startGame() {
  userName = prompt("Введіть ваше ім’я:") || "User";
  userNameBox.textContent = userName;
  message.textContent = `Привіт, ${userName}!`;
}

function updateUI() {
  userScoreBox.textContent = userScore;
  compScoreBox.textContent = computerScore;
  roundInfo.textContent = `Раунд: ${round}`;
}

function generateRound() {
  if (isGameOver) return;

  let randomNumberUser = Math.floor(Math.random() * 10);
  let randomNumberComp = Math.floor(Math.random() * 10);

  userNum.textContent = randomNumberUser;
  compNum.textContent = randomNumberComp;

  if (randomNumberUser > randomNumberComp) {
    userScore++;
    message.textContent = `${userName} виграв раунд!`;
  } else if (randomNumberUser < randomNumberComp) {
    computerScore++;
    message.textContent = `Комп’ютер виграв раунд!`;
  } else {
    message.textContent = 'Нічия!';
  }

  round++;
  updateUI();

  if (userScore == maxWins || computerScore == maxWins) {
    isGameOver = true;
    const winner = userScore > computerScore ? userName : "Комп’ютер";
    winnerText.textContent = `Переможець: ${winner}!`;
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  round = 0;
  isGameOver = false;
  userNum.textContent = '-';
  compNum.textContent = '-';
  message.textContent = 'Гру скинуто.';
  winnerText.textContent = '';
  updateUI();
}
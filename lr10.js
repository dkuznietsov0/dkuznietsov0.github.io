const EMOJIS = ['🍎','🍐','🍋','🍑','🍒','🍊'];
const PLACEHOLDER = '🍎';
const maxAttempts = 3;
let currentAttempt = 0;
let gameOver = false;
let playerName = 'User';

const cols = Array.from(document.querySelectorAll('.column'));
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const attemptsEl = document.getElementById('attempts');
const playerNameEl = document.getElementById('playerName');
const messageEl = document.getElementById('message');

document.addEventListener('DOMContentLoaded', () => {
  const raw = prompt('Введіть ваше імʼя');
  if (raw) {
    let v = raw.trim().slice(0, 30);
    v = v.replace(/[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s\-']/g, '');
    if (v.length) playerName = v;
  }
  playerNameEl.textContent = playerName;
  loadPlaceholders();
  updateAttemptsText();
  bind();
});

function loadPlaceholders() {
  cols.forEach(col => {
    col.querySelectorAll('.cell').forEach(c => c.innerHTML = `<span class="emoji">${PLACEHOLDER}</span>`);
  });
}

function bind() {
  generateBtn.addEventListener('click', () => { if (!gameOver) spinReels(); });
  generateBtn.addEventListener('keydown', e => { if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); generateBtn.click(); } });
  resetBtn.addEventListener('click', resetGame);
}

function spinReels() {
  if (generateBtn.disabled) return;
  generateBtn.disabled = true;
  messageEl.textContent = '';
  const promises = cols.map((col, i) => spinColumn(col, i));
  Promise.all(promises).then(() => {
    generateBtn.disabled = false;
    checkWin(currentAttempt + 1);
    currentAttempt++;
    updateAttemptsText();
    if (!gameOver && currentAttempt >= maxAttempts) {
      gameOver = true;
      generateBtn.disabled = true;
      resetBtn.hidden = false;
      messageEl.textContent = `На жаль, ${playerName}, ви не виграли. Спробуйте ще раз.`;
    }
  });
}

function spinColumn(colEl, index) {
  return new Promise(resolve => {
    const pick = sampleWithoutReplacement(EMOJIS, 3);
    shuffleArray(pick);
    const cells = Array.from(colEl.querySelectorAll('.cell'));
    const total = 600 + index * 180;
    const frame = 80;
    let t = 0;
    const id = setInterval(() => {
      t += frame;
      cells.forEach(c => c.innerHTML = `<span class="emoji">${EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}</span>`);
      if (t >= total) {
        clearInterval(id);
        for (let i = 0; i < 3; i++) cells[i].innerHTML = `<span class="emoji">${pick[i]}</span>`;
        setTimeout(resolve, 80);
      }
    }, frame);
  });
}

function checkWin(attempt) {
  const matrix = cols.map(c => Array.from(c.querySelectorAll('.cell')).map(x => x.textContent));
  let won = false;
  for (let r = 0; r < 3; r++) {
    if (matrix[0][r] && matrix[0][r] === matrix[1][r] && matrix[1][r] === matrix[2][r]) { won = true; break; }
  }
  if (won) {
    gameOver = true;
    generateBtn.disabled = true;
    resetBtn.hidden = false;
    messageEl.textContent = `Вітаю, ${playerName}! Ви виграли на спробі ${attempt} з ${maxAttempts}`;
  }
}

function resetGame() {
  currentAttempt = 0;
  gameOver = false;
  resetBtn.hidden = true;
  generateBtn.disabled = false;
  messageEl.textContent = '';
  loadPlaceholders();
  updateAttemptsText();
}

function updateAttemptsText() {
  attemptsEl.textContent = `Спроба ${Math.min(currentAttempt + 1, maxAttempts)} з ${maxAttempts}`;
}

function sampleWithoutReplacement(arr, n) {
  const copy = arr.slice();
  shuffleArray(copy);
  return copy.slice(0, n);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
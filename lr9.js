const suits = ["♠","♣","♦","♥"];
const cardData = [
  {name:"6", value:6},
  {name:"7", value:7},
  {name:"8", value:8},
  {name:"9", value:9},
  {name:"10", value:10},
  {name:"Валет", value:2},
  {name:"Дама", value:3},
  {name:"Король", value:4},
  {name:"Туз", value:11},
];

const cards = [];
cardData.forEach(c => {
  suits.forEach(s => {
    cards.push({name:c.name, value:c.value, suit:s});
  });
});


let userName = "User";
let userScore = 0;
let compScore = 0;
let tries = 0;
const maxTries = 3;
let gameOver = false;

const userNameBox = document.getElementById("user-name");
const userScoreBox = document.getElementById("user-score");
const compScoreBox = document.getElementById("computer-score");
const userCardsRow = document.getElementById("user-cards");
const compCardsRow = document.getElementById("computer-cards");
const messageBox = document.getElementById("message");
const roundInfo = document.getElementById("round-info");
const winnerText = document.getElementById("winner-text");
const btnGenerate = document.getElementById("generate-btn");

const inputName = prompt("Введіть ваше ім’я:")?.trim();
if (inputName) userName = inputName;
userNameBox.textContent = userName;

function updateUI() {
  userScoreBox.textContent = userScore;
  compScoreBox.textContent = compScore;
  roundInfo.textContent = `Спроба: ${tries} з ${maxTries}`;
}

function getRandomCard() {
  const idx = Math.floor(Math.random() * cards.length);
  return cards[idx];
}

function makeCardElement(card) {
  const el = document.createElement("div");
  el.className = "card";
  const suitClass = (card.suit === "♥" || card.suit === "♦") ? "suit-red" : "suit-black";
  el.innerHTML = `
    <div class="top ${suitClass}">${card.name} ${card.suit}</div>
    <div class="center-rank ${suitClass}">${card.name}</div>
    <div class="bottom ${suitClass}">${card.suit} ${card.name}</div>
  `;
  setTimeout(() => el.classList.add("dealt"), 10);
  return el;
}

function generateRound() {
  if (gameOver) return;

  tries++;

  const userCard = getRandomCard();
  const compCard = getRandomCard();

  userScore += userCard.value;
  compScore += compCard.value;

  userCardsRow.appendChild(makeCardElement(userCard));
  compCardsRow.appendChild(makeCardElement(compCard));

  if (userCard.value > compCard.value) {
    messageBox.textContent = `${userName} отримав кращу карту!`;
  } else if (userCard.value < compCard.value) {
    messageBox.textContent = `Комп’ютер отримав кращу карту!`;
  } else {
    messageBox.textContent = "Нічия цього раунду!";
  }

  updateUI();

  if (tries === maxTries) endGame();
}

function endGame() {
  gameOver = true;
  btnGenerate.disabled = true;

  if (userScore > compScore) {
    winnerText.textContent = `Ви виграли!`;
    winnerText.style.color = "#16a34a";
  } else if (userScore < compScore) {
    winnerText.textContent = `Ви програли!`;
    winnerText.style.color = "#ef4444";
  } else {
    winnerText.textContent = "Нічия!";
    winnerText.style.color = "#94a3b8";
  }

  messageBox.textContent = "Гру завершено.";
}

function resetGame() {
  userScore = 0;
  compScore = 0;
  tries = 0;
  gameOver = false;

  userCardsRow.innerHTML = "";
  compCardsRow.innerHTML = "";

  messageBox.textContent = "Гру скинуто.";
  winnerText.textContent = "";
  btnGenerate.disabled = false;
  updateUI();
}

updateUI();
// Selecting DOM elements

const playingContainer = document.querySelector(".playing-container");
const container = document.querySelector(".container");
const playerChoiceEl = document.querySelector(".player-choice");
const computerChoiceEl = document.querySelector(".computer-choice");
const statusBox = document.querySelector(".game-box");
const statusEl = document.querySelector(".game-status");
const gameBtn = document.querySelector(".game-btn");
const rulesBtn = document.querySelector(".btn-rules");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn-close");
const scoreEl = document.querySelector(".score");

playingContainer.classList.add("hidden");
statusBox.classList.add("hidden");
overlay.classList.add("hidden");

let score = 0;
scoreEl.innerHTML = "0";
// Adding Helper functions
const updateScore = function (winner) {
  if (!winner || winner === "computer") return;
  if (winner === "player") score++;
  scoreEl.innerHTML = `${score}`;
};

const createChosen = function (chosen) {
  return `<div class="icon-box icon-box-${chosen}">
              <div class="icon-border-${chosen}"></div>
              <div class="icon-border-white"></div>
              <img class="icon" src="images/icon-${chosen}.svg" alt="${chosen}" />
            </div>`;
};
const displayChoice = function (container, chosen) {
  container.innerHTML = "";
  const markup = createChosen(chosen);
  container.insertAdjacentHTML("afterbegin", markup);
};
const generateComputerChoice = function () {
  const arr = ["rock", "paper", "scissors"];
  let index = Math.trunc(Math.random() * 3);
  return arr[index];
};
const displayStatus = function (status) {
  if (!status) statusEl.innerHTML = "It's Draw";
  if (status === "player") statusEl.innerHTML = "You win";
  if (status === "computer") statusEl.innerHTML = "You Lose";
};

const determineWinner = function (choice1, choice2) {
  console.log(choice1, choice2);
  let winner;
  if (choice1 === choice2) return null;
  if (choice1 === "rock") {
    if (choice2 === "paper") winner = "computer";
    if (choice2 === "scissors") winner = "player";
  }
  if (choice1 === "paper") {
    if (choice2 === "rock") winner = "player";
    if (choice2 === "scissors") winner = "computer";
  }
  if (choice1 === "scissors") {
    if (choice2 === "rock") winner = "computer";
    if (choice2 === "paper") winner = "player";
  }
  return winner;
};

// Adding event listener to the main container

container.addEventListener("click", function (e) {
  const target = e.target.closest(".icon-box");
  if (!target) return;
  let playerChoice;
  if (target.classList.contains("icon-box-rock")) playerChoice = "rock";
  if (target.classList.contains("icon-box-paper")) playerChoice = "paper";
  if (target.classList.contains("icon-box-scissors")) playerChoice = "scissors";
  displayChoice(playerChoiceEl, playerChoice);
  const computerChoice = generateComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);
  //   if (!winner) return;
  playingContainer.classList.remove("hidden");
  container.classList.add("hidden");
  setTimeout(() => {
    displayChoice(computerChoiceEl, computerChoice);
    displayStatus(winner);
    setTimeout(() => {
      statusBox.classList.remove("hidden");
      updateScore(winner);
    }, 1000);
  }, 1000);
});

// Add event listener to the play again button
gameBtn.addEventListener("click", function () {
  playingContainer.classList.add("hidden");
  container.classList.remove("hidden");
  statusBox.classList.add("hidden");
  playerChoiceEl.innerHTML = "";
  computerChoiceEl.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.classList.add("circle");
  computerChoiceEl.appendChild(newDiv);
});

// Add event listener to the rules button

rulesBtn.addEventListener("click", function () {
  overlay.classList.remove("hidden");
});

// Add event listener to close the overlay and the rules view

closeBtn.addEventListener("click", function () {
  overlay.classList.add("hidden");
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") overlay.classList.add("hidden");
});
